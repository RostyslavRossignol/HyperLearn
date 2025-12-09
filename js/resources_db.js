/* =============================================================================
   ФАЙЛ КОНФИГУРАЦИИ КОНТЕНТА (ADMIN ZONE)
   =============================================================================
*/

// --- 1. ИНСТРУМЕНТЫ ---
export const TOOLS_DB = [
	{
		title: "Jupyter Notebook Online",
		url: "https://jupyter.org/try",
		icon: "cpu",
		desc: "Код в браузере",
	},
	{
		title: "Kaggle",
		url: "https://www.kaggle.com",
		icon: "database",
		desc: "Датасеты и соревнования",
	},
	{
		title: "Google Colab",
		url: "https://colab.research.google.com",
		icon: "cloud",
		desc: "Бесплатный GPU",
	},
	{
		title: "Regex 101",
		url: "https://regex101.com",
		icon: "code",
		desc: "Тест регулярных выражений",
	},
];

// --- 2. РЕСУРСЫ ---
export const RESOURCES_DB = [
	{
		category: "Видео и Лекции",
		items: [
			{
				title: "3Blue1Brown (Нейросети)",
				url: "https://www.youtube.com/c/3blue1brown",
				tags: ["YouTube"],
			},
			{
				title: "Лекции ШАД Яндекс",
				url: "https://yandexdataschool.ru/",
				tags: ["YouTube", "Hardcore"],
			},
		],
	},
	{
		category: "Документация",
		items: [
			{
				title: "Pandas Docs",
				url: "https://pandas.pydata.org/",
				tags: ["Docs"],
			},
			{
				title: "Scikit-Learn",
				url: "https://scikit-learn.org/",
				tags: ["Docs"],
			},
		],
	},
];

// --- 3. МАТЕРИАЛЫ УРОКОВ ---
// Привязка материалов выполнена строго по предоставленному списку.
// PDF прикреплены к первому уроку соответствующего модуля.

