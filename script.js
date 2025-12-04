/* --- script.js (Финальная версия) --- */

// 1. FIREBASE CONFIG
const firebaseConfig = {
	apiKey: "AIzaSyCKwgCH8cwLzR_QU9e2AuC5-Y_qzgd-2H8",
	authDomain: "hyperlearn-564f7.firebaseapp.com",
	projectId: "hyperlearn-564f7",
	storageBucket: "hyperlearn-564f7.firebasestorage.app",
	messagingSenderId: "269014515504",
	appId: "1:269014515504:web:2d67d6cf9b07bbdc00d2f5",
};

let auth, db;
// Инициализация. Теперь она не вызовет ошибку, так как script.js загружается позже.
if (typeof firebase !== "undefined") {
	firebase.initializeApp(firebaseConfig);
	auth = firebase.auth();
	db = firebase.firestore();
}

let currentUser = null;
let userProgress = {};
const DEFAULT_VIDEO = "x04T6UnOxJI";
const AI_GRADE_ENDPOINT = "/api/ai-grade";

// 2. ПОЛНАЯ БАЗА ДАННЫХ (COURSES_DB)
const COURSES_DB = {
	python: {
		title: "КУРС 1: Python для Data Science",
		color: "indigo",
		icon: "code-2",
		nextCourseId: "algo",
		modules: [
			// ... (ВАШИ МОДУЛИ) ...
			{
				title: "Модуль 0: Введение",
				lessons: [
					{
						id: "py_0_1",
						title: "0.1 Python в ML",
						videoId: DEFAULT_VIDEO,
					},
					{
						id: "py_0_2",
						title: "0.2 Анализ изображений",
						videoId: DEFAULT_VIDEO,
					},
				],
			},
			{
				title: "Модуль 1: Основы Python",
				lessons: [
					{
						id: "py_1_1",
						title: "1.1 Переменные",
						videoId: DEFAULT_VIDEO,
					},
					{
						id: "py_1_2",
						title: "1.2 Типы данных",
						videoId: DEFAULT_VIDEO,
					},
					{
						id: "py_1_3",
						title: "1.3 Циклы",
						videoId: DEFAULT_VIDEO,
					},
					{
						id: "py_1_4",
						title: "1.4 Условия",
						videoId: DEFAULT_VIDEO,
					},
				],
			},
			{
				title: "Модуль 2: Структуры данных",
				lessons: [
					{
						id: "py_2_1",
						title: "2.1 Функции",
						videoId: DEFAULT_VIDEO,
					},
					{
						id: "py_2_2",
						title: "2.2 Списки и Словари",
						videoId: DEFAULT_VIDEO,
					},
				],
			},
			{
				title: "Модуль 3: Окружение",
				lessons: [
					{
						id: "py_3_1",
						title: "3.1 PIP и Libs",
						videoId: DEFAULT_VIDEO,
					},
					{
						id: "py_3_2",
						title: "3.2 Anaconda",
						videoId: DEFAULT_VIDEO,
					},
				],
			},
			{
				title: "Модуль 4: Инструменты",
				lessons: [
					{
						id: "py_4_1",
						title: "4.1 Jupyter",
						videoId: DEFAULT_VIDEO,
					},
					{
						id: "py_4_2",
						title: "4.2 Pandas Intro",
						videoId: DEFAULT_VIDEO,
					},
				],
			},
		],
	},
	algo: {
		title: "КУРС 2: Алгоритмы",
		color: "blue",
		icon: "cpu",
		nextCourseId: "stats",
		modules: [
			{
				title: "Модуль 1: Сложность",
				lessons: [
					{
						id: "alg_1_1",
						title: "1.1 Big O",
						videoId: DEFAULT_VIDEO,
					},
				],
			},
			{
				title: "Модуль 2: Структуры",
				lessons: [
					{
						id: "alg_2_1",
						title: "2.1 Массивы",
						videoId: DEFAULT_VIDEO,
					},
					{
						id: "alg_2_2",
						title: "2.2 Списки",
						videoId: DEFAULT_VIDEO,
					},
				],
			},
		],
	},
	stats: {
		title: "КУРС 3: Статистика",
		color: "green",
		icon: "bar-chart-2",
		nextCourseId: "ml",
		modules: [
			{
				title: "Модуль 1: Вероятность",
				lessons: [
					{
						id: "st_1_1",
						title: "1.1 Основы",
						videoId: DEFAULT_VIDEO,
					},
				],
			},
		],
	},
	ml: {
		title: "КУРС 4: Machine Learning",
		color: "pink",
		icon: "brain-circuit",
		nextCourseId: "dl",
		modules: [
			{
				title: "Модуль 1: Введение",
				lessons: [
					{
						id: "ml_1_1",
						title: "1.1 Виды ML",
						videoId: DEFAULT_VIDEO,
					},
				],
			},
		],
	},
	dl: {
		title: "КУРС 5: Deep Learning",
		color: "cyan",
		icon: "network",
		nextCourseId: "career",
		modules: [
			{
				title: "Модуль 1: Нейросети",
				lessons: [
					{
						id: "dl_1_1",
						title: "1.1 Перцептрон",
						videoId: DEFAULT_VIDEO,
					},
				],
			},
		],
	},
	career: {
		title: "БОНУС: Карьера",
		color: "yellow",
		icon: "briefcase",
		nextCourseId: "python",
		modules: [
			{
				title: "Модуль 1: Поиск работы",
				lessons: [
					{
						id: "car_1_1",
						title: "1.1 Резюме",
						videoId: DEFAULT_VIDEO,
					},
				],
			},
		],
	},
};

