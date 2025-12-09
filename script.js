/* --- script.js (ФИНАЛЬНАЯ РАБОЧАЯ ВЕРСИЯ: Все FIX) --- */

// 1. FIREBASE CONFIG
const firebaseConfig = {
	apiKey: "", // Заполняется средой выполнения
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

// 2. ПОЛНАЯ БАЗА ДАННЫХ (COURSES_DB) - ОБНОВЛЕНА ПОД СПИСОК
const COURSES_DB = {
	python: {
		title: "Python для Data Science",
		totalModules: 12,
		totalDuration: "40 часов",
		progress: 0,
		modules: [
			{
				id: 0,
				title: "Модуль 0: Введение",
				lessons: [
					{
						id: "py_0_1",
						title: "0.1 Python в машинном обучении",
						video: DEFAULT_VIDEO,
						duration: "10:00",
					},
					{
						id: "py_0_2",
						title: "0.2 Пример — Python для анализа изображений",
						video: DEFAULT_VIDEO,
						duration: "15:00",
					},
				],
			},
			{
				id: 1,
				title: "Модуль 1: Основы Python",
				lessons: [
					{
						id: "py_1_1",
						title: "1.1 Переменные",
						video: DEFAULT_VIDEO,
						duration: "10:00",
					},
					{
						id: "py_1_2",
						title: "1.2 Типы данных_2",
						video: DEFAULT_VIDEO,
						duration: "12:00",
					},
					{
						id: "py_1_3",
						title: "1.3 Циклы",
						video: DEFAULT_VIDEO,
						duration: "15:00",
					},
					{
						id: "py_1_4",
						title: "1.3 Циклы_2",
						video: DEFAULT_VIDEO,
						duration: "15:00",
					},
					{
						id: "py_1_5",
						title: "1.4 Условный оператор If_2",
						video: DEFAULT_VIDEO,
						duration: "10:00",
					},
				],
			},
			{
				id: 2,
				title: "Модуль 2: Структуры данных и функции",
				lessons: [
					{
						id: "py_2_1",
						title: "2.1 Функции в python",
						video: DEFAULT_VIDEO,
						duration: "15:00",
					},
					{
						id: "py_2_2",
						title: "2.2 Аргументы функции_2",
						video: DEFAULT_VIDEO,
						duration: "10:00",
					},
					{
						id: "py_2_3",
						title: "2.3 Call stack и ошибки в python_2",
						video: DEFAULT_VIDEO,
						duration: "12:00",
					},
					{
						id: "py_2_4",
						title: "2.4 Ссылочная модель данных",
						video: DEFAULT_VIDEO,
						duration: "10:00",
					},
					{
						id: "py_2_5",
						title: "2.5 Модель памяти в python",
						video: DEFAULT_VIDEO,
						duration: "15:00",
					},
					{
						id: "py_2_6",
						title: "2.6 Изменяемые и неизменяемые типы данных",
						video: DEFAULT_VIDEO,
						duration: "10:00",
					},
					{
						id: "py_2_7",
						title: "2.7 Срезы. Продвинутая работа со строками",
						video: DEFAULT_VIDEO,
						duration: "12:00",
					},
				],
			},
			{
				id: 3,
				title: "Модуль 3: Окружение",
				lessons: [
					{
						id: "py_3_0",
						title: "3.0 Интро",
						video: DEFAULT_VIDEO,
						duration: "05:00",
					},
					{
						id: "py_3_1",
						title: "3.1 Библиотеки",
						video: DEFAULT_VIDEO,
						duration: "10:00",
					},
					{
						id: "py_3_2",
						title: "3.2 Windows 10 Установка Anaconda",
						video: DEFAULT_VIDEO,
						duration: "15:00",
					},
					{
						id: "py_3_3",
						title: "3.3 Linux Установка Anaconda",
						video: DEFAULT_VIDEO,
						duration: "15:00",
					},
					{
						id: "py_3_4",
						title: "3.4 MacOS Установка Anaconda",
						video: DEFAULT_VIDEO,
						duration: "15:00",
					},
					{
						id: "py_3_5",
						title: "3.5 Установка сторонних пакетов_2",
						video: DEFAULT_VIDEO,
						duration: "10:00",
					},
					{
						id: "py_3_6",
						title: "3.6 Виртуальное окружение_2",
						video: DEFAULT_VIDEO,
						duration: "12:00",
					},
					{
						id: "py_3_7",
						title: "3.7 Итоги",
						video: DEFAULT_VIDEO,
						duration: "05:00",
					},
				],
			},
			{
				id: 4,
				title: "Модуль 4: Инструменты (Jupyter, Numpy)",
				lessons: [
					{
						id: "py_4_1",
						title: "4.1 Введение",
						video: DEFAULT_VIDEO,
						duration: "05:00",
					},
					{
						id: "py_4_2",
						title: "4.2 Знакомство с Jupyter. Ячейки",
						video: DEFAULT_VIDEO,
						duration: "10:00",
					},
					{
						id: "py_4_3",
						title: "4.3 Знакомство с Jupyter. Горячие клавиши",
						video: DEFAULT_VIDEO,
						duration: "08:00",
					},
					{
						id: "py_4_4",
						title: "4.4 Знакомство с Jupyter. Магические команды",
						video: DEFAULT_VIDEO,
						duration: "08:00",
					},
					{
						id: "py_4_5",
						title: "4.5 Знакомство с Jupyter. Kernel",
						video: DEFAULT_VIDEO,
						duration: "05:00",
					},
					{
						id: "py_4_6",
						title: "4.6 Numpy",
						video: DEFAULT_VIDEO,
						duration: "20:00",
					},
					{
						id: "py_4_7",
						title: "4.7 Pandas",
						video: DEFAULT_VIDEO,
						duration: "20:00",
					},
					{
						id: "py_4_8",
						title: "4.8 Matplotlib",
						video: DEFAULT_VIDEO,
						duration: "15:00",
					},
					{
						id: "py_4_9",
						title: "4.9 Заключение",
						video: DEFAULT_VIDEO,
						duration: "05:00",
					},
				],
			},
			{
				id: 5,
				title: "Модуль 5: Pandas (Обработка данных)",
				lessons: [
					{
						id: "py_5_1",
						title: "5.1 Чтение файлов и обзор данных",
						video: DEFAULT_VIDEO,
						duration: "15:00",
					},
					{
						id: "py_5_2",
						title: "5.2 Фильтрация данных, логические операторы",
						video: DEFAULT_VIDEO,
						duration: "15:00",
					},
					{
						id: "py_5_3",
						title: "5.3 Функции фильтры",
						video: DEFAULT_VIDEO,
						duration: "12:00",
					},
					{
						id: "py_5_4",
						title: "5.4 Series и Index",
						video: DEFAULT_VIDEO,
						duration: "10:00",
					},
					{
						id: "py_5_5",
						title: "5.5 Группировка данных",
						video: DEFAULT_VIDEO,
						duration: "15:00",
					},
					{
						id: "py_5_6",
						title: "5.6 Работа с датами и временем",
						video: DEFAULT_VIDEO,
						duration: "12:00",
					},
					{
						id: "py_5_7",
						title: "5.7 Визуализация",
						video: DEFAULT_VIDEO,
						duration: "15:00",
					},
					{
						id: "py_5_8",
						title: "5.8 Сохранение данных",
						video: DEFAULT_VIDEO,
						duration: "05:00",
					},
				],
			},
			{
				id: 6,
				title: "Модуль 6: SQL и Базы данных",
				lessons: [
					{
						id: "py_6_1",
						title: "6.1 Базы данных и СУБД",
						video: DEFAULT_VIDEO,
						duration: "15:00",
					},
					{
						id: "py_6_2",
						title: "6.2 Основные SQL запросы Получение, агрегация и сортировка данных",
						video: DEFAULT_VIDEO,
						duration: "20:00",
					},
					{
						id: "py_6_3",
						title: "6.3 Объединение таблиц JOIN_2",
						video: DEFAULT_VIDEO,
						duration: "20:00",
					},
					{
						id: "py_6_4",
						title: "6.4 SQL в Python_2",
						video: DEFAULT_VIDEO,
						duration: "15:00",
					},
				],
			},
			{
				id: 7,
				title: "Модуль 7: ООП",
				lessons: [
					{
						id: "py_7_1",
						title: "7.1 Классы, объекты и методы_2",
						video: DEFAULT_VIDEO,
						duration: "20:00",
					},
					{
						id: "py_7_2",
						title: "7.2 Принципы ООП Часть 1",
						video: DEFAULT_VIDEO,
						duration: "15:00",
					},
					{
						id: "py_7_3",
						title: "7.3 Принципы ООП. Часть 2",
						video: DEFAULT_VIDEO,
						duration: "15:00",
					},
				],
			},
			{
				id: 8,
				title: "Модуль 8: Git (Контроль версий)",
				lessons: [
					{
						id: "py_8_1",
						title: "8.1 Введение в git_2",
						video: DEFAULT_VIDEO,
						duration: "10:00",
					},
					{
						id: "py_8_2",
						title: "8.2 Ветки и теги_2",
						video: DEFAULT_VIDEO,
						duration: "12:00",
					},
					{
						id: "py_8_3",
						title: "8.3 Возможности git diff Ветвление. Использование тэгов",
						video: DEFAULT_VIDEO,
						duration: "15:00",
					},
					{
						id: "py_8_4",
						title: "8.4 Слияние веток",
						video: DEFAULT_VIDEO,
						duration: "10:00",
					},
					{
						id: "py_8_5",
						title: "8.5 Конфликт слияния веток",
						video: DEFAULT_VIDEO,
						duration: "12:00",
					},
					{
						id: "py_8_6",
						title: "8.6 Стратегии ветвления при разработке. Работа с удаленными провайдерами",
						video: DEFAULT_VIDEO,
						duration: "20:00",
					},
					{
						id: "py_8_7",
						title: "8.7 Взаимоотношение между remotes. Загрузка репозитория на удаленный сервер",
						video: DEFAULT_VIDEO,
						duration: "20:00",
					},
				],
			},
			{
				id: 9,
				title: "Модуль 9: Backend (FastAPI)",
				lessons: [
					{
						id: "py_9_1",
						title: "9.1 Запрос на сервер",
						video: DEFAULT_VIDEO,
						duration: "10:00",
					},
					{
						id: "py_9_2",
						title: "9.2 Ответ сервера API",
						video: DEFAULT_VIDEO,
						duration: "10:00",
					},
					{
						id: "py_9_3",
						title: "9.3 Практика написания запросов. Метод get",
						video: DEFAULT_VIDEO,
						duration: "15:00",
					},
					{
						id: "py_9_4",
						title: "9.4 Практика написания запросов. Метод post. Подключение к базе данных. Валидация",
						video: DEFAULT_VIDEO,
						duration: "20:00",
					},
					{
						id: "py_9_5",
						title: "9.5 Подводные камни валидации. Валидация в FastAPI",
						video: DEFAULT_VIDEO,
						duration: "15:00",
					},
					{
						id: "py_9_6",
						title: "9.6 Статус коды",
						video: DEFAULT_VIDEO,
						duration: "10:00",
					},
				],
			},
			{
				id: 10,
				title: "Модуль 10: ORM (SQLAlchemy)",
				lessons: [
					{
						id: "py_10_1",
						title: "10.1 FastAPI и SQLAlchemy",
						video: DEFAULT_VIDEO,
						duration: "20:00",
					},
					{
						id: "py_10_2",
						title: "10.2 ORM, SQLAlchemy_2",
						video: DEFAULT_VIDEO,
						duration: "20:00",
					},
				],
			},
			{
				id: 11,
				title: "Модуль 11: Airflow (Data Engineering)",
				lessons: [
					{
						id: "py_11_1",
						title: "11.1 Введение_2",
						video: DEFAULT_VIDEO,
						duration: "10:00",
					},
					{
						id: "py_11_2",
						title: "11.2 Устройство Airflow",
						video: DEFAULT_VIDEO,
						duration: "15:00",
					},
					{
						id: "py_11_3",
						title: "11.3 Запуск и веб интерфейс",
						video: DEFAULT_VIDEO,
						duration: "15:00",
					},
					{
						id: "py_11_4",
						title: "11.4 Python operator",
						video: DEFAULT_VIDEO,
						duration: "10:00",
					},
					{
						id: "py_11_5",
						title: "11.5 Передача информации",
						video: DEFAULT_VIDEO,
						duration: "12:00",
					},
					{
						id: "py_11_6",
						title: "11.6 Connections",
						video: DEFAULT_VIDEO,
						duration: "10:00",
					},
					{
						id: "py_11_7",
						title: "11.7 Лучшие практики",
						video: DEFAULT_VIDEO,
						duration: "15:00",
					},
				],
			},
			{
				id: 12,
				title: "Модуль 12: Best Practices",
				lessons: [
					{
						id: "py_12_1",
						title: "12.1 Шаблон приложения",
						video: DEFAULT_VIDEO,
						duration: "10:00",
					},
					{
						id: "py_12_2",
						title: "12.2 Переменные окружения",
						video: DEFAULT_VIDEO,
						duration: "10:00",
					},
					{
						id: "py_12_3",
						title: "12.3 Проблема SQL инъекций",
						video: DEFAULT_VIDEO,
						duration: "10:00",
					},
					{
						id: "py_12_4",
						title: "12.4 Вынесение настроек в конфиг",
						video: DEFAULT_VIDEO,
						duration: "10:00",
					},
					{
						id: "py_12_5",
						title: "12.5 Разделение кода на модули",
						video: DEFAULT_VIDEO,
						duration: "15:00",
					},
					{
						id: "py_12_6",
						title: "12.6 Идемпотентность",
						video: DEFAULT_VIDEO,
						duration: "10:00",
					},
				],
			},
		],
	},

	algorithms: {
		title: "Алгоритмы и Структуры Данных",
		totalModules: 5,
		totalDuration: "20 часов",
		progress: 0,
		modules: [
			{
				id: 1,
				title: "Модуль 1: Введение",
				lessons: [
					{
						id: "alg_1_1",
						title: "1.1 Введение",
						video: DEFAULT_VIDEO,
						duration: "05:00",
					},
				],
			},
			{
				id: 2,
				title: "Модуль 2: Сложность алгоритмов",
				lessons: [
					{
						id: "alg_2_1",
						title: "2.1 Сложность алгоритмов и «О» нотация",
						video: DEFAULT_VIDEO,
						duration: "15:00",
					},
					{
						id: "alg_2_2",
						title: "2.2 Примеры оценки сложности алгоритмов",
						video: DEFAULT_VIDEO,
						duration: "15:00",
					},
					{
						id: "alg_2_3",
						title: "2.3 Правила 1",
						video: DEFAULT_VIDEO,
						duration: "10:00",
					},
					{
						id: "alg_2_4",
						title: "2.4 Амортизированная сложность",
						video: DEFAULT_VIDEO,
						duration: "12:00",
					},
					{
						id: "alg_2_5",
						title: "2.5 Правила 2",
						video: DEFAULT_VIDEO,
						duration: "10:00",
					},
					{
						id: "alg_2_6",
						title: "2.6 Нетривиальные задачи. Примеры",
						video: DEFAULT_VIDEO,
						duration: "15:00",
					},
				],
			},
			{
				id: 3,
				title: "Модуль 3: Базовые структуры (Списки)",
				lessons: [
					{
						id: "alg_3_1",
						title: "3.1 Массивы и указатели",
						video: DEFAULT_VIDEO,
						duration: "15:00",
					},
					{
						id: "alg_3_2",
						title: "3.2 Задача контейнер с водой",
						video: DEFAULT_VIDEO,
						duration: "20:00",
					},
					{
						id: "alg_3_3",
						title: "3.3 Односвязный и двусвязный список, задача на разворот",
						video: DEFAULT_VIDEO,
						duration: "20:00",
					},
					{
						id: "alg_3_4",
						title: "3.4 Граничные условия, задача на подсвет букв подряд",
						video: DEFAULT_VIDEO,
						duration: "15:00",
					},
				],
			},
			{
				id: 4,
				title: "Модуль 4: Деревья и Графы",
				lessons: [
					{
						id: "alg_4_1",
						title: "4.1 Основные определения графов",
						video: DEFAULT_VIDEO,
						duration: "15:00",
					},
					{
						id: "alg_4_2",
						title: "4.2 Обход в ширину и глубину (BFS/DFS)",
						video: DEFAULT_VIDEO,
						duration: "20:00",
					},
					{
						id: "alg_4_3",
						title: "4.3 Компонента связности",
						video: DEFAULT_VIDEO,
						duration: "15:00",
					},
					{
						id: "alg_4_4",
						title: "4.4 Деревья основные определения",
						video: DEFAULT_VIDEO,
						duration: "15:00",
					},
					{
						id: "alg_4_5",
						title: "4.5 Кучи и сортировка кучей",
						video: DEFAULT_VIDEO,
						duration: "20:00",
					},
				],
			},
			{
				id: 5,
				title: "Модуль 5: Алгоритмические подходы",
				lessons: [
					{
						id: "alg_5_1",
						title: "5.1 Общий подход к рекурсии",
						video: DEFAULT_VIDEO,
						duration: "15:00",
					},
					{
						id: "alg_5_2",
						title: "5.2 Динамическое программирование",
						video: DEFAULT_VIDEO,
						duration: "20:00",
					},
					{
						id: "alg_5_3",
						title: "5.3 Разделяй и властвуй",
						video: DEFAULT_VIDEO,
						duration: "15:00",
					},
				],
			},
		],
	},

	stats: {
		title: "Мат. статистика и A/B тесты",
		totalModules: 11,
		totalDuration: "25 часов",
		progress: 0,
		modules: [
			{
				id: 1,
				title: "Модуль 1: Теория вероятностей",
				lessons: [
					{
						id: "st_1_1",
						title: "1.1 Статистика в ML",
						video: DEFAULT_VIDEO,
						duration: "10:00",
					},
					{
						id: "st_1_2",
						title: "1.2 Введение в теорию вероятностей",
						video: DEFAULT_VIDEO,
						duration: "15:00",
					},
					{
						id: "st_1_3",
						title: "1.3 Условная вероятность. Формула Байеса",
						video: DEFAULT_VIDEO,
						duration: "15:00",
					},
					{
						id: "st_1_4",
						title: "1.4 Введение в статистику",
						video: DEFAULT_VIDEO,
						duration: "12:00",
					},
					{
						id: "st_1_5",
						title: "1.5 Дискретные распределения",
						video: DEFAULT_VIDEO,
						duration: "15:00",
					},
				],
			},
			{
				id: 2,
				title: "Модуль 2: Доверительные интервалы",
				lessons: [
					{
						id: "st_2_1",
						title: "2.1 Для чего нужны доверительные интервалы",
						video: DEFAULT_VIDEO,
						duration: "10:00",
					},
					{
						id: "st_2_2",
						title: "2.2 Построение доверительных интервалов",
						video: DEFAULT_VIDEO,
						duration: "15:00",
					},
					{
						id: "st_2_3",
						title: "2.3 Виды распределений случайных величин",
						video: DEFAULT_VIDEO,
						duration: "15:00",
					},
					{
						id: "st_2_4",
						title: "2.4 Центральная предельная теорема ЦПТ",
						video: DEFAULT_VIDEO,
						duration: "15:00",
					},
					{
						id: "st_2_5",
						title: "2.5 Применение ЦПТ",
						video: DEFAULT_VIDEO,
						duration: "12:00",
					},
					{
						id: "st_2_6",
						title: "2.6 Доверительный интервал для доли",
						video: DEFAULT_VIDEO,
						duration: "10:00",
					},
				],
			},
			{
				id: 3,
				title: "Модуль 3: Корреляция",
				lessons: [
					{
						id: "st_3_1",
						title: "3.1 Статистики распределений, взаимосвязь случайных величин",
						video: DEFAULT_VIDEO,
						duration: "20:00",
					},
				],
			},
			{
				id: 4,
				title: "Модуль 4: Проверка гипотез",
				lessons: [
					{
						id: "st_4_1",
						title: "4.1 Проверка гипотез, параметрические критерии",
						video: DEFAULT_VIDEO,
						duration: "20:00",
					},
				],
			},
			{
				id: 5,
				title: "Модуль 5: Непараметрические критерии",
				lessons: [
					{
						id: "st_5_1",
						title: "5.1 Непараметрические статистические критерии",
						video: DEFAULT_VIDEO,
						duration: "20:00",
					},
				],
			},
			{
				id: 6,
				title: "Модуль 6: MLE (Maximum Likelihood)",
				lessons: [
					{
						id: "st_6_1",
						title: "6.1 Метод максимума правдоподобия и ядерная оценка плотности",
						video: DEFAULT_VIDEO,
						duration: "20:00",
					},
				],
			},
			{
				id: 7,
				title: "Модуль 7: Дизайн тестов",
				lessons: [
					{
						id: "st_7_1",
						title: "7.1 Дизайн AB эксперимента",
						video: DEFAULT_VIDEO,
						duration: "20:00",
					},
				],
			},
			{
				id: 8,
				title: "Модуль 8: Валидация",
				lessons: [
					{
						id: "st_8_1",
						title: "8.1 AA эксперименты и валидация методики экспериментирования",
						video: DEFAULT_VIDEO,
						duration: "15:00",
					},
				],
			},
			{
				id: 9,
				title: "Модуль 9: Ошибки",
				lessons: [
					{
						id: "st_9_1",
						title: "9.1 Ошибки при проведении AB тестов",
						video: DEFAULT_VIDEO,
						duration: "15:00",
					},
				],
			},
			{
				id: 10,
				title: "Модуль 10: Чувствительность метрик",
				lessons: [
					{
						id: "st_10_1",
						title: "10.1 Уменьшение дисперсии. Поправка Cuped",
						video: DEFAULT_VIDEO,
						duration: "15:00",
					},
					{
						id: "st_10_2",
						title: "10.2 Сравнение изменений числа кликов и CTR",
						video: DEFAULT_VIDEO,
						duration: "15:00",
					},
				],
			},
			{
				id: 11,
				title: "Модуль 11: Ограничения",
				lessons: [
					{
						id: "st_11_1",
						title: "11.1 Невозможность проведения AB тестов",
						video: DEFAULT_VIDEO,
						duration: "10:00",
					},
				],
			},
		],
	},

	ml: {
		title: "Classic Machine Learning",
		totalModules: 24,
		totalDuration: "50 часов",
		progress: 0,
		modules: [
			{
				id: 1,
				title: "Модуль 1: Введение",
				lessons: [
					{
						id: "ml_1_1",
						title: "1.1 Задачи машинного обучения",
						video: DEFAULT_VIDEO,
						duration: "10:00",
					},
					{
						id: "ml_1_2",
						title: "1.2 Основные виды машинного обучения",
						video: DEFAULT_VIDEO,
						duration: "10:00",
					},
					{
						id: "ml_1_3",
						title: "1.3 Компоненты классической ML-задачи",
						video: DEFAULT_VIDEO,
						duration: "12:00",
					},
					{
						id: "ml_1_4",
						title: "1.4 Практика",
						video: DEFAULT_VIDEO,
						duration: "15:00",
					},
				],
			},
			{
				id: 2,
				title: "Модуль 2: Метрики",
				lessons: [
					{
						id: "ml_2_1",
						title: "2.1 Оценка качества модели",
						video: DEFAULT_VIDEO,
						duration: "10:00",
					},
					{
						id: "ml_2_2",
						title: "2.2 Понятие функции и функциональной зависимости",
						video: DEFAULT_VIDEO,
						duration: "10:00",
					},
					{
						id: "ml_2_3",
						title: "2.3 Функция потерь Loss function",
						video: DEFAULT_VIDEO,
						duration: "12:00",
					},
					{
						id: "ml_2_4",
						title: "2.4 Функционал качества и метрика",
						video: DEFAULT_VIDEO,
						duration: "10:00",
					},
					{
						id: "ml_2_5",
						title: "2.5 Король и королева регрессии MSE и MAE",
						video: DEFAULT_VIDEO,
						duration: "12:00",
					},
					{
						id: "ml_2_6",
						title: "2.6 Практика",
						video: DEFAULT_VIDEO,
						duration: "15:00",
					},
				],
			},
			{
				id: 3,
				title: "Модуль 3: Линейная регрессия",
				lessons: [
					{
						id: "ml_3_1",
						title: "3.1 Линейные модели в МО",
						video: DEFAULT_VIDEO,
						duration: "10:00",
					},
					{
						id: "ml_3_2",
						title: "3.2 Экстремумы и производная функции",
						video: DEFAULT_VIDEO,
						duration: "12:00",
					},
					{
						id: "ml_3_3",
						title: "3.3 Линейная регрессия OLS",
						video: DEFAULT_VIDEO,
						duration: "15:00",
					},
					{
						id: "ml_3_4",
						title: "3.4 Ликбез №3 Матрицы",
						video: DEFAULT_VIDEO,
						duration: "15:00",
					},
					{
						id: "ml_3_5",
						title: "3.5 Работа с массивами в Numpy",
						video: DEFAULT_VIDEO,
						duration: "15:00",
					},
					{
						id: "ml_3_6",
						title: "3.6 Линейная регрессия OLS Матричная форма",
						video: DEFAULT_VIDEO,
						duration: "15:00",
					},
					{
						id: "ml_3_7",
						title: "3.7 Линейная регрессия в Python. Практика",
						video: DEFAULT_VIDEO,
						duration: "20:00",
					},
				],
			},
			{
				id: 4,
				title: "Модуль 4: Градиентный спуск",
				lessons: [
					{
						id: "ml_4_1",
						title: "4.1 Введение в градиентный спуск",
						video: DEFAULT_VIDEO,
						duration: "15:00",
					},
					{
						id: "ml_4_2",
						title: "4.2 Минимизация функции с несколькими переменными",
						video: DEFAULT_VIDEO,
						duration: "15:00",
					},
					{
						id: "ml_4_3",
						title: "4.3 Линейная регрессия. Подбор параметров",
						video: DEFAULT_VIDEO,
						duration: "15:00",
					},
					{
						id: "ml_4_4",
						title: "4.4 Настройка параметров графика в matplotlib",
						video: DEFAULT_VIDEO,
						duration: "10:00",
					},
					{
						id: "ml_4_5",
						title: "4.5 Изображение градиентного спуска в matplotlib",
						video: DEFAULT_VIDEO,
						duration: "10:00",
					},
				],
			},
			{
				id: 5,
				title: "Модуль 5: Валидация",
				lessons: [
					{
						id: "ml_5_1",
						title: "5.1 Обобщающая способность, кросс валидация",
						video: DEFAULT_VIDEO,
						duration: "15:00",
					},
					{
						id: "ml_5_2",
						title: "5.2 Практика Переобучение и недообучение",
						video: DEFAULT_VIDEO,
						duration: "15:00",
					},
					{
						id: "ml_5_3",
						title: "5.3 Кросс валидация, реальный практический пример",
						video: DEFAULT_VIDEO,
						duration: "20:00",
					},
				],
			},
			{
				id: 6,
				title: "Модуль 6: Регуляризация",
				lessons: [
					{
						id: "ml_6_1",
						title: "6.1 Проблема переобучения в МО",
						video: DEFAULT_VIDEO,
						duration: "10:00",
					},
					{
						id: "ml_6_2",
						title: "6.2 Регуляризация и масштабирование признаков",
						video: DEFAULT_VIDEO,
						duration: "15:00",
					},
					{
						id: "ml_6_3",
						title: "6.3 Ликбез №1 Условный экстремум и регуляризация",
						video: DEFAULT_VIDEO,
						duration: "15:00",
					},
					{
						id: "ml_6_4",
						title: "6.4 Практика №1. Регуляризация",
						video: DEFAULT_VIDEO,
						duration: "15:00",
					},
					{
						id: "ml_6_5",
						title: "6.5 Мультиколлинеарность",
						video: DEFAULT_VIDEO,
						duration: "12:00",
					},
					{
						id: "ml_6_6",
						title: "6.6 Практика №2. Мультиколлинеарность",
						video: DEFAULT_VIDEO,
						duration: "15:00",
					},
				],
			},
			{
				id: 7,
				title: "Модуль 7: Отбор признаков",
				lessons: [
					{
						id: "ml_7_1",
						title: "7.1 EDA",
						video: DEFAULT_VIDEO,
						duration: "15:00",
					},
					{
						id: "ml_7_2",
						title: "7.2 Встроенные методы",
						video: DEFAULT_VIDEO,
						duration: "15:00",
					},
					{
						id: "ml_7_3",
						title: "7.3 Метод обёртки",
						video: DEFAULT_VIDEO,
						duration: "15:00",
					},
					{
						id: "ml_7_4",
						title: "7.4 Метод фильтрации",
						video: DEFAULT_VIDEO,
						duration: "15:00",
					},
				],
			},
			{
				id: 8,
				title: "Модуль 8: Feature Engineering",
				lessons: [
					{
						id: "ml_8_1",
						title: "8.1 Работа с пропущенными значениями",
						video: DEFAULT_VIDEO,
						duration: "15:00",
					},
					{
						id: "ml_8_2",
						title: "8.2 Работа с выбросами Advanced счетчики",
						video: DEFAULT_VIDEO,
						duration: "15:00",
					},
					{
						id: "ml_8_3",
						title: "8.3 Выделение признаков из текста. Подход TF IDF",
						video: DEFAULT_VIDEO,
						duration: "20:00",
					},
					{
						id: "ml_8_4",
						title: "8.4 Лемматизация и стемминг",
						video: DEFAULT_VIDEO,
						duration: "15:00",
					},
				],
			},
			{
				id: 9,
				title: "Модуль 9: Проект Housing Market",
				lessons: [
					{
						id: "ml_9_1",
						title: "9.1 Обработка вещественных признаков",
						video: DEFAULT_VIDEO,
						duration: "15:00",
					},
					{
						id: "ml_9_2",
						title: "9.2 Обработка категориальных признаков",
						video: DEFAULT_VIDEO,
						duration: "15:00",
					},
					{
						id: "ml_9_3",
						title: "9.3 Построение модели",
						video: DEFAULT_VIDEO,
						duration: "20:00",
					},
					{
						id: "ml_9_4",
						title: "9.4 Анализ выбросов",
						video: DEFAULT_VIDEO,
						duration: "15:00",
					},
					{
						id: "ml_9_5",
						title: "9.5 Сегментация данных",
						video: DEFAULT_VIDEO,
						duration: "15:00",
					},
				],
			},
			{
				id: 10,
				title: "Модуль 10: Линейная классификация",
				lessons: [
					{
						id: "ml_10_1",
						title: "10.1 Бинарная классификация, разделяющая гиперплоскость",
						video: DEFAULT_VIDEO,
						duration: "15:00",
					},
					{
						id: "ml_10_2",
						title: "10.2 Как строить разделяющую гиперплоскость",
						video: DEFAULT_VIDEO,
						duration: "15:00",
					},
					{
						id: "ml_10_3",
						title: "10.3 Ликбез 1. Метод верхней оценки",
						video: DEFAULT_VIDEO,
						duration: "15:00",
					},
					{
						id: "ml_10_4",
						title: "10.4 Практика. Линейная бинарная классификация в python",
						video: DEFAULT_VIDEO,
						duration: "20:00",
					},
				],
			},
			{
				id: 11,
				title: "Модуль 11: Матрица ошибок",
				lessons: [
					{
						id: "ml_11_1",
						title: "11.1 Метрики бинарной классификации. Теория",
						video: DEFAULT_VIDEO,
						duration: "15:00",
					},
					{
						id: "ml_11_2",
						title: "11.2 Метрики бинарной классификации. Практика",
						video: DEFAULT_VIDEO,
						duration: "20:00",
					},
				],
			},
			{
				id: 12,
				title: "Модуль 12: Качество классификации",
				lessons: [
					{
						id: "ml_12_1",
						title: "12.1 ROC кривая AUC ROC",
						video: DEFAULT_VIDEO,
						duration: "15:00",
					},
					{
						id: "ml_12_2",
						title: "12.2 PR кривая AUC PR. Практика",
						video: DEFAULT_VIDEO,
						duration: "20:00",
					},
					{
						id: "ml_12_3",
						title: "12.3 Калибровочная кривая модели",
						video: DEFAULT_VIDEO,
						duration: "15:00",
					},
				],
			},
			{
				id: 13,
				title: "Модуль 13: SVM",
				lessons: [
					{
						id: "ml_13_1",
						title: "13.1 Метод опорных векторов SVM_2",
						video: DEFAULT_VIDEO,
						duration: "15:00",
					},
					{
						id: "ml_13_2",
						title: "13.2 Линейная неразделимость - регуляризация",
						video: DEFAULT_VIDEO,
						duration: "15:00",
					},
					{
						id: "ml_13_3",
						title: "13.3 Практика",
						video: DEFAULT_VIDEO,
						duration: "20:00",
					},
				],
			},
			{
				id: 14,
				title: "Модуль 14: Многоклассовая классификация",
				lessons: [
					{
						id: "ml_14_1",
						title: "14.1 Методы one vs all и one vs one",
						video: DEFAULT_VIDEO,
						duration: "15:00",
					},
					{
						id: "ml_14_2",
						title: "14.2 Метрики качества",
						video: DEFAULT_VIDEO,
						duration: "10:00",
					},
					{
						id: "ml_14_3",
						title: "14.3 Практика. Задача сегментации клиентов",
						video: DEFAULT_VIDEO,
						duration: "20:00",
					},
				],
			},
			{
				id: 15,
				title: "Модуль 15: Понижение размерности",
				lessons: [
					{
						id: "ml_15_1",
						title: "15.1 Понижение размерности. Постановка задачи",
						video: DEFAULT_VIDEO,
						duration: "10:00",
					},
					{
						id: "ml_15_2",
						title: "15.2 Метод главных компонент",
						video: DEFAULT_VIDEO,
						duration: "15:00",
					},
					{
						id: "ml_15_3",
						title: "15.3 T-SNE",
						video: DEFAULT_VIDEO,
						duration: "15:00",
					},
					{
						id: "ml_15_4",
						title: "15.4 Практика",
						video: DEFAULT_VIDEO,
						duration: "20:00",
					},
				],
			},
			{
				id: 16,
				title: "Модуль 16: KNN",
				lessons: [
					{
						id: "ml_16_1",
						title: "16.1 Метод K ближайших соседей",
						video: DEFAULT_VIDEO,
						duration: "15:00",
					},
					{
						id: "ml_16_2",
						title: "16.2 Практика. Сравнение линейной регрессии и метода KNN",
						video: DEFAULT_VIDEO,
						duration: "20:00",
					},
					{
						id: "ml_16_3",
						title: "16.3 Гиперпараметры p и h. Перевзвешивание соседей",
						video: DEFAULT_VIDEO,
						duration: "15:00",
					},
					{
						id: "ml_16_4",
						title: "16.4 Практика. Гауссовское ядро",
						video: DEFAULT_VIDEO,
						duration: "15:00",
					},
				],
			},
			{
				id: 17,
				title: "Модуль 17: Решающие деревья (Decision Trees)",
				lessons: [
					{
						id: "ml_17_1",
						title: "17.1 Введение в решающие деревья",
						video: DEFAULT_VIDEO,
						duration: "10:00",
					},
					{
						id: "ml_17_2",
						title: "17.2 Критерии качества и информативности",
						video: DEFAULT_VIDEO,
						duration: "15:00",
					},
					{
						id: "ml_17_3",
						title: "17.3 Критерии останова и жадный алгоритм",
						video: DEFAULT_VIDEO,
						duration: "15:00",
					},
					{
						id: "ml_17_4",
						title: "17.4 Практика",
						video: DEFAULT_VIDEO,
						duration: "20:00",
					},
				],
			},
			{
				id: 18,
				title: "Модуль 18: Переобучение деревьев",
				lessons: [
					{
						id: "ml_18_1",
						title: "18.1 Решающие деревья и проблема переобучения",
						video: DEFAULT_VIDEO,
						duration: "15:00",
					},
					{
						id: "ml_18_2",
						title: "18.2 Практика. Предобработка и трансформация данных",
						video: DEFAULT_VIDEO,
						duration: "20:00",
					},
					{
						id: "ml_18_3",
						title: "18.3 Практика. Обучение модели Decision tree",
						video: DEFAULT_VIDEO,
						duration: "20:00",
					},
				],
			},
			{
				id: 19,
				title: "Модуль 19: Ансамбли (Ensembles)",
				lessons: [
					{
						id: "ml_19_1",
						title: "19.1 Композиции алгоритмов, бэггинг",
						video: DEFAULT_VIDEO,
						duration: "15:00",
					},
					{
						id: "ml_19_2",
						title: "19.2 Random forest",
						video: DEFAULT_VIDEO,
						duration: "15:00",
					},
					{
						id: "ml_19_3",
						title: "19.3 Стекинг",
						video: DEFAULT_VIDEO,
						duration: "15:00",
					},
					{
						id: "ml_19_4",
						title: "19.4 Практика",
						video: DEFAULT_VIDEO,
						duration: "20:00",
					},
				],
			},
			{
				id: 20,
				title: "Модуль 20: Градиентный бустинг",
				lessons: [
					{
						id: "ml_20_1",
						title: "20.1 Бустинг",
						video: DEFAULT_VIDEO,
						duration: "15:00",
					},
					{
						id: "ml_20_2",
						title: "20.2 Градиентный бустинг",
						video: DEFAULT_VIDEO,
						duration: "15:00",
					},
					{
						id: "ml_20_3",
						title: "20.3 Bias-variance tradeoff",
						video: DEFAULT_VIDEO,
						duration: "15:00",
					},
					{
						id: "ml_20_4",
						title: "20.4 Практика",
						video: DEFAULT_VIDEO,
						duration: "20:00",
					},
				],
			},
			{
				id: 21,
				title: "Модуль 21: Кластеризация",
				lessons: [
					{
						id: "ml_21_1",
						title: "21.1 Введение",
						video: DEFAULT_VIDEO,
						duration: "10:00",
					},
					{
						id: "ml_21_2",
						title: "21.2 K-means",
						video: DEFAULT_VIDEO,
						duration: "15:00",
					},
					{
						id: "ml_21_3",
						title: "21.3 DBSCAN",
						video: DEFAULT_VIDEO,
						duration: "15:00",
					},
					{
						id: "ml_21_4",
						title: "21.4 Практика",
						video: DEFAULT_VIDEO,
						duration: "20:00",
					},
				],
			},
			{
				id: 22,
				title: "Модуль 22: Рекомендательные системы",
				lessons: [
					{
						id: "ml_22_1",
						title: "22.1 Контентная рекомендация",
						video: DEFAULT_VIDEO,
						duration: "15:00",
					},
					{
						id: "ml_22_2",
						title: "22.2 Коллаборативная фильтрация",
						video: DEFAULT_VIDEO,
						duration: "15:00",
					},
					{
						id: "ml_22_3",
						title: "22.3 Оценка качества и валидация",
						video: DEFAULT_VIDEO,
						duration: "15:00",
					},
					{
						id: "ml_22_4",
						title: "22.4 Практика построение модели",
						video: DEFAULT_VIDEO,
						duration: "20:00",
					},
				],
			},
			{
				id: 23,
				title: "Модуль 23: Итоги",
				lessons: [
					{
						id: "ml_23_1",
						title: "23.1 Общие вопросы",
						video: DEFAULT_VIDEO,
						duration: "15:00",
					},
					{
						id: "ml_23_2",
						title: "23.2 Вопросы о линейных моделях",
						video: DEFAULT_VIDEO,
						duration: "15:00",
					},
				],
			},
			{
				id: 24,
				title: "Модуль 24: Финал",
				lessons: [
					{
						id: "ml_24_1",
						title: "24.1 Финал курса",
						video: DEFAULT_VIDEO,
						duration: "05:00",
					},
				],
			},
		],
	},

	dl: {
		title: "Deep Learning",
		totalModules: 10,
		totalDuration: "35 часов",
		progress: 0,
		modules: [
			{
				id: 1,
				title: "Модуль 1: Основы DL",
				lessons: [
					{
						id: "dl_1_1",
						title: "1.1 Введение. Полносвязные слои. Функции активации",
						video: DEFAULT_VIDEO,
						duration: "20:00",
					},
					{
						id: "dl_1_2",
						title: "1.2 Семинар",
						video: DEFAULT_VIDEO,
						duration: "20:00",
					},
				],
			},
			{
				id: 2,
				title: "Модуль 2: Обучение сетей",
				lessons: [
					{
						id: "dl_2_1",
						title: "2.1 Градиентный спуск и методы оптимизации. Лекция",
						video: DEFAULT_VIDEO,
						duration: "20:00",
					},
					{
						id: "dl_2_2",
						title: "2.2 Обучение нейронных сетей. Лекция",
						video: DEFAULT_VIDEO,
						duration: "20:00",
					},
					{
						id: "dl_2_3",
						title: "2.3 Высокоуровневое API для обучения нейросети. Семинар",
						video: DEFAULT_VIDEO,
						duration: "20:00",
					},
					{
						id: "dl_2_4",
						title: "2.4 Обучение первой нейросети в PyTorch. Семинар",
						video: DEFAULT_VIDEO,
						duration: "25:00",
					},
				],
			},
			{
				id: 3,
				title: "Модуль 3: CNN (Сверточные сети)",
				lessons: [
					{
						id: "dl_3_1",
						title: "3.1 Сверточные нейронные сети. Лекция",
						video: DEFAULT_VIDEO,
						duration: "20:00",
					},
					{
						id: "dl_3_2",
						title: "3.2 Сверточные нейронные сети. Семинар",
						video: DEFAULT_VIDEO,
						duration: "20:00",
					},
				],
			},
			{
				id: 4,
				title: "Модуль 4: Тюнинг нейросетей",
				lessons: [
					{
						id: "dl_4_1",
						title: "4.1 Регуляризация и нормализация. Batch нормализация",
						video: DEFAULT_VIDEO,
						duration: "15:00",
					},
					{
						id: "dl_4_2",
						title: "4.2 Нормализация. Инициализация. Аугментация",
						video: DEFAULT_VIDEO,
						duration: "20:00",
					},
					{
						id: "dl_4_3",
						title: "4.3 Практика",
						video: DEFAULT_VIDEO,
						duration: "20:00",
					},
				],
			},
			{
				id: 5,
				title: "Модуль 5: Архитектуры CNN",
				lessons: [
					{
						id: "dl_5_1",
						title: "5.1 Популярные архитектуры CNN. Перенос знаний",
						video: DEFAULT_VIDEO,
						duration: "20:00",
					},
				],
			},
			{
				id: 6,
				title: "Модуль 6: Компьютерное зрение (Object Detection)",
				lessons: [
					{
						id: "dl_6_1",
						title: "6.1 Сегментация объектов",
						video: DEFAULT_VIDEO,
						duration: "15:00",
					},
					{
						id: "dl_6_2",
						title: "6.2 Практика по сегментации",
						video: DEFAULT_VIDEO,
						duration: "20:00",
					},
					{
						id: "dl_6_3",
						title: "6.3 Детекция объектов",
						video: DEFAULT_VIDEO,
						duration: "15:00",
					},
					{
						id: "dl_6_4",
						title: "6.4 Практика по детекции",
						video: DEFAULT_VIDEO,
						duration: "20:00",
					},
				],
			},
			{
				id: 7,
				title: "Модуль 7: Лица и Автоэнкодеры",
				lessons: [
					{
						id: "dl_7_1",
						title: "7.1 Автоэнкодеры",
						video: DEFAULT_VIDEO,
						duration: "15:00",
					},
					{
						id: "dl_7_2",
						title: "7.2 Идентификация лиц",
						video: DEFAULT_VIDEO,
						duration: "15:00",
					},
					{
						id: "dl_7_3",
						title: "7.3 Автоэнкодеры на практике",
						video: DEFAULT_VIDEO,
						duration: "20:00",
					},
					{
						id: "dl_7_4",
						title: "7.4 Распознавание лиц на практике",
						video: DEFAULT_VIDEO,
						duration: "20:00",
					},
				],
			},
			{
				id: 8,
				title: "Модуль 8: NLP - Векторы",
				lessons: [
					{
						id: "dl_8_1",
						title: "8.1 Векторные представления текстов. Лекция",
						video: DEFAULT_VIDEO,
						duration: "20:00",
					},
					{
						id: "dl_8_2",
						title: "8.2 Векторные представления текстов. Семинар",
						video: DEFAULT_VIDEO,
						duration: "20:00",
					},
				],
			},
			{
				id: 9,
				title: "Модуль 9: NLP - RNN & Attention",
				lessons: [
					{
						id: "dl_9_1",
						title: "9.1 Реккурентные нейронные сети (RNN)",
						video: DEFAULT_VIDEO,
						duration: "20:00",
					},
					{
						id: "dl_9_2",
						title: "9.3 Трансформер",
						video: DEFAULT_VIDEO,
						duration: "20:00",
					},
					{
						id: "dl_9_3",
						title: "9.4 Практика",
						video: DEFAULT_VIDEO,
						duration: "20:00",
					},
				],
			},
			{
				id: 10,
				title: "Модуль 10: Трансформеры (SOTA)",
				lessons: [
					{
						id: "dl_10_1",
						title: "10.1 Трансформер своими руками",
						video: DEFAULT_VIDEO,
						duration: "25:00",
					},
					{
						id: "dl_10_2",
						title: "10.2 Bert",
						video: DEFAULT_VIDEO,
						duration: "15:00",
					},
					{
						id: "dl_10_3",
						title: "10.3 GPT",
						video: DEFAULT_VIDEO,
						duration: "15:00",
					},
				],
			},
		],
	},

	career: {
		title: "Карьера и Трудоустройство",
		totalModules: 2,
		totalDuration: "5 часов",
		progress: 0,
		modules: [
			{
				id: 1,
				title: "Модуль 1: Собеседования",
				lessons: [
					{
						id: "car_1_1",
						title: "1.1 Машинное обучение: повторение",
						video: DEFAULT_VIDEO,
						duration: "20:00",
					},
					{
						id: "car_1_2",
						title: "1.2 Собеседования по теории вероятностей и статистике",
						video: DEFAULT_VIDEO,
						duration: "20:00",
					},
					{
						id: "car_1_3",
						title: "1.3 Собеседования по AB тестированию",
						video: DEFAULT_VIDEO,
						duration: "20:00",
					},
				],
			},
			{
				id: 2,
				title: "Модуль 2: Трудоустройство",
				lessons: [
					{
						id: "car_2_1",
						title: "2.1 Трудоустройство - первые шаги",
						video: DEFAULT_VIDEO,
						duration: "15:00",
					},
					{
						id: "car_2_2",
						title: "2.2 Гайд для ML и оформление",
						video: DEFAULT_VIDEO,
						duration: "15:00",
					},
				],
			},
		],
	},
};

// 3. UI FUNCTIONS
function renderCourseList(courseId) {
	const course = COURSES_DB[courseId];
	const container = document.getElementById("course-modules");
	const titleEl = document.getElementById("course-title");
	const progressEl = document.getElementById("course-progress");
	const progressTextEl = document.getElementById("course-progress-text");

	if (!container || !course) return;

	titleEl.innerText = course.title;
	const userCourseProgress = userProgress[courseId] || {
		completed: [],
		current: 0,
	};
	const totalLessons = course.modules.reduce(
		(acc, m) => acc + m.lessons.length,
		0
	);
	const completedCount = userCourseProgress.completed.length;
	const percent =
		totalLessons === 0
			? 0
			: Math.round((completedCount / totalLessons) * 100);

	progressEl.style.width = `${percent}%`;
	progressTextEl.innerText = `${percent}% завершено`;

	container.innerHTML = course.modules
		.map(
			(module) => `
		<div class="mb-6">
			<h3 class="text-lg font-semibold text-white mb-3">${module.title}</h3>
			<div class="space-y-2">
				${module.lessons
					.map((lesson) => {
						const isCompleted =
							userCourseProgress.completed.includes(lesson.id);
						return `
						<div onclick="openLesson('${courseId}', '${lesson.id}')" 
							 class="flex items-center p-3 rounded-lg cursor-pointer transition-colors ${
									isCompleted
										? "bg-green-900/20 border border-green-500/30"
										: "bg-white/5 border border-white/10 hover:bg-white/10"
								}">
							<div class="mr-3">
								${
									isCompleted
										? '<i data-lucide="check-circle" class="w-5 h-5 text-green-500"></i>'
										: '<i data-lucide="play-circle" class="w-5 h-5 text-slate-400"></i>'
								}
							</div>
							<div class="flex-1">
								<div class="text-sm font-medium text-white">${lesson.title}</div>
								<div class="text-xs text-slate-400">${lesson.duration}</div>
							</div>
						</div>
					`;
					})
					.join("")}
			</div>
		</div>
	`
		)
		.join("");

	if (typeof lucide !== "undefined") lucide.createIcons();
}

