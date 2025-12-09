// Дефолтное видео (заглушка для уроков, где нет реального ID)
export const DEFAULT_VIDEO = "x04T6UnOxJI";

export const COURSES_DB_LOCAL = {
	python: {
		title: "КУРС 1: Python для Data Science",
		color: "indigo",
		icon: "code-2",
		nextCourseId: "algo",
		modules: [
			{
				id: 0,
				title: "Модуль 0: Введение",
				lessons: [
					{
						id: "py_0_1",
						title: "0.1 Python в машинном обучении",
						videoId: "rfscVS0vtbw", // Сохранено
					},
					{
						id: "py_0_2",
						title: "0.2 Пример — Python для анализа изображений",
						videoId: "t8pPdKYpowI", // Сохранено
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
						videoId: "khLvadeUSIY", // Сохранено
					},
					{
						id: "py_1_2",
						title: "1.2 Типы данных",
						videoId: DEFAULT_VIDEO,
					},
					{
						id: "py_1_3",
						title: "1.3 Циклы (while, for)",
						videoId: DEFAULT_VIDEO,
					},
					{
						id: "py_1_4",
						title: "1.4 Условный оператор If",
						videoId: DEFAULT_VIDEO,
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
						videoId: DEFAULT_VIDEO,
					},
					{
						id: "py_2_2",
						title: "2.2 Аргументы функции",
						videoId: DEFAULT_VIDEO,
					},
					{
						id: "py_2_3",
						title: "2.3 Call stack и ошибки в python",
						videoId: DEFAULT_VIDEO,
					},
					{
						id: "py_2_4",
						title: "2.4 Ссылочная модель данных",
						videoId: DEFAULT_VIDEO,
					},
					{
						id: "py_2_5",
						title: "2.5 Модель памяти в python",
						videoId: DEFAULT_VIDEO,
					},
					{
						id: "py_2_6",
						title: "2.6 Изменяемые и неизменяемые типы данных",
						videoId: DEFAULT_VIDEO,
					},
					{
						id: "py_2_7",
						title: "2.7 Срезы. Продвинутая работа со строками",
						videoId: DEFAULT_VIDEO,
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
						videoId: DEFAULT_VIDEO,
					},
					{
						id: "py_3_1",
						title: "3.1 Библиотеки и PIP",
						videoId: DEFAULT_VIDEO,
					},
					{
						id: "py_3_2",
						title: "3.2 Windows 10 Установка Anaconda",
						videoId: DEFAULT_VIDEO,
					},
					{
						id: "py_3_3",
						title: "3.3 Linux Установка Anaconda",
						videoId: DEFAULT_VIDEO,
					},
					{
						id: "py_3_4",
						title: "3.4 MacOS Установка Anaconda",
						videoId: DEFAULT_VIDEO,
					},
					{
						id: "py_3_5",
						title: "3.5 Установка сторонних пакетов",
						videoId: DEFAULT_VIDEO,
					},
					{
						id: "py_3_6",
						title: "3.6 Виртуальное окружение",
						videoId: DEFAULT_VIDEO,
					},
					{
						id: "py_3_7",
						title: "3.7 Итоги",
						videoId: DEFAULT_VIDEO,
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
						videoId: DEFAULT_VIDEO,
					},
					{
						id: "py_4_2",
						title: "4.2 Знакомство с Jupyter. Ячейки",
						videoId: DEFAULT_VIDEO,
					},
					{
						id: "py_4_3",
						title: "4.3 Знакомство с Jupyter. Горячие клавиши",
						videoId: DEFAULT_VIDEO,
					},
					{
						id: "py_4_4",
						title: "4.4 Знакомство с Jupyter. Магические команды",
						videoId: DEFAULT_VIDEO,
					},
					{
						id: "py_4_5",
						title: "4.5 Знакомство с Jupyter. Kernel",
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
					{
						id: "py_4_9",
						title: "4.9 Заключение",
						videoId: DEFAULT_VIDEO,
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
						videoId: DEFAULT_VIDEO,
					},
					{
						id: "py_5_2",
						title: "5.2 Фильтрация данных, логические операторы",
						videoId: DEFAULT_VIDEO,
					},
					{
						id: "py_5_3",
						title: "5.3 Функции фильтры",
						videoId: DEFAULT_VIDEO,
					},
					{
						id: "py_5_4",
						title: "5.4 Series и Index",
						videoId: DEFAULT_VIDEO,
					},
					{
						id: "py_5_5",
						title: "5.5 Группировка данных",
						videoId: DEFAULT_VIDEO,
					},
					{
						id: "py_5_6",
						title: "5.6 Работа с датами и временем",
						videoId: DEFAULT_VIDEO,
					},
					{
						id: "py_5_7",
						title: "5.7 Визуализация",
						videoId: DEFAULT_VIDEO,
					},
					{
						id: "py_5_8",
						title: "5.8 Сохранение данных",
						videoId: DEFAULT_VIDEO,
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
						videoId: DEFAULT_VIDEO,
					},
					{
						id: "py_6_2",
						title: "6.2 Основные SQL запросы Получение, агрегация и сортировка данных",
						videoId: DEFAULT_VIDEO,
					},
					{
						id: "py_6_3",
						title: "6.3 Объединение таблиц JOIN",
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
				id: 7,
				title: "Модуль 7: ООП",
				lessons: [
					{
						id: "py_7_1",
						title: "7.1 Классы, объекты и методы",
						videoId: DEFAULT_VIDEO,
					},
					{
						id: "py_7_2",
						title: "7.2 Принципы ООП Часть 1",
						videoId: DEFAULT_VIDEO,
					},
					{
						id: "py_7_3",
						title: "7.3 Принципы ООП. Часть 2",
						videoId: DEFAULT_VIDEO,
					},
				],
			},
			{
				id: 8,
				title: "Модуль 8: Git (Контроль версий)",
				lessons: [
					{
						id: "py_8_1",
						title: "8.1 Введение в Git",
						videoId: DEFAULT_VIDEO,
					},
					{
						id: "py_8_2",
						title: "8.2 Ветки и теги",
						videoId: DEFAULT_VIDEO,
					},
					{
						id: "py_8_3",
						title: "8.3 Возможности git diff Ветвление. Использование тэгов",
						videoId: DEFAULT_VIDEO,
					},
					{
						id: "py_8_4",
						title: "8.4 Слияние веток",
						videoId: DEFAULT_VIDEO,
					},
					{
						id: "py_8_5",
						title: "8.5 Конфликт слияния веток",
						videoId: DEFAULT_VIDEO,
					},
					{
						id: "py_8_6",
						title: "8.6 Стратегии ветвления при разработке. Работа с удаленными провайдерами",
						videoId: DEFAULT_VIDEO,
					},
					{
						id: "py_8_7",
						title: "8.7 Взаимоотношение между remotes. Загрузка репозитория на удаленный сервер",
						videoId: DEFAULT_VIDEO,
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
						videoId: DEFAULT_VIDEO,
					},
					{
						id: "py_9_2",
						title: "9.2 Ответ сервера API",
						videoId: DEFAULT_VIDEO,
					},
					{
						id: "py_9_3",
						title: "9.3 Практика написания запросов. Метод GET",
						videoId: DEFAULT_VIDEO,
					},
					{
						id: "py_9_4",
						title: "9.4 Практика написания запросов. Метод POST. Подключение к базе данных. Валидация",
						videoId: DEFAULT_VIDEO,
					},
					{
						id: "py_9_5",
						title: "9.5 Подводные камни валидации. Валидация в FastAPI",
						videoId: DEFAULT_VIDEO,
					},
					{
						id: "py_9_6",
						title: "9.6 Статус коды",
						videoId: DEFAULT_VIDEO,
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
						videoId: DEFAULT_VIDEO,
					},
					{
						id: "py_10_2",
						title: "10.2 ORM, SQLAlchemy",
						videoId: DEFAULT_VIDEO,
					},
				],
			},
			{
				id: 11,
				title: "Модуль 11: Airflow (Data Engineering)",
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
						id: "py_11_3",
						title: "11.3 Запуск и веб интерфейс",
						videoId: DEFAULT_VIDEO,
					},
					{
						id: "py_11_4",
						title: "11.4 Python Operator",
						videoId: DEFAULT_VIDEO,
					},
					{
						id: "py_11_5",
						title: "11.5 Передача информации",
						videoId: DEFAULT_VIDEO,
					},
					{
						id: "py_11_6",
						title: "11.6 Connections",
						videoId: DEFAULT_VIDEO,
					},
					{
						id: "py_11_7",
						title: "11.7 Лучшие практики",
						videoId: DEFAULT_VIDEO,
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
						videoId: DEFAULT_VIDEO,
					},
					{
						id: "py_12_2",
						title: "12.2 Переменные окружения",
						videoId: DEFAULT_VIDEO,
					},
					{
						id: "py_12_3",
						title: "12.3 Проблема SQL инъекций",
						videoId: DEFAULT_VIDEO,
					},
					{
						id: "py_12_4",
						title: "12.4 Вынесение настроек в конфиг",
						videoId: DEFAULT_VIDEO,
					},
					{
						id: "py_12_5",
						title: "12.5 Разделение кода на модули",
						videoId: DEFAULT_VIDEO,
					},
					{
						id: "py_12_6",
						title: "12.6 Идемпотентность",
						videoId: DEFAULT_VIDEO,
					},
				],
			},
		],
	},
	algo: {
		title: "КУРС 2: Алгоритмы",
		color: "blue",
		icon: "cpu",
		nextCourseId: "stats",
		modules: [
			{
				id: 1,
				title: "Модуль 1: Введение",
				lessons: [
					{
						id: "alg_1_1",
						title: "1.1 Введение",
						videoId: DEFAULT_VIDEO,
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
						videoId: DEFAULT_VIDEO,
					},
					{
						id: "alg_2_2",
						title: "2.2 Примеры оценки сложности алгоритмов",
						videoId: DEFAULT_VIDEO,
					},
					{
						id: "alg_2_3",
						title: "2.3 Правила 1",
						videoId: DEFAULT_VIDEO,
					},
					{
						id: "alg_2_4",
						title: "2.4 Амортизированная сложность",
						videoId: DEFAULT_VIDEO,
					},
					{
						id: "alg_2_5",
						title: "2.5 Правила 2",
						videoId: DEFAULT_VIDEO,
					},
					{
						id: "alg_2_6",
						title: "2.6 Нетривиальные задачи. Примеры",
						videoId: DEFAULT_VIDEO,
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
						videoId: DEFAULT_VIDEO,
					},
					{
						id: "alg_3_2",
						title: "3.2 Задача контейнер с водой",
						videoId: DEFAULT_VIDEO,
					},
					{
						id: "alg_3_3",
						title: "3.3 Односвязный и двусвязный список, задача на разворот",
						videoId: DEFAULT_VIDEO,
					},
					{
						id: "alg_3_4",
						title: "3.4 Граничные условия, задача на подсвет букв подряд",
						videoId: DEFAULT_VIDEO,
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
						videoId: DEFAULT_VIDEO,
					},
					{
						id: "alg_4_2",
						title: "4.2 Обход в ширину и глубину (BFS/DFS)",
						videoId: DEFAULT_VIDEO,
					},
					{
						id: "alg_4_3",
						title: "4.3 Компонента связности",
						videoId: DEFAULT_VIDEO,
					},
					{
						id: "alg_4_4",
						title: "4.4 Деревья основные определения",
						videoId: DEFAULT_VIDEO,
					},
					{
						id: "alg_4_5",
						title: "4.5 Кучи и сортировка кучей",
						videoId: DEFAULT_VIDEO,
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
						videoId: DEFAULT_VIDEO,
					},
					{
						id: "alg_5_2",
						title: "5.2 Динамическое программирование",
						videoId: DEFAULT_VIDEO,
					},
					{
						id: "alg_5_3",
						title: "5.3 Разделяй и властвуй",
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
				id: 1,
				title: "Модуль 1: Теория вероятностей",
				lessons: [
					{
						id: "st_1_1",
						title: "1.1 Статистика в ML",
						videoId: DEFAULT_VIDEO,
					},
					{
						id: "st_1_2",
						title: "1.2 Введение в теорию вероятностей",
						videoId: DEFAULT_VIDEO,
					},
					{
						id: "st_1_3",
						title: "1.3 Условная вероятность. Формула Байеса",
						videoId: DEFAULT_VIDEO,
					},
					{
						id: "st_1_4",
						title: "1.4 Введение в статистику",
						videoId: DEFAULT_VIDEO,
					},
					{
						id: "st_1_5",
						title: "1.5 Дискретные распределения",
						videoId: DEFAULT_VIDEO,
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
						videoId: DEFAULT_VIDEO,
					},
					{
						id: "st_2_2",
						title: "2.2 Построение доверительных интервалов",
						videoId: DEFAULT_VIDEO,
					},
					{
						id: "st_2_3",
						title: "2.3 Виды распределений случайных величин",
						videoId: DEFAULT_VIDEO,
					},
					{
						id: "st_2_4",
						title: "2.4 Центральная предельная теорема ЦПТ",
						videoId: DEFAULT_VIDEO,
					},
					{
						id: "st_2_5",
						title: "2.5 Применение ЦПТ",
						videoId: DEFAULT_VIDEO,
					},
					{
						id: "st_2_6",
						title: "2.6 Доверительный интервал для доли",
						videoId: DEFAULT_VIDEO,
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
						videoId: DEFAULT_VIDEO,
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
						videoId: DEFAULT_VIDEO,
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
						videoId: DEFAULT_VIDEO,
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
						videoId: DEFAULT_VIDEO,
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
						videoId: DEFAULT_VIDEO,
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
						videoId: DEFAULT_VIDEO,
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
						videoId: DEFAULT_VIDEO,
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
						videoId: DEFAULT_VIDEO,
					},
					{
						id: "st_10_2",
						title: "10.2 Сравнение изменений числа кликов и CTR",
						videoId: DEFAULT_VIDEO,
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
				id: 1,
				title: "Модуль 1: Введение",
				lessons: [
					{
						id: "ml_1_1",
						title: "1.1 Задачи машинного обучения",
						videoId: "7eh4d6sabA0", // Сохранено
					},
					{
						id: "ml_1_2",
						title: "1.2 Основные виды машинного обучения",
						videoId: DEFAULT_VIDEO,
					},
					{
						id: "ml_1_3",
						title: "1.3 Компоненты классической ML-задачи",
						videoId: DEFAULT_VIDEO,
					},
					{
						id: "ml_1_4",
						title: "1.4 Практика",
						videoId: DEFAULT_VIDEO,
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
						videoId: DEFAULT_VIDEO,
					},
					{
						id: "ml_2_2",
						title: "2.2 Понятие функции и функциональной зависимости",
						videoId: DEFAULT_VIDEO,
					},
					{
						id: "ml_2_3",
						title: "2.3 Функция потерь Loss function",
						videoId: DEFAULT_VIDEO,
					},
					{
						id: "ml_2_4",
						title: "2.4 Функционал качества и метрика",
						videoId: DEFAULT_VIDEO,
					},
					{
						id: "ml_2_5",
						title: "2.5 Король и королева регрессии MSE и MAE",
						videoId: DEFAULT_VIDEO,
					},
					{
						id: "ml_2_6",
						title: "2.6 Практика",
						videoId: DEFAULT_VIDEO,
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
						videoId: DEFAULT_VIDEO,
					},
					{
						id: "ml_3_2",
						title: "3.2 Экстремумы и производная функции",
						videoId: DEFAULT_VIDEO,
					},
					{
						id: "ml_3_3",
						title: "3.3 Линейная регрессия OLS",
						videoId: DEFAULT_VIDEO,
					},
					{
						id: "ml_3_4",
						title: "3.4 Ликбез №3 Матрицы",
						videoId: DEFAULT_VIDEO,
					},
					{
						id: "ml_3_5",
						title: "3.5 Работа с массивами в Numpy",
						videoId: DEFAULT_VIDEO,
					},
					{
						id: "ml_3_6",
						title: "3.6 Линейная регрессия OLS Матричная форма",
						videoId: DEFAULT_VIDEO,
					},
					{
						id: "ml_3_7",
						title: "3.7 Линейная регрессия в Python. Практика",
						videoId: DEFAULT_VIDEO,
					},
				],
			},
			{
				id: 4,
				title: "Модуль 4: Градиентный спуск",
				lessons: [
					{
						id: "ml_4_1",
						title: "4.1 Введение в градиентный спуск Минимизация функции с одной переменной",
						videoId: DEFAULT_VIDEO,
					},
					{
						id: "ml_4_2",
						title: "4.2 Минимизация функции с несколькими переменными",
						videoId: DEFAULT_VIDEO,
					},
					{
						id: "ml_4_3",
						title: "4.3 Линейная регрессия Подбор параметров",
						videoId: DEFAULT_VIDEO,
					},
					{
						id: "ml_4_4",
						title: "4.4 Настройка параметров графика в matplotlib",
						videoId: DEFAULT_VIDEO,
					},
					{
						id: "ml_4_5",
						title: "4.5 Изображение градиентного спуска в matplotlib",
						videoId: DEFAULT_VIDEO,
					},
				],
			},
			{
				id: 5,
				title: "Модуль 5: Валидация",
				lessons: [
					{
						id: "ml_5_1",
						title: "5.1 Обобщающая способность, метод отложенной выборки и кросс валидация",
						videoId: DEFAULT_VIDEO,
					},
					{
						id: "ml_5_2",
						title: "5.2 Практика Переобучение и недообучение",
						videoId: DEFAULT_VIDEO,
					},
					{
						id: "ml_5_3",
						title: "5.3 Кросс валидация, реальный практический пример",
						videoId: DEFAULT_VIDEO,
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
						videoId: DEFAULT_VIDEO,
					},
					{
						id: "ml_6_2",
						title: "6.2 Регуляризация и масштабирование признаков",
						videoId: DEFAULT_VIDEO,
					},
					{
						id: "ml_6_3",
						title: "6.3 Ликбез №1 Условный экстремум и регуляризация",
						videoId: DEFAULT_VIDEO,
					},
					{
						id: "ml_6_4",
						title: "6.4 Практика №1. Регуляризация",
						videoId: DEFAULT_VIDEO,
					},
					{
						id: "ml_6_5",
						title: "6.5 Мультиколлинеарность",
						videoId: DEFAULT_VIDEO,
					},
					{
						id: "ml_6_6",
						title: "6.6 Практика №2. Мультиколлинеарность",
						videoId: DEFAULT_VIDEO,
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
						videoId: DEFAULT_VIDEO,
					},
					{
						id: "ml_7_2",
						title: "7.2 Встроенные методы",
						videoId: DEFAULT_VIDEO,
					},
					{
						id: "ml_7_3",
						title: "7.3 Метод обёртки",
						videoId: DEFAULT_VIDEO,
					},
					{
						id: "ml_7_4",
						title: "7.4 Метод фильтрации",
						videoId: DEFAULT_VIDEO,
					},
				],
			},
			{
				id: 8,
				title: "Модуль 8: Работа с данными (Feature Engineering)",
				lessons: [
					{
						id: "ml_8_1",
						title: "8.1 Работа с пропущенными значениями",
						videoId: DEFAULT_VIDEO,
					},
					{
						id: "ml_8_2",
						title: "8.2 Работа с выбросами Advanced счетчики",
						videoId: DEFAULT_VIDEO,
					},
					{
						id: "ml_8_3",
						title: "8.3 Выделение признаков из текста. Подход TF IDF",
						videoId: DEFAULT_VIDEO,
					},
					{
						id: "ml_8_4",
						title: "8.4 Лемматизация и стемминг",
						videoId: DEFAULT_VIDEO,
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
						videoId: DEFAULT_VIDEO,
					},
					{
						id: "ml_9_2",
						title: "9.2 Обработка категориальных признаков",
						videoId: DEFAULT_VIDEO,
					},
					{
						id: "ml_9_3",
						title: "9.3 Построение модели",
						videoId: DEFAULT_VIDEO,
					},
					{
						id: "ml_9_4",
						title: "9.4 Анализ выбросов",
						videoId: DEFAULT_VIDEO,
					},
					{
						id: "ml_9_5",
						title: "9.5 Сегментация данных",
						videoId: DEFAULT_VIDEO,
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
						videoId: DEFAULT_VIDEO,
					},
					{
						id: "ml_10_2",
						title: "10.2 Как строить разделяющую гиперплоскость",
						videoId: DEFAULT_VIDEO,
					},
					{
						id: "ml_10_3",
						title: "10.3 Ликбез 1. Метод верхней оценки",
						videoId: DEFAULT_VIDEO,
					},
					{
						id: "ml_10_4",
						title: "10.4 Практика. Линейная бинарная классификация в python",
						videoId: DEFAULT_VIDEO,
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
						videoId: DEFAULT_VIDEO,
					},
					{
						id: "ml_11_2",
						title: "11.2 Метрики бинарной классификации. Практика",
						videoId: DEFAULT_VIDEO,
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
						videoId: DEFAULT_VIDEO,
					},
					{
						id: "ml_12_2",
						title: "12.2 PR кривая AUC PR. Практика построения ROC кривых и PR кривых",
						videoId: DEFAULT_VIDEO,
					},
					{
						id: "ml_12_3",
						title: "12.3 Калибровочная кривая модели",
						videoId: DEFAULT_VIDEO,
					},
				],
			},
			{
				id: 13,
				title: "Модуль 13: SVM",
				lessons: [
					{
						id: "ml_13_1",
						title: "13.1 Метод опорных векторов SVM",
						videoId: DEFAULT_VIDEO,
					},
					{
						id: "ml_13_2",
						title: "13.2 Линейная неразделимость - регуляризация в бинарной классификации",
						videoId: DEFAULT_VIDEO,
					},
					{
						id: "ml_13_3",
						title: "13.3 Практика",
						videoId: DEFAULT_VIDEO,
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
						videoId: DEFAULT_VIDEO,
					},
					{
						id: "ml_14_2",
						title: "14.2 Метрики качества",
						videoId: DEFAULT_VIDEO,
					},
					{
						id: "ml_14_3",
						title: "14.3 Практика. Задача сегментации клиентов",
						videoId: DEFAULT_VIDEO,
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
						videoId: DEFAULT_VIDEO,
					},
					{
						id: "ml_15_2",
						title: "15.2 Метод главных компонент",
						videoId: DEFAULT_VIDEO,
					},
					{
						id: "ml_15_3",
						title: "15.3 T-SNE",
						videoId: DEFAULT_VIDEO,
					},
					{
						id: "ml_15_4",
						title: "15.4 Практика",
						videoId: DEFAULT_VIDEO,
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
						videoId: DEFAULT_VIDEO,
					},
					{
						id: "ml_16_2",
						title: "16.2 Практика. Сравнение линейной регрессии и метода KNN",
						videoId: DEFAULT_VIDEO,
					},
					{
						id: "ml_16_3",
						title: "16.3 Гиперпараметры p и h. Перевзвешивание соседей",
						videoId: DEFAULT_VIDEO,
					},
					{
						id: "ml_16_4",
						title: "16.4 Практика. Гауссовское ядро",
						videoId: DEFAULT_VIDEO,
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
						videoId: DEFAULT_VIDEO,
					},
					{
						id: "ml_17_2",
						title: "17.2 Критерии качества и информативности",
						videoId: DEFAULT_VIDEO,
					},
					{
						id: "ml_17_3",
						title: "17.3 Критерии останова и жадный алгоритм",
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
				id: 18,
				title: "Модуль 18: Переобучение деревьев",
				lessons: [
					{
						id: "ml_18_1",
						title: "18.1 Решающие деревья и проблема переобучения",
						videoId: DEFAULT_VIDEO,
					},
					{
						id: "ml_18_2",
						title: "18.2 Практика. Предобработка и трансформация данных",
						videoId: DEFAULT_VIDEO,
					},
					{
						id: "ml_18_3",
						title: "18.3 Практика. Обучение модели Decision tree",
						videoId: DEFAULT_VIDEO,
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
						videoId: DEFAULT_VIDEO,
					},
					{
						id: "ml_19_2",
						title: "19.2 Random forest",
						videoId: DEFAULT_VIDEO,
					},
					{
						id: "ml_19_3",
						title: "19.3 Стекинг",
						videoId: DEFAULT_VIDEO,
					},
					{
						id: "ml_19_4",
						title: "19.4 Практика",
						videoId: DEFAULT_VIDEO,
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
						videoId: DEFAULT_VIDEO,
					},
					{
						id: "ml_20_2",
						title: "20.2 Градиентный бустинг",
						videoId: DEFAULT_VIDEO,
					},
					{
						id: "ml_20_3",
						title: "20.3 Bias-variance tradeoff",
						videoId: DEFAULT_VIDEO,
					},
					{
						id: "ml_20_4",
						title: "20.4 Практика",
						videoId: DEFAULT_VIDEO,
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
						videoId: DEFAULT_VIDEO,
					},
					{
						id: "ml_21_2",
						title: "21.2 K-means",
						videoId: DEFAULT_VIDEO,
					},
					{
						id: "ml_21_3",
						title: "21.3 DBSCAN",
						videoId: DEFAULT_VIDEO,
					},
					{
						id: "ml_21_4",
						title: "21.4 Практика",
						videoId: DEFAULT_VIDEO,
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
						videoId: DEFAULT_VIDEO,
					},
					{
						id: "ml_22_2",
						title: "22.2 Коллаборативная фильтрация",
						videoId: DEFAULT_VIDEO,
					},
					{
						id: "ml_22_3",
						title: "22.3 Оценка качества и валидация рекомендательных систем",
						videoId: DEFAULT_VIDEO,
					},
					{
						id: "ml_22_4",
						title: "22.4 Практика построение модели рекомендательной системы",
						videoId: DEFAULT_VIDEO,
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
						videoId: DEFAULT_VIDEO,
					},
					{
						id: "ml_23_2",
						title: "23.2 Вопросы о линейных моделях",
						videoId: DEFAULT_VIDEO,
					},
				],
			},
			{
				id: 24,
				title: "Модуль 24: Финал",
				lessons: [
					{
						id: "ml_24_1",
						title: "24.1 Финал",
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
				id: 1,
				title: "Модуль 1: Основы DL",
				lessons: [
					{
						id: "dl_1_1",
						title: "1.1 Введение. Полносвязные слои. Функции активации",
						videoId: "aircAruvnKk", // Сохранено
					},
					{
						id: "dl_1_2",
						title: "1.2 Семинар",
						videoId: "Ilg3gGewQ5U", // Сохранено
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
						videoId: DEFAULT_VIDEO,
					},
					{
						id: "dl_2_2",
						title: "2.2 Обучение нейронных сетей. Лекция",
						videoId: DEFAULT_VIDEO,
					},
					{
						id: "dl_2_3",
						title: "2.3 Высокоуровневое API для обучения нейросети. Семинар",
						videoId: DEFAULT_VIDEO,
					},
					{
						id: "dl_2_4",
						title: "2.4 Обучение первой нейросети в PyTorch. Семинар",
						videoId: DEFAULT_VIDEO,
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
						videoId: DEFAULT_VIDEO,
					},
					{
						id: "dl_3_2",
						title: "3.2 Сверточные нейронные сети. Семинар",
						videoId: DEFAULT_VIDEO,
					},
				],
			},
			{
				id: 4,
				title: "Модуль 4: Тюнинг нейросетей",
				lessons: [
					{
						id: "dl_4_1",
						title: "4.1 Регуляризация и нормализация нейронных сетей. Batch нормализация",
						videoId: DEFAULT_VIDEO,
					},
					{
						id: "dl_4_2",
						title: "4.2 Нормализация входных данных. Инициализация параметров. Аугментация данных",
						videoId: DEFAULT_VIDEO,
					},
					{
						id: "dl_4_3",
						title: "4.3 Практика",
						videoId: DEFAULT_VIDEO,
					},
				],
			},
			{
				id: 5,
				title: "Модуль 5: Архитектуры CNN",
				lessons: [
					{
						id: "dl_5_1",
						title: "5.1 Популярные архитектуры сверточных нейронных сетей. Перенос знаний",
						videoId: DEFAULT_VIDEO,
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
						videoId: DEFAULT_VIDEO,
					},
					{
						id: "dl_6_2",
						title: "6.2 Практика по сегментации",
						videoId: DEFAULT_VIDEO,
					},
					{
						id: "dl_6_3",
						title: "6.3 Детекция объектов",
						videoId: DEFAULT_VIDEO,
					},
					{
						id: "dl_6_4",
						title: "6.4 Практика по детекции",
						videoId: DEFAULT_VIDEO,
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
						videoId: DEFAULT_VIDEO,
					},
					{
						id: "dl_7_2",
						title: "7.2 Идентификация лиц",
						videoId: DEFAULT_VIDEO,
					},
					{
						id: "dl_7_3",
						title: "7.3 Автоэнкодеры на практике",
						videoId: DEFAULT_VIDEO,
					},
					{
						id: "dl_7_4",
						title: "7.4 Распознавание лиц на практике",
						videoId: DEFAULT_VIDEO,
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
						videoId: DEFAULT_VIDEO,
					},
					{
						id: "dl_8_2",
						title: "8.2 Векторные представления текстов. Семинар",
						videoId: DEFAULT_VIDEO,
					},
				],
			},
			{
				id: 9,
				title: "Модуль 9: NLP - RNN & Attention",
				lessons: [
					{
						id: "dl_9_1",
						title: "9.1 Реккурентные нейронные сети (RNN) и их модификации",
						videoId: DEFAULT_VIDEO,
					},
					{
						id: "dl_9_2",
						title: "9.3 Трансформер",
						videoId: DEFAULT_VIDEO,
					},
					{
						id: "dl_9_3",
						title: "9.4 Практика",
						videoId: DEFAULT_VIDEO,
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
						videoId: DEFAULT_VIDEO,
					},
					{
						id: "dl_10_2",
						title: "10.2 Bert",
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

	career: {
		title: "БОНУС: Карьера",
		color: "yellow",
		icon: "briefcase",
		nextCourseId: "python", // Закольцовано на Python
		modules: [
			{
				id: 1,
				title: "Модуль 1: Собеседования",
				lessons: [
					{
						id: "car_1_1",
						title: "Машинное обучение ещё раз повторяем, что может встретиться на собеседовании",
						videoId: DEFAULT_VIDEO,
					},
					{
						id: "car_1_2",
						title: "Собеседования по теории вероятностей и статистике",
						videoId: DEFAULT_VIDEO,
					},
					{
						id: "car_1_3",
						title: "Собеседования по AB тестированию",
						videoId: DEFAULT_VIDEO,
					},
				],
			},
			{
				id: 2,
				title: "Модуль 2: Трудоустройство",
				lessons: [
					{
						id: "car_2_1",
						title: "Трудоустройство - первые шаги (Start ML_подготовка, как оформить гитхаб, Гайд для ML)",
						videoId: DEFAULT_VIDEO,
					},
					{
						id: "car_2_2",
						title: "Гайд для ML",
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
