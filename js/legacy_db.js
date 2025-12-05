// Дефолтное видео (введение в Python)
export const DEFAULT_VIDEO = "x04T6UnOxJI";

export const COURSES_DB_LOCAL = {
	python: {
		title: "КУРС 1: Python для Data Science",
		color: "indigo",
		icon: "code-2",
		nextCourseId: "algo",
		modules: [
			{
				title: "Модуль 0: Введение",
				lessons: [
					{
						id: "py_0_1",
						title: "0.1 Python в ML",
						videoId: "rfscVS0vtbw",
					}, // FreeCodeCamp Python
					{
						id: "py_0_2",
						title: "0.2 Анализ изображений",
						videoId: "t8pPdKYpowI",
					},
				],
			},
			{
				title: "Модуль 1: Основы Python",
				lessons: [
					{
						id: "py_1_1",
						title: "1.1 Переменные",
						videoId: "khLvadeUSIY",
					},
					{
						id: "py_1_2",
						title: "1.2 Типы данных",
						videoId: DEFAULT_VIDEO,
					},
					{
						id: "py_1_3",
						title: "1.3 Циклы",
						videoId: DEFAULT_VIDEO,
					},
					{
						id: "py_1_4",
						title: "1.4 Условный оператор If",
						videoId: DEFAULT_VIDEO,
					},
				],
			},
			// ... остальные модули Python (без изменений структуры) ...
			{
				title: "Модуль 2: Структуры данных",
				lessons: [
					{
						id: "py_2_1",
						title: "2.1 Функции в Python",
						videoId: DEFAULT_VIDEO,
					},
					{
						id: "py_2_2",
						title: "2.2 Аргументы функции",
						videoId: DEFAULT_VIDEO,
					},
					{
						id: "py_2_3",
						title: "2.3 Call stack и ошибки",
						videoId: DEFAULT_VIDEO,
					},
					{
						id: "py_2_4",
						title: "2.4 Ссылочная модель",
						videoId: DEFAULT_VIDEO,
					},
					{
						id: "py_2_5",
						title: "2.5 Модель памяти",
						videoId: DEFAULT_VIDEO,
					},
					{
						id: "py_2_6",
						title: "2.6 Изменяемые типы",
						videoId: DEFAULT_VIDEO,
					},
					{
						id: "py_2_7",
						title: "2.7 Срезы и строки",
						videoId: DEFAULT_VIDEO,
					},
				],
			},
			{
				title: "Модуль 3: Окружение",
				lessons: [
					{
						id: "py_3_1",
						title: "3.1 Библиотеки и PIP",
						videoId: DEFAULT_VIDEO,
					},
					{
						id: "py_3_2",
						title: "3.2 Установка Anaconda",
						videoId: DEFAULT_VIDEO,
					},
					{
						id: "py_3_3",
						title: "3.3 Виртуальное окружение",
						videoId: DEFAULT_VIDEO,
					},
				],
			},
			{
				title: "Модуль 4: Инструменты (Numpy)",
				lessons: [
					{
						id: "py_4_1",
						title: "4.1 Jupyter Notebook",
						videoId: DEFAULT_VIDEO,
					},
					{
						id: "py_4_2",
						title: "4.2 Ячейки и команды",
						videoId: DEFAULT_VIDEO,
					},
					{
						id: "py_4_6",
						title: "4.6 Numpy Основы",
						videoId: DEFAULT_VIDEO,
					},
					{
						id: "py_4_7",
						title: "4.7 Pandas Введение",
						videoId: DEFAULT_VIDEO,
					},
					{
						id: "py_4_8",
						title: "4.8 Matplotlib",
						videoId: DEFAULT_VIDEO,
					},
				],
			},
			{
				title: "Модуль 5: Pandas",
				lessons: [
					{
						id: "py_5_1",
						title: "5.1 Чтение файлов",
						videoId: DEFAULT_VIDEO,
					},
					{
						id: "py_5_2",
						title: "5.2 Фильтрация данных",
						videoId: DEFAULT_VIDEO,
					},
					{
						id: "py_5_5",
						title: "5.5 Группировка",
						videoId: DEFAULT_VIDEO,
					},
					{
						id: "py_5_7",
						title: "5.7 Визуализация",
						videoId: DEFAULT_VIDEO,
					},
				],
			},
			{
				title: "Модуль 6: SQL",
				lessons: [
					{
						id: "py_6_1",
						title: "6.1 Базы данных и СУБД",
						videoId: DEFAULT_VIDEO,
					},
					{
						id: "py_6_2",
						title: "6.2 SELECT запросы",
						videoId: DEFAULT_VIDEO,
					},
					{
						id: "py_6_3",
						title: "6.3 JOIN таблиц",
						videoId: DEFAULT_VIDEO,
					},
					{
						id: "py_6_4",
						title: "6.4 SQL внутри Python",
						videoId: DEFAULT_VIDEO,
					},
				],
			},
			{
				title: "Модуль 7: ООП",
				lessons: [
					{
						id: "py_7_1",
						title: "7.1 Классы и объекты",
						videoId: DEFAULT_VIDEO,
					},
					{
						id: "py_7_2",
						title: "7.2 Принципы ООП (1)",
						videoId: DEFAULT_VIDEO,
					},
					{
						id: "py_7_3",
						title: "7.3 Принципы ООП (2)",
						videoId: DEFAULT_VIDEO,
					},
				],
			},
			{
				title: "Модуль 8: Git",
				lessons: [
					{
						id: "py_8_1",
						title: "8.1 Введение в Git",
						videoId: DEFAULT_VIDEO,
					},
					{
						id: "py_8_2",
						title: "8.2 Ветки и слияние",
						videoId: DEFAULT_VIDEO,
					},
					{
						id: "py_8_7",
						title: "8.7 GitHub Remotes",
						videoId: DEFAULT_VIDEO,
					},
				],
			},
			{
				title: "Модуль 9: Backend (FastAPI)",
				lessons: [
					{
						id: "py_9_1",
						title: "9.1 HTTP запросы",
						videoId: DEFAULT_VIDEO,
					},
					{
						id: "py_9_3",
						title: "9.3 Метод GET",
						videoId: DEFAULT_VIDEO,
					},
					{
						id: "py_9_4",
						title: "9.4 Метод POST и БД",
						videoId: DEFAULT_VIDEO,
					},
				],
			},
			{
				title: "Модуль 11: Airflow",
				lessons: [
					{
						id: "py_11_1",
						title: "11.1 Введение в DE",
						videoId: DEFAULT_VIDEO,
					},
					{
						id: "py_11_2",
						title: "11.2 Устройство Airflow",
						videoId: DEFAULT_VIDEO,
					},
					{
						id: "py_11_4",
						title: "11.4 Python Operator",
						videoId: DEFAULT_VIDEO,
					},
				],
			},
			{
				title: "Модуль 12: Best Practices",
				lessons: [
					{
						id: "py_12_1",
						title: "12.1 Шаблон приложения",
						videoId: DEFAULT_VIDEO,
					},
					{
						id: "py_12_3",
						title: "12.3 SQL Инъекции",
						videoId: DEFAULT_VIDEO,
					},
				],
			},
		],
	},
	ml: {
		title: "КУРС 4: Machine Learning",
		color: "pink",
		icon: "brain-circuit",
		nextCourseId: "dl",
		modules: [
			{
				title: "Модуль 1: Введение",
				lessons: [
					{
						id: "ml_1_1",
						title: "1.1 Виды ML",
						videoId: "7eh4d6sabA0",
					}, // Intro to ML
					{
						id: "ml_1_2",
						title: "1.2 Метрики качества",
						videoId: DEFAULT_VIDEO,
					},
				],
			},
			// ... (остальные модули ML без изменений) ...
			{
				title: "Модуль 2: Метрики",
				lessons: [
					{
						id: "ml_2_3",
						title: "2.3 Функция потерь",
						videoId: DEFAULT_VIDEO,
					},
					{
						id: "ml_2_5",
						title: "2.5 MSE и MAE",
						videoId: DEFAULT_VIDEO,
					},
				],
			},
			{
				title: "Модуль 3: Линейная регрессия",
				lessons: [
					{
						id: "ml_3_3",
						title: "3.3 OLS Метод",
						videoId: DEFAULT_VIDEO,
					},
					{
						id: "ml_3_7",
						title: "3.7 Практика Python",
						videoId: DEFAULT_VIDEO,
					},
				],
			},
			{
				title: "Модуль 4: Градиентный спуск",
				lessons: [
					{
						id: "ml_4_1",
						title: "4.1 Принцип работы",
						videoId: DEFAULT_VIDEO,
					},
				],
			},
			{
				title: "Модуль 6: Регуляризация",
				lessons: [
					{
						id: "ml_6_1",
						title: "6.1 Переобучение",
						videoId: DEFAULT_VIDEO,
					},
					{
						id: "ml_6_2",
						title: "6.2 L1 и L2 регуляризация",
						videoId: DEFAULT_VIDEO,
					},
				],
			},
			{
				title: "Модуль 8: Feature Engineering",
				lessons: [
					{
						id: "ml_8_1",
						title: "8.1 Пропуски в данных",
						videoId: DEFAULT_VIDEO,
					},
					{
						id: "ml_8_3",
						title: "8.3 TF-IDF для текста",
						videoId: DEFAULT_VIDEO,
					},
				],
			},
			{
				title: "Модуль 17: Деревья решений",
				lessons: [
					{
						id: "ml_17_1",
						title: "17.1 Decision Trees",
						videoId: DEFAULT_VIDEO,
					},
					{
						id: "ml_17_4",
						title: "17.4 Практика",
						videoId: DEFAULT_VIDEO,
					},
				],
			},
			{
				title: "Модуль 19: Ансамбли",
				lessons: [
					{
						id: "ml_19_2",
						title: "19.2 Random Forest",
						videoId: DEFAULT_VIDEO,
					},
				],
			},
			{
				title: "Модуль 20: Бустинг",
				lessons: [
					{
						id: "ml_20_2",
						title: "20.2 Gradient Boosting",
						videoId: DEFAULT_VIDEO,
					},
					{
						id: "ml_20_4",
						title: "20.4 CatBoost/XGBoost",
						videoId: DEFAULT_VIDEO,
					},
				],
			},
			{
				title: "Модуль 21: Кластеризация",
				lessons: [
					{
						id: "ml_21_2",
						title: "21.2 K-Means",
						videoId: DEFAULT_VIDEO,
					},
					{
						id: "ml_21_3",
						title: "21.3 DBSCAN",
						videoId: DEFAULT_VIDEO,
					},
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
					{
						id: "dl_1_1",
						title: "1.1 Перцептрон",
						videoId: "aircAruvnKk",
					}, // 3Blue1Brown Neural Networks
					{
						id: "dl_1_2",
						title: "1.2 Backpropagation",
						videoId: "Ilg3gGewQ5U",
					},
				],
			},
			{
				title: "Модуль 2: Обучение",
				lessons: [
					{
						id: "dl_2_1",
						title: "2.1 PyTorch Основы",
						videoId: DEFAULT_VIDEO,
					},
				],
			},
			{
				title: "Модуль 3: CNN",
				lessons: [
					{
						id: "dl_3_1",
						title: "3.1 Свертки и Пулинг",
						videoId: DEFAULT_VIDEO,
					},
				],
			},
			{
				title: "Модуль 6: Object Detection",
				lessons: [
					{
						id: "dl_6_1",
						title: "6.1 YOLO и детекция",
						videoId: DEFAULT_VIDEO,
					},
				],
			},
			{
				title: "Модуль 9: NLP",
				lessons: [
					{
						id: "dl_9_1",
						title: "9.1 RNN и LSTM",
						videoId: DEFAULT_VIDEO,
					},
					{
						id: "dl_9_2",
						title: "9.2 Attention механизм",
						videoId: DEFAULT_VIDEO,
					},
				],
			},
			{
				title: "Модуль 10: Трансформеры",
				lessons: [
					{
						id: "dl_10_2",
						title: "10.2 BERT",
						videoId: DEFAULT_VIDEO,
					},
					{
						id: "dl_10_3",
						title: "10.3 GPT",
						videoId: DEFAULT_VIDEO,
					},
				],
			},
		],
	},
	// Скопировал остальные курсы для полноты картины, чтобы не потерялись
	algo: {
		title: "КУРС 2: Алгоритмы",
		color: "blue",
		icon: "cpu",
		nextCourseId: "stats",
		modules: [
			{
				title: "Модуль 1: Введение",
				lessons: [
					{
						id: "alg_1_1",
						title: "1.1 Собеседования",
						videoId: DEFAULT_VIDEO,
					},
				],
			},
			{
				title: "Модуль 2: Сложность",
				lessons: [
					{
						id: "alg_2_1",
						title: "2.1 Big O Нотация",
						videoId: DEFAULT_VIDEO,
					},
					{
						id: "alg_2_2",
						title: "2.2 Оценка сложности",
						videoId: DEFAULT_VIDEO,
					},
				],
			},
			{
				title: "Модуль 3: Списки",
				lessons: [
					{
						id: "alg_3_1",
						title: "3.1 Массивы",
						videoId: DEFAULT_VIDEO,
					},
					{
						id: "alg_3_2",
						title: "3.2 Связные списки",
						videoId: DEFAULT_VIDEO,
					},
				],
			},
			{
				title: "Модуль 4: Графы",
				lessons: [
					{
						id: "alg_4_1",
						title: "4.1 Введение в графы",
						videoId: DEFAULT_VIDEO,
					},
					{
						id: "alg_4_2",
						title: "4.2 BFS и DFS",
						videoId: DEFAULT_VIDEO,
					},
					{
						id: "alg_4_5",
						title: "4.5 Кучи (Heap)",
						videoId: DEFAULT_VIDEO,
					},
				],
			},
			{
				title: "Модуль 5: Подходы",
				lessons: [
					{
						id: "alg_5_1",
						title: "5.1 Рекурсия",
						videoId: DEFAULT_VIDEO,
					},
					{
						id: "alg_5_2",
						title: "5.2 Динамическое прог.",
						videoId: DEFAULT_VIDEO,
					},
				],
			},
		],
	},
	stats: {
		title: "КУРС 3: Мат. Статистика",
		color: "green",
		icon: "bar-chart-2",
		nextCourseId: "ml",
		modules: [
			{
				title: "Модуль 1: Вероятность",
				lessons: [
					{
						id: "st_1_1",
						title: "1.1 Статистика в ML",
						videoId: DEFAULT_VIDEO,
					},
					{
						id: "st_1_3",
						title: "1.3 Формула Байеса",
						videoId: DEFAULT_VIDEO,
					},
				],
			},
			{
				title: "Модуль 2: Доверительные интервалы",
				lessons: [
					{
						id: "st_2_1",
						title: "2.1 Зачем нужны ДИ",
						videoId: DEFAULT_VIDEO,
					},
					{ id: "st_2_4", title: "2.4 ЦПТ", videoId: DEFAULT_VIDEO },
				],
			},
			{
				title: "Модуль 4: Гипотезы",
				lessons: [
					{
						id: "st_4_1",
						title: "4.1 Проверка гипотез",
						videoId: DEFAULT_VIDEO,
					},
				],
			},
			{
				title: "Модуль 7: A/B Тесты",
				lessons: [
					{
						id: "st_7_1",
						title: "7.1 Дизайн экспериментов",
						videoId: DEFAULT_VIDEO,
					},
				],
			},
		],
	},
	career: {
		title: "БОНУС: Карьера",
		color: "yellow",
		icon: "briefcase",
		nextCourseId: null,
		modules: [
			{
				title: "Трудоустройство",
				lessons: [
					{
						id: "car_1_1",
						title: "1.1 Резюме для DS",
						videoId: DEFAULT_VIDEO,
					},
					{
						id: "car_1_2",
						title: "1.2 Гитхаб портфолио",
						videoId: DEFAULT_VIDEO,
					},
					{
						id: "car_1_3",
						title: "1.3 Собеседования",
						videoId: DEFAULT_VIDEO,
					},
				],
			},
		],
	},
};

export function getAllLessonsFlat() {
	const lessons = [];
	Object.keys(COURSES_DB_LOCAL).forEach((courseId) => {
		const course = COURSES_DB_LOCAL[courseId];
		course.modules.forEach((mod) => {
			mod.lessons.forEach((l) => {
				lessons.push({ ...l, courseId });
			});
		});
	});
	return lessons;
}
