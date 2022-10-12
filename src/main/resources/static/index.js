const url = 'http://localhost:8080/api/users'
//document.querySelector возвращает первый подходящий элемент, селектор д.б. уникальным
const usersList = document.querySelector('#allUsers tbody')
const addUser = document.querySelector('#addNewUser')
const users = []

//Fetch API предоставляет интерфейс JS для работы с запросами и ответами HTTP. Он также предоставляет
//глобальный метод fetch(), который позволяет легко и логично получать ресурсы по сети асинхронно

//вывод пользователей в таблицу
const showAllUsers = (users) => {
    let output = ''
    users.forEach(user => {
        //output - элемент вывода
        output += `
            <tr id=${'tr' + user.id}>
                <td>${user.id}</td>
                <td id=${'firstName' + user.id}>${user.firstName}</td>
                <td id=${'lastName' + user.id}>${user.lastName}</td>
                <td id=${'age' + user.id}>${user.age}</td>
                <td id=${'email' + user.id}>${user.email}</td>
                <td>
                    <div id=${'roles' + user.id}>
                        ${user.roles.map(role => role.name).join(" ")}
                    </div>
                </td>
                <td class="text-white">
                <a class="btnEdit btn btn-info" data-toggle ="modal" data-target="#editModal"
                onclick="openEditModal(${user.id})">Edit</a></td>
                <td class="text-white">
                <a class="btnDelete btn btn-danger" data-toggle ="modal" data-target="#deleteModal"
                onclick="openDeleteModal(${user.id})">Delete</a></td>
            </tr>
       `;
    });
    //Свойство innerHTML позволяет получить HTML-содержимое элемента в виде строки
    usersList.innerHTML = output;
}

//Здесь мы забираем JSON файл по сети и выводим его содержимое в консоль
//отправляем базовый запрос на получение данных
fetch(url)
    .then(res => res.json())
    // получаем ответ
    .then(data => {
        showAllUsers(data);
        users.push(...data);
    })
    .catch(error => console.log(error))

//добавляем пользователя
addUser.addEventListener('submit', (e) => {
    e.preventDefault()
    let addNewUser = $('#addNewUser')
    let firstName = addNewUser.find('#addName').val().trim();
    let lastName = addNewUser.find('#addLastname').val().trim();
    let age = addNewUser.find('#addAge').val().trim();
    let email = addNewUser.find('#addUsername').val().trim();
    let password = addNewUser.find('#addPassword').val().trim();
    let roles = addNewUser.find('#addRole').val();
    let newUserData = {
        firstName: firstName,
        lastName: lastName,
        age: age,
        email: email,
        password: password,
        roles: roles
    }

    fetch(url, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(newUserData)
    })
        .then(res => res.json())
        .then(user => {
            $('#nav-home-tab').addClass('active');
            $('#nav-home').addClass('active');
            $('#nav-profile-tab').removeClass('active');
            $('#nav-profile').removeClass('active');
            users.push(user);
            showAllUsers(users);
        });
})

//удаляем пользователя
function openDeleteModal(id) {
    let firstName = $('#firstName' + id).text();
    let lastName = $('#lastName' + id).text();
    let age = $('#age' + id).text();
    let email = $('#email' + id).text();
    let roles = $('#roles' + id).text().trim().split(" ");
    $('#deleteModal #idDelete').val(id);
    $('#deleteModal #nameDelete').val(firstName);
    $('#deleteModal #lastnameDelete').val(lastName);
    $('#deleteModal #ageDelete').val(age);
    $('#deleteModal #usernameDelete').val(email);
    $('#deleteModal #rolesListDelete').empty()
    roles.forEach(role => {
        $('#deleteModal #rolesListDelete').append('<option>' + role + '</option>');
    })
}

$('#deleteButton').on('click', function () {
    let id = $('#deleteModal #idDelete').val();
    deleteUser(id);
})

function deleteUser(id) {
    fetch(url + id, {
        method: 'DELETE'
    }).then(r => console.log(r))

    const old = users.find(function (el) {
        return el.id == id;
    });
    const index = users.indexOf(old);
    if (index > -1) {
        users.splice(index, 1);
    }
    showAllUsers(users);
}

//редактируем пользователя
function openEditModal(id) {
    let firstNameEdit = $('#firsName' + id).text();
    let lastNameEdit = $('#lastName' + id).text();
    let ageEdit = $('#age' + id).text();
    let emailEdit = $('#email' + id).text();
    let rolesListEdit = $('#roles' + id).text().trim().split(" ");
    $('#editModal #idEdit').val(id);
    $('#editModal #nameEdit').val(firstNameEdit);
    $('#editModal #lastnameEdit').val(lastNameEdit);
    $('#editModal #ageEdit').val(ageEdit);
    $('#editModal #usernameEdit').val(emailEdit);
    $('#editModal #rolesListEdit').val(rolesListEdit);
    // $('#editModal #rolesListEdit').empty()
    // rolesListEdit.forEach(role => {
    //     $('#editModal #rolesListEdit').append('<option>' + role + '</option>');
    // })
}

$('#editButton').on('click', function () {
    let id = $('#editModal #idEdit').val();
    editUser(id);
})

function editUser(id) {
    let editedUser = $('#editModalForm');
    let edUser = {
        id: editedUser.find('#idEdit').val().trim(),
        firstName: editedUser.find('#firstNameEdit').val().trim(),
        lastName: editedUser.find('#lastNameEdit').val().trim(),
        age: editedUser.find('#ageEdit').val().trim(),
        email: editedUser.find('#emailEdit').val().trim(),
        password: editedUser.find('#passwordEdit').val().trim(),
        roles: editedUser.find('#rolesListEdit').val()
    }
    fetch(url + id, {
        method: 'PATCH',
        headers: {'Content-Type': 'application/json; charset=utf-8'},
        body: JSON.stringify(edUser)
    }).then(res => res.json())
        .then(user => {
            const old = users.find(function (el) {
                return el.id == id;
            });
            old.firstName = user.firstName;
            old.lastName = user.lastName;
            old.age = user.age;
            old.email = user.email;
            old.password = user.password;
            old.roles = user.roles;
            showAllUsers(users);
        });
}