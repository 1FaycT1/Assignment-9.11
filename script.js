// Функция для загрузки данных
async function loadData() {
    try {
        const response = await fetch('data.json');
        return await response.json();
    } catch (error) {
        console.error('Не удалось загрузить данные:', error);
        return null;
    }
}

// Глобальная переменная для хранения загруженных JSON-данных
let data;

// Функция для инициализации приложения после загрузки данных
async function init() {
    data = await loadData();
}

// Инициализация приложения при загрузке страницы
init();


// Функция генерации случайного числа в диапазоне от min до max (включительно)
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Функция для получения случайного элемента из массива
function getRandomElementFromArray(arr) {
    return arr[getRandomInt(0, arr.length - 1)];
}

// Функция для генерации даты рождения
function generateBirthDate() {
    const daysInMonth = {
        'января': 31,
        'февраля': 29, // учитываем високосный год
        'марта': 31,
        'апреля': 30,
        'мая': 31,
        'июня': 30,
        'июля': 31,
        'августа': 31,
        'сентября': 30,
        'октября': 31,
        'ноября': 30,
        'декабря': 31,
    };

    const months = Object.keys(daysInMonth);
    const randomMonth = getRandomElementFromArray(months);
    const days = daysInMonth[randomMonth];
    const randomDay = getRandomInt(1, days);
    const randomYear = getRandomInt(1950, 2005); // Измените диапазон по вашему усмотрению

    // Форматируем дату в формат 'день месяц год'
    return `${randomDay} ${randomMonth} ${randomYear}`;
}

// Функция для генерации имени, фамилии и отчества (при наличии) и пола
function generateNameAndSurname() {
    const gender = Math.random() < 0.5 ? 'male' : 'female';
    const profession = getRandomElementFromArray(data.professions[gender]);
    const firstName = getRandomElementFromArray(data.names[gender]);
    const lastName = getRandomElementFromArray(data.surnames[gender]);
    let patronymic = '';

    if (gender === 'male') {
        patronymic = getRandomElementFromArray(data.patronymics.male);
    } else {
        patronymic = getRandomElementFromArray(data.patronymics.female);
    }

    const birthDate = generateBirthDate(data.daysInMonth); // Передаем объект daysInMonth в функцию

    return {
        gender: gender === 'male' ? 'Мужской' : 'Женский',
        firstName: firstName,
        lastName: lastName,
        patronymic: patronymic,
        profession: profession,
        birthDate: birthDate,
    };
}


// Функция для генерации данных и вывода результата
function generateName() {
    const person = generateNameAndSurname();
    const output = document.getElementById('output');
    output.innerHTML = `
        <p>Пол: ${person.gender}</p>
        <p>Фамилия: ${person.lastName}</p>
        <p>Имя: ${person.firstName}</p>
        ${person.patronymic ? `<p>Отчество: ${person.patronymic}</p>` : ''}
        <p>Дата рождения: ${person.birthDate}</p>
        <p>Профессия: ${person.profession}</p>
    `;
}

// Функция для очистки данных
function clearData() {
    const output = document.getElementById('output');
    output.innerHTML = '';
}
