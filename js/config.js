// Настройки Firebase
const firebaseConfig = {
	apiKey: "AIzaSyCKwgCH8cwLzR_QU9e2AuC5-Y_qzgd-2H8",
	authDomain: "hyperlearn-564f7.firebaseapp.com",
	projectId: "hyperlearn-564f7",
	storageBucket: "hyperlearn-564f7.firebasestorage.app",
	messagingSenderId: "269014515504",
	appId: "1:269014515504:web:2d67d6cf9b07bbdc00d2f5",
};

// Инициализация (проверяем, чтобы не инициализировать дважды)
if (typeof firebase !== "undefined" && !firebase.apps.length) {
	firebase.initializeApp(firebaseConfig);
} else if (typeof firebase === "undefined") {
	console.error(
		"Firebase SDK не загружен! Проверьте подключение скриптов в HTML."
	);
}

// Экспортируем сервисы для использования в других файлах
export const auth = firebase.auth();
export const db = firebase.firestore();
export const functions = firebase.functions(); // Для вызова Cloud Functions
