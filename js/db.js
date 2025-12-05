import { db } from "./config.js";

// Загрузка прогресса пользователя
export async function loadUserData(uid) {
	try {
		const doc = await db.collection("users").doc(uid).get();
		if (doc.exists) {
			return doc.data();
		} else {
			return { displayName: "Студент", progress: {} };
		}
	} catch (error) {
		console.error("Ошибка загрузки данных:", error);
		return null;
	}
}

// Сохранение прогресса урока
export async function saveLessonProgress(uid, lessonId, currentProgressObj) {
	const newProgress = { ...currentProgressObj, [lessonId]: true };
	try {
		await db.collection("users").doc(uid).set(
			{
				progress: newProgress,
				lastActiveAt: firebase.firestore.FieldValue.serverTimestamp(),
			},
			{ merge: true }
		);
		return true;
	} catch (error) {
		console.error("Ошибка сохранения:", error);
		throw error;
	}
}
