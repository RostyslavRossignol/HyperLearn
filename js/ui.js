// --- Рендеринг "Мои Курсы" ---
export function renderCourseCards(courses, progressData) {
	const grid = document.getElementById("course-selection-grid");
	if (!grid) return;

	grid.innerHTML = "";
	grid.className = "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6";

	grid.innerHTML = courses
		.map((course) => {
			const p = progressData[course.id] || { percent: 0, completed: 0 };
			return `
        <a href="course.html?id=${course.id}" 
           class="group relative overflow-hidden rounded-2xl border border-white/5 bg-slate-800/40 hover:border-${
				course.color
			}-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-${
				course.color
			}-500/10 hover:-translate-y-1 block h-full">
            <div class="absolute inset-0 bg-gradient-to-br from-${
				course.color
			}-500/5 to-transparent opacity-50 group-hover:opacity-100 transition duration-500"></div>
            <div class="relative p-6 flex flex-col h-full">
                <div class="flex justify-between items-start mb-6">
                    <div class="w-14 h-14 rounded-xl bg-${
						course.color
					}-500/20 flex items-center justify-center text-${
				course.color
			}-400 group-hover:scale-110 transition duration-300">
                        <i data-lucide="${course.icon}" class="w-7 h-7"></i>
                    </div>
                    <span class="text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-slate-900/50 text-slate-400 border border-white/5">
                        ${course.modules.length} Модулей
                    </span>
                </div>
                <h3 class="text-2xl font-bold text-white mb-2 leading-tight group-hover:text-${
					course.color
				}-300 transition">${course.title.replace(/КУРС \d+: /, "")}</h3>
                <div class="mt-auto pt-6">
                    <div class="w-full bg-slate-900/50 h-2 rounded-full overflow-hidden border border-white/5">
                        <div class="h-full bg-gradient-to-r from-${
							course.color
						}-600 to-${
				course.color
			}-400 transition-all duration-1000" style="width: ${
				p.percent
			}%"></div>
                    </div>
                </div>
            </div>
        </a>`;
		})
		.join("");
	if (window.lucide) lucide.createIcons();
}

// --- Рендеринг Roadmap (Дашборд) ---
export function renderDashboardRoadmap(coursesDB, userProgress) {
	const container = document.getElementById("roadmap-container");
	if (!container) return;

	container.innerHTML = "";
	const courseOrder = ["python", "algo", "stats", "ml", "dl", "career"];

	let html = courseOrder
		.map((key, index) => {
			const course = coursesDB[key];
			let total = 0,
				completed = 0;
			course.modules.forEach((m) =>
				m.lessons.forEach((l) => {
					total++;
					if (userProgress[l.id]) completed++;
				})
			);
			const percent = total ? Math.round((completed / total) * 100) : 0;
			const stepNum = index + 1;

			return `
            <div class="flex items-center">
                <a href="course.html?id=${key}" class="roadmap-step group block glass-card p-5 rounded-2xl border border-white/5 hover:bg-white/5 transition hover:-translate-y-1 hover:shadow-xl hover:shadow-${
				course.color
			}-500/10">
                    <div class="flex justify-between items-start mb-4">
                        <div class="w-12 h-12 rounded-xl bg-${
							course.color
						}-500/20 flex items-center justify-center text-${
				course.color
			}-400 group-hover:scale-110 transition">
                            <i data-lucide="${course.icon}" class="w-6 h-6"></i>
                        </div>
                        <span class="text-[10px] font-bold text-slate-500 bg-slate-900/50 px-2 py-1 rounded-lg border border-white/5">ШАГ ${stepNum}</span>
                    </div>
                    <h4 class="text-lg font-bold text-white mb-1 group-hover:text-${
						course.color
					}-300 transition">${
				course.title.split(": ")[1] || course.title
			}</h4>
                    <p class="text-xs text-slate-400 mb-4 line-clamp-2">Прогресс: ${percent}%</p>
                    <div class="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                         <div class="h-full bg-${
								course.color
							}-500 transition-all duration-1000" style="width: ${percent}%"></div>
                    </div>
                </a>
                ${
					index < courseOrder.length - 1
						? `<div class="mx-4 text-slate-600"><i data-lucide="arrow-right" class="w-6 h-6"></i></div>`
						: ""
				}
            </div>
        `;
		})
		.join("");

	container.innerHTML = html;
	if (window.lucide) lucide.createIcons();
}