// 3. ИНИЦИАЛИЗАЦИЯ ПРИ ЗАГРУЗКЕ
document.addEventListener("DOMContentLoaded", () => {
	// Анимация на Лендинге
	if (document.getElementById("network-canvas")) {
		initLandingAnimation();
		// Инит капчи
		if (typeof grecaptcha !== "undefined") {
			grecaptcha.ready(() => {
				const el = document.getElementById("g-recaptcha");
				if (el)
					try {
						grecaptcha.render("g-recaptcha", {
							sitekey: el.dataset.sitekey,
						});
					} catch (e) {}
			});
		}
	}

	// Слушатель Auth
	if (auth) {
		auth.onAuthStateChanged((user) => {
			const path = window.location.pathname;
			// Проверяем, находится ли пользователь на landing.html (или просто на /)
			const isOnLanding = path.includes("landing.html") || path === "/";

			if (user) {
				currentUser = user;
				loadUserProgress(user.uid);

				// РЕШЕНИЕ ПРОБЛЕМЫ 2: Если пользователь залогинен и находится на лендинге, перенаправляем на дашборд.
				if (isOnLanding) {
					window.location.href = "index.html";
					// Никакой "вспышки" не будет, потому что перенаправление происходит сразу,
					// как только Firebase подтверждает сессию.
				}
			} else {
				currentUser = null;
				// Если пользователь не залогинен и пытается попасть на дашборд (не лендинг)
				if (!isOnLanding && !path.includes("index.html")) {
					window.location.href = "landing.html";
				}
			}
		});
	}

	if (typeof lucide !== "undefined") lucide.createIcons();
	initMobileMenu();

	// Роутинг
	if (window.location.pathname.includes("course.html"))
		setTimeout(initCoursePage, 1000);
	else if (window.location.pathname.includes("index.html")) initRoadmap();
});

// --- UI ЛОГИКА: МОДАЛЬНЫЕ ОКНА И ПРОГРАММА (Глобальные функции для HTML) ---
window.openAuth = function (mode) {
	const overlay = document.getElementById("auth-overlay");
	const innerCard = document.getElementById("auth-card-inner");
	if (!overlay || !innerCard) return;

	overlay.classList.remove("hidden");
	setTimeout(() => overlay.classList.remove("opacity-0"), 10);

	// Сброс формы и выбор стороны
	if (mode === "register") innerCard.classList.add("flipped");
	else innerCard.classList.remove("flipped");
};

window.closeAuth = function () {
	const overlay = document.getElementById("auth-overlay");
	if (!overlay) return;
	overlay.classList.add("opacity-0");
	setTimeout(() => overlay.classList.add("hidden"), 300);
};

window.toggleAuthMode = function () {
	const innerCard = document.getElementById("auth-card-inner");
	if (innerCard) innerCard.classList.toggle("flipped");
};

window.openProgram = function () {
	// Используем renderLandingProgram, так как она определена в HTML-скрипте,
	// а renderFullProgram - в script.js. Проверим, где мы.
	if (typeof renderLandingProgram === "function") renderLandingProgram();
	else renderFullProgram();

	const overlay = document.getElementById("program-overlay");
	if (!overlay) return;
	overlay.classList.remove("hidden");
	setTimeout(() => overlay.classList.remove("opacity-0"), 10);
};

