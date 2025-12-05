/* --- script.js (ФИНАЛЬНАЯ РАБОЧАЯ ВЕРСИЯ: Все FIX) --- */

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
if (typeof firebase !== "undefined") {
	firebase.initializeApp(firebaseConfig);
	auth = firebase.auth();
	db = firebase.firestore();
}

let currentUser = null;
let userProgress = {};
let userName = "Студент"; 
const DEFAULT_VIDEO = "x04T6UnOxJI";
const AI_GRADE_ENDPOINT = "/api/ai-grade"; 

// 2. ПОЛНАЯ БАЗА ДАННЫХ (COURSES_DB) - ВКЛЮЧАЕТ ВСЕ 12 МОДУЛЕЙ PYTHON
const COURSES_DB = {
	python: {
		title: "КУРС 1: Python для Data Science",
		color: "indigo",
		icon: "code-2",
		nextCourseId: "algo",
		modules: [
			{
				title: "Модуль 0: Введение",
				lessons: [
					{ id: "py_0_1", title: "0.1 Python в ML", videoId: DEFAULT_VIDEO },
					{ id: "py_0_2", title: "0.2 Анализ изображений", videoId: DEFAULT_VIDEO },
				],
			},
			{
				title: "Модуль 1: Основы Python",
				lessons: [
					{ id: "py_1_1", title: "1.1 Переменные", videoId: DEFAULT_VIDEO },
					{ id: "py_1_2", title: "1.2 Типы данных", videoId: DEFAULT_VIDEO },
					{ id: "py_1_3", title: "1.3 Циклы 1", videoId: DEFAULT_VIDEO },
					{ id: "py_1_4", title: "1.4 Циклы 2", videoId: DEFAULT_VIDEO },
					{ id: "py_1_5", title: "1.5 Условия If/Else", videoId: DEFAULT_VIDEO },
				],
			},
			{
				title: "Модуль 2: Структуры данных и функции",
				lessons: [
					{ id: "py_2_1", title: "2.1 Функции в python", videoId: DEFAULT_VIDEO },
					{ id: "py_2_2", title: "2.2 Аргументы функции", videoId: DEFAULT_VIDEO },
					{ id: "py_2_3", title: "2.3 Call stack и ошибки", videoId: DEFAULT_VIDEO },
					{ id: "py_2_4", title: "2.4 Ссылочная модель данных", videoId: DEFAULT_VIDEO },
					{ id: "py_2_5", title: "2.5 Модель памяти в python", videoId: DEFAULT_VIDEO },
					{ id: "py_2_6", title: "2.6 Изменяемые/неизменяемые типы", videoId: DEFAULT_VIDEO },
					{ id: "py_2_7", title: "2.7 Срезы и строки", videoId: DEFAULT_VIDEO },
				],
			},
			{
				title: "Модуль 3: Окружение",
				lessons: [
					{ id: "py_3_0", title: "3.0 Интро", videoId: DEFAULT_VIDEO },
					{ id: "py_3_1", title: "3.1 Библиотеки", videoId: DEFAULT_VIDEO },
					{ id: "py_3_2", title: "3.2 Установка Anaconda (Win 10)", videoId: DEFAULT_VIDEO },
					{ id: "py_3_3", title: "3.3 Установка Anaconda (Linux)", videoId: DEFAULT_VIDEO },
					{ id: "py_3_4", title: "3.4 Установка Anaconda (MacOS)", videoId: DEFAULT_VIDEO },
					{ id: "py_3_5", title: "3.5 Установка сторонних пакетов", videoId: DEFAULT_VIDEO },
					{ id: "py_3_6", title: "3.6 Виртуальное окружение", videoId: DEFAULT_VIDEO },
					{ id: "py_3_7", title: "3.7 Итоги", videoId: DEFAULT_VIDEO },
				],
			},
			{
				title: "Модуль 4: Инструменты (Jupyter, Numpy)",
				lessons: [
					{ id: "py_4_1", title: "4.1 Введение", videoId: DEFAULT_VIDEO },
					{ id: "py_4_2", title: "4.2 Jupyter. Ячейки", videoId: DEFAULT_VIDEO },
					{ id: "py_4_3", title: "4.3 Jupyter. Горячие клавиши", videoId: DEFAULT_VIDEO },
					{ id: "py_4_4", title: "4.4 Jupyter. Магические команды", videoId: DEFAULT_VIDEO },
					{ id: "py_4_5", title: "4.5 Jupyter. Kernel", videoId: DEFAULT_VIDEO },
					{ id: "py_4_6", title: "4.6 Numpy", videoId: DEFAULT_VIDEO },
					{ id: "py_4_7", title: "4.7 Pandas", videoId: DEFAULT_VIDEO },
					{ id: "py_4_8", title: "4.8 Matplotlib", videoId: DEFAULT_VIDEO },
					{ id: "py_4_9", title: "4.9 Заключение", videoId: DEFAULT_VIDEO },
				],
			},
			{
				title: "Модуль 5: Pandas (Обработка данных)",
				lessons: [
					{ id: "py_5_1", title: "5.1 Чтение файлов и обзор данных", videoId: DEFAULT_VIDEO },
					{ id: "py_5_2", title: "5.2 Фильтрация данных", videoId: DEFAULT_VIDEO },
					{ id: "py_5_3", title: "5.3 Функции фильтры", videoId: DEFAULT_VIDEO },
					{ id: "py_5_4", title: "5.4 Series и Index", videoId: DEFAULT_VIDEO },
					{ id: "py_5_5", title: "5.5 Группировка данных", videoId: DEFAULT_VIDEO },
					{ id: "py_5_6", title: "5.6 Работа с датами и временем", videoId: DEFAULT_VIDEO },
					{ id: "py_5_7", title: "5.7 Визуализация", videoId: DEFAULT_VIDEO },
					{ id: "py_5_8", title: "5.8 Сохранение данных", videoId: DEFAULT_VIDEO },
				],
			},
			{
				title: "Модуль 6: SQL и Базы данных",
				lessons: [
					{ id: "py_6_1", title: "6.1 Базы данных и СУБД", videoId: DEFAULT_VIDEO },
					{ id: "py_6_2", title: "6.2 Основные SQL запросы", videoId: DEFAULT_VIDEO },
					{ id: "py_6_3", title: "6.3 Объединение таблиц JOIN", videoId: DEFAULT_VIDEO },
					{ id: "py_6_4", title: "6.4 SQL в Python", videoId: DEFAULT_VIDEO },
				],
			},
			{
				title: "Модуль 7: ООП",
				lessons: [
					{ id: "py_7_1", title: "7.1 Классы, объекты и методы", videoId: DEFAULT_VIDEO },
					{ id: "py_7_2", title: "7.2 Принципы ООП Часть 1", videoId: DEFAULT_VIDEO },
					{ id: "py_7_3", title: "7.3 Принципы ООП Часть 2", videoId: DEFAULT_VIDEO },
				],
			},
			{
				title: "Модуль 8: Git",
				lessons: [
					{ id: "py_8_1", title: "8.1 Введение в git", videoId: DEFAULT_VIDEO },
					{ id: "py_8_2", title: "8.2 Ветки и теги", videoId: DEFAULT_VIDEO },
					{ id: "py_8_3", title: "8.3 Git diff. Ветвление. Тэги", videoId: DEFAULT_VIDEO },
					{ id: "py_8_4", title: "8.4 Слияние веток", videoId: DEFAULT_VIDEO },
					{ id: "py_8_5", title: "8.5 Конфликт слияния веток", videoId: DEFAULT_VIDEO },
					{ id: "py_8_6", title: "8.6 Стратегии ветвления", videoId: DEFAULT_VIDEO },
					{ id: "py_8_7", title: "8.7 Remotes. Загрузка репозитория", videoId: DEFAULT_VIDEO },
				],
			},
			{
				title: "Модуль 9: Backend (FastAPI)",
				lessons: [
					{ id: "py_9_1", title: "9.1 Запрос на сервер", videoId: DEFAULT_VIDEO },
					{ id: "py_9_2", title: "9.2 Ответ сервера API", videoId: DEFAULT_VIDEO },
					{ id: "py_9_3", title: "9.3 Практика: Метод GET", videoId: DEFAULT_VIDEO },
					{ id: "py_9_4", title: "9.4 Практика: Метод POST. БД. Валидация", videoId: DEFAULT_VIDEO },
					{ id: "py_9_5", title: "9.5 Подводные камни валидации", videoId: DEFAULT_VIDEO },
					{ id: "py_9_6", title: "9.6 Статус коды", videoId: DEFAULT_VIDEO },
				],
			},
			{
				title: "Модуль 10: ORM (SQLAlchemy)",
				lessons: [
					{ id: "py_10_1", title: "10.1 FastAPI и SQLAlchemy", videoId: DEFAULT_VIDEO },
					{ id: "py_10_2", title: "10.2 ORM, SQLAlchemy", videoId: DEFAULT_VIDEO },
				],
			},
			{
				title: "Модуль 11: Airflow (Data Engineering)",
				lessons: [
					{ id: "py_11_1", title: "11.1 Введение", videoId: DEFAULT_VIDEO },
					{ id: "py_11_2", title: "11.2 Устройство Airflow", videoId: DEFAULT_VIDEO },
					{ id: "py_11_3", title: "11.3 Запуск и веб интерфейс", videoId: DEFAULT_VIDEO },
					{ id: "py_11_4", title: "11.4 Python operator", videoId: DEFAULT_VIDEO },
					{ id: "py_11_5", title: "11.5 Передача информации", videoId: DEFAULT_VIDEO },
					{ id: "py_11_6", title: "11.6 Connections", videoId: DEFAULT_VIDEO },
					{ id: "py_11_7", title: "11.7 Лучшие практики", videoId: DEFAULT_VIDEO },
				],
			},
			{
				title: "Модуль 12: Best Practices",
				lessons: [
					{ id: "py_12_1", title: "12.1 Шаблон приложения", videoId: DEFAULT_VIDEO },
					{ id: "py_12_2", title: "12.2 Переменные окружения", videoId: DEFAULT_VIDEO },
					{ id: "py_12_3", title: "12.3 Проблема SQL инъекций", videoId: DEFAULT_VIDEO },
					{ id: "py_12_4", title: "12.4 Вынесение настроек в конфиг", videoId: DEFAULT_VIDEO },
					{ id: "py_12_5", title: "12.5 Разделение кода на модули", videoId: DEFAULT_VIDEO },
					{ id: "py_12_6", title: "12.6 Идемпотентность", videoId: DEFAULT_VIDEO },
				],
			},
		],
	},
	algo: {
		title: "КУРС 2: Алгоритмы и Структуры Данных",
		color: "blue",
		icon: "cpu",
		nextCourseId: "stats",
		modules: [
			{
				title: "Модуль 1: Введение",
				lessons: [
					{ id: "alg_1_1", title: "1.1 Что спрашивают на собеседованиях", videoId: DEFAULT_VIDEO },
				],
			},
			{
				title: "Модуль 2: Сложность алгоритмов",
				lessons: [
					{ id: "alg_2_1", title: "2.1 Сложность и «О» нотация", videoId: DEFAULT_VIDEO },
					{ id: "alg_2_2", title: "2.2 Оценка сложности", videoId: DEFAULT_VIDEO },
					{ id: "alg_2_3", title: "2.3 Правила 1", videoId: DEFAULT_VIDEO },
					{ id: "alg_2_4", title: "2.4 Амортизированная сложность", videoId: DEFAULT_VIDEO },
					{ id: "alg_2_5", title: "2.5 Правила 2", videoId: DEFAULT_VIDEO },
					{ id: "alg_2_6", title: "2.6 Нетривиальные задачи", videoId: DEFAULT_VIDEO },
				],
			},
			{
				title: "Модуль 3: Базовые структуры (Списки)",
				lessons: [
					{ id: "alg_3_1", title: "3.1 Массивы и указатели", videoId: DEFAULT_VIDEO },
					{ id: "alg_3_2", title: "3.2 Задача: контейнер с водой", videoId: DEFAULT_VIDEO },
					{ id: "alg_3_3", title: "3.3 Связные списки", videoId: DEFAULT_VIDEO },
					{ id: "alg_3_4", title: "3.4 Граничные условия", videoId: DEFAULT_VIDEO },
				],
			},
			{
				title: "Модуль 4: Деревья и Графы",
				lessons: [
					{ id: "alg_4_1", title: "4.1 Основные определения графов", videoId: DEFAULT_VIDEO },
					{ id: "alg_4_2", title: "4.2 Обход в ширину и глубину (BFS/DFS)", videoId: DEFAULT_VIDEO },
					{ id: "alg_4_3", title: "4.3 Компонента связности", videoId: DEFAULT_VIDEO },
					{ id: "alg_4_4", title: "4.4 Деревья. Определения", videoId: DEFAULT_VIDEO },
					{ id: "alg_4_5", title: "4.5 Кучи и сортировка кучей", videoId: DEFAULT_VIDEO },
				],
			},
			{
				title: "Модуль 5: Алгоритмические подходы",
				lessons: [
					{ id: "alg_5_1", title: "5.1 Общий подход к рекурсии", videoId: DEFAULT_VIDEO },
					{ id: "alg_5_2", title: "5.2 Динамическое программирование", videoId: DEFAULT_VIDEO },
					{ id: "alg_5_3", title: "5.3 Разделяй и властвуй", videoId: DEFAULT_VIDEO },
				],
			},
		],
	},
	stats: {
		title: "КУРС 3: Математическая статистика и A/B тесты",
		color: "green",
		icon: "bar-chart-2",
		nextCourseId: "ml",
		modules: [
			{
				title: "Модуль 1: Теория вероятностей",
				lessons: [
					{ id: "st_1_1", title: "1.1 Статистика в ML", videoId: DEFAULT_VIDEO },
					{ id: "st_1_2", title: "1.2 Введение в теорию вероятностей", videoId: DEFAULT_VIDEO },
					{ id: "st_1_3", title: "1.3 Формула Байеса", videoId: DEFAULT_VIDEO },
					{ id: "st_1_4", title: "1.4 Введение в статистику", videoId: DEFAULT_VIDEO },
					{ id: "st_1_5", title: "1.5 Дискретные распределения", videoId: DEFAULT_VIDEO },
				],
			},
			{
				title: "Модуль 2: Доверительные интервалы",
				lessons: [
					{ id: "st_2_1", title: "2.1 Для чего нужны ДИ", videoId: DEFAULT_VIDEO },
					{ id: "st_2_2", title: "2.2 Построение доверительных интервалов", videoId: DEFAULT_VIDEO },
					{ id: "st_2_3", title: "2.3 Виды распределений", videoId: DEFAULT_VIDEO },
					{ id: "st_2_4", title: "2.4 Центральная предельная теорема ЦПТ", videoId: DEFAULT_VIDEO },
					{ id: "st_2_5", title: "2.5 Применение ЦПТ", videoId: DEFAULT_VIDEO },
					{ id: "st_2_6", title: "2.6 Доверительный интервал для доли", videoId: DEFAULT_VIDEO },
				],
			},
			{
				title: "Модуль 3: Корреляция",
				lessons: [
					{ id: "st_3_1", title: "3.1 Статистики распределений, взаимосвязь", videoId: DEFAULT_VIDEO },
				],
			},
			{
				title: "Модуль 4: Проверка гипотез",
				lessons: [
					{ id: "st_4_1", title: "4.1 Проверка гипотез, критерии", videoId: DEFAULT_VIDEO },
				],
			},
			{
				title: "Модуль 5: Непараметрические критерии",
				lessons: [
					{ id: "st_5_1", title: "5.1 Непараметрические критерии", videoId: DEFAULT_VIDEO },
				],
			},
			{
				title: "Модуль 6: MLE (Maximum Likelihood Estimation)",
				lessons: [
					{ id: "st_6_1", title: "6.1 Метод максимума правдоподобия", videoId: DEFAULT_VIDEO },
				],
			},
			{
				title: "Модуль 7: Дизайн тестов",
				lessons: [
					{ id: "st_7_1", title: "7.1 Дизайн AB эксперимента", videoId: DEFAULT_VIDEO },
				],
			},
			{
				title: "Модуль 8: Валидация",
				lessons: [
					{ id: "st_8_1", title: "8.1 AA эксперименты и валидация", videoId: DEFAULT_VIDEO },
				],
			},
			{
				title: "Модуль 9: Ошибки",
				lessons: [
					{ id: "st_9_1", title: "9.1 Ошибки при проведении AB тестов", videoId: DEFAULT_VIDEO },
				],
			},
			{
				title: "Модуль 10: Чувствительность метрик",
				lessons: [
					{ id: "st_10_1", title: "10.1 Уменьшение дисперсии. Поправка Cuped", videoId: DEFAULT_VIDEO },
					{ id: "st_10_2", title: "10.2 Сравнение изменений числа кликов и CTR", videoId: DEFAULT_VIDEO },
				],
			},
			{
				title: "Модуль 11: Ограничения",
				lessons: [
					{ id: "st_11_1", title: "11.1 Невозможность проведения AB тестов", videoId: DEFAULT_VIDEO },
				],
			},
		],
	},
	ml: {
		title: "КУРС 4: Classic Machine Learning",
		color: "pink",
		icon: "brain-circuit",
		nextCourseId: "dl",
		modules: [
			{
				title: "Модуль 1: Введение",
				lessons: [
					{ id: "ml_1_1", title: "1.1 Задачи машинного обучения", videoId: DEFAULT_VIDEO },
					{ id: "ml_1_2", title: "1.2 Основные виды ML", videoId: DEFAULT_VIDEO },
					{ id: "ml_1_3", title: "1.3 Компоненты классической ML-задачи", videoId: DEFAULT_VIDEO },
					{ id: "ml_1_4", title: "1.4 Практика", videoId: DEFAULT_VIDEO },
				],
			},
			{
				title: "Модуль 2: Метрики",
				lessons: [
					{ id: "ml_2_1", title: "2.1 Оценка качества модели", videoId: DEFAULT_VIDEO },
					{ id: "ml_2_2", title: "2.2 Понятие функции", videoId: DEFAULT_VIDEO },
					{ id: "ml_2_3", title: "2.3 Функция потерь Loss function", videoId: DEFAULT_VIDEO },
					{ id: "ml_2_4", title: "2.4 Функционал качества и метрика", videoId: DEFAULT_VIDEO },
					{ id: "ml_2_5", title: "2.5 MSE и MAE", videoId: DEFAULT_VIDEO },
					{ id: "ml_2_6", title: "2.6 Практика", videoId: DEFAULT_VIDEO },
				],
			},
			{
				title: "Модуль 3: Линейная регрессия",
				lessons: [
					{ id: "ml_3_1", title: "3.1 Линейные модели в МО", videoId: DEFAULT_VIDEO },
					{ id: "ml_3_2", title: "3.2 Экстремумы и производная функции", videoId: DEFAULT_VIDEO },
					{ id: "ml_3_3", title: "3.3 Линейная регрессия OLS", videoId: DEFAULT_VIDEO },
					{ id: "ml_3_4", title: "3.4 Ликбез: Матрицы", videoId: DEFAULT_VIDEO },
					{ id: "ml_3_5", title: "3.5 Работа с массивами в Numpy", videoId: DEFAULT_VIDEO },
					{ id: "ml_3_6", title: "3.6 OLS Матричная форма", videoId: DEFAULT_VIDEO },
					{ id: "ml_3_7", title: "3.7 Линейная регрессия в Python. Практика", videoId: DEFAULT_VIDEO },
				],
			},
			{
				title: "Модуль 4: Градиентный спуск",
				lessons: [
					{ id: "ml_4_1", title: "4.1 Введение в градиентный спуск (1 пер.)", videoId: DEFAULT_VIDEO },
					{ id: "ml_4_2", title: "4.2 Минимизация функции (неск. пер.)", videoId: DEFAULT_VIDEO },
					{ id: "ml_4_3", title: "4.3 Линейная регрессия. Подбор параметров", videoId: DEFAULT_VIDEO },
					{ id: "ml_4_4", title: "4.4 Настройка параметров графика", videoId: DEFAULT_VIDEO },
					{ id: "ml_4_5", title: "4.5 Изображение градиентного спуска", videoId: DEFAULT_VIDEO },
				],
			},
			{
				title: "Модуль 5: Валидация",
				lessons: [
					{ id: "ml_5_1", title: "5.1 Обобщающая способность, кросс-валидация", videoId: DEFAULT_VIDEO },
					{ id: "ml_5_2", title: "5.2 Практика: Переобучение и недообучение", videoId: DEFAULT_VIDEO },
					{ id: "ml_5_3", title: "5.3 Кросс-валидация. Пример", videoId: DEFAULT_VIDEO },
				],
			},
			{
				title: "Модуль 6: Регуляризация",
				lessons: [
					{ id: "ml_6_1", title: "6.1 Проблема переобучения", videoId: DEFAULT_VIDEO },
					{ id: "ml_6_2", title: "6.2 Регуляризация и масштабирование", videoId: DEFAULT_VIDEO },
					{ id: "ml_6_3", title: "6.3 Ликбез: Условный экстремум", videoId: DEFAULT_VIDEO },
					{ id: "ml_6_4", title: "6.4 Практика 1. Регуляризация", videoId: DEFAULT_VIDEO },
					{ id: "ml_6_5", title: "6.5 Мультиколлинеарность", videoId: DEFAULT_VIDEO },
					{ id: "ml_6_6", title: "6.6 Практика 2. Мультиколлинеарность", videoId: DEFAULT_VIDEO },
				],
			},
			{
				title: "Модуль 7: Отбор признаков",
				lessons: [
					{ id: "ml_7_1", title: "7.1 EDA", videoId: DEFAULT_VIDEO },
					{ id: "ml_7_2", title: "7.2 Встроенные методы", videoId: DEFAULT_VIDEO },
					{ id: "ml_7_3", title: "7.3 Метод обёртки", videoId: DEFAULT_VIDEO },
					{ id: "ml_7_4", title: "7.4 Метод фильтрации", videoId: DEFAULT_VIDEO },
				],
			},
			{
				title: "Модуль 8: Работа с данными (Feature Engineering)",
				lessons: [
					{ id: "ml_8_1", title: "8.1 Работа с пропущенными значениями", videoId: DEFAULT_VIDEO },
					{ id: "ml_8_2", title: "8.2 Работа с выбросами", videoId: DEFAULT_VIDEO },
					{ id: "ml_8_3", title: "8.3 Выделение признаков из текста. TF-IDF", videoId: DEFAULT_VIDEO },
					{ id: "ml_8_4", title: "8.4 Лемматизация и стемминг", videoId: DEFAULT_VIDEO },
				],
			},
			{
				title: "Модуль 9: Проект Housing Market",
				lessons: [
					{ id: "ml_9_1", title: "9.1 Обработка вещественных признаков", videoId: DEFAULT_VIDEO },
					{ id: "ml_9_2", title: "9.2 Обработка категориальных признаков", videoId: DEFAULT_VIDEO },
					{ id: "ml_9_3", title: "9.3 Построение модели", videoId: DEFAULT_VIDEO },
					{ id: "ml_9_4", title: "9.4 Анализ выбросов", videoId: DEFAULT_VIDEO },
					{ id: "ml_9_5", title: "9.5 Сегментация данных", videoId: DEFAULT_VIDEO },
				],
			},
			{
				title: "Модуль 10: Линейная классификация",
				lessons: [
					{ id: "ml_10_1", title: "10.1 Бинарная классификация", videoId: DEFAULT_VIDEO },
					{ id: "ml_10_2", title: "10.2 Как строить разделяющую гиперплоскость", videoId: DEFAULT_VIDEO },
					{ id: "ml_10_3", title: "10.3 Ликбез: Метод верхней оценки", videoId: DEFAULT_VIDEO },
					{ id: "ml_10_4", title: "10.4 Практика. Линейная бинарная классификация", videoId: DEFAULT_VIDEO },
				],
			},
			{
				title: "Модуль 11: Матрица ошибок",
				lessons: [
					{ id: "ml_11_1", title: "11.1 Метрики бинарной классификации. Теория", videoId: DEFAULT_VIDEO },
					{ id: "ml_11_2", title: "11.2 Метрики бинарной классификации. Практика", videoId: DEFAULT_VIDEO },
				],
			},
			{
				title: "Модуль 12: Качество классификации",
				lessons: [
					{ id: "ml_12_1", title: "12.1 ROC кривая AUC ROC", videoId: DEFAULT_VIDEO },
					{ id: "ml_12_2", title: "12.2 PR кривая AUC PR. Практика", videoId: DEFAULT_VIDEO },
					{ id: "ml_12_3", title: "12.3 Калибровочная кривая модели", videoId: DEFAULT_VIDEO },
				],
			},
			{
				title: "Модуль 13: SVM",
				lessons: [
					{ id: "ml_13_1", title: "13.1 Метод опорных векторов SVM", videoId: DEFAULT_VIDEO },
					{ id: "ml_13_2", title: "13.2 Линейная неразделимость - регуляризация", videoId: DEFAULT_VIDEO },
					{ id: "ml_13_3", title: "13.3 Практика", videoId: DEFAULT_VIDEO },
				],
			},
			{
				title: "Модуль 14: Многоклассовая классификация",
				lessons: [
					{ id: "ml_14_1", title: "14.1 Методы one vs all и one vs one", videoId: DEFAULT_VIDEO },
					{ id: "ml_14_2", title: "14.2 Метрики качества", videoId: DEFAULT_VIDEO },
					{ id: "ml_14_3", title: "14.3 Практика. Задача сегментации клиентов", videoId: DEFAULT_VIDEO },
				],
			},
			{
				title: "Модуль 15: Понижение размерности",
				lessons: [
					{ id: "ml_15_1", title: "15.1 Понижение размерности. Постановка задачи", videoId: DEFAULT_VIDEO },
					{ id: "ml_15_2", title: "15.2 Метод главных компонент (PCA)", videoId: DEFAULT_VIDEO },
					{ id: "ml_15_3", title: "15.3 T-SNE", videoId: DEFAULT_VIDEO },
					{ id: "ml_15_4", title: "15.4 Практика", videoId: DEFAULT_VIDEO },
				],
			},
			{
				title: "Модуль 16: KNN",
				lessons: [
					{ id: "ml_16_1", title: "16.1 Метод K ближайших соседей", videoId: DEFAULT_VIDEO },
					{ id: "ml_16_2", title: "16.2 Практика. Сравнение с регрессией", videoId: DEFAULT_VIDEO },
					{ id: "ml_16_3", title: "16.3 Гиперпараметры p и h. Перевзвешивание", videoId: DEFAULT_VIDEO },
					{ id: "ml_16_4", title: "16.4 Практика. Гауссовское ядро", videoId: DEFAULT_VIDEO },
				],
			},
			{
				title: "Модуль 17: Решающие деревья",
				lessons: [
					{ id: "ml_17_1", title: "17.1 Введение в решающие деревья", videoId: DEFAULT_VIDEO },
					{ id: "ml_17_2", title: "17.2 Критерии качества и информативности", videoId: DEFAULT_VIDEO },
					{ id: "ml_17_3", title: "17.3 Критерии останова и жадный алгоритм", videoId: DEFAULT_VIDEO },
					{ id: "ml_17_4", title: "17.4 Практика", videoId: DEFAULT_VIDEO },
				],
			},
			{
				title: "Модуль 18: Переобучение деревьев",
				lessons: [
					{ id: "ml_18_1", title: "18.1 Решающие деревья и проблема переобучения", videoId: DEFAULT_VIDEO },
					{ id: "ml_18_2", title: "18.2 Практика. Предобработка и трансформация", videoId: DEFAULT_VIDEO },
					{ id: "ml_18_3", title: "18.3 Практика. Обучение модели DT", videoId: DEFAULT_VIDEO },
				],
			},
			{
				title: "Модуль 19: Ансамбли (Ensembles)",
				lessons: [
					{ id: "ml_19_1", title: "19.1 Композиции алгоритмов, бэггинг", videoId: DEFAULT_VIDEO },
					{ id: "ml_19_2", title: "19.2 Random forest", videoId: DEFAULT_VIDEO },
					{ id: "ml_19_3", title: "19.3 Стекинг", videoId: DEFAULT_VIDEO },
					{ id: "ml_19_4", title: "19.4 Практика", videoId: DEFAULT_VIDEO },
				],
			},
			{
				title: "Модуль 20: Градиентный бустинг",
				lessons: [
					{ id: "ml_20_1", title: "20.1 Бустинг", videoId: DEFAULT_VIDEO },
					{ id: "ml_20_2", title: "20.2 Градиентный бустинг", videoId: DEFAULT_VIDEO },
					{ id: "ml_20_3", title: "20.3 Bias-variance tradeoff", videoId: DEFAULT_VIDEO },
					{ id: "ml_20_4", title: "20.4 Практика", videoId: DEFAULT_VIDEO },
				],
			},
			{
				title: "Модуль 21: Кластеризация",
				lessons: [
					{ id: "ml_21_1", title: "21.1 Введение", videoId: DEFAULT_VIDEO },
					{ id: "ml_21_2", title: "21.2 K-means", videoId: DEFAULT_VIDEO },
					{ id: "ml_21_3", title: "21.3 DBSCAN", videoId: DEFAULT_VIDEO },
					{ id: "ml_21_4", title: "21.4 Практика", videoId: DEFAULT_VIDEO },
				],
			},
			{
				title: "Модуль 22: Рекомендательные системы",
				lessons: [
					{ id: "ml_22_1", title: "22.1 Контентная рекомендация", videoId: DEFAULT_VIDEO },
					{ id: "ml_22_2", title: "22.2 Коллаборативная фильтрация", videoId: DEFAULT_VIDEO },
					{ id: "ml_22_3", title: "22.3 Оценка качества и валидация", videoId: DEFAULT_VIDEO },
					{ id: "ml_22_4", title: "22.4 Практика построение модели", videoId: DEFAULT_VIDEO },
				],
			},
			{
				title: "Модуль 23: Итоги",
				lessons: [
					{ id: "ml_23_1", title: "23.1 Общие вопросы", videoId: DEFAULT_VIDEO },
					{ id: "ml_23_2", title: "23.2 Вопросы о линейных моделях", videoId: DEFAULT_VIDEO },
				],
			},
			{
				title: "Модуль 24: Финал",
				lessons: [
					{ id: "ml_24_1", title: "24.1 Машинное обучение классические задачи", videoId: DEFAULT_VIDEO },
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
				title: "Модуль 1: Основы DL",
				lessons: [
					{ id: "dl_1_1", title: "1.1 Введение. Полносвязные слои. Функции активации", videoId: DEFAULT_VIDEO },
					{ id: "dl_1_2", title: "1.2 Семинар", videoId: DEFAULT_VIDEO },
				],
			},
			{
				title: "Модуль 2: Обучение сетей",
				lessons: [
					{ id: "dl_2_1", title: "2.1 Градиентный спуск и методы оптимизации. Лекция", videoId: DEFAULT_VIDEO },
					{ id: "dl_2_2", title: "2.2 Обучение нейронных сетей. Лекция", videoId: DEFAULT_VIDEO },
					{ id: "dl_2_3", title: "2.3 Высокоуровневое API. Семинар", videoId: DEFAULT_VIDEO },
					{ id: "dl_2_4", title: "2.4 Обучение первой нейросети в PyTorch. Семинар", videoId: DEFAULT_VIDEO },
				],
			},
			{
				title: "Модуль 3: CNN (Сверточные сети)",
				lessons: [
					{ id: "dl_3_1", title: "3.1 Сверточные нейронные сети. Лекция", videoId: DEFAULT_VIDEO },
					{ id: "dl_3_2", title: "3.2 Сверточные нейронные сети. Семинар", videoId: DEFAULT_VIDEO },
				],
			},
			{
				title: "Модуль 4: Тюнинг нейросетей",
				lessons: [
					{ id: "dl_4_1", title: "4.1 Регуляризация и нормализация. Batch нормализация", videoId: DEFAULT_VIDEO },
					{ id: "dl_4_2", title: "4.2 Нормализация входных данных. Инициализация. Аугментация", videoId: DEFAULT_VIDEO },
					{ id: "dl_4_3", title: "4.3 Практика", videoId: DEFAULT_VIDEO },
				],
			},
			{
				title: "Модуль 5: Архитектуры CNN",
				lessons: [
					{ id: "dl_5_1", title: "5.1 Популярные архитектуры. Перенос знаний", videoId: DEFAULT_VIDEO },
				],
			},
			{
				title: "Модуль 6: Компьютерное зрение (Object Detection)",
				lessons: [
					{ id: "dl_6_1", title: "6.1 Сегментация объектов", videoId: DEFAULT_VIDEO },
					{ id: "dl_6_2", title: "6.2 Практика по сегментации", videoId: DEFAULT_VIDEO },
					{ id: "dl_6_3", title: "6.3 Детекция объектов", videoId: DEFAULT_VIDEO },
					{ id: "dl_6_4", title: "6.4 Практика по детекции", videoId: DEFAULT_VIDEO },
				],
			},
			{
				title: "Модуль 7: Лица и Автоэнкодеры",
				lessons: [
					{ id: "dl_7_1", title: "7.1 Автоэнкодеры", videoId: DEFAULT_VIDEO },
					{ id: "dl_7_2", title: "7.2 Идентификация лиц", videoId: DEFAULT_VIDEO },
					{ id: "dl_7_3", title: "7.3 Автоэнкодеры на практике", videoId: DEFAULT_VIDEO },
					{ id: "dl_7_4", title: "7.4 Распознавание лиц на практике", videoId: DEFAULT_VIDEO },
				],
			},
			{
				title: "Модуль 8: NLP - Векторы",
				lessons: [
					{ id: "dl_8_1", title: "8.1 Векторные представления текстов. Лекция", videoId: DEFAULT_VIDEO },
					{ id: "dl_8_2", title: "8.2 Векторные представления текстов. Семинар", videoId: DEFAULT_VIDEO },
				],
			},
			{
				title: "Модуль 9: NLP - RNN & Attention",
				lessons: [
					{ id: "dl_9_1", title: "9.1 Реккурентные нейронные сети (RNN) и их модификации", videoId: DEFAULT_VIDEO },
					{ id: "dl_9_2", title: "9.2 Трансформер", videoId: DEFAULT_VIDEO },
					{ id: "dl_9_3", title: "9.3 Практика", videoId: DEFAULT_VIDEO },
				],
			},
			{
				title: "Модуль 10: Трансформеры (SOTA)",
				lessons: [
					{ id: "dl_10_1", title: "10.1 Трансформер своими руками", videoId: DEFAULT_VIDEO },
					{ id: "dl_10_2", title: "10.2 Bert", videoId: DEFAULT_VIDEO },
					{ id: "dl_10_3", title: "10.3 GPT", videoId: DEFAULT_VIDEO },
				],
			},
		],
	},
	career: {
		title: "БОНУС: Карьера и Трудоустройство",
		color: "yellow",
		icon: "briefcase",
		nextCourseId: "python",
		modules: [
			{
				title: "Модуль 1: Собеседования",
				lessons: [
					{ id: "car_1_1", title: "1.1 ML: общие вопросы", videoId: DEFAULT_VIDEO },
					{ id: "car_1_2", title: "1.2 Собеседования по теории вероятностей и статистике", videoId: DEFAULT_VIDEO },
					{ id: "car_1_3", title: "1.3 Собеседования по AB тестированию", videoId: DEFAULT_VIDEO },
				],
			},
			{
				title: "Модуль 2: Трудоустройство",
				lessons: [
					{ id: "car_2_1", title: "2.1 Трудоустройство - первые шаги", videoId: DEFAULT_VIDEO },
					{ id: "car_2_2", title: "2.2 Гайд для ML. Как оформить гитхаб", videoId: DEFAULT_VIDEO },
				],
			},
		],
	},
};


// 3. ИНИЦИАЛИЗАЦИЯ ПРИ ЗАГРУЗКЕ
document.addEventListener("DOMContentLoaded", () => {
	if (typeof lucide !== "undefined") lucide.createIcons();
	initMobileMenu();

	if (auth) {
		document.querySelectorAll('.loading-placeholder').forEach(el => el.classList.remove('hidden'));
		updateUserDisplay(); 

		auth.onAuthStateChanged((user) => {
			if (user) {
				currentUser = user;
				loadUserProgress(user.uid); 
			} else {
				currentUser = null;
				checkAuthRedirect();
			}
		});
	}

	if (document.getElementById("network-canvas")) {
		// initLandingAnimation(); // Убран вызов сложной анимации
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
});

// --- UI ЛОГИКА: МОДАЛЬНЫЕ ОКНА И ПРОГРАММА ---
window.openAuth = function (mode) {
	const overlay = document.getElementById("auth-overlay");
	const innerCard = document.getElementById("auth-card-inner");
	if (!overlay || !innerCard) return;

	overlay.classList.remove("hidden");
	setTimeout(() => overlay.classList.remove("opacity-0"), 10);

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
	if (!content || content.children.length > 0) return; 

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

// --- LOGIC: AUTH SUBMIT (FIXED ERRORS & HANGING LOGIN) ---
window.handleAuthSubmit = function (e) {
	e.preventDefault();
	const form = e.target;
	const isRegister = form.id === "register-form";
	const btn = form.querySelector('button[type="submit"]');
	const originalText = btn.innerHTML;
    
    const resetBtn = (message = null, success = false) => { 
        if(success) {
            btn.innerHTML = `<i data-lucide="check-circle" class="w-5 h-5 inline"></i> ${message || "Успешно!"}`;
            setTimeout(() => {
                window.location.href = "index.html"; 
            }, 500);
        } else {
            btn.innerHTML = originalText; 
            if(message) alert(message);
        }
        if (typeof lucide !== "undefined") lucide.createIcons(); 
    };

	btn.innerHTML = `<i data-lucide="loader-2" class="animate-spin w-5 h-5 inline"></i> ${
		isRegister ? "Создание..." : "Вход..."
	}`;
	if (typeof lucide !== "undefined") lucide.createIcons();
    

	if (isRegister && typeof grecaptcha !== "undefined") {
		if (!grecaptcha.getResponse()) {
			resetBtn("Пройдите капчу!");
			return;
		}
	}

	const email = form.querySelector('input[type="email"]').value;
	const pwd = form.querySelector('input[type="password"]').value;
    const nameInput = form.querySelector('input[type="text"]');
	const displayName = isRegister && nameInput ? nameInput.value : '';


	if (!isRegister) {
		auth.signInWithEmailAndPassword(email, pwd)
			.then(() => {
                resetBtn("Вход выполнен.", true);
            })
			.catch((err) => {
                let message = "Произошла ошибка входа. ";
                if (err.code === 'auth/wrong-password' || err.code === 'auth/user-not-found' || err.code === 'auth/invalid-credential') {
                    message = "Неверный Email или Пароль."; 
                } else if (err.code === 'auth/invalid-email') {
					message = "Некорректный формат Email."; 
				} else if (err.code === 'auth/too-many-requests') {
                    message = "Слишком много неудачных попыток. Попробуйте позже.";
                } else {
                    message = "Ошибка: Неверный Email или Пароль."; 
                }
				resetBtn(message);
			});
	} else {
        if (!displayName) {
            resetBtn("Введите ваше имя!");
            return;
        }
        
		auth.createUserWithEmailAndPassword(email, pwd)
			.then((cred) => {
				return db.collection("users").doc(cred.user.uid).set({
					email: email,
                    displayName: displayName, 
					createdAt: firebase.firestore.FieldValue.serverTimestamp(),
					progress: {},
				});
			})
			.then(() => resetBtn("Регистрация успешна.", true)) 
			.catch((err) => {
                let message = "Произошла неизвестная ошибка.";
				if (err.code === 'auth/email-already-in-use') {
					message = "Этот Email уже зарегистрирован.";
				} else if (err.code === 'auth/weak-password') {
					message = "Пароль должен содержать не менее 6 символов.";
				} else {
                    message = "Ошибка: " + err.message;
                }
				resetBtn(message);
			});
	}
};


// --- LOGIC: CORE & PROGRESS (CRITICAL LOADING FIX) ---
function checkAuthRedirect() {
	if (!currentUser && !window.location.pathname.includes("landing.html"))
		window.location.href = "landing.html";
}

async function loadUserProgress(uid) {
	updateUserDisplay(); 

    try {
        const doc = await db.collection("users").doc(uid).get();
        if (doc.exists) {
            const data = doc.data();
            userProgress = data.progress || {};
            userName = data.displayName || 'Студент'; 
        }
    } catch (error) {
        console.error("Error fetching user data from Firebase:", error);
    }
    
	updateUserDisplay();
    
	if (window.location.pathname.includes("course.html")) initCoursePage();
	else if (window.location.pathname.includes("index.html")) initRoadmapAndDashboard();
	else if (window.location.pathname.includes("mentor.html")) initMentorPage();

    document.querySelectorAll('.loading-placeholder').forEach(el => el.classList.add('hidden'));
}

// Обновление имени, аватара и роли в UI
function updateUserDisplay() {
	const nameElements = document.querySelectorAll('.user-display-name');
    const displayUserName = (userName && userName !== 'Студент') ? userName.split(' ')[0] : 'Студент'; 
	nameElements.forEach(el => el.innerText = displayUserName);
    
    const greetingElements = document.querySelectorAll('.user-greeting');
    greetingElements.forEach(el => el.innerText = userName);
    
    const roleElements = document.querySelectorAll('.user-role');
	if (roleElements.length > 0) roleElements.forEach(el => el.innerText = 'Студент PRO');

    const avatarElements = document.querySelectorAll('.user-avatar-img');
    const seed = userName.split(' ')[0] || 'HyperLearn';
    const newSrc = `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(seed)}`;
    avatarElements.forEach(img => img.src = newSrc);
}


// Находим все уроки
function getAllLessons() {
    const lessons = [];
    for (const courseId in COURSES_DB) {
        COURSES_DB[courseId].modules.forEach(module => {
            module.lessons.forEach(lesson => {
                lessons.push({...lesson, courseId: courseId});
            });
        });
    }
    return lessons;
}

// Находим текущий и следующий уроки
function getNextLesson(currentLessonId) {
    const allLessons = getAllLessons();
    const currentIndex = allLessons.findIndex(l => l.id === currentLessonId);
    if (currentIndex !== -1 && currentIndex < allLessons.length - 1) {
        return allLessons[currentIndex + 1];
    }
    return null;
}

// Проверяет, пройден ли *предыдущий* урок.
function isLessonLocked(cId, mIdx, lIdx) {
    if (mIdx === 0 && lIdx === 0) {
        return false;
    }
	
	const allLessons = getAllLessons();
	const currentLessonId = COURSES_DB[cId].modules[mIdx].lessons[lIdx].id;
	const currentIndex = allLessons.findIndex(l => l.id === currentLessonId);
	
	if (currentIndex <= 0) return true;
	
	const previousLesson = allLessons[currentIndex - 1];
    // Если предыдущий урок не пройден, он заблокирован.
	return !userProgress[previousLesson.id];
}

// --- LOGIC: COURSE PAGE ---

function initCoursePage() {
	const params = new URLSearchParams(window.location.search);
	const id = params.get("id");
    let initialLessonId = params.get("lesson");
    
    if (!id || !COURSES_DB[id]) {
        // Если нет ID курса, показываем страницу выбора курсов ("Мои курсы")
        renderCourseSelectionPage();
        return;
    }
    
    const courseData = COURSES_DB[id];
    
    if (!initialLessonId) {
        const courseLessons = courseData.modules.flatMap((mod, mIdx) => 
            mod.lessons.map(l => ({...l, mIdx, lIdx: mod.lessons.findIndex(cl => cl.id === l.id)}))
        );
           
        const firstAvailable = courseLessons.find(l => {
            return !userProgress[l.id] && !isLessonLocked(id, l.mIdx, l.lIdx);
        });
           
        if (firstAvailable) {
            initialLessonId = firstAvailable.id;
        } else if (courseLessons.length > 0) {
            // Если все пройдены, берем последний пройденный
            const lastCompleted = courseLessons.slice().reverse().find(l => userProgress[l.id]);
            initialLessonId = lastCompleted ? lastCompleted.id : courseLessons[0].id;
        }
    }
    
    renderLessonPage(id, initialLessonId);
}

// Рендеринг страницы выбора курсов (для "Мои курсы" - красивые квадратные карточки)
function renderCourseSelectionPage() {
    const lessonContent = document.getElementById('lesson-area-wrapper');
    const courseSelectionMenu = document.getElementById('course-selection-menu');
    const courseLessonMenu = document.getElementById('course-lesson-menu');

    if (lessonContent) lessonContent.classList.add('hidden');
    if (courseLessonMenu) courseLessonMenu.classList.add('hidden');
    if (courseSelectionMenu) courseSelectionMenu.classList.remove('hidden');
    
    const grid = document.getElementById("course-selection-grid");
    if (!grid) return;

    document.querySelectorAll('#course-selection-grid .loading-placeholder').forEach(el => el.classList.add('hidden'));

    grid.innerHTML = '';
    
    const courseOrder = ["python", "algo", "stats", "ml", "dl", "career"];
    
    grid.innerHTML = courseOrder.map(key => {
        const course = COURSES_DB[key];
        const { totalLessons, progressPercent } = getCourseProgress(key);
        return `
            <a href="course.html?id=${key}" class="glass-card p-4 rounded-xl flex flex-col items-start hover:bg-white/10 transition group aspect-square">
                <div class="w-10 h-10 bg-${course.color}-600 rounded-lg flex items-center justify-center mb-2">
                    <i data-lucide="${course.icon}" class="w-5 h-5 text-white"></i>
                </div>
                <h3 class="text-lg font-bold text-white mb-1">${course.title.split(': ')[1]}</h3>
                <p class="text-xs text-slate-400 mb-4">${course.modules.length} модулей</p>
                
                <div class="mt-auto w-full">
                    <div class="w-full bg-slate-700 h-1.5 rounded-full mb-1">
                        <div class="h-full rounded-full bg-${course.color}-500" style="width: ${progressPercent}%"></div>
                    </div>
                    <p class="text-xs text-slate-400">${progressPercent}% завершено</p>
                </div>
            </a>
        `;
	}).join('');
    
    if (typeof lucide !== "undefined") lucide.createIcons();
}

// Рендеринг страницы конкретного урока (Восстановлен красивый вид списка)
function renderLessonPage(id, activeLessonId = null) {
	const data = COURSES_DB[id];
	if (!data) return;

    const lessonContent = document.getElementById('lesson-area-wrapper');
    const courseSelectionMenu = document.getElementById('course-selection-menu');
    const courseLessonMenu = document.getElementById('course-lesson-menu'); 
    
    if (courseSelectionMenu) courseSelectionMenu.classList.add('hidden');
    if (lessonContent) lessonContent.classList.remove('hidden');
    if (courseLessonMenu) courseLessonMenu.classList.remove('hidden'); 
    
	let lessonToLoad = null;

	document.getElementById("course-title-display").innerText = data.title;
	const list = document.getElementById("sidebar-list");
	list.innerHTML = "";
    
    // Заполнение списка уроков (ВСЕХ МОДУЛЕЙ)
    data.modules.forEach((mod, mIdx) => {
		const h = document.createElement("div");
		h.className = "text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 mt-6 px-2";
		h.innerText = mod.title;
		list.appendChild(h);

		mod.lessons.forEach((less, lIdx) => {
			const locked = isLessonLocked(id, mIdx, lIdx);
			const done = userProgress[less.id];
			const btn = document.createElement("button");
			
            // Применяем стили из CSS (lesson-locked, bg-white/5, active-lesson)
			btn.className = `w-full text-left p-3 rounded-xl flex items-center gap-3 transition 
                ${done && !locked ? "bg-white/5" : locked ? "lesson-locked" : "hover:bg-white/5"}
                ${less.id === activeLessonId ? "active-lesson bg-white/10" : ""}`; 
			
			btn.dataset.lessonId = less.id;
			less.btnEl = btn; 
			
			// FIX: Назначаем клик для всех НЕ заблокированных уроков (включая пройденные!)
			if (!locked) {
				btn.onclick = () => loadLesson(less, btn);
			} else {
				// Заблокированный урок некликабелен
				btn.onclick = () => alert('Пройдите предыдущий урок, чтобы открыть этот.');
			}
			
            // FIX: Восстановление логики иконки (Замочки/Галочки/Play)
            let iconName;
            let iconClasses;
            if (done) {
                iconName = "check";
                iconClasses = "bg-green-500/20 text-green-400";
            } else if (locked) {
                iconName = "lock"; 
                iconClasses = "bg-red-500/20 text-white";
            } else {
                iconName = "play";
                iconClasses = "border border-slate-600 text-slate-500";
            }
			
			btn.innerHTML = `
                <div class="lesson-icon w-6 h-6 rounded-full flex items-center justify-center ${iconClasses}">
                    <i data-lucide="${iconName}" class="w-3 h-3"></i>
                </div>
                <span class="text-sm font-medium text-slate-300">${less.title}</span>
            `;
			list.appendChild(btn);
			
            if (less.id === activeLessonId) {
                lessonToLoad = less;
            } 
		});
	});

    // Загружаем урок
	if (lessonToLoad) {
		loadLesson(lessonToLoad, lessonToLoad.btnEl);
        
        // Прокрутка до активного элемента
        setTimeout(() => {
            const activeEl = document.querySelector("#sidebar-list button.active-lesson");
            if (activeEl) {
                activeEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }, 100);
        
	} else if (data.modules[0] && data.modules[0].lessons[0]) {
        loadLesson(data.modules[0].lessons[0], data.modules[0].lessons[0].btnEl);
    }
	
	if (typeof lucide !== "undefined") lucide.createIcons();
}


window.loadLesson = function(less, btn) {
	document.getElementById("lesson-title-main").innerText = less.title;
	const wrap = document.getElementById("video-wrapper-clickable");
	
	const videoHtml = less.videoId 
        ? `<iframe class="w-full h-full rounded-2xl" src="https://www.youtube.com/embed/${less.videoId}?autoplay=1" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
        : `<div class="w-full h-full rounded-2xl flex items-center justify-center text-slate-500">Видео недоступно.</div>`;
    
    wrap.innerHTML = videoHtml;
	wrap.classList.remove("cursor-pointer");
	wrap.onclick = null;
	
	// 1. Управление активным/пройденным классом
	document
		.querySelectorAll("#sidebar-list button")
		.forEach((b) => {
            b.classList.remove("bg-white/10", "active-lesson");
            // Восстанавливаем фон для пройденных уроков
            if(userProgress[b.dataset.lessonId]) b.classList.add("bg-white/5");
            else b.classList.remove("bg-white/5");
        });
        
	// 2. Назначаем активный класс текущему уроку
	btn.classList.add("bg-white/10", "active-lesson"); 

	// 3. Управление кнопкой "Завершить урок"
	const completeButtons = document.querySelectorAll('.complete-lesson-btn-dynamic');
    
    const resetButtons = (text = 'Завершить урок', disable = false, opacity = false) => {
        completeButtons.forEach(cBtn => {
            cBtn.innerText = text;
            cBtn.disabled = disable;
            if(opacity) cBtn.classList.add('opacity-50', 'pointer-events-none');
            else cBtn.classList.remove('opacity-50', 'pointer-events-none');
        });
    }
    
	if (completeButtons.length > 0) {
        
        if (userProgress[less.id]) {
            resetButtons('Урок пройден', true, true);
        } else {
            resetButtons('Завершить урок', false, false);
            
            completeButtons.forEach(cBtn => {
                cBtn.onclick = async () => {
                    if(!currentUser) {
                        alert("Ошибка: Вы не авторизованы.");
                        return;
                    }

                    resetButtons('Сохранение...', true, true);
                    

                    userProgress[less.id] = true;
                    try {
                        await db
                            .collection("users")
                            .doc(currentUser.uid)
                            .set({ progress: userProgress }, { merge: true });
                        
                        const nextLesson = getNextLesson(less.id);
                        
                        if (nextLesson) {
                             window.location.href = `course.html?id=${nextLesson.courseId}&lesson=${nextLesson.id}`;
                        } else {
                            alert("Поздравляем! Вы прошли все доступные уроки.");
                            window.location.href = `index.html`;
                        }

                    } catch (e) {
                        console.error("Firebase save error:", e);
                        alert("Ошибка сохранения прогресса: " + e.message + ". Повторите попытку. Проверьте настройки Firestore!");
                        resetButtons('Завершить урок', false, false);
                    }
                };
            });
        }
	}
    
    const checkBtn = document.getElementById('submit-homework-btn');
    if(checkBtn) {
        checkBtn.onclick = () => {
             alert('AI Проверка ДЗ: функция временно не активна, но кнопка "Завершить урок" работает корректно.');
        }
    }
    
}


// Считает прогресс по одному курсу
function getCourseProgress(courseId) {
    const course = COURSES_DB[courseId];
    let totalLessons = 0;
    let completedLessons = 0;
    
    course.modules.forEach(mod => {
        mod.lessons.forEach(lesson => {
            totalLessons++;
            if (userProgress[lesson.id]) {
                completedLessons++;
            }
        });
    });
    
    const progressPercent = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;
    return { completedLessons, totalLessons, progressPercent };
}

// Главная функция для инициализации дашборда
function initRoadmapAndDashboard() {
	if (!currentUser) return;
	
    updateUserDisplay(); 
    
	const allLessons = getAllLessons();
	const totalProgress = allLessons.reduce((acc, l) => {
		if (userProgress[l.id]) acc.completed++;
		acc.total++;
		return acc;
	}, { completed: 0, total: 0 });
	
	const totalCompletedLessons = totalProgress.completed;
	const totalLessonsCount = totalProgress.total;
    const totalProgressPercent = totalLessonsCount > 0 ? Math.round((totalCompletedLessons / totalLessonsCount) * 100) : 0;
	
	// Обновление карточек статистики
	const lessonsCountEl = document.getElementById('lessons-completed-count');
	if (lessonsCountEl) lessonsCountEl.innerText = totalCompletedLessons;
    const totalProgressPercentEl = document.getElementById('total-progress-percent');
    if (totalProgressPercentEl) totalProgressPercentEl.innerText = `${totalProgressPercent}%`;

	updateCurrentModuleCard(); 
	
	// Обновление роадмапа (все курсы открыты)
	const order = ["python", "algo", "stats", "ml", "dl", "career"];
	const c = document.getElementById("roadmap-container");
	if (!c) return;
	
	c.innerHTML = ''; 

	c.innerHTML = order
		.map((k, i) => {
			const d = COURSES_DB[k];
			const { progressPercent } = getCourseProgress(k);
			
			return `
                <a href="course.html?id=${k}" 
                   class="glass-card p-4 rounded-xl min-w-[200px] flex flex-col items-center hover:bg-white/5 transition relative">
                    
                    <div class="w-10 h-10 bg-${d.color}-600 rounded-full flex items-center justify-center mb-2 font-bold z-20">
                        <i data-lucide="${d.icon}" class="w-5 h-5 text-white"></i>
                    </div>
                    <div class="font-bold text-center z-20">${d.title.split(': ')[1]}</div>
					
					<div class="w-full mt-2 h-1.5 rounded-full bg-slate-700/50 z-20">
                        <div class="h-full rounded-full bg-${d.color}-500 transition-all duration-500" style="width: ${progressPercent}%"></div>
                    </div>
					<p class="text-xs text-slate-400 mt-1 z-20">${progressPercent}%</p>
                </a>
            `;
		})
		.join("");
	if (typeof lucide !== "undefined") lucide.createIcons();
	
	document.querySelectorAll('.loading-placeholder').forEach(el => el.classList.add('hidden'));
}

// Обновление карточки текущего курса
function updateCurrentModuleCard() {
	const allLessons = getAllLessons();
    const courseOrderIds = ["python", "algo", "stats", "ml", "dl", "career"];
    
    let currentCourseId = 'python'; 
    let displayLessonTitle = 'Начало курса';
    let moduleTitle = 'Модуль 0';
    let targetLesson = allLessons.find(l => l.id === "py_0_1");

    let lastCompletedLesson = null;
    let maxLessonIndex = -1;

    allLessons.forEach((lesson, index) => {
        if (userProgress[lesson.id] && index > maxLessonIndex) {
            maxLessonIndex = index;
            lastCompletedLesson = lesson;
        }
    });
    
    let isCourseCompleted = false;

    if (lastCompletedLesson) {
        let courseOfLastLesson = lastCompletedLesson.courseId;
        const { completedLessons, totalLessons } = getCourseProgress(courseOfLastLesson);

        if (completedLessons < totalLessons) {
            currentCourseId = courseOfLastLesson;
            
            const courseLessons = COURSES_DB[currentCourseId].modules.flatMap(mod => mod.lessons.map(l => ({...l, moduleTitle: mod.title})));
            const firstUncompleted = courseLessons.find(l => !userProgress[l.id]);
            
            if(firstUncompleted) {
                targetLesson = firstUncompleted;
                displayLessonTitle = firstUncompleted.title;
                const moduleForLesson = COURSES_DB[currentCourseId].modules.find(mod => mod.lessons.some(l => l.id === targetLesson.id));
                moduleTitle = moduleForLesson ? moduleForLesson.title : 'Модуль';
            } else {
                 targetLesson = courseLessons[0];
                 displayLessonTitle = targetLesson.title;
                 moduleTitle = COURSES_DB[currentCourseId].modules[0].title;
            }

        } else {
            const currentCourseIndex = courseOrderIds.indexOf(courseOfLastLesson);
            if (currentCourseIndex !== -1 && currentCourseIndex < courseOrderIds.length - 1) {
                currentCourseId = courseOrderIds[currentCourseIndex + 1];
                const nextCourse = COURSES_DB[currentCourseId];
                targetLesson = nextCourse.modules[0].lessons[0];
                displayLessonTitle = targetLesson.title;
                moduleTitle = nextCourse.modules[0].title;
            } else {
                currentCourseId = lastCompletedLesson.courseId; 
                isCourseCompleted = true;
            }
        }
    } else {
        currentCourseId = 'python';
        targetLesson = allLessons.find(l => l.id === "py_0_1");
        displayLessonTitle = targetLesson.title;
        moduleTitle = COURSES_DB.python.modules[0].title;
    }

    const cardEl = document.getElementById('current-module-card');
	if (!cardEl) return;
	
    cardEl.innerHTML = ''; 

	if (currentCourseId) {
		const courseData = COURSES_DB[currentCourseId];
		const { totalLessons, completedLessons, progressPercent } = getCourseProgress(currentCourseId);
        
        if (isCourseCompleted) {
            cardEl.href = `course.html`;
            cardEl.innerHTML = `<div class="p-6 text-center text-slate-400 glass-card rounded-xl">🎉 Все уроки успешно пройдены! Начните сначала или переходите к Карьерному модулю.</div>`;
            return;
        }
		
		cardEl.href = `course.html?id=${currentCourseId}&lesson=${targetLesson.id}`;
		
		cardEl.innerHTML = `
			<div class="glass-card p-4 rounded-xl flex flex-col md:flex-row gap-6 items-center hover:bg-white/5 transition border border-white/5 hover:border-indigo-500/30">
                <div class="w-full md:w-64 h-36 rounded-lg overflow-hidden relative">
                    <img
                        src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800"
                        class="w-full h-full object-cover group-hover:scale-105 transition duration-500">

                    <div
                        class="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                        <i data-lucide="play"
                            class="w-10 h-10 text-white fill-white"></i>
                    </div>
                </div>

                <div class="flex-1">
                    <span
                        class="text-xs font-bold text-${courseData.color}-400 uppercase mb-2 block">
                        ТЕКУЩИЙ КУРС
                    </span>

                    <h4
                        class="text-xl font-bold text-white mb-2 group-hover:text-indigo-300 transition">
                        ${courseData.title}
                    </h4>
                    
                    <p class="text-sm text-slate-400 mb-2">${moduleTitle}: ${displayLessonTitle}</p>

                    <div
                        class="w-full bg-slate-700 h-1.5 rounded-full mb-2">
                        <div
                            class="bg-gradient-to-r from-${courseData.color}-500 to-purple-500 h-1.5 rounded-full"
                            style="width: ${progressPercent}%"></div>
                    </div>

                    <p class="text-xs text-slate-400">${progressPercent}% курса завершено • ${completedLessons} из ${totalLessons} уроков</p>
                </div>

                <div class="hidden md:block p-4">
                    <i data-lucide="chevron-right"
                        class="text-slate-500 group-hover:text-white transition"></i>
                </div>
            </div>
		`;
	} else {
		cardEl.href = `course.html`;
		cardEl.innerHTML = `<div class="p-6 text-center text-slate-400 glass-card rounded-xl">🎉 Все уроки успешно пройдены! Начните сначала или переходите к Карьерному модулю.</div>`;
		
	}
	if (typeof lucide !== 'undefined') lucide.createIcons();
}


// --- LOGIC: AI MENTOR (FIXED CHAT) ---

function initMentorPage() {
    updateUserDisplay();
    document.querySelectorAll('.loading-placeholder').forEach(el => el.classList.add('hidden'));
}

window.sendChatMessage = async function () {
    const input = document.getElementById('chat-input');
    const chatContainer = document.getElementById('chat-container');
    const message = input.value.trim();

    if (!message || !currentUser) return;

    // 1. Отобразить сообщение пользователя
    chatContainer.innerHTML += `
        <div class="flex justify-end mb-4">
            <div class="bg-indigo-600 text-white rounded-l-xl rounded-br-xl p-4 max-w-[85%] text-sm shadow-md">${message}</div>
        </div>
    `;
    input.value = ''; 
    
    chatContainer.scrollTop = chatContainer.scrollHeight;

    // 2. Отобразить индикатор загрузки AI
    const loadingMessageId = `loading-${Date.now()}`;
    chatContainer.innerHTML += `
        <div class="flex mb-4" id="${loadingMessageId}">
            <div class="bg-slate-800 text-slate-300 rounded-r-xl rounded-tl-xl p-4 border border-white/10 max-w-[85%] text-sm">
                <i data-lucide="loader-2" class="animate-spin w-4 h-4 inline mr-2"></i> AI Ментор думает...
            </div>
            </div>
    `;
    if (typeof lucide !== "undefined") lucide.createIcons();
    chatContainer.scrollTop = chatContainer.scrollHeight;

    // 3. Отправка и получение ответа (PLACEHOLDER)
    try {
        const responseText = await getMentorResponse(message); 
        
        // 4. Удалить загрузку, отобразить ответ
        const loadingEl = document.getElementById(loadingMessageId);
        if (loadingEl) loadingEl.remove();

        chatContainer.innerHTML += `
            <div class="flex mb-4">
                <div class="bg-slate-800 text-slate-300 rounded-r-xl rounded-tl-xl p-4 border border-white/10 max-w-[85%] text-sm prose prose-invert max-w-none">
                    ${marked.parse(responseText)}
                </div>
            </div>
        `;
    } catch (e) {
        const loadingEl = document.getElementById(loadingMessageId);
        if (loadingEl) loadingEl.remove();
        
        chatContainer.innerHTML += `
            <div class="flex mb-4">
                <div class="bg-red-800/50 text-red-300 rounded-r-xl rounded-tl-xl p-4 border border-red-500/50 max-w-[85%] text-sm">
                    Ошибка: Не удалось получить ответ от AI Ментора.
                </div>
            </div>
        `;
    }
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

function getMentorResponse(query) {
    const placeholderResponse = `
        Конечно, **${userName.split(' ')[0]}**! Ваш вопрос очень важен.
        
        | Тема | Пример |
        | :--- | :--- |
        | **Python** | Объясни, как работает декоратор. |
        | **SQL** | Покажи самый эффективный способ использования \`LEFT JOIN\`. |
        | **ML** | Почему \`Bias-Variance Tradeoff\` так важен? |
        
        _Ваш запрос: ${query}_
        
        Пожалуйста, сформулируйте свой вопрос более конкретно, чтобы я мог дать точный ответ.
    `;
    
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(placeholderResponse);
        }, 1500); 
    });
}