// --- Обновление Имени (В сайдбаре и в заголовке) ---
export function updateUserDisplay(name) {
	const safeName = name ? name.split(" ")[0] : "Студент";

	// 1. Имя в сайдбаре
	document
		.querySelectorAll(".user-display-name")
		.forEach((el) => (el.innerText = safeName));

	// 2. Аватар
	const seed = name || "HyperLearn";
	document
		.querySelectorAll(".user-avatar-img")
		.forEach(
			(img) =>
				(img.src = `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(
					seed
				)}`)
		);

	// 3. Приветствие на Дашборде (Привет, Имя!)
	const greetingEl = document.querySelector(".user-greeting");
	if (greetingEl) {
		// Ищем текст внутри (чтобы не стереть иконки если они есть) или заменяем полностью
		greetingEl.innerHTML = `Привет, ${safeName}! 👋`;
	}
}

// --- Рендеринг Списка Уроков ---
export function renderLessonList(
	modules,
	userProgress,
	activeLessonId,
	onLessonClick,
	allLessonsFlat
) {
	const list = document.getElementById("sidebar-list");
	if (!list) return;
	list.innerHTML = "";
	list.classList.add("custom-scrollbar"); // Скролл

	modules.forEach((mod) => {
		const modTitle = document.createElement("div");
		modTitle.className =
			"flex items-center gap-3 px-4 py-3 mt-6 mb-2 text-xs font-extrabold text-slate-500 uppercase tracking-widest border-b border-white/5 select-none";
		modTitle.innerHTML = `<span class="w-1.5 h-1.5 rounded-full bg-indigo-500"></span> ${mod.title}`;
		list.appendChild(modTitle);

		mod.lessons.forEach((lesson) => {
			const isDone = !!userProgress[lesson.id];
			const currentIndex = allLessonsFlat.findIndex(
				(l) => l.id === lesson.id
			);
			const prevLesson =
				currentIndex > 0 ? allLessonsFlat[currentIndex - 1] : null;
			const isPrevDone = prevLesson
				? !!userProgress[prevLesson.id]
				: true;
			const isUnlocked = isPrevDone || isDone;

			const btn = document.createElement("button");
			let stateClasses = isUnlocked
				? lesson.id === activeLessonId
					? "bg-indigo-600 text-white shadow-lg"
					: isDone
					? "text-slate-400 hover:text-white"
					: "text-slate-300 hover:text-white hover:bg-white/5"
				: "opacity-40 cursor-not-allowed text-slate-500";

			let iconHtml =
				lesson.id === activeLessonId
					? `<i data-lucide="play" class="w-3 h-3 fill-white"></i>`
					: isDone
					? `<i data-lucide="check" class="w-3 h-3 text-green-400"></i>`
					: isUnlocked
					? `<div class="w-2 h-2 rounded-full bg-slate-500"></div>`
					: `<i data-lucide="lock" class="w-3 h-3"></i>`;

			btn.className = `w-full text-left px-4 py-3 rounded-xl flex items-center gap-4 transition-all duration-200 border border-transparent mx-1 mb-1 group ${stateClasses}`;
			btn.innerHTML = `<div class="shrink-0 w-6 flex justify-center">${iconHtml}</div><span class="text-sm font-medium leading-tight">${lesson.title}</span>`;

			if (isUnlocked) btn.onclick = () => onLessonClick(lesson);
			list.appendChild(btn);
		});
	});

	if (window.lucide) lucide.createIcons();
	setTimeout(() => {
		const active = list.querySelector(".bg-indigo-600");
		if (active)
			active.scrollIntoView({ behavior: "auto", block: "center" });
	}, 100);
}