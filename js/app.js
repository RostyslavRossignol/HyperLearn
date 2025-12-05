import { auth, functions } from "./config.js";
import { loadUserData, saveLessonProgress } from "./db.js";
import { COURSES_DB_LOCAL, getAllLessonsFlat } from "./legacy_db.js";
// ВАЖНО: Добавил renderDashboardRoadmap в импорт
import {
	renderCourseCards,
	renderLessonList,
	updateUserDisplay,
	renderDashboardRoadmap,
} from "./ui.js";
import { setupAuthListeners } from "./auth.js";
import { sendMentorMessage } from "./mentor.js";
import { initLandingAnimation } from "./animation.js";

let currentUser = null;
let userProgress = {};

document.addEventListener("DOMContentLoaded", () => {
	if (window.lucide) lucide.createIcons();

	// Анимация (с проверкой на наличие элемента)
	if (document.getElementById("network-canvas")) {
		try {
			initLandingAnimation();
		} catch (e) {
			console.error(e);
		}
	}

	setupAuthListeners();
	initMobileMenu();

	// Слушатель авторизации
	auth.onAuthStateChanged(async (user) => {
		if (user) {
			currentUser = user;
			const userData = await loadUserData(user.uid);
			userProgress = userData.progress || {};

			updateUserDisplay(userData.displayName);

			// Сначала запускаем логику страницы, потом убираем лоадеры
			initPageLogic();

			document
				.querySelectorAll(".loading-placeholder")
				.forEach((el) => el.classList.add("hidden"));
		} else {
			// Если не на лендинге и не авторизован -> редирект
			if (!window.location.pathname.includes("landing.html")) {
				window.location.href = "landing.html";
			}
		}
	});
});

function initPageLogic() {
	const path = window.location.pathname;

	// --- DASHBOARD (index.html) ---
	// Проверка: либо файл index.html, либо корень сайта
	if (
		path.includes("index.html") ||
		path.endsWith("/") ||
		path.endsWith("/LMS/")
	) {
		console.log("Rendering Dashboard..."); // Дебаг
		// Вызываем рендер Roadmap
		renderDashboardRoadmap(COURSES_DB_LOCAL, userProgress);
		updateDashboardStats();
	}

	// --- COURSE PAGE ---
	if (path.includes("course.html")) {
		const params = new URLSearchParams(window.location.search);
		const courseId = params.get("id");
		const lessonId = params.get("lesson");

		if (!courseId) {
			// Режим "Мои Курсы" (Список)
			document
				.getElementById("course-selection-menu")
				.classList.remove("hidden");
			document
				.getElementById("lesson-area-wrapper")
				.classList.add("hidden");

			// Превращаем объект в массив для рендера
			const coursesList = Object.keys(COURSES_DB_LOCAL).map((key) => ({
				id: key,
				...COURSES_DB_LOCAL[key],
			}));

			const progressMap = {};
			coursesList.forEach((c) => {
				const total = c.modules.reduce(
					(acc, m) => acc + m.lessons.length,
					0
				);
				const completed = c.modules.reduce(
					(acc, m) =>
						acc +
						m.lessons.filter((l) => userProgress[l.id]).length,
					0
				);
				progressMap[c.id] = {
					percent: total ? Math.round((completed / total) * 100) : 0,
					completed,
				};
			});

			renderCourseCards(coursesList, progressMap);
		} else {
			// Режим "Урок"
			const course = COURSES_DB_LOCAL[courseId];
			if (!course) return;

			document
				.getElementById("course-selection-menu")
				.classList.add("hidden");
			document
				.getElementById("lesson-area-wrapper")
				.classList.remove("hidden");
			document
				.getElementById("course-lesson-menu")
				.classList.remove("hidden");
			document.getElementById("course-title-display").innerText =
				course.title;

			const activeLessonId = lessonId || course.modules[0].lessons[0].id;

			renderLessonList(
				course.modules,
				userProgress,
				activeLessonId,
				(lesson) => {
					window.location.href = `course.html?id=${courseId}&lesson=${lesson.id}`;
				},
				getAllLessonsFlat()
			);

			loadLessonContent(activeLessonId, getAllLessonsFlat());
		}
	}

	// --- MENTOR PAGE ---
	if (path.includes("mentor.html")) {
		const input = document.getElementById("chat-input");

		window.sendChatMessage = () => {
			const msg = input.value;
			if (!msg) return;
			input.value = "";
			sendMentorMessage(msg, "chat-container");
		};

		input.addEventListener("keypress", (e) => {
			if (e.key === "Enter" && !e.shiftKey) {
				e.preventDefault();
				window.sendChatMessage();
			}
		});
	}
}