// --- UI HELPERS (Mobile Menu Fix) ---

function initMobileMenu() {
	const b = document.getElementById("burger-btn");
	const close = document.getElementById("close-menu-btn");
	const overlay = document.getElementById("menu-overlay");
	
    const sidebar = document.getElementById('mobile-menu');
	
	if (b && sidebar) {
		const toggleMenu = () => {
			sidebar.classList.toggle("hidden"); 
			if (overlay) overlay.classList.toggle("hidden");
		};
		b.onclick = toggleMenu;
		if (close) close.onclick = toggleMenu;
		if (overlay) overlay.onclick = toggleMenu;
		
		const checkDesktop = () => {
			if (window.matchMedia('(min-width: 1024px)').matches) {
				sidebar.classList.remove("hidden");
				if (overlay) overlay.classList.add("hidden");
			}
		};
		window.addEventListener('resize', checkDesktop);
		checkDesktop(); 
	}
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
	
	const tabButtons = [document.getElementById("tab-btn-desc"), document.getElementById("tab-btn-homework")];
	
	tabButtons.forEach(btn => {
		if (btn) {
			btn.classList.remove('bg-indigo-600', 'text-white', 'shadow');
			btn.classList.add('text-slate-400', 'hover:text-white', 'hover:bg-white/5');
		}
	});

	const activeBtn = document.getElementById(`tab-btn-${id}`);
	if (activeBtn) {
		activeBtn.classList.add('bg-indigo-600', 'text-white', 'shadow');
		activeBtn.classList.remove('text-slate-400', 'hover:text-white', 'hover:bg-white/5');
	}
};

window.togglePasswordVisibility = function(inputId, iconId) {
    const input = document.getElementById(inputId);
    const icon = document.getElementById(iconId);
    if (input.type === 'password') {
        input.type = 'text';
        icon.setAttribute('data-lucide', 'eye-off');
    } else {
        input.type = 'password';
        icon.setAttribute('data-lucide', 'eye');
    }
    if (typeof lucide !== "undefined") lucide.createIcons();
};

function initLandingAnimation() {
	// Эта функция сложная, оставляем заглушку, чтобы не ломать остальной код
}