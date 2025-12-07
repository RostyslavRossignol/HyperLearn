/* js/addon_loader.js
   ГЛАВНЫЙ СКРИПТ РАСШИРЕНИЙ (ADD-ON CORE)
   ВЕРСИЯ: SCROLL-ONLY + FIRESTORE PROFILE FIX
*/

import { TOOLS_DB, RESOURCES_DB, LESSON_ATTACHMENTS } from "./resources_db.js";

document.addEventListener("DOMContentLoaded", () => {
	// 1. Фиксы UI и мобильное меню
	initMobileMenuFix();

	// 2. Логика для конкретных страниц
	const path = window.location.pathname;

	if (path.includes("course.html")) {
		// Запускаем инъекцию контента урока
		initLessonContentInjector();
	} else if (path.includes("tools.html")) {
		renderToolsPage();
		initUserProfileFix();
	} else if (path.includes("resources.html")) {
		renderResourcesPage();
		initUserProfileFix();
	}
});

// ==========================================
// 1. MOBILE MENU FIX (Бургер на мобильных)
// ==========================================
function initMobileMenuFix() {
	const burger = document.getElementById("burger-btn");
	const menu = document.getElementById("mobile-menu");
	const overlay = document.getElementById("menu-overlay");
	const closeBtn = document.getElementById("close-menu-btn");

	if (!burger || !menu) return;

	const toggle = (forceClose = false) => {
		const isHidden = menu.classList.contains("-translate-x-full");

		if (forceClose || !isHidden) {
			menu.classList.add("-translate-x-full");
			if (overlay) overlay.classList.add("hidden");
		} else {
			menu.classList.remove("-translate-x-full");
			if (overlay) overlay.classList.remove("hidden");
		}
	};

	burger.onclick = (e) => {
		e.preventDefault();
		e.stopPropagation();
		toggle(false);
	};
	if (closeBtn)
		closeBtn.onclick = (e) => {
			e.preventDefault();
			e.stopPropagation();
			toggle(true);
		};
	if (overlay)
		overlay.onclick = (e) => {
			e.preventDefault();
			toggle(true);
		};

	injectSidebarLinks();
}

function injectSidebarLinks() {
	const navs = document.querySelectorAll("#mobile-menu nav");
	navs.forEach((nav) => {
		// Защита от дублирования ссылок
		if (nav.innerHTML.includes("tools.html")) return;

		const extraLinks = `
            <div class="mt-6 pt-4 border-t border-white/10 sidebar-text">
                <p class="px-4 text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">База знаний</p>
                <a href="tools.html" class="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition font-medium">
                    <i data-lucide="wrench" class="w-5 h-5"></i> <span class="sidebar-text">Инструменты</span>
                </a>
                <a href="resources.html" class="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition font-medium">
                    <i data-lucide="library" class="w-5 h-5"></i> <span class="sidebar-text">Ресурсы</span>
                </a>
            </div>
        `;
		nav.insertAdjacentHTML("beforeend", extraLinks);
	});
	if (window.lucide) lucide.createIcons();
}

// ==========================================
// 2. CONTENT INJECTOR (Контент урока)
// ==========================================
function initLessonContentInjector() {
	const checkAndUpdate = () => {
		setTimeout(() => {
			const params = new URLSearchParams(window.location.search);
			const lessonId = params.get("lesson");
			if (!lessonId) return;

			const lessonData = LESSON_ATTACHMENTS[lessonId];
			if (!lessonData || !lessonData.hasContent) return;

			// A. Описание сверху
			const videoWrapper = document.getElementById(
				"video-wrapper-clickable"
			);
			if (
				videoWrapper &&
				!document.getElementById(`top-desc-${lessonId}`)
			) {
				document
					.querySelectorAll(".lesson-top-description")
					.forEach((el) => el.remove());
				if (lessonData.topDescription) {
					const descDiv = document.createElement("div");
					descDiv.id = `top-desc-${lessonId}`;
					descDiv.className = "lesson-top-description";
					descDiv.innerHTML = `<div class="flex items-start gap-3"><i data-lucide="info" class="w-5 h-5 mt-1 text-indigo-400 shrink-0"></i> <span>${lessonData.topDescription}</span></div>`;
					videoWrapper.parentNode.insertBefore(descDiv, videoWrapper);
				}
			}

			// B. Текст урока и Файлы
			const descTab = document.getElementById("tab-desc");
			if (descTab) {
				// 1. Вставка HTML текста урока
				if (
					lessonData.htmlContent &&
					!descTab.querySelector(".lesson-html-content-injected")
				) {
					const title = descTab.querySelector("h2");
					const textDiv = document.createElement("div");
					textDiv.className =
						"lesson-html-content lesson-html-content-injected prose prose-invert max-w-none";
					textDiv.innerHTML = lessonData.htmlContent;

					if (title) {
						title.insertAdjacentElement("afterend", textDiv);
					} else {
						descTab.prepend(textDiv);
					}
				}

				// 2. Вставка файлов
				if (
					lessonData.files &&
					lessonData.files.length > 0 &&
					!document.getElementById(`files-${lessonId}`)
				) {
					document
						.querySelectorAll(".files-section-block")
						.forEach((el) => el.remove());
					renderFilesBlock(descTab, lessonData.files, lessonId);
				}
			}
			if (window.lucide) lucide.createIcons();
		}, 500);
	};

	const sidebarList = document.getElementById("sidebar-list");
	if (sidebarList) sidebarList.addEventListener("click", checkAndUpdate);
	checkAndUpdate();
}

