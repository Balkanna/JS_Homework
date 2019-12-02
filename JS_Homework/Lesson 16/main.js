var btn = document.querySelector('button');
var userInLocalStorage = localStorage.getItem('users');
var tabsContainer = document.querySelector('.tabs-container');
var tabsInfoBlocks = document.querySelector('.info-blocks');
var users = JSON.parse(userInLocalStorage);

btn.addEventListener('click', function () {

    if (users) {
        console.log('Drawing tabs from localStorage')
        draw();
        return
    };

    console.log('Drawing tabs from request to server')

    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://reqres.in/api/users?page=2', true);
    xhr.send(); //отправка запроса на сервер

    xhr.onload = function() {
        var statusType = +String(this.status)[0];
        users = JSON.parse(this.response).data;
        console.log((statusType === 2) ? users : this.status);
        localStorage.setItem('users', JSON.stringify(users));
        draw();
    };
})

function draw() {

    for (var i = 0; i < users.length; i++) {
        drawTabs(i + 1, users[i].id);
    }
    var tabItems = document.getElementsByClassName('tab-item');
    tabItems[0].classList.add('active');
    insertContentIntoTabContentDiv(users[0]);//вставляем контент для перваого юзера
}

tabsContainer.addEventListener('click', function (event) {

    if (event.target !== event.currentTarget) {
        document.querySelector('.tab-item.active').classList.remove('active');
        event.target.classList.add('active')
        var targetUserId = event.target.getAttribute('data-user-id');
        var targetUserInUsersArray = users.filter(function (element) {
            return element.id == targetUserId;
        })

        insertContentIntoTabContentDiv(targetUserInUsersArray[0])
    }

})

function drawTabs(tabNumber, userId) {
    var tab = document.createElement('div');
    tab.classList.add('tab-item');
    tab.innerHTML = 'User ' + tabNumber;
    tab.setAttribute('data-user-id', userId)
    tabsContainer.appendChild(tab);
}

function insertContentIntoTabContentDiv(user) {
    var img = '<img src=' + user.avatar + '>';
    var firstName = '<p>' + 'First Name: ' + user.first_name + '</p>';
    var lastName = '<p>' + 'Last Name: ' + user.last_name + '</p>';
    var resultHTML = img + '<div>' + firstName + lastName + '</div>';

    tabsInfoBlocks.innerHTML = resultHTML;
}