window.closeProgram = function () {
	const overlay = document.getElementById("program-overlay");
	if (!overlay) return;
	overlay.classList.add("opacity-0");
	setTimeout(() => overlay.classList.add("hidden"), 300);
};

// --- РЕНДЕРИНГ ПРОГРАММЫ (АККОРДЕОН) ---
function renderFullProgram() {
	const content = document.getElementById("program-content");
	if (!content || content.children.length > 0) return; // Уже есть или нет контейнера

	const order = ["python", "algo", "stats", "ml", "dl", "career"];

	content.innerHTML = order
		.map((key) => {
			const c = COURSES_DB[key];
			return `
        <div class="mb-6 animate-fade-in-up">
            <details class="group bg-slate-800/40 rounded-xl border border-white/5 overflow-hidden">
                <summary class="flex items-center justify-between p-5 cursor-pointer hover:bg-white/5 transition select-none">
                    <div class="flex items-center gap-4">
                        <div class="w-12 h-12 rounded-lg bg-${
							c.color
						}-500/20 flex items-center justify-center text-${
				c.color
			}-400">
                            <i data-lucide="${c.icon}" class="w-8 h-8"></i>
                        </div>
                        <div>
                            <h3 class="text-2xl font-bold text-white">${
								c.title
							}</h3>
                            <p class="text-base text-slate-400">${
								c.modules.length
							} модулей</p>
                        </div>
                    </div>
                    <i data-lucide="chevron-down" class="w-8 h-8 text-slate-400 rotate-icon group-open:rotate-180 transition-transform"></i>
                </summary>
                <div class="p-5 pt-0 border-t border-white/5 bg-slate-900/30">
                    <div class="space-y-6 mt-6">
                        ${c.modules
							.map(
								(mod) => `
                            <div class="pl-6 border-l-4 border-${
								c.color
							}-500/30">
                                <h4 class="text-xl font-semibold text-slate-200 mb-3">${
									mod.title
								}</h4>
                                <ul class="space-y-3">
                                    ${mod.lessons
										.map(
											(l) =>
												`<li class="text-lg text-slate-300 flex items-center gap-3"><span class="w-2 h-2 rounded-full bg-${
													c.color
												}-500"></span>${
													l.title || l
												}</li>`
										)
										.join("")}
                                </ul>
                            </div>
                        `
							)
							.join("")}
                    </div>
                </div>
            </details>
        </div>`;
		})
		.join("");
	if (typeof lucide !== "undefined") lucide.createIcons();
}

// --- LOGIC: AUTH SUBMIT (REAL FIREBASE) ---
window.handleAuthSubmit = function (e) {
	e.preventDefault();
	const form = e.target;
	const isRegister = form.id === "register-form";
	const btn = form.querySelector('button[type="submit"]');
	const originalText = btn.innerHTML;

	// UI Loading
	btn.innerHTML = `<i data-lucide="loader-2" class="animate-spin w-5 h-5 inline"></i> ${
		isRegister ? "Создание..." : "Вход..."
	}`;
	if (typeof lucide !== "undefined") lucide.createIcons();

	// Captcha Check
	if (isRegister && typeof grecaptcha !== "undefined") {
		if (!grecaptcha.getResponse()) {
			btn.innerHTML = originalText;
			return alert("Пройдите капчу!");
		}
	}

	const email = form.querySelector('input[type="email"]').value;
	const pwd = form.querySelector('input[type="password"]').value;

	if (!isRegister) {
		auth.signInWithEmailAndPassword(email, pwd)
			.then(() => (window.location.href = "index.html"))
			.catch((err) => {
				alert("Ошибка: " + err.message);
				btn.innerHTML = originalText;
			});
	} else {
		auth.createUserWithEmailAndPassword(email, pwd)
			.then((cred) => {
				return db.collection("users").doc(cred.user.uid).set({
					email: email,
					createdAt: firebase.firestore.FieldValue.serverTimestamp(),
					progress: {},
				});
			})
			.then(() => (window.location.href = "index.html"))
			.catch((err) => {
				alert("Ошибка: " + err.message);
				btn.innerHTML = originalText;
			});
	}
};