function openLesson(courseId, lessonId) {
	window.location.href = `lesson.html?course=${courseId}&lesson=${lessonId}`;
}

// 4. AUTH & INIT
if (auth) {
	auth.onAuthStateChanged((user) => {
		currentUser = user;
		if (user) {
			console.log("User logged in:", user.email);
			loadUserProgress();
		} else {
			console.log("No user");
			// Redirect to landing if needed, or stay
		}
	});
}

function loadUserProgress() {
	if (!currentUser || !db) return;
	db.collection("users")
		.doc(currentUser.uid)
		.get()
		.then((doc) => {
			if (doc.exists) {
				userProgress = doc.data().progress || {};
				userName = doc.data().name || "Студент";
				document
					.querySelectorAll(".user-name-display")
					.forEach((el) => (el.innerText = userName));

				// Auto-load course if on dashboard
				const urlParams = new URLSearchParams(window.location.search);
				const currentCourse = urlParams.get("course") || "python";
				renderCourseList(currentCourse);
			}
		});
}

// Global scope expose
window.openLesson = openLesson;
window.renderCourseList = renderCourseList;

// On Load
document.addEventListener("DOMContentLoaded", () => {
	const urlParams = new URLSearchParams(window.location.search);
	const courseId = urlParams.get("course") || "python";

	// Highlight sidebar
	document.querySelectorAll(".sidebar-link").forEach((link) => {
		if (link.getAttribute("href").includes(courseId)) {
			link.classList.add("bg-indigo-600", "text-white");
			link.classList.remove("text-slate-400");
		}
	});

	if (typeof lucide !== "undefined") lucide.createIcons();

	// Desktop check
	if (window.innerWidth >= 1024) {
		// Example function if defined elsewhere
		// checkDesktop();
	}
});

