const functions = require("firebase-functions");
const admin = require("firebase-admin");
const { GoogleGenerativeAI } = require("@google/genai");
const cors = require("cors")({ origin: true });

// Инициализация Firebase Admin SDK для доступа к базе данных и Auth
admin.initializeApp();

// !!! ВСТАВЬ СЮДА API КЛЮЧ ОТ GEMINI (AI STUDIO) !!!
// Получить тут: https://aistudio.google.com/app/apikey
const GEMINI_API_KEY = "AIzaSyAGRzczWz_loap7x6uzBNP6pjh6WJa_Xlw";

// Инициализация Gemini
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

// Главная функция, доступная по HTTP-запросу с фронтенда
exports.aiGrade = functions.https.onRequest((req, res) => {
	// CORS необходим для разрешения запросов с твоего сайта
	cors(req, res, async () => {
		// Разрешаем только POST запросы
		if (req.method !== "POST")
			return res.status(405).send("Method Not Allowed");

		const { userId, task, answer } = req.body;

		if (!userId || !answer) {
			return res
				.status(400)
				.send({ error: "Недостаточно данных (userId или answer)" });
		}

		try {
			// 1. Проверяем, авторизован ли пользователь
			const userRecord = await admin.auth().getUser(userId);
			if (!userRecord)
				return res
					.status(401)
					.send({ error: "Пользователь не авторизован" });

			// 2. Формируем промт и обращаемся к Gemini
			const model = genAI.getGenerativeModel({
				model: "gemini-1.5-flash",
			});
			const prompt = `Ты строгий, но справедливый ментор по Data Science. 
      Студент выполнил задание: "${task}".
      Его ответ: "${answer}".
      Оцени ответ, укажи ошибки (если есть) и дай краткий совет. 
      Отвечай на русском языке, используй Markdown.`;

			const result = await model.generateContent(prompt);
			const response = await result.response;
			const text = response.text();

			// 3. Сохраняем результат в базу (Журнал оценок)
			await admin.firestore().collection("grades").add({
				userId,
				task,
				answer,
				aiFeedback: text,
				timestamp: admin.firestore.FieldValue.serverTimestamp(),
			});

			// 4. Отправляем ответ фронтенду
			res.json({ grade: text });
		} catch (error) {
			console.error("AI Error:", error);
			res.status(500).send({
				error: "Ошибка обработки запроса AI. Проверьте ключ API и тариф Blaze.",
			});
		}
	});
});
