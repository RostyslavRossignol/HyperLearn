import { auth, db } from "./config.js";

export function setupAuthListeners() {
	// Вход
	window.handleAuthSubmit = async function (e) {
		e.preventDefault();
		const form = e.target;
		const isRegister = form.id === "register-form";

		const email = form.querySelector('input[type="email"]').value;
		const pwd = form.querySelector('input[type="password"]').value;
		const nameInput = form.querySelector('input[type="text"]'); // Только для регистрации

		const btn = form.querySelector('button[type="submit"]');
		const oldText = btn.innerHTML;
		btn.innerHTML = `<i data-lucide="loader-2" class="animate-spin w-5 h-5 inline"></i> Ждите...`;
		if (window.lucide) lucide.createIcons();

		try {
			if (isRegister) {
				if (!nameInput.value) throw new Error("Введите имя");
				const cred = await auth.createUserWithEmailAndPassword(
					email,
					pwd
				);
				// Создаем профиль в БД
				await db.collection("users").doc(cred.user.uid).set({
					displayName: nameInput.value,
					email: email,
					progress: {},
					createdAt: firebase.firestore.FieldValue.serverTimestamp(),
				});
			} else {
				await auth.signInWithEmailAndPassword(email, pwd);
			}
			window.location.href = "index.html"; // Редирект после успеха
		} catch (error) {
			console.error(error);
			alert(translateAuthError(error.code));
			btn.innerHTML = oldText;
		}
	};

	// Выход
	window.logout = function () {
		if (confirm("Выйти из аккаунта?")) {
			auth.signOut().then(() => (window.location.href = "landing.html"));
		}
	};
}

function translateAuthError(code) {
	switch (code) {
		case "auth/user-not-found":
			return "Пользователь не найден";
		case "auth/wrong-password":
			return "Неверный пароль";
		case "auth/email-already-in-use":
			return "Email уже занят";
		case "auth/weak-password":
			return "Пароль слишком простой (мин. 6 символов)";
		default:
			return "Ошибка входа: " + code;
	}
}
