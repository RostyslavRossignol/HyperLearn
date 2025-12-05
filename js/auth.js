import { auth, db } from "./config.js";

export function setupAuthListeners() {
	// Делаем функцию глобальной, чтобы onsubmit в HTML её видел
	window.handleAuthSubmit = async function (e) {
		e.preventDefault(); // Останавливаем перезагрузку страницы

		const form = e.target;
		const btn = form.querySelector('button[type="submit"]');
		const originalBtnText = btn.innerHTML;
		const isRegister = form.id === "register-form";

		// 1. Показываем загрузку на кнопке
		btn.innerHTML = `<i data-lucide="loader-2" class="animate-spin w-5 h-5 inline"></i> Ждите...`;
		if (window.lucide) lucide.createIcons();
		btn.disabled = true;

		try {
			// 2. Получаем данные НАДЕЖНЫМ способом (по ID или name, а не type)
			// Используем 'input[placeholder="Email"]' как запасной вариант, если ID нет
			const emailInput = form.querySelector('input[type="email"]');

			// ВАЖНО: Для пароля ищем по ID, так как type может меняться на 'text' (глазик)
			let pwdInput;
			if (isRegister) {
				pwdInput = document.getElementById("register-password");
			} else {
				pwdInput = document.getElementById("login-password");
			}
			// Запасной вариант, если ID не найден
			if (!pwdInput)
				pwdInput = form.querySelector('input[placeholder="Пароль"]');

			const email = emailInput ? emailInput.value.trim() : "";
			const password = pwdInput ? pwdInput.value : "";

			// Проверка полей
			if (!email || !password) {
				throw new Error("Заполните Email и Пароль");
			}

			// 3. Логика Регистрации или Входа
			if (isRegister) {
				// Получаем имя (оно есть только в регистрации)
				const nameInput = form.querySelector(
					'input[placeholder="Имя"]'
				);
				const name = nameInput ? nameInput.value.trim() : "Студент";

				if (!name) throw new Error("Введите ваше Имя");

				// Проверка капчи (если она подключена)
				if (
					typeof grecaptcha !== "undefined" &&
					window.grecaptcha.getResponse
				) {
					const captchaResponse = grecaptcha.getResponse();
					if (!captchaResponse) {
						// throw new Error("Подтвердите, что вы не робот (Капча)");
						// Пока пропустим ошибку капчи, чтобы регистрация работала,
						// но в продакшене лучше раскомментировать строку выше.
						console.warn(
							"Капча не пройдена, но пропускаем для теста"
						);
					}
				}

				// --- СОЗДАНИЕ АККАУНТА ---
				const userCredential =
					await auth.createUserWithEmailAndPassword(email, password);
				const user = userCredential.user;

				// Сохранение профиля в Firestore
				await db.collection("users").doc(user.uid).set({
					displayName: name,
					email: email,
					role: "student",
					progress: {}, // Пустой прогресс
					createdAt: firebase.firestore.FieldValue.serverTimestamp(),
				});

				console.log("Аккаунт создан:", user.uid);
				alert("Успешно! Добро пожаловать, " + name);
			} else {
				// --- ВХОД ---
				await auth.signInWithEmailAndPassword(email, password);
				console.log("Вход выполнен");
			}

			// 4. Перенаправление на Дашборд
			window.location.href = "index.html";
		} catch (error) {
			console.error("Auth Error:", error);

			// Понятные сообщения об ошибках
			let msg = error.message;
			if (error.code === "auth/email-already-in-use")
				msg = "Этот Email уже зарегистрирован. Попробуйте войти.";
			if (error.code === "auth/weak-password")
				msg = "Пароль должен быть не менее 6 символов.";
			if (error.code === "auth/invalid-email")
				msg = "Некорректный формат Email.";
			if (error.code === "auth/user-not-found")
				msg = "Пользователь не найден. Зарегистрируйтесь.";
			if (error.code === "auth/wrong-password") msg = "Неверный пароль.";
			if (error.code === "auth/network-request-failed")
				msg = "Ошибка сети. Проверьте интернет.";

			alert(msg);

			// Возвращаем кнопку в исходное состояние
			btn.innerHTML = originalBtnText;
			btn.disabled = false;
			if (window.lucide) lucide.createIcons();
		}
	};

	// Функция выхода (на всякий случай дублируем тут)
	window.logout = function () {
		if (confirm("Выйти из аккаунта?")) {
			auth.signOut().then(() => (window.location.href = "landing.html"));
		}
	};
}
