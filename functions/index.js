const functions = require("firebase-functions");
const admin = require("firebase-admin");
const { GoogleGenerativeAI } = require("@google/genai");
const cors = require("cors")({ origin: true });

// Инициализация Firebase Admin SDK
admin.initializeApp();

// Твой ключ API (используем тот, что ты прислал последним)
const GEMINI_API_KEY = "AIzaSyAGRzczWz_loap7x6uzBNP6pjh6WJa_Xlw";

// Инициализация Gemini SDK
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

// --- ФУНКЦИЯ 1: ЧАТ С МЕНТОРОМ (onCall) ---
// Используется на странице mentor.html
exports.askMentor = functions.https.onCall(async (data, context) => {
	// Проверка авторизации (встроена в onCall)
	if (!context.auth) {
		throw new functions.https.HttpsError(
			"unauthenticated",
			"Нужна авторизация для общения с ментором."
		);
	}

	const userMessage = data.message;
	if (!userMessage) {
		throw new functions.https.HttpsError(
			"invalid-argument",
			"Пустое сообщение."
		);
	}

	try {
		// Используем ту же модель, что и в Grade (flash быстрее и дешевле)
		const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

		const prompt = `Ты дружелюбный и опытный ментор по Data Science. 
    Отвечай коротко, по делу и с примерами кода, если нужно. 
    Используй Markdown.
    Вопрос студента: "${userMessage}"`;

		const result = await model.generateContent(prompt);
		const response = await result.response;
		const text = response.text();

		return { answer: text };
	} catch (error) {
		console.error("Mentor Error:", error);
		throw new functions.https.HttpsError("internal", "Ошибка AI Ментора.");
	}
});

// --- ФУНКЦИЯ 2: ПРОВЕРКА ДЗ (onRequest) ---
// Используется на странице course.html
exports.aiGrade = functions.https.onRequest((req, res) => {
	cors(req, res, async () => {
		if (req.method !== "POST")
			return res.status(405).send("Method Not Allowed");

		const { userId, task, answer } = req.body;

		if (!userId || !answer) {
			return res.status(400).send({ error: "Нет данных для проверки" });
		}

		try {
			// Проверяем пользователя
			const userRecord = await admin.auth().getUser(userId);
			if (!userRecord)
				return res
					.status(401)
					.send({ error: "Пользователь не найден" });

			const model = genAI.getGenerativeModel({
				model: "gemini-1.5-flash",
			});

			const prompt = `Ты строгий, но справедливый ментор по Data Science. 
            Студент выполнил задание: "${task}".
            Его ответ: "${answer}".
            Оцени ответ (Пройдено/Не пройдено), укажи ошибки и дай совет.
            Отвечай на русском языке, используй Markdown.`;

			const result = await model.generateContent(prompt);
			const response = await result.response;
			const text = response.text();

			// Сохраняем в журнал
			await admin.firestore().collection("grades").add({
				userId,
				task,
				answer,
				aiFeedback: text,
				timestamp: admin.firestore.FieldValue.serverTimestamp(),
			});

			res.json({ grade: text });
		} catch (error) {
			console.error("AI Grade Error:", error);
			res.status(500).send({ error: "Ошибка проверки ДЗ." });
		}
	});
});
