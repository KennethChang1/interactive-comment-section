'use strict';
const container = document.querySelector('#comment-container');
let a;

fetch('./data.json')
    .then(res => res.json())
    .then(data => {
        displayComment(data);
        reply();
        post(data);
        addReply(data);
        score();
        a = data;
        return a;
    })
    .catch(err => console.log(err));

function displayComment(data) {
    const {
        comments
    } = data;

    for (let i = 0; i < comments.length; i++) {
        const cardContainer = document.createElement('div');
        const cardBox = document.createElement('div');
        const replyContainer = document.createElement('div');

        replyContainer.classList.add('card', 'card--not-active', 'card-js');
        cardBox.classList.add('box');
        cardContainer.classList.add('card');
        // displayReply.classList.add('reply');

        cardContainer.innerHTML = `
        <div class="card__header">
            <img class="card__image" src="${comments[i].user.image.webp}" alt="">
            <p class="card__name">${comments[i].user.username}</p>
            <p class="card__time">${comments[i].createdAt}</p>
        </div>
        <div class="card__body">
            <p class="card__copy">${comments[i].content}</p>
        </div>
        <div class="card__footer">
            <div class="card__actions">
                <img class="plus" listener="true" src="images/icon-plus.svg" alt="">
                <p class='score'>${comments[i].score}</p>
                <img class="minus" src="images/icon-minus.svg" alt="">
            </div>
            <div class="card__reply">
                <img src="images/icon-reply.svg" alt="">
                <span>Reply</span>
            </div>
        </div>
        `

        replyContainer.innerHTML = `
        <textarea class="card__input" data-reply-input >@${comments[i].user.username} </textarea>
        <div class="card__footer">
            <img class="card__image" src="images/avatars/image-juliusomo.webp" alt="">
            <button class="btn reply">REPLY</button>
        </div>
        `

        cardBox.appendChild(cardContainer);
        cardBox.appendChild(replyContainer);
        container.appendChild(cardBox);
    }
}

function reply() {
    const replyBtn = document.querySelectorAll('.card__reply');
    const reply = document.querySelectorAll('.card-js');
    replyBtn.forEach((element, index) => {
        element.addEventListener('click', () => {
            reply[index].classList.toggle('card--not-active');
        })
    });
}

function addReply(data) {
    const reply = document.querySelectorAll('.reply');
    const box = document.querySelectorAll('.box');
    const input = document.querySelectorAll('[data-reply-input]');
    const replyBox = document.querySelectorAll('.card-js');
    const {
        currentUser
    } = data;
    const {
        comments
    } = data;
    reply.forEach((element, i) => {
        element.addEventListener('click', () => {
            const cardContainer = document.createElement('div');
            cardContainer.classList.add('card', 'card--reply');
            cardContainer.setAttribute('data-key', 'reply');

            cardContainer.innerHTML = `
            <div class="card__header">
                <img class="card__image" src="${currentUser.image.webp}" alt="">
                <p class="card__name">${currentUser.username}</p>
                <p class="card__time">1 Second ago</p>
            </div>
            <div class="card__body">
                <p class="card__copy">${input[i].value}</p>
            </div>
            <div class="card__footer">
                <div class="card__actions">
                    <img class="plus" listener="true" src="images/icon-plus.svg" alt="">
                    <p class='score'>1</p>
                    <img class="minus" src="images/icon-minus.svg" alt="">
                </div>
                <div class="card__footer-logo">
                    <img src="images/icon-delete.svg" alt="">
                    <span class="delete">Delete</span>
                    <img src="images/icon-edit.svg" alt="">
                    <span class='edit'>Edit</span>
                </div>
            </div>
            `

            box[i].appendChild(cardContainer);
            input[i].value = `@${comments[i].user.username} `;
            replyBox[i].classList.add('card--not-active');
            deletePost();
        })
    })
}