// --- LOGIC: CANVAS ANIMATION (УЛУЧШЕННАЯ ВИДИМОСТЬ + ИНТЕРАКТИВНОСТЬ) ---
function initLandingAnimation() {
	const canvas = document.getElementById("network-canvas");
	if (!canvas) return;
	const ctx = canvas.getContext("2d");
	let w,
		h,
		particles = [];

	// Переменные для мыши
	let mouse = { x: null, y: null, radius: 200 };
	window.addEventListener("mousemove", (e) => {
		mouse.x = e.x;
		mouse.y = e.y;
	});
	window.addEventListener("mouseleave", () => {
		mouse.x = null;
		mouse.y = null;
	});

	const resize = () => {
		w = canvas.width = window.innerWidth;
		h = canvas.height = window.innerHeight;
	};

	class P {
		constructor() {
			this.x = Math.random() * w;
			this.y = Math.random() * h;
			this.vx = (Math.random() - 0.5) * 0.5;
			this.vy = (Math.random() - 0.5) * 0.5;
			this.originVx = this.vx;
			this.originVy = this.vy;
		}
		update() {
			// Логика притяжения к мыши
			if (mouse.x != null) {
				let dx = mouse.x - this.x;
				let dy = mouse.y - this.y;
				let distance = Math.sqrt(dx * dx + dy * dy);
				if (distance < mouse.radius) {
					const forceDirectionX = dx / distance;
					const forceDirectionY = dy / distance;
					const force = (mouse.radius - distance) / mouse.radius;
					const directionX = forceDirectionX * force * 3;
					const directionY = forceDirectionY * force * 3;
					this.vx = this.originVx + directionX;
					this.vy = this.originVy + directionY;
				} else {
					this.vx = this.originVx;
					this.vy = this.originVy;
				}
			}

			this.x += this.vx;
			this.y += this.vy;

			// Отскок от стен
			if (this.x < 0 || this.x > w) {
				this.vx *= -1;
				this.originVx *= -1;
			}
			if (this.y < 0 || this.y > h) {
				this.vy *= -1;
				this.originVy *= -1;
			}
		}
	}

	const init = () => {
		particles = Array.from({ length: 80 }, () => new P());
	};
	const animate = () => {
		ctx.clearRect(0, 0, w, h);
		particles.forEach((p, i) => {
			p.update();
			ctx.beginPath();
			ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
			ctx.fillStyle = "rgba(99, 102, 241, 0.8)";
			ctx.fill();

			// Линии к мышке
			if (mouse.x != null) {
				let dx = mouse.x - p.x;
				let dy = mouse.y - p.y;
				let d = Math.sqrt(dx * dx + dy * dy);
				if (d < mouse.radius) {
					ctx.beginPath();
					ctx.strokeStyle = `rgba(99,102,241,${
						0.5 - d / mouse.radius
					})`;
					ctx.lineWidth = 0.5;
					ctx.moveTo(p.x, p.y);
					ctx.lineTo(mouse.x, mouse.y);
					ctx.stroke();
				}
			}

			// Линии между точками
			for (let j = i + 1; j < particles.length; j++) {
				const dx = p.x - particles[j].x,
					dy = p.y - particles[j].y,
					d = Math.sqrt(dx * dx + dy * dy);
				if (d < 150) {
					ctx.beginPath();
					ctx.strokeStyle = `rgba(99,102,241,${0.4 - d / 1500})`;
					ctx.lineWidth = 0.5;
					ctx.moveTo(p.x, p.y);
					ctx.lineTo(particles[j].x, particles[j].y);
					ctx.stroke();
				}
			}
		});
		requestAnimationFrame(animate);
	};
	window.addEventListener("resize", () => {
		resize();
		init();
	});
	resize();
	init();
	animate();
}

// --- LOGIC: COURSE PAGE & LOCKS ---
// УДАЛЯЕМ checkAuthRedirect(), ее логика перенесена в onAuthStateChanged

async function loadUserProgress(uid) {
	const doc = await db.collection("users").doc(uid).get();
	if (doc.exists) userProgress = doc.data().progress || {};
	// Условие для initCoursePage здесь оставлено, так как оно нужно для загрузки данных курса
	if (window.location.pathname.includes("course.html")) initCoursePage();
}

function isLessonLocked(cId, mIdx, lIdx) {
	if (mIdx === 0 && lIdx === 0) return false;
	const c = COURSES_DB[cId];
	let prevId = null;
	if (lIdx > 0) prevId = c.modules[mIdx].lessons[lIdx - 1].id;
	else if (mIdx > 0) {
		const prevMod = c.modules[mIdx - 1].lessons;
		prevId = prevMod[prevMod.length - 1].id;
	}
	return prevId && !userProgress[prevId];
}

