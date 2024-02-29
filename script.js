// Получение Пользователей по запросу
const url = "https://jsonplaceholder.typicode.com/users";

let fetchedData = [];

async function getUsers() {
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        if (!response.ok) {
            throw new Error(`Ошибка при выполнении запроса: ${response.status}`);
        }
        fetchedData = await response.json();
        displayUsers(fetchedData);
        console.log("fetched data", fetchedData);
    } catch (error) {
        alert("data fetch failed, please reload this page");
    }
}
getUsers();

// Создание карточек пользователей
function createUserCard(user) {
    const userCard = document.createElement("div");
    userCard.classList.add("user_card");

    const labelsAndParagraphs = [
        { label: 'Name', data: user.name },
        { label: 'Email', data: user.email.toLowerCase() },
        { label: 'Phone', data: user.phone }
    ];

    labelsAndParagraphs.forEach(item => {
        const label = document.createElement("span");
        label.textContent = item.label;
        label.classList.add('user_card_label')

        const paragraph = document.createElement("p");
        paragraph.textContent = item.data;
        paragraph.classList.add('user_card_content')
        userCard.appendChild(label);
        userCard.appendChild(paragraph);
    });

    return userCard;
}

// Отображение пользователей на основе данных
function displayUsers(users) {
    const users_section = document.getElementById("users");
    users_section.innerHTML = '';

    const userCards = users.map(user => createUserCard(user));

    userCards.forEach(userCard => {
        users_section.appendChild(userCard);
    });
}

// Поиск пользователей по критериям
function filterUsers() {
    const select = document.getElementById('select');
    const input = document.getElementById('search');
    const searchString = input.value.toLowerCase();
    const selectedCriteria = select.value;

    let filteredUsers = fetchedData;

    if (searchString.trim() !== '') {
        filteredUsers = fetchedData.filter(user => {
            const userData = user[selectedCriteria].toLowerCase();
            return userData.includes(searchString);
        });
    }

    displayUsers(filteredUsers);
}

// Обработчик событий для input и select 
const selectElement = document.getElementById('select');
const inputElement = document.getElementById('search');

selectElement.addEventListener('change', filterUsers);
inputElement.addEventListener('input', filterUsers);
