import { functions, auth } from "./config.js";

export async function sendMentorMessage(message, chatContainerId) {
	const container = document.getElementById(chatContainerId);
	if (!container || !message.trim()) return;

	// 1. Рисуем сообщение пользователя
	appendMessage(container, message, "user");

	// 2. Показываем индикатор загрузки
	const loadingId = appendLoading(container);

	try {
		// 3. Вызываем нашу Cloud Function (Secure)
		const askMentor = functions.httpsCallable("askMentor");
		const result = await askMentor({ message: message });

		// 4. Удаляем загрузку и показываем ответ
		removeLoading(loadingId);
		appendMessage(container, result.data.answer, "ai");
	} catch (error) {
		removeLoading(loadingId);
		console.error("Mentor Error:", error);
		appendMessage(
			container,
			"Извините, сейчас я не могу ответить. Попробуйте позже.",
			"error"
		);
	}
}

function appendMessage(container, text, type) {
	const isUser = type === "user";
	const isError = type === "error";

	const div = document.createElement("div");
	div.className = `flex mb-6 ${isUser ? "justify-end" : ""}`;

	let contentClass = isUser
		? "bg-indigo-600 text-white rounded-2xl rounded-tr-sm"
		: isError
		? "bg-red-500/10 border border-red-500/20 text-red-200 rounded-2xl"
		: "bg-slate-800 border border-white/5 text-slate-300 rounded-2xl rounded-tl-sm";

	// Для AI используем Markdown парсинг
	const contentHtml =
		type === "ai" && typeof marked !== "undefined"
			? marked.parse(text)
			: text;

	div.innerHTML = `
        <div class="p-4 max-w-[85%] md:max-w-[70%] text-sm leading-relaxed shadow-lg ${contentClass} prose prose-invert">
            ${contentHtml}
        </div>
    `;

	container.appendChild(div);
	container.scrollTop = container.scrollHeight;
}

function appendLoading(container) {
	const id = "loading-" + Date.now();
	const div = document.createElement("div");
	div.id = id;
	div.className = "flex mb-4";
	div.innerHTML = `
        <div class="bg-slate-800 border border-white/5 rounded-2xl rounded-tl-sm p-4 flex items-center gap-3">
            <div class="w-2 h-2 bg-indigo-500 rounded-full animate-bounce"></div>
            <div class="w-2 h-2 bg-indigo-500 rounded-full animate-bounce" style="animation-delay: 0.1s"></div>
            <div class="w-2 h-2 bg-indigo-500 rounded-full animate-bounce" style="animation-delay: 0.2s"></div>
        </div>
    `;
	container.appendChild(div);
	container.scrollTop = container.scrollHeight;
	return id;
}

function removeLoading(id) {
	const el = document.getElementById(id);
	if (el) el.remove();
}