function logout() {
	if (confirm("Выйти?"))
		auth.signOut().then(() => (window.location.href = "landing.html"));
}

window.switchTab = function (id) {
	document
		.querySelectorAll(".tab-content")
		.forEach((e) => e.classList.remove("active"));
	document.getElementById("tab-" + id).classList.add("active");

	const tabButtons = [
		document.getElementById("tab-btn-desc"),
		document.getElementById("tab-btn-homework"),
	];

	tabButtons.forEach((btn) => {
		if (btn) {
			btn.classList.remove("bg-indigo-600", "text-white", "shadow");
			btn.classList.add(
				"text-slate-400",
				"hover:text-white",
				"hover:bg-white/5"
			);
		}
	});

	const activeBtn = document.getElementById(`tab-btn-${id}`);
	if (activeBtn) {
		activeBtn.classList.add("bg-indigo-600", "text-white", "shadow");
		activeBtn.classList.remove(
			"text-slate-400",
			"hover:text-white",
			"hover:bg-white/5"
		);
	}
};

window.togglePasswordVisibility = function (inputId, iconId) {
	const input = document.getElementById(inputId);
	const icon = document.getElementById(iconId);
	if (input.type === "password") {
		input.type = "text";
		icon.setAttribute("data-lucide", "eye-off");
	} else {
		input.type = "password";
		icon.setAttribute("data-lucide", "eye");
	}
	lucide.createIcons();
};
