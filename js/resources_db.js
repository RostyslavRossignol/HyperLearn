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
export const LESSON_ATTACHMENTS = {
	// --- PYTHON ---
	py_0_1: { hasContent: false, files: [] },
	py_0_2: { hasContent: false, files: [] },

	py_1_1: {
		hasContent: true,
		topDescription:
			"В этом уроке мы разберем базовый синтаксис Python, переменные и типы данных.",

		// ТЕКСТ УРОКА (БЕЗ СЛОВА 'ПОДСКАЗКИ')
		htmlContent: `
            <h3>Всем привет!</h3>
            <p>Добро пожаловать на первый блок "Прикладная разработка на Python"!</p>
            <p>Первые несколько уроков данного блока будут посвящены основам Python, знание которых сделает нашу дальнейшую работу с данными гораздо приятнее. Базовые навыки программирования на Python понадобятся нам, чтобы в дальнейшем освоить методы машинного обучения.</p>
            <p>Хотя это занятие и первое, для тех, кто только начинает осваивать программирование, оно в каком-то смысле может показаться самым сложным. Но помните, что вы не одни и на связи есть команда поддержки :)</p>
            
            <div class="bg-indigo-500/10 border-l-4 border-indigo-500 p-4 my-6 rounded-r-lg">
                <h4 class="font-bold text-white mb-2 text-lg">О задачах</h4>
                <ul class="list-disc pl-5 space-y-2 text-sm text-slate-300">
                    <li>У задач курса есть сроки выполнения — обычно это 2 недели с момента открытия урока. За правильное выполнение задачи в течение 2 недель после открытия вы получаете полный балл. За выполнение после дедлайна — половину баллов.</li>
                    <li>В блоке есть ряд сложных задач, помеченных как <b>"💀 Сложное задание! 💀"</b>. Тем не менее, эти задания являются обязательными.</li>
                    <li>Также есть задачи <b>"⭐️ Задание со звёздочкой! ⭐️"</b>. Они не обязательны, но полезны для развития.</li>
                </ul>
            </div>
            
            <p>Сейчас мы пойдем от простого к сложному: сначала поупражняемся в основных конструкциях, затем начнем использовать их для написания своей первой практической программы.</p>
            <p>Поскольку это наши первые задания, будет много вспомогательной информации. Не переживайте, мы научимся писать код без них, как только станем чуть более опытными.</p>

            <hr class="border-white/10 my-8">

            <h3>Базовый синтаксис</h3>
            <p>Наше первое задание :) Начнем с простого. Создайте переменную <code>i</code> и запишите в нее значение 3.</p>

            <h3>Базовый синтаксис (Переменные)</h3>
            <p>Создайте три переменных <code>name</code>, <code>age</code> и <code>is_student</code> и впишите в них любые имя, возраст и True/False соответственно.</p>
            <p>Затем распечатайте эти переменные, передав их тремя аргументами в функцию <code>print</code>, либо вызвав <code>print</code> три раза.</p>
            <p>Создайте комментарий в любом месте программы и напишите туда дату решения задачи. Это ни на что не повлияет — просто попрактикуемся в написании комментариев.</p>

            <h3>Арифметика: поход в магазин</h3>
            <p>В следующих степах мы попробуем использовать переменные для простой арифметики.</p>
            <p>Представим, что у нас есть <code>total_money</code> рублей и мы идем в магазин покупать варенье про запас. Каждая банка варенья стоит <code>price</code> рублей (при этом price > 0). Наша задача — подсчитать, сколько банок мы сможем купить.</p>
            <div class="bg-yellow-500/10 border-l-4 border-yellow-500 p-3 my-4 text-sm text-yellow-100">
                <b>NB!</b> Переменные <code>total_money</code> и <code>price</code> уже заданы в ЛМС, их не нужно задавать самостоятельно.
            </div>
            <p>Запишите результат в переменную <code>jar_count</code>.</p>

            <h3>Арифметика: квадратные уравнения</h3>
            <p>Продолжаем знакомство с арифметикой в Python. Теперь мы научимся работать с дробными числами, возводить в степень и расставлять приоритет операций с помощью скобок.</p>
            <p>В практических приложениях математики часто встречаются квадратные уравнения: <code>ax^2 + bx + c = 0</code>.</p>
            <p>Здесь a, b и c — некие числа. Вот пример такого уравнения: <code>3x^2 + 7x - 10 = 0</code>.</p>
            <p>Наша задача: по известным a, b, c подсчитать оба корня этого уравнения. Как и в прошлом задании, переменные a, b и c уже заданы в ЛМС.</p>
            <p>Сохраните оба решения уравнения в переменные с названиями <code>x_1</code> и <code>x_2</code> соответственно.</p>
            <p>Для взятия квадратного корня можно возводить в степень 0.5. Скажем, если мы хотим подсчитать √9, то можем воспользоваться <code>9**0.5</code>.</p>

            <h3>Коллекции</h3>
            <p>Давайте теперь посмотрим, как Python работает с нечисленными данными. Допустим, у нас задача сделать книжку для записи дел на сегодня. Нам хочется, чтобы порядок дел в ней сохранялся. Также мы хотим уметь удалять элементы из этой книжки.</p>
            <p>Как думаете, какой тип данных подойдет для этого?</p>
            <p>Обычно дела пишут в свободной форме, например, "Сходить в магазин за хлебом". Как думаете, какой тип будет у одной записи в нашем списке?</p>

            <h3>Коллекции: объединение списков</h3>
            <p>Все готово к тому, чтобы вести дела. У нас есть два списка <code>tasks_my</code> и <code>tasks_friend</code>.</p>
            <p>Теперь необходимо объединить эти списки в один (любым способом, сначала tasks_my, потом tasks_friend) и сохраните результат в <code>tasks_all</code>.</p>
            
            <h3>Коллекции: система приоритетов</h3>
            <p>Список дел у нас готов. Давайте теперь добавим ему систему приоритетов. Чтобы задать приоритеты, нужно хранить не только задачу, но и число (скажем, 0, 1 или 5). Чем ниже число, тем приоритетнее задача.</p>

            <h3>Коллекции: записная книжка</h3>
            <p>Теперь, когда мы определились со структурой данных, мы можем создать свою записную книжку.</p>
            <p><b>Задача:</b> Напишите код, создающий словарь, и сохраните его в переменную <code>tasks</code>.</p>
            <div class="bg-yellow-500/10 border-l-4 border-yellow-500 p-3 my-4 text-sm text-yellow-100">
                <b>NB!</b> Ключи в этом словаре должны иметь целочисленный тип.
            </div>

            <h3>Условные переходы: основы</h3>
            <p>Отлично! Теперь у нас есть словарь tasks. Сейчас мы хотим выполнить простую проверку: если есть задачи нулевого приоритета, программа должна выводить строку "есть срочные дела", иначе — "можно отдохнуть".</p>

            <h3>Циклы: основы</h3>
            <p>В этом задании мы продолжим работать со словарем tasks и напишем свой первый цикл! Проитерируйтесь по ключам словаря и добавьте его значения (списки задач) в список <code>values</code>.</p>
            <p>Немного усложним задачу. Теперь мы хотим сохранить не списки задач, а <b>сами задачи</b>. Для этого необходимо проитерироваться по всем объектам в значениях словаря и добавить задачи в список <code>doings</code>.</p>

            <h3>Все вместе: ищем кота</h3>
            <p>Это задание включает часть идей из предыдущего, но теперь необходимо отобрать только те задачи, в которых есть подстрока "кот", и добавить их в список <code>answer</code>.</p>

            <h3>Continue и break: спасаемся от работы</h3>
            <p>Мы будем итерироваться по ключам словаря tasks, брать задания оттуда и по одному добавлять их в список answer. Но мы ленимся, поэтому готовы взять только самые срочные задания (приоритет меньше 2).</p>
            <p>Если длина списка answer достигает двух, то мы решаем, что дел достаточно, и прерываем выполнение цикла (break). И еще важный момент — в список нужно добавлять только задачи с подстрокой "кот".</p>

            <h3>Множества: дубли в задачах</h3>
            <p>Последняя неделя выдалась тяжелой, и одна и та же задача может дублироваться! Вам дан словарь с задачами. Пройдитесь по всем ключам и устраните дублирование только в рамках значений, соответствующих одному ключу. Создайте новый словарь <code>new_tasks</code>.</p>
        `,

		files: [
			{
				name: "1_урок.pdf",
				// Сюда вставь ссылку, когда загрузишь в консоль
				url: "#",
				type: "pdf",
			},
			{
				name: "1 Lesson.ipynb",
				// ТВОЯ ССЫЛКА
				url: "https://firebasestorage.googleapis.com/v0/b/hyperlearn-564f7.firebasestorage.app/o/lessons%2Fpy_1_1%2F1%20Lesson.ipynb?alt=media&token=a8d62e02-4ed7-44f0-bdbc-7f4bfb238093",
				type: "notebook",
			},
			{
				name: "1 Задания.docx",
				url: "#",
				type: "doc",
			},
		],
	},

	py_1_2: {
		hasContent: false,
		topDescription: "Типы данных в Python.",
		files: [],
	},
	py_1_3: {
		hasContent: false,
		topDescription: "Циклы (часть 1).",
		files: [],
	},
	py_1_4: {
		hasContent: false,
		topDescription: "Циклы (часть 2).",
		files: [],
	},
	py_1_5: {
		hasContent: false,
		topDescription: "Условия If/Else.",
		files: [],
	},

	// Модуль 2
	py_2_1: { hasContent: false, files: [] },
	py_2_2: { hasContent: false, files: [] },
	py_2_3: { hasContent: false, files: [] },
	py_2_4: { hasContent: false, files: [] },
	py_2_5: { hasContent: false, files: [] },
	py_2_6: { hasContent: false, files: [] },
	py_2_7: { hasContent: false, files: [] },

	// Модуль 3
	py_3_0: { hasContent: false, files: [] },
	py_3_1: { hasContent: false, files: [] },
	py_3_2: { hasContent: false, files: [] },
	py_3_3: { hasContent: false, files: [] },
	py_3_4: { hasContent: false, files: [] },
	py_3_5: { hasContent: false, files: [] },
	py_3_6: { hasContent: false, files: [] },
	py_3_7: { hasContent: false, files: [] },

	// Модуль 4
	py_4_1: { hasContent: false, files: [] },
	py_4_2: { hasContent: false, files: [] },
	py_4_3: { hasContent: false, files: [] },
	py_4_4: { hasContent: false, files: [] },
	py_4_5: { hasContent: false, files: [] },
	py_4_6: { hasContent: false, files: [] },
	py_4_7: { hasContent: false, files: [] },
	py_4_8: { hasContent: false, files: [] },
	py_4_9: { hasContent: false, files: [] },

	// Модуль 5
	py_5_1: { hasContent: false, files: [] },
	py_5_2: { hasContent: false, files: [] },
	py_5_3: { hasContent: false, files: [] },
	py_5_4: { hasContent: false, files: [] },
	py_5_5: { hasContent: false, files: [] },
	py_5_6: { hasContent: false, files: [] },
	py_5_7: { hasContent: false, files: [] },
	py_5_8: { hasContent: false, files: [] },

	// Модуль 6
	py_6_1: { hasContent: false, files: [] },
	py_6_2: { hasContent: false, files: [] },
	py_6_3: { hasContent: false, files: [] },
	py_6_4: { hasContent: false, files: [] },

	// Модуль 7
	py_7_1: { hasContent: false, files: [] },
	py_7_2: { hasContent: false, files: [] },
	py_7_3: { hasContent: false, files: [] },

	// Модуль 8
	py_8_1: { hasContent: false, files: [] },
	py_8_2: { hasContent: false, files: [] },
	py_8_3: { hasContent: false, files: [] },
	py_8_4: { hasContent: false, files: [] },
	py_8_5: { hasContent: false, files: [] },
	py_8_6: { hasContent: false, files: [] },
	py_8_7: { hasContent: false, files: [] },

	// Модуль 9
	py_9_1: { hasContent: false, files: [] },
	py_9_2: { hasContent: false, files: [] },
	py_9_3: { hasContent: false, files: [] },
	py_9_4: { hasContent: false, files: [] },
	py_9_5: { hasContent: false, files: [] },
	py_9_6: { hasContent: false, files: [] },

	// Модуль 10
	py_10_1: { hasContent: false, files: [] },
	py_10_2: { hasContent: false, files: [] },

	// Модуль 11
	py_11_1: { hasContent: false, files: [] },
	py_11_2: { hasContent: false, files: [] },
	py_11_3: { hasContent: false, files: [] },
	py_11_4: { hasContent: false, files: [] },
	py_11_5: { hasContent: false, files: [] },
	py_11_6: { hasContent: false, files: [] },
	py_11_7: { hasContent: false, files: [] },

	// Модуль 12
	py_12_1: { hasContent: false, files: [] },
	py_12_2: { hasContent: false, files: [] },
	py_12_3: { hasContent: false, files: [] },
	py_12_4: { hasContent: false, files: [] },
	py_12_5: { hasContent: false, files: [] },
	py_12_6: { hasContent: false, files: [] },

	// --- ALGO ---
	alg_1_1: { hasContent: false, files: [] },
	alg_2_1: { hasContent: false, files: [] },
	alg_2_2: { hasContent: false, files: [] },
	alg_2_3: { hasContent: false, files: [] },
	alg_2_4: { hasContent: false, files: [] },
	alg_2_5: { hasContent: false, files: [] },
	alg_2_6: { hasContent: false, files: [] },
	alg_3_1: { hasContent: false, files: [] },
	alg_3_2: { hasContent: false, files: [] },
	alg_3_3: { hasContent: false, files: [] },
	alg_3_4: { hasContent: false, files: [] },
	alg_4_1: { hasContent: false, files: [] },
	alg_4_2: { hasContent: false, files: [] },
	alg_4_3: { hasContent: false, files: [] },
	alg_4_4: { hasContent: false, files: [] },
	alg_4_5: { hasContent: false, files: [] },
	alg_5_1: { hasContent: false, files: [] },
	alg_5_2: { hasContent: false, files: [] },
	alg_5_3: { hasContent: false, files: [] },

	// --- STATS ---
	st_1_1: { hasContent: false, files: [] },
	st_1_2: { hasContent: false, files: [] },
	st_1_3: { hasContent: false, files: [] },
	st_1_4: { hasContent: false, files: [] },
	st_1_5: { hasContent: false, files: [] },
	st_2_1: { hasContent: false, files: [] },
	st_2_2: { hasContent: false, files: [] },
	st_2_3: { hasContent: false, files: [] },
	st_2_4: { hasContent: false, files: [] },
	st_2_5: { hasContent: false, files: [] },
	st_2_6: { hasContent: false, files: [] },
	st_3_1: { hasContent: false, files: [] },
	st_4_1: { hasContent: false, files: [] },
	st_5_1: { hasContent: false, files: [] },
	st_6_1: { hasContent: false, files: [] },
	st_7_1: { hasContent: false, files: [] },
	st_8_1: { hasContent: false, files: [] },
	st_9_1: { hasContent: false, files: [] },
	st_10_1: { hasContent: false, files: [] },
	st_10_2: { hasContent: false, files: [] },
	st_11_1: { hasContent: false, files: [] },

	// --- ML ---
	ml_1_1: { hasContent: false, files: [] },
	ml_1_2: { hasContent: false, files: [] },
	ml_1_3: { hasContent: false, files: [] },
	ml_1_4: { hasContent: false, files: [] },
	ml_2_1: { hasContent: false, files: [] },
	ml_2_2: { hasContent: false, files: [] },
	ml_2_3: { hasContent: false, files: [] },
	ml_2_4: { hasContent: false, files: [] },
	ml_2_5: { hasContent: false, files: [] },
	ml_2_6: { hasContent: false, files: [] },
	ml_3_1: { hasContent: false, files: [] },
	ml_3_2: { hasContent: false, files: [] },
	ml_3_3: {
		hasContent: true,
		topDescription: "Линейная регрессия OLS.",
		files: [{ name: "housing_data.csv", url: "#", type: "csv" }],
	},
	ml_3_4: { hasContent: false, files: [] },
	ml_3_5: { hasContent: false, files: [] },
	ml_3_6: { hasContent: false, files: [] },
	ml_3_7: { hasContent: false, files: [] },
	ml_4_1: { hasContent: false, files: [] },
	ml_4_2: { hasContent: false, files: [] },
	ml_4_3: { hasContent: false, files: [] },
	ml_4_4: { hasContent: false, files: [] },
	ml_4_5: { hasContent: false, files: [] },
	ml_5_1: { hasContent: false, files: [] },
	ml_5_2: { hasContent: false, files: [] },
	ml_5_3: { hasContent: false, files: [] },
	ml_6_1: { hasContent: false, files: [] },
	ml_6_2: { hasContent: false, files: [] },
	ml_6_3: { hasContent: false, files: [] },
	ml_6_4: { hasContent: false, files: [] },
	ml_6_5: { hasContent: false, files: [] },
	ml_6_6: { hasContent: false, files: [] },
	ml_7_1: { hasContent: false, files: [] },
	ml_7_2: { hasContent: false, files: [] },
	ml_7_3: { hasContent: false, files: [] },
	ml_7_4: { hasContent: false, files: [] },
	ml_8_1: { hasContent: false, files: [] },
	ml_8_2: { hasContent: false, files: [] },
	ml_8_3: { hasContent: false, files: [] },
	ml_8_4: { hasContent: false, files: [] },
	ml_9_1: { hasContent: false, files: [] },
	ml_9_2: { hasContent: false, files: [] },
	ml_9_3: { hasContent: false, files: [] },
	ml_9_4: { hasContent: false, files: [] },
	ml_9_5: { hasContent: false, files: [] },
	ml_10_1: { hasContent: false, files: [] },
	ml_10_2: { hasContent: false, files: [] },
	ml_10_3: { hasContent: false, files: [] },
	ml_10_4: { hasContent: false, files: [] },
	ml_11_1: { hasContent: false, files: [] },
	ml_11_2: { hasContent: false, files: [] },
	ml_12_1: { hasContent: false, files: [] },
	ml_12_2: { hasContent: false, files: [] },
	ml_12_3: { hasContent: false, files: [] },
	ml_13_1: { hasContent: false, files: [] },
	ml_13_2: { hasContent: false, files: [] },
	ml_13_3: { hasContent: false, files: [] },
	ml_14_1: { hasContent: false, files: [] },
	ml_14_2: { hasContent: false, files: [] },
	ml_14_3: { hasContent: false, files: [] },
	ml_15_1: { hasContent: false, files: [] },
	ml_15_2: { hasContent: false, files: [] },
	ml_15_3: { hasContent: false, files: [] },
	ml_15_4: { hasContent: false, files: [] },
	ml_16_1: { hasContent: false, files: [] },
	ml_16_2: { hasContent: false, files: [] },
	ml_16_3: { hasContent: false, files: [] },
	ml_16_4: { hasContent: false, files: [] },
	ml_17_1: { hasContent: false, files: [] },
	ml_17_2: { hasContent: false, files: [] },
	ml_17_3: { hasContent: false, files: [] },
	ml_17_4: { hasContent: false, files: [] },
	ml_18_1: { hasContent: false, files: [] },
	ml_18_2: { hasContent: false, files: [] },
	ml_18_3: { hasContent: false, files: [] },
	ml_19_1: { hasContent: false, files: [] },
	ml_19_2: { hasContent: false, files: [] },
	ml_19_3: { hasContent: false, files: [] },
	ml_19_4: { hasContent: false, files: [] },
	ml_20_1: { hasContent: false, files: [] },
	ml_20_2: { hasContent: false, files: [] },
	ml_20_3: { hasContent: false, files: [] },
	ml_20_4: { hasContent: false, files: [] },
	ml_21_1: { hasContent: false, files: [] },
	ml_21_2: { hasContent: false, files: [] },
	ml_21_3: { hasContent: false, files: [] },
	ml_21_4: { hasContent: false, files: [] },
	ml_22_1: { hasContent: false, files: [] },
	ml_22_2: { hasContent: false, files: [] },
	ml_22_3: { hasContent: false, files: [] },
	ml_22_4: { hasContent: false, files: [] },
	ml_23_1: { hasContent: false, files: [] },
	ml_23_2: { hasContent: false, files: [] },
	ml_24_1: { hasContent: false, files: [] },

	// --- DL ---
	dl_1_1: { hasContent: false, files: [] },
	dl_1_2: { hasContent: false, files: [] },
	dl_2_1: { hasContent: false, files: [] },
	dl_2_2: { hasContent: false, files: [] },
	dl_2_3: { hasContent: false, files: [] },
	dl_2_4: { hasContent: false, files: [] },
	dl_3_1: { hasContent: false, files: [] },
	dl_3_2: { hasContent: false, files: [] },
	dl_4_1: { hasContent: false, files: [] },
	dl_4_2: { hasContent: false, files: [] },
	dl_4_3: { hasContent: false, files: [] },
	dl_5_1: { hasContent: false, files: [] },
	dl_6_1: { hasContent: false, files: [] },
	dl_6_2: { hasContent: false, files: [] },
	dl_6_3: { hasContent: false, files: [] },
	dl_6_4: { hasContent: false, files: [] },
	dl_7_1: { hasContent: false, files: [] },
	dl_7_2: { hasContent: false, files: [] },
	dl_7_3: { hasContent: false, files: [] },
	dl_7_4: { hasContent: false, files: [] },
	dl_8_1: { hasContent: false, files: [] },
	dl_8_2: { hasContent: false, files: [] },
	dl_9_1: { hasContent: false, files: [] },
	dl_9_2: { hasContent: false, files: [] },
	dl_9_3: { hasContent: false, files: [] },
	dl_10_1: { hasContent: false, files: [] },
	dl_10_2: { hasContent: false, files: [] },
	dl_10_3: { hasContent: false, files: [] },

	// --- CAREER ---
	car_1_1: { hasContent: false, files: [] },
	car_1_2: { hasContent: false, files: [] },
	car_1_3: { hasContent: false, files: [] },
	car_2_1: { hasContent: false, files: [] },
	car_2_2: { hasContent: false, files: [] },
};