function updateDashboardStats() {
	let completedCount = Object.keys(userProgress).length;
	let lessonsEl = document.getElementById("lessons-completed-count");
	if (lessonsEl) lessonsEl.innerText = completedCount;

	// Примерный расчет общего прогресса
	let totalEl = document.getElementById("total-progress-percent");
	if (totalEl)
		totalEl.innerText =
			Math.min(100, Math.round(completedCount / 1.5)).toString() + "%";

	// Карточка текущего модуля
	const card = document.getElementById("current-module-card");
	if (card) {
		card.classList.remove("loading-placeholder");
		// Логика определения последнего активного курса
		// Для простоты пока ставим ссылку на курс Python
		card.innerHTML = `
            <div class="flex items-center gap-4">
                <div class="p-3 bg-indigo-600/20 rounded-xl text-indigo-400">
                    <i data-lucide="zap" class="w-6 h-6"></i>
                </div>
                <div class="text-left">
                    <h4 class="text-white font-bold">Продолжить обучение</h4>
                    <p class="text-sm text-slate-400">Нажмите, чтобы перейти к урокам</p>
                </div>
                <i data-lucide="chevron-right" class="ml-auto text-slate-500"></i>
            </div>
        `;
		if (window.lucide) lucide.createIcons();
	}
}

// ... Остальные функции (loadLessonContent, completeLesson и т.д.) остаются без изменений ...
// Я их скопирую для полноты, чтобы ты мог просто заменить файл целиком.

function loadLessonContent(lessonId, allLessons) {
	const lesson = allLessons.find((l) => l.id === lessonId);
	if (!lesson) return;

	document.getElementById("lesson-title-main").innerText = lesson.title;
	document.getElementById(
		"homework-task-desc"
	).innerText = `Напишите код или ответ по теме: "${lesson.title}". Ментор проверит ваше решение.`;

	const wrapper = document.getElementById("video-wrapper-clickable");
	wrapper.classList.remove("cursor-pointer");
	wrapper.onclick = null;
	wrapper.innerHTML = `<iframe class="w-full h-full rounded-2xl shadow-2xl" src="https://www.youtube.com/embed/${lesson.videoId}?autoplay=0" frameborder="0" allowfullscreen></iframe>`;

	const btns = document.querySelectorAll(".complete-lesson-btn-dynamic");

	if (userProgress[lessonId]) {
		btns.forEach((b) => {
			b.innerText = "Урок пройден ✅";
			b.classList.add("opacity-50", "pointer-events-none");
		});
	} else {
		btns.forEach((b) => {
			b.innerText = "Завершить урок";
			b.classList.remove("opacity-50", "pointer-events-none");
			b.onclick = async () => {
				await completeLesson(lessonId, allLessons, b);
			};
		});
	}

	const hwBtn = document.getElementById("submit-homework-btn");
	if (hwBtn) {
		hwBtn.onclick = async () => {
			const answer = document.getElementById("homework-answer").value;
			if (!answer) return alert("Введите ответ!");

			hwBtn.innerText = "Проверка...";
			hwBtn.disabled = true;

			try {
				const aiGrade = functions.httpsCallable("aiGrade");
				const result = await aiGrade({
					userId: currentUser.uid,
					task: lesson.title,
					answer: answer,
				});

				const feedbackDiv = document.getElementById("ai-grade-result");
				feedbackDiv.innerHTML = `<div class="p-4 bg-indigo-900/30 border border-indigo-500/30 rounded-xl prose prose-invert text-sm">${marked.parse(
					result.data.grade
				)}</div>`;

				hwBtn.innerText = "Проверено";
			} catch (e) {
				console.error(e);
				alert("Ошибка проверки. Убедитесь, что Backend задеплоен.");
				hwBtn.innerText = "Ошибка";
				hwBtn.disabled = false;
			}
		};
	}
}

async function completeLesson(lessonId, allLessons, btnElement) {
	btnElement.innerText = "Сохранение...";
	await saveLessonProgress(currentUser.uid, lessonId, userProgress);
	userProgress[lessonId] = true;

	const currentIndex = allLessons.findIndex((l) => l.id === lessonId);
	const nextLesson = allLessons[currentIndex + 1];

	if (nextLesson) {
		btnElement.innerText = "Далее ->";
		window.location.href = `course.html?id=${nextLesson.courseId}&lesson=${nextLesson.id}`;
	} else {
		btnElement.innerText = "Курс завершен! 🎉";
	}
}

function initMobileMenu() {
	const burger = document.getElementById("burger-btn");
	const menu = document.getElementById("mobile-menu");
	const overlay = document.getElementById("menu-overlay");
	const close = document.getElementById("close-menu-btn");
	if (!burger || !menu) return;
	const toggle = () => {
		menu.classList.toggle("hidden");
		menu.classList.toggle("translate-x-0");
		if (overlay) overlay.classList.toggle("hidden");
	};
	burger.onclick = toggle;
	if (close) close.onclick = toggle;
	if (overlay) overlay.onclick = toggle;
}

window.switchTab = function (tabName) {
	document.querySelectorAll(".tab-content").forEach((el) => {
		el.style.display = "none";
		el.classList.remove("active");
	});

	const activeTab = document.getElementById(`tab-${tabName}`);
	activeTab.style.display = "block";
	activeTab.classList.add("active");

	document.getElementById("tab-btn-desc").className =
		"flex-1 py-3 rounded-lg font-bold text-sm text-slate-400 hover:text-white hover:bg-white/5 transition-all";
	document.getElementById("tab-btn-homework").className =
		"flex-1 py-3 rounded-lg font-bold text-sm text-slate-400 hover:text-white hover:bg-white/5 transition-all";

	const activeBtn = document.getElementById(`tab-btn-${tabName}`);
	activeBtn.className =
		"flex-1 py-3 rounded-lg font-bold text-sm bg-indigo-600 text-white shadow-lg transition-all";
};