function post(data) {
    const send = document.getElementById('send');
    const input = document.getElementById('comment-input')
    const {
        currentUser
    } = data;
    send.addEventListener('click', () => {
        const cardContainer = document.createElement('div');
        cardContainer.classList.add('card');
        cardContainer.setAttribute('data-key', 'comment');

        cardContainer.innerHTML = `
        <div class="card__header">
            <img class="card__image" src="${currentUser.image.webp}" alt="">
            <p class="card__name">${currentUser.username}</p>
            <p class="card__time">1 Second ago</p>
        </div>
        <div class="card__body">
            <p class="card__copy post-value">${input.value}</p>
        </div>
        <div class="card__footer">
            <div class="card__actions">
                <img class="plus" listener="true" src="images/icon-plus.svg" alt="">
                <p class='score'>1</p>
                <img class="minus" src="images/icon-minus.svg" alt="">
            </div>
            <div class="card__footer-logo">
                <img src="images/icon-delete.svg" alt="">
                <span class="delete">Delete</span>
                <img src="images/icon-edit.svg" alt="">
                <span class='edit post-edit'>Edit</span>
            </div>
        </div>
        `

        container.appendChild(cardContainer);
        input.value = "";
        deletePost();
        edit();
    })
}

function deletePost() {
    const del = document.querySelectorAll('.delete');
    const comment = document.querySelectorAll('[data-key = comment]')
    del.forEach((element, index) => {
        element.addEventListener('click', () => {
            comment[index].remove();
        })
    })
}

function score() {
    const plus = document.querySelectorAll('.plus');
    const minus = document.querySelectorAll('.minus');
    const score = document.querySelectorAll('.score');

    plus.forEach((element, index) => {
        element.addEventListener('click', add, {
            once: true
        });

        function add() {
            score[index].textContent = +score[index].textContent + 1;
        }
    });

    minus.forEach((element, index) => {
        element.addEventListener('click', () => {
            score[index].textContent = +score[index].textContent - 1;
        }, {
            once: true
        });
    });
}

function edit() {
    const edit = document.querySelectorAll('.post-edit');
    const comment = document.querySelectorAll('[data-key = comment]');
    const value = document.querySelectorAll('.post-value');
    edit.forEach((element, index) => {
        element.addEventListener('click', () => {
            comment[index].innerHTML = `     
            <textarea class="card__input updated-value" name="" id="comment-input" placeholder="Add a comment...">${value[index].textContent}</textarea>
            <div class="card__footer">
              <img class="card__image" src="images/avatars/image-juliusomo.webp" alt="">
              <button class="btn update">UPDATE</button>
            </div>`
            update();
        })
    })
}

function update(){
    const update = document.querySelectorAll('.update');
    const comment = document.querySelectorAll('[data-key = comment]');
    const updatedValue = document.querySelector('.updated-value');
    const {
        currentUser
    } = a;
    update.forEach((element, index) =>{
        element.addEventListener('click', ()=>{
            const cardContainer = document.createElement('div');
            cardContainer.classList.add('card');
            cardContainer.setAttribute('data-key', 'comment');
    
            cardContainer.innerHTML = `
            <div class="card__header">
                <img class="card__image" src="${currentUser.image.webp}" alt="">
                <p class="card__name">${currentUser.username}</p>
                <p class="card__time">1 Second ago</p>
            </div>
            <div class="card__body">
                <p class="card__copy post-value">${updatedValue.value}</p>
            </div>
            <div class="card__footer">
                <div class="card__actions">
                    <img class="plus" listener="true" src="images/icon-plus.svg" alt="">
                    <p class='score'>1</p>
                    <img class="minus" src="images/icon-minus.svg" alt="">
                </div>
                <div class="card__footer-logo">
                    <img src="images/icon-delete.svg" alt="">
                    <span class="delete">Delete</span>
                    <img src="images/icon-edit.svg" alt="">
                    <span class='edit'>Edit</span>
                </div>
            </div>
            `
            
            container.appendChild(cardContainer);
            comment[index].remove();
        })
    })
}