export const LESSON_ATTACHMENTS = {
	// ==========================================
	// КУРС 1: Python для Data Science
	// ==========================================

	// Модуль 0
	py_0_1: { hasContent: false, files: [] },
	py_0_2: { hasContent: false, files: [] },

	// Модуль 1: Основы Python
	py_1_1: {
		hasContent: true,
		topDescription:
			"В этом уроке мы разберем базовый синтаксис Python, переменные и типы данных.",
		htmlContent: `
            <h3>Всем привет!</h3>
            <p>Добро пожаловать на первый блок "Прикладная разработка на Python"!</p>
            <p>Первые несколько уроков данного блока будут посвящены основам Python, знание которых сделает нашу дальнейшую работу с данными гораздо приятнее. Базовые навыки программирования на Python понадобятся нам, чтобы в дальнейшем освоить методы машинного обучения.</p>
            <hr class="border-white/10 my-8">
            <h3>Базовый синтаксис</h3>
            <p>Наше первое задание :) Начнем с простого. Создайте переменную <code>i</code> и запишите в нее значение 3.</p>
        `,
		files: [
			{
				name: "Основы_программирования_Python.pdf",
				url: "#",
				type: "pdf",
			},
			{ name: "Задания.pdf", url: "#", type: "pdf" },
		],
	},
	py_1_2: { hasContent: false, files: [] },
	py_1_3: { hasContent: false, files: [] },
	py_1_4: { hasContent: false, files: [] },
	py_1_5: { hasContent: false, files: [] },

	// Модуль 2: Структуры данных и функции
	py_2_1: {
		hasContent: false,
		files: [{ name: "Функции..Срезы...pdf", url: "#", type: "pdf" }],
	},
	py_2_2: { hasContent: false, files: [] },
	py_2_3: { hasContent: false, files: [] },
	py_2_4: { hasContent: false, files: [] },
	py_2_5: { hasContent: false, files: [] },
	py_2_6: { hasContent: false, files: [] },
	py_2_7: { hasContent: false, files: [] },

	// Модуль 3: Окружение
	py_3_0: {
		hasContent: false,
		files: [{ name: "Внешние_модули...pdf", url: "#", type: "pdf" }],
	},
	py_3_1: { hasContent: false, files: [] },
	py_3_2: { hasContent: false, files: [] },
	py_3_3: { hasContent: false, files: [] },
	py_3_4: { hasContent: false, files: [] },
	py_3_5: { hasContent: false, files: [] },
	py_3_6: { hasContent: false, files: [] },
	py_3_7: { hasContent: false, files: [] },

	// Модуль 4: Инструменты (Jupyter, Numpy)
	py_4_1: {
		hasContent: false,
		files: [{ name: "Обзор numpy, pandas....pdf", url: "#", type: "pdf" }],
	},
	py_4_2: { hasContent: false, files: [] },
	py_4_3: { hasContent: false, files: [] },
	py_4_4: { hasContent: false, files: [] },
	py_4_5: { hasContent: false, files: [] },
	py_4_6: { hasContent: false, files: [] },
	py_4_7: { hasContent: false, files: [] },
	py_4_8: { hasContent: false, files: [] },
	py_4_9: { hasContent: false, files: [] },

	// Модуль 5: Pandas (Обработка данных)
	py_5_1: {
		hasContent: false,
		files: [
			{ name: "pandas.pdf", url: "#", type: "pdf" },
			{ name: "Минипроект.pdf", url: "#", type: "pdf" },
		],
	},
	py_5_2: { hasContent: false, files: [] },
	py_5_3: { hasContent: false, files: [] },
	py_5_4: { hasContent: false, files: [] },
	py_5_5: { hasContent: false, files: [] },
	py_5_6: { hasContent: false, files: [] },
	py_5_7: { hasContent: false, files: [] },
	py_5_8: { hasContent: false, files: [] },

	// Модуль 6: SQL и Базы данных
	py_6_1: {
		hasContent: false,
		files: [
			{ name: "Базы_данных_в_Python_основы.pdf", url: "#", type: "pdf" },
			{ name: "Redash.pdf", url: "#", type: "pdf" },
		],
	},
	py_6_2: { hasContent: false, files: [] },
	py_6_3: { hasContent: false, files: [] },
	py_6_4: { hasContent: false, files: [] },

	// Модуль 7: ООП
	py_7_1: {
		hasContent: false,
		files: [{ name: "Классы_и_ООП.pdf", url: "#", type: "pdf" }],
	},
	py_7_2: { hasContent: false, files: [] },
	py_7_3: { hasContent: false, files: [] },

	// Модуль 8: Git
	py_8_1: {
		hasContent: false,
		files: [
			{ name: "Версионирование_кода_и_git.pdf", url: "#", type: "pdf" },
		],
	},
	py_8_2: { hasContent: false, files: [] },
	py_8_3: { hasContent: false, files: [] },
	py_8_4: { hasContent: false, files: [] },
	py_8_5: { hasContent: false, files: [] },
	py_8_6: { hasContent: false, files: [] },
	py_8_7: { hasContent: false, files: [] },

	// Модуль 9: Backend (FastAPI)
	py_9_1: {
		hasContent: false,
		files: [
			{ name: "Backend-разработка.. FastAPI.pdf", url: "#", type: "pdf" },
		],
	},
	py_9_2: { hasContent: false, files: [] },
	py_9_3: { hasContent: false, files: [] },
	py_9_4: { hasContent: false, files: [] },
	py_9_5: { hasContent: false, files: [] },
	py_9_6: { hasContent: false, files: [] },

	// Модуль 10: ORM (SQLAlchemy)
	py_10_1: {
		hasContent: false,
		files: [
			{ name: "Базы_данных_в_Python_ORM.pdf", url: "#", type: "pdf" },
		],
	},
	py_10_2: { hasContent: false, files: [] },

	// Модуль 11: Airflow
	py_11_1: {
		hasContent: false,
		files: [{ name: "Airflow_Обзор_платформы.pdf", url: "#", type: "pdf" }],
	},
	py_11_2: { hasContent: false, files: [] },
	py_11_3: { hasContent: false, files: [] },
	py_11_4: { hasContent: false, files: [] },
	py_11_5: { hasContent: false, files: [] },
	py_11_6: { hasContent: false, files: [] },
	py_11_7: { hasContent: false, files: [] },

	// Модуль 12: Best Practices
	py_12_1: {
		hasContent: false,
		files: [
			{ name: "Полезные_вещи_в_разработке.pdf", url: "#", type: "pdf" },
		],
	},
	py_12_2: { hasContent: false, files: [] },
	py_12_3: { hasContent: false, files: [] },
	py_12_4: { hasContent: false, files: [] },
	py_12_5: { hasContent: false, files: [] },
	py_12_6: { hasContent: false, files: [] },

	// ==========================================
	// КУРС 2: Алгоритмы и Структуры Данных
	// ==========================================

	// Модуль 1: Введение
	alg_1_1: {
		hasContent: false,
		files: [
			{
				name: "Что обычно спрашивают на собеседованиях.pdf",
				url: "#",
				type: "pdf",
			},
		],
	},

	// Модуль 2: Сложность алгоритмов
	alg_2_1: {
		hasContent: false,
		files: [
			{
				name: "Методы_оценки_сложности_алгоритмов.pdf",
				url: "#",
				type: "pdf",
			},
		],
	},
	alg_2_2: { hasContent: false, files: [] },
	alg_2_3: { hasContent: false, files: [] },
	alg_2_4: { hasContent: false, files: [] },
	alg_2_5: { hasContent: false, files: [] },
	alg_2_6: { hasContent: false, files: [] },

	// Модуль 3: Базовые структуры
	alg_3_1: {
		hasContent: false,
		files: [
			{
				name: "Программирование_на_Python_задачи_и_теория_на_массивы....pdf",
				url: "#",
				type: "pdf",
			},
		],
	},
	alg_3_2: { hasContent: false, files: [] },
	alg_3_3: { hasContent: false, files: [] },
	alg_3_4: { hasContent: false, files: [] },

	// Модуль 4: Деревья и Графы
	alg_4_1: {
		hasContent: false,
		files: [
			{
				name: "Программирование...задачи_и_теория_на_деревья_и_графы.pdf",
				url: "#",
				type: "pdf",
			},
		],
	},
	alg_4_2: { hasContent: false, files: [] },
	alg_4_3: { hasContent: false, files: [] },
	alg_4_4: { hasContent: false, files: [] },
	alg_4_5: { hasContent: false, files: [] },

	// Модуль 5: Алгоритмические подходы
	alg_5_1: {
		hasContent: false,
		files: [
			{
				name: "Задачи_на_динамическое_программирование.pdf",
				url: "#",
				type: "pdf",
			},
		],
	},
	alg_5_2: { hasContent: false, files: [] },
	alg_5_3: { hasContent: false, files: [] },

	// ==========================================
	// КУРС 3: Математическая статистика и A/B тесты
	// ==========================================

	// Модуль 1: Теория вероятностей
	st_1_1: {
		hasContent: false,
		files: [
			{
				name: "Зачем_нужна_статистика_и_AB_тесты.pdf",
				url: "#",
				type: "pdf",
			},
		],
	},
	st_1_2: { hasContent: false, files: [] },
	st_1_3: { hasContent: false, files: [] },
	st_1_4: { hasContent: false, files: [] },
	st_1_5: { hasContent: false, files: [] },

	// Модуль 2: Доверительные интервалы
	st_2_1: {
		hasContent: false,
		files: [{ name: "Доверительные_интервалы.pdf", url: "#", type: "pdf" }],
	},
	st_2_2: { hasContent: false, files: [] },
	st_2_3: { hasContent: false, files: [] },
	st_2_4: { hasContent: false, files: [] },
	st_2_5: { hasContent: false, files: [] },
	st_2_6: { hasContent: false, files: [] },

	// Модуль 3: Корреляция
	st_3_1: {
		hasContent: false,
		files: [
			{
				name: "Статистики_распределений...показатели_корреляции.pdf",
				url: "#",
				type: "pdf",
			},
		],
	},

	// Модуль 4: Проверка гипотез
	st_4_1: {
		hasContent: false,
		files: [
			{
				name: "Проверка_гипотез_параметрические....pdf",
				url: "#",
				type: "pdf",
			},
		],
	},

	// Модуль 5: Непараметрические критерии
	st_5_1: {
		hasContent: false,
		files: [
			{
				name: "Непараметрические_статистические_критерии.pdf",
				url: "#",
				type: "pdf",
			},
		],
	},

	// Модуль 6: MLE
	st_6_1: {
		hasContent: false,
		files: [
			{
				name: "Метод_максимума_правдоподобия....pdf",
				url: "#",
				type: "pdf",
			},
		],
	},

	// Модуль 7: Дизайн тестов
	st_7_1: {
		hasContent: false,
		files: [{ name: "Дизайн_AB_эксперимента.pdf", url: "#", type: "pdf" }],
	},

	// Модуль 8: Валидация
	st_8_1: {
		hasContent: false,
		files: [{ name: "AA-эксперименты....pdf", url: "#", type: "pdf" }],
	},

	// Модуль 9: Ошибки
	st_9_1: { hasContent: false, files: [] },

	// Модуль 10: Чувствительность метрик
	st_10_1: {
		hasContent: false,
		files: [
			{
				name: "Увеличение_чувствительности_A_B_тестов.pdf",
				url: "#",
				type: "pdf",
			},
		],
	},
	st_10_2: { hasContent: false, files: [] },

	// Модуль 11: Ограничения
	st_11_1: {
		hasContent: false,
		files: [
			{
				name: "Невозможность_проведения_AB_тестов.pdf",
				url: "#",
				type: "pdf",
			},
		],
	},

	// ==========================================
	// КУРС 4: Classic Machine Learning
	// ==========================================

	// Модуль 1
	ml_1_1: { hasContent: false, files: [] },
	ml_1_2: { hasContent: false, files: [] },
	ml_1_3: { hasContent: false, files: [] },
	ml_1_4: { hasContent: false, files: [] },

	// Модуль 2: Метрики
	ml_2_1: {
		hasContent: false,
		files: [
			{
				name: "Оценка_качества_работы_моделей.pdf",
				url: "#",
				type: "pdf",
			},
		],
	},
	ml_2_2: { hasContent: false, files: [] },
	ml_2_3: { hasContent: false, files: [] },
	ml_2_4: { hasContent: false, files: [] },
	ml_2_5: { hasContent: false, files: [] },
	ml_2_6: { hasContent: false, files: [] },

	// Модуль 3: Линейная регрессия
	ml_3_1: {
		hasContent: false,
		files: [{ name: "Линейная_регрессия.pdf", url: "#", type: "pdf" }],
	},
	ml_3_2: { hasContent: false, files: [] },
	ml_3_3: {
		hasContent: false,
		topDescription: "Линейная регрессия OLS.",
		files: [{ name: "housing_data.csv", url: "#", type: "csv" }],
	},
	ml_3_4: { hasContent: false, files: [] },
	ml_3_5: { hasContent: false, files: [] },
	ml_3_6: { hasContent: false, files: [] },
	ml_3_7: { hasContent: false, files: [] },

	// Модуль 4: Градиентный спуск
	ml_4_1: {
		hasContent: false,
		files: [{ name: "Градиентный_спуск.pdf", url: "#", type: "pdf" }],
	},
	ml_4_2: { hasContent: false, files: [] },
	ml_4_3: { hasContent: false, files: [] },
	ml_4_4: { hasContent: false, files: [] },
	ml_4_5: { hasContent: false, files: [] },

	// Модуль 5: Валидация
	ml_5_1: {
		hasContent: false,
		files: [
			{ name: "Обобщающая_способность....pdf", url: "#", type: "pdf" },
		],
	},
	ml_5_2: { hasContent: false, files: [] },
	ml_5_3: { hasContent: false, files: [] },

	// Модуль 6: Регуляризация
	ml_6_1: {
		hasContent: false,
		files: [
			{
				name: "Мультиколлинеарность_регуляризация....pdf",
				url: "#",
				type: "pdf",
			},
		],
	},
	ml_6_2: { hasContent: false, files: [] },
	ml_6_3: { hasContent: false, files: [] },
	ml_6_4: { hasContent: false, files: [] },
	ml_6_5: { hasContent: false, files: [] },
	ml_6_6: { hasContent: false, files: [] },

	// Модуль 7: Отбор признаков
	ml_7_1: {
		hasContent: false,
		files: [{ name: "Методы_отбора_признаков.pdf", url: "#", type: "pdf" }],
	},
	ml_7_2: { hasContent: false, files: [] },
	ml_7_3: { hasContent: false, files: [] },
	ml_7_4: { hasContent: false, files: [] },

	// Модуль 8: Feature Engineering
	ml_8_1: {
		hasContent: false,
		files: [
			{
				name: "Полезные_приемы_при_работе_с_данными.pdf",
				url: "#",
				type: "pdf",
			},
		],
	},
	ml_8_2: { hasContent: false, files: [] },
	ml_8_3: { hasContent: false, files: [] },
	ml_8_4: { hasContent: false, files: [] },

	// Модуль 9: Проект Housing Market
	ml_9_1: {
		hasContent: false,
		files: [{ name: "Housing_market_практика.pdf", url: "#", type: "pdf" }],
	},
	ml_9_2: { hasContent: false, files: [] },
	ml_9_3: { hasContent: false, files: [] },
	ml_9_4: { hasContent: false, files: [] },
	ml_9_5: { hasContent: false, files: [] },

	// Модуль 10: Линейная классификация
	ml_10_1: {
		hasContent: false,
		files: [
			{
				name: "Линейная_классификация_оценка_вероятности.pdf",
				url: "#",
				type: "pdf",
			},
		],
	},
	ml_10_2: { hasContent: false, files: [] },
	ml_10_3: { hasContent: false, files: [] },
	ml_10_4: { hasContent: false, files: [] },

	// Модуль 11: Матрица ошибок
	ml_11_1: {
		hasContent: false,
		files: [{ name: "Матрица_ошибок....pdf", url: "#", type: "pdf" }],
	},
	ml_11_2: { hasContent: false, files: [] },

	// Модуль 12: Качество классификации
	ml_12_1: {
		hasContent: false,
		files: [{ name: "ROC_PR-кривые....pdf", url: "#", type: "pdf" }],
	},
	ml_12_2: { hasContent: false, files: [] },
	ml_12_3: { hasContent: false, files: [] },

	// Модуль 13: SVM
	ml_13_1: {
		hasContent: false,
		files: [{ name: "Метод_опорных_векторов.pdf", url: "#", type: "pdf" }],
	},
	ml_13_2: { hasContent: false, files: [] },
	ml_13_3: { hasContent: false, files: [] },

	// Модуль 14: Многоклассовая классификация
	ml_14_1: {
		hasContent: false,
		files: [
			{
				name: "Многоклассовая_классификация....pdf",
				url: "#",
				type: "pdf",
			},
		],
	},
	ml_14_2: { hasContent: false, files: [] },
	ml_14_3: { hasContent: false, files: [] },

	// Модуль 15: Понижение размерности
	ml_15_1: {
		hasContent: false,
		files: [
			{ name: "Понижение_размерности....pdf", url: "#", type: "pdf" },
		],
	},
	ml_15_2: { hasContent: false, files: [] },
	ml_15_3: { hasContent: false, files: [] },
	ml_15_4: { hasContent: false, files: [] },

	// Модуль 16: KNN
	ml_16_1: {
		hasContent: false,
		files: [
			{ name: "Метод_K_ближайших_соседей....pdf", url: "#", type: "pdf" },
		],
	},
	ml_16_2: { hasContent: false, files: [] },
	ml_16_3: { hasContent: false, files: [] },
	ml_16_4: { hasContent: false, files: [] },

	// Модуль 17: Решающие деревья
	ml_17_1: {
		hasContent: false,
		files: [
			{
				name: "Решающее_дерево_постановка_задачи....pdf",
				url: "#",
				type: "pdf",
			},
		],
	},
	ml_17_2: { hasContent: false, files: [] },
	ml_17_3: { hasContent: false, files: [] },
	ml_17_4: { hasContent: false, files: [] },

	// Модуль 18: Переобучение деревьев
	ml_18_1: {
		hasContent: false,
		files: [
			{
				name: "Решающее_дерево_проблемы_с_обобщающей....pdf",
				url: "#",
				type: "pdf",
			},
		],
	},
	ml_18_2: { hasContent: false, files: [] },
	ml_18_3: { hasContent: false, files: [] },

	// Модуль 19: Ансамбли
	ml_19_1: {
		hasContent: false,
		files: [
			{
				name: "Композиции_алгоритмов_случайный_лес.pdf",
				url: "#",
				type: "pdf",
			},
		],
	},
	ml_19_2: { hasContent: false, files: [] },
	ml_19_3: { hasContent: false, files: [] },
	ml_19_4: { hasContent: false, files: [] },

	// Модуль 20: Градиентный бустинг
	ml_20_1: {
		hasContent: false,
		files: [
			{
				name: "Градиентный_бустинг_bias-variance_tradeoff.pdf",
				url: "#",
				type: "pdf",
			},
		],
	},
	ml_20_2: { hasContent: false, files: [] },
	ml_20_3: { hasContent: false, files: [] },
	ml_20_4: { hasContent: false, files: [] },

	// Модуль 21: Кластеризация
	ml_21_1: {
		hasContent: false,
		files: [{ name: "Кластеризация.pdf", url: "#", type: "pdf" }],
	},
	ml_21_2: { hasContent: false, files: [] },
	ml_21_3: { hasContent: false, files: [] },
	ml_21_4: { hasContent: false, files: [] },

	// Модуль 22: Рекомендательные системы
	ml_22_1: {
		hasContent: false,
		files: [
			{ name: "Рекомендательные_системы.pdf", url: "#", type: "pdf" },
		],
	},
	ml_22_2: { hasContent: false, files: [] },
	ml_22_3: { hasContent: false, files: [] },
	ml_22_4: { hasContent: false, files: [] },

	// Модуль 23: Итоги
	ml_23_1: { hasContent: false, files: [] },
	ml_23_2: { hasContent: false, files: [] },

	// Модуль 24: Финал
	ml_24_1: {
		hasContent: false,
		files: [
			{
				name: "Машинное обучение классические задачи и алгоритмы II.pdf",
				url: "#",
				type: "pdf",
			},
		],
	},

	// ==========================================
	// КУРС 5: Deep Learning
	// ==========================================

	// Модуль 1
	dl_1_1: {
		hasContent: false,
		files: [
			{
				name: "Введение_Полносвязные_слои_функции_активации.pdf",
				url: "#",
				type: "pdf",
			},
		],
	},
	dl_1_2: { hasContent: false, files: [] },

	// Модуль 2
	dl_2_1: {
		hasContent: false,
		files: [
			{
				name: "Оптимизация_нейронных_сетей....pdf",
				url: "#",
				type: "pdf",
			},
		],
	},
	dl_2_2: { hasContent: false, files: [] },
	dl_2_3: { hasContent: false, files: [] },
	dl_2_4: { hasContent: false, files: [] },

	// Модуль 3
	dl_3_1: {
		hasContent: false,
		files: [
			{ name: "Сверточные_нейронные_сети.pdf", url: "#", type: "pdf" },
		],
	},
	dl_3_2: { hasContent: false, files: [] },

	// Модуль 4
	dl_4_1: {
		hasContent: false,
		files: [
			{
				name: "Сверточные_нейронные_сети_часть_ii.pdf",
				url: "#",
				type: "pdf",
			},
		],
	},
	dl_4_2: { hasContent: false, files: [] },
	dl_4_3: { hasContent: false, files: [] },

	// Модуль 5
	dl_5_1: {
		hasContent: false,
		files: [
			{ name: "Популярные_архитектуры....pdf", url: "#", type: "pdf" },
		],
	},

	// Модуль 6
	dl_6_1: {
		hasContent: false,
		files: [{ name: "Детекция_объектов.pdf", url: "#", type: "pdf" }],
	},
	dl_6_2: { hasContent: false, files: [] },
	dl_6_3: { hasContent: false, files: [] },
	dl_6_4: { hasContent: false, files: [] },

	// Модуль 7
	dl_7_1: {
		hasContent: false,
		files: [{ name: "Intro_to_DL.pdf", url: "#", type: "pdf" }],
	},
	dl_7_2: { hasContent: false, files: [] },
	dl_7_3: { hasContent: false, files: [] },
	dl_7_4: { hasContent: false, files: [] },

	// Модуль 8
	dl_8_1: {
		hasContent: false,
		files: [
			{
				name: "Векторные_представления_слов....pdf",
				url: "#",
				type: "pdf",
			},
		],
	},
	dl_8_2: { hasContent: false, files: [] },

	// Модуль 9
	dl_9_1: {
		hasContent: false,
		files: [
			{
				name: "LSTM_Трансформер_механизм_внимания.pdf",
				url: "#",
				type: "pdf",
			},
		],
	},
	dl_9_2: { hasContent: false, files: [] },
	dl_9_3: { hasContent: false, files: [] },

	// Модуль 10
	dl_10_1: { hasContent: false, files: [] },
	dl_10_2: { hasContent: false, files: [] },
	dl_10_3: { hasContent: false, files: [] },

	// ==========================================
	// БОНУС: Карьера и Трудоустройство
	// ==========================================
	car_1_1: { hasContent: false, files: [] },
	car_1_2: { hasContent: false, files: [] },
	car_1_3: { hasContent: false, files: [] },
	car_2_1: {
		hasContent: false,
		files: [
			{ name: "Start_ML_подготовка.pdf", url: "#", type: "pdf" },
			{ name: "Гайд_для_ML.pdf", url: "#", type: "pdf" },
		],
	},
	car_2_2: { hasContent: false, files: [] },
};