function renderFilesBlock(container, files, id) {
	const block = document.createElement("div");
	block.id = `files-${id}`;
	block.className = "files-section-block";

	const filesHtml = files
		.map((f) => {
			let icon = "file";
			let colorClass = "text-indigo-400 bg-indigo-500/20";
			if (f.type === "pdf") {
				icon = "file-text";
				colorClass = "text-red-400 bg-red-500/20";
			} else if (f.type === "doc" || f.type === "docx") {
				icon = "file-type-2";
				colorClass = "text-blue-400 bg-blue-500/20";
			} else if (f.type === "notebook") {
				icon = "code-2";
				colorClass = "text-yellow-400 bg-yellow-500/20";
			}

			let actionBtn = "";
			if (f.type === "pdf") {
				actionBtn = `
                <a href="${f.url}" target="_blank" class="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white text-sm font-bold rounded-lg transition flex items-center gap-2 group" title="Открыть PDF">
                    <i data-lucide="eye" class="w-4 h-4 group-hover:scale-110 transition"></i> <span class="hidden sm:inline">Открыть</span>
                </a>
            `;
			} else {
				actionBtn = `
                <a href="${f.url}" download target="_blank" class="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-bold rounded-lg transition flex items-center gap-2 group">
                    <i data-lucide="download" class="w-4 h-4 group-hover:translate-y-1 transition"></i> <span class="hidden sm:inline">Скачать</span>
                </a>
            `;
			}

			return `
            <div class="file-card flex items-center justify-between p-4 rounded-xl mb-3">
                <div class="flex items-center gap-4 overflow-hidden">
                    <div class="w-10 h-10 rounded-lg flex items-center justify-center ${colorClass} shrink-0">
                        <i data-lucide="${icon}" class="w-5 h-5"></i>
                    </div>
                    <div class="flex flex-col min-w-0">
                        <span class="text-sm font-bold text-slate-200 truncate" title="${f.name}">${f.name}</span>
                        <span class="text-xs text-slate-500 uppercase">Материал к уроку</span>
                    </div>
                </div>
                <div class="flex gap-2 shrink-0">
                     ${actionBtn}
                </div>
            </div>
        `;
		})
		.join("");

	block.innerHTML = `<h3 class="text-lg font-bold text-white mb-4 flex items-center gap-2"><i data-lucide="paperclip" class="text-slate-400"></i> Материалы урока</h3><div class="space-y-2">${filesHtml}</div>`;
	container.appendChild(block);
}

// 4. PROFILE FIX (UPDATED: FETCH FROM FIRESTORE)
function initUserProfileFix() {
	const interval = setInterval(() => {
		if (typeof firebase !== "undefined" && firebase.auth()) {
			clearInterval(interval);
			firebase.auth().onAuthStateChanged(async (user) => {
				if (user) {
					const nameEls =
						document.querySelectorAll(".user-display-name");
					const avatarEls =
						document.querySelectorAll(".user-avatar-img");

					let name = user.displayName; // Сначала пробуем имя из Auth

					// Пытаемся достать актуальное имя из базы данных Firestore
					try {
						if (firebase.firestore) {
							const db = firebase.firestore();
							const doc = await db
								.collection("users")
								.doc(user.uid)
								.get();
							if (doc.exists && doc.data().displayName) {
								name = doc.data().displayName;
							}
						}
					} catch (e) {
						console.error("Ошибка получения профиля в аддоне:", e);
					}

					// Если имени нет нигде, берем часть email до собачки
					if (!name) name = user.email.split("@")[0];

					// Обновляем UI
					nameEls.forEach((el) => (el.innerText = name));
					avatarEls.forEach(
						(el) =>
							(el.src = `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(
								name
							)}`)
					);
				}
			});
		}
	}, 500);
}

function renderToolsPage() {
	const container = document.getElementById("tools-content-area");
	if (!container) return;
	container.innerHTML = TOOLS_DB.map(
		(tool) => `
        <a href="${
			tool.url
		}" target="_blank" class="resource-card glass-panel p-6 rounded-2xl border border-white/5 bg-slate-800/40 hover:bg-white/5 group block h-full">
            <div class="flex items-start justify-between mb-4">
                <div class="p-3 bg-indigo-500/20 text-indigo-400 rounded-xl group-hover:scale-110 transition duration-300"><i data-lucide="${
					tool.icon || "link"
				}" class="w-6 h-6"></i></div>
                <i data-lucide="external-link" class="w-5 h-5 text-slate-600 group-hover:text-white transition"></i>
            </div>
            <h3 class="text-xl font-bold text-white mb-2 group-hover:text-indigo-300 transition">${
				tool.title
			}</h3>
            <p class="text-slate-400 text-sm leading-relaxed">${tool.desc}</p>
        </a>
    `
	).join("");
	if (window.lucide) lucide.createIcons();
}

function renderResourcesPage() {
	const container = document.getElementById("resources-content-area");
	if (!container) return;
	container.innerHTML = RESOURCES_DB.map(
		(cat) => `
        <div class="mb-12 animate-fade-in-up">
            <h2 class="text-2xl font-bold text-white mb-6 flex items-center gap-3 pl-2 border-l-4 border-indigo-500">${
				cat.category
			}</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                ${cat.items
					.map(
						(item) => `
                    <a href="${item.url}" target="_blank" class="resource-card flex items-center justify-between p-4 rounded-xl bg-slate-800/50 border border-white/5 hover:border-indigo-500/30 hover:bg-slate-800 transition group">
                        <div class="flex items-center gap-4">
                            <div class="w-8 h-8 rounded-full bg-slate-700/50 flex items-center justify-center text-slate-400 group-hover:text-indigo-400 transition"><i data-lucide="file-text" class="w-4 h-4"></i></div>
                            <span class="text-slate-200 font-medium group-hover:text-white transition">${item.title}</span>
                        </div>
                    </a>
                `
					)
					.join("")}
            </div>
        </div>
    `
	).join("");
	if (window.lucide) lucide.createIcons();
}