function initCoursePage() {
	const params = new URLSearchParams(window.location.search);
	const id = params.get("id") || "python";
	const data = COURSES_DB[id];
	if (!data) return;

	document.getElementById("course-title-display").innerText = data.title;
	const list = document.getElementById("sidebar-list");
	list.innerHTML = "";

	data.modules.forEach((mod, mIdx) => {
		const h = document.createElement("div");
		h.className =
			"text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 mt-6 px-2";
		h.innerText = mod.title;
		list.appendChild(h);

		mod.lessons.forEach((less, lIdx) => {
			const locked = isLessonLocked(id, mIdx, lIdx);
			const done = userProgress[less.id];
			const btn = document.createElement("button");
			btn.className = `w-full text-left p-3 rounded-xl flex items-center gap-3 transition ${
				locked ? "lesson-locked" : "hover:bg-white/5"
			}`;
			if (!locked) btn.onclick = () => loadLesson(less, btn);

			btn.innerHTML = `
                <div class="lesson-icon w-6 h-6 rounded-full flex items-center justify-center ${
					done
						? "bg-green-500/20 text-green-400"
						: locked
						? "bg-red-500/20 text-white"
						: "border border-slate-600 text-slate-500"
				}">
                    <i data-lucide="${
						done ? "check" : locked ? "lock" : "play"
					}" class="w-3 h-3"></i>
                </div>
                <span class="text-sm font-medium text-slate-300">${
					less.title
				}</span>
            `;
			list.appendChild(btn);
		});
	});
	if (typeof lucide !== "undefined") lucide.createIcons();
}

function loadLesson(less, btn) {
	document.getElementById("lesson-title-main").innerText = less.title;
	const wrap = document.getElementById("video-wrapper-clickable");
	wrap.innerHTML = `<iframe class="w-full h-full rounded-2xl" src="https://www.youtube.com/embed/${less.videoId}?autoplay=1" frameborder="0" allowfullscreen></iframe>`;
	wrap.classList.remove("cursor-pointer");
	wrap.onclick = null;

	document
		.querySelectorAll("#sidebar-list button")
		.forEach((b) => b.classList.remove("bg-white/10"));
	btn.classList.add("bg-white/10");

	const cBtn = document.getElementById("complete-lesson-btn");
	if (cBtn)
		cBtn.onclick = async () => {
			userProgress[less.id] = true;
			await db
				.collection("users")
				.doc(currentUser.uid)
				.set({ progress: userProgress }, { merge: true });
			initCoursePage();
		};
}

// --- LOGIC: AI ---
async function submitHomeworkAI(task) {
	const ans = document.getElementById("homework-answer").value;
	const res = document.getElementById("ai-grade-result");
	if (!ans) return alert("Напишите ответ!");
	res.innerHTML = "AI проверяет...";
	try {
		const r = await fetch(AI_GRADE_ENDPOINT, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				userId: currentUser.uid,
				task,
				answer: ans,
			}),
		});
		const d = await r.json();
		res.innerHTML = `<div class="ai-response-area">${d.grade}</div>`;
	} catch (e) {
		res.innerText = "Ошибка сервера.";
	}
}

// --- LOGIC: ROADMAP ---
function initRoadmap() {
	const order = ["python", "algo", "stats", "ml", "dl", "career"];
	const c = document.getElementById("roadmap-container");
	if (!c) return;
	c.innerHTML = order
		.map((k, i) => {
			const d = COURSES_DB[k];
			return `<a href="course.html?id=${k}" class="glass-card p-4 rounded-xl min-w-[200px] flex flex-col items-center hover:bg-white/5 transition"><div class="w-10 h-10 bg-${
				d.color
			}-600 rounded-full flex items-center justify-center mb-2 font-bold">${
				i + 1
			}</div><div class="font-bold">${d.title}</div></a>`;
		})
		.join("");
}

function initMobileMenu() {
	const b = document.getElementById("burger-btn");
	if (b)
		b.onclick = () =>
			document.querySelector("aside").classList.toggle("hidden");
}
function logout() {
	if (confirm("Выйти?"))
		auth.signOut().then(() => (window.location.href = "landing.html"));
}
window.switchTab = function (id) {
	document
		.querySelectorAll(".tab-content")
		.forEach((e) => e.classList.remove("active"));
	document.getElementById("tab-" + id).classList.add("active");
};
