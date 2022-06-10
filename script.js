'use strict';
let data = {
    "currentUser": {
        "image": {
            "png": "./images/avatars/image-juliusomo.png",
            "webp": "./images/avatars/image-juliusomo.webp"
        },
        "username": "juliusomo"
    },
    "comments": [{
            "id": 1,
            "content": "Impressive! Though it seems the drag feature could be improved. But overall it looks incredible. You've nailed the design and the responsiveness at various breakpoints works really well.",
            "createdAt": "1 month ago",
            "score": 12,
            "user": {
                "image": {
                    "png": "./images/avatars/image-amyrobson.png",
                    "webp": "./images/avatars/image-amyrobson.webp"
                },
                "username": "amyrobson"
            },
            "replies": []
        },
        {
            "id": 2,
            "content": "Woah, your project looks awesome! How long have you been coding for? I'm still new, but think I want to dive into React as well soon. Perhaps you can give me an insight on where I can learn React? Thanks!",
            "createdAt": "2 weeks ago",
            "score": 5,
            "user": {
                "image": {
                    "png": "./images/avatars/image-maxblagun.png",
                    "webp": "./images/avatars/image-maxblagun.webp"
                },
                "username": "maxblagun"
            },
            "replies": [{
                    "id": 3,
                    "content": "If you're still new, I'd recommend focusing on the fundamentals of HTML, CSS, and JS before considering React. It's very tempting to jump ahead but lay a solid foundation first.",
                    "createdAt": "1 week ago",
                    "score": 4,
                    "replyingTo": "maxblagun",
                    "user": {
                        "image": {
                            "png": "./images/avatars/image-ramsesmiron.png",
                            "webp": "./images/avatars/image-ramsesmiron.webp"
                        },
                        "username": "ramsesmiron"
                    }
                },
                {
                    "id": 4,
                    "content": "I couldn't agree more with this. Everything moves so fast and it always seems like everyone knows the newest library/framework. But the fundamentals are what stay constant.",
                    "createdAt": "2 days ago",
                    "score": 2,
                    "replyingTo": "ramsesmiron",
                    "user": {
                        "image": {
                            "png": "./images/avatars/image-juliusomo.png",
                            "webp": "./images/avatars/image-juliusomo.webp"
                        },
                        "username": "juliusomo"
                    }
                }
            ]
        }
    ]
}

const container = document.querySelector('#comment-container');

const cardFactory = function () {
    let {
        comments
    } = data;

    const displayComment = (index) => {
        const cardContainer = document.createElement('div');
        const cardBox = document.createElement('div');
        const replyContainer = document.createElement('div');


        replyContainer.classList.add('card', 'card--not-active', 'card-js');
        cardBox.classList.add('box');
        cardContainer.classList.add('card');
        // displayReply.classList.add('reply');

        cardContainer.innerHTML = `
        <div class="card__header">
            <img class="card__image" src="${comments[index].user.image.webp}" alt="">
            <p class="card__name">${comments[index].user.username}</p>
            <p class="card__time">${comments[index].createdAt}</p>
        </div>
        <div class="card__body">
            <p class="card__copy">${comments[index].content}</p>
        </div>
        <div class="card__footer">
            <div class="card__actions">
                <img class="plus" listener="true" src="images/icon-plus.svg" alt="">
                <p class='score'>${comments[index].score}</p>
                <img class="minus" src="images/icon-minus.svg" alt="">
            </div>
            <div class="card__reply">
                <img src="images/icon-reply.svg" alt="">
                <span>Reply</span>
            </div>
        </div>
        `

        replyContainer.innerHTML = `
        <textarea class="card__input" name="" id="" placeholder="Add a comment...">@${comments[index].user.username} </textarea>
        <div class="card__footer">
            <img class="card__image" src="images/avatars/image-juliusomo.webp" alt="">
            <button class="btn">REPLY</button>
        </div>
        ` 

        cardBox.appendChild(cardContainer);
        cardBox.appendChild(replyContainer);
        container.appendChild(cardBox);

        const cards = document.querySelectorAll('.box');

        for(let j = 0; j < data.comments[index].replies.length; j++){
            const displayReply = document.createElement('div');
            displayReply.classList.add('reply');
            displayReply.innerHTML = `
            <div class="card card--reply">
                <div class="card__header">
                    <img class="card__image" src="${data.comments[index].replies[j].user.image.webp}" alt="">
                    <p class="card__name">${data.comments[index].replies[j].user.username}</p>
                    <p class="card__time">${data.comments[index].replies[j].createdAt}</p>
                </div>
                <div class="card__body">
                    <p class="card__copy"><span class="replying">@${data.comments[index].replies[j].replyingTo}</span> ${data.comments[index].replies[j].content}</p>
                </div>
                <div class="card__footer">
                    <div class="card__actions">
                        <img src="images/icon-plus.svg" alt="">
                        <p>${data.comments[index].replies[j].score}</p>
                        <img src="images/icon-minus.svg" alt="">
                    </div>
                    <div class="card__reply">
                        <img src="images/icon-reply.svg" alt="">
                        <span>Reply</span>
                    </div>
                </div>
            </div>
            `
            cards[index].appendChild(displayReply);
        }
    };
    

    const displayAllComment = () => {
        for (let i = 0; i < comments.length; i++) {
            displayComment(i);
        }
    };

    const score = () => {
        const plus = document.querySelectorAll('.plus');
        const score = document.querySelectorAll('.score');
        const minus = document.querySelectorAll('.minus');

        plus.forEach((element, index) => {
            element.addEventListener('click', addScore);

            function addScore() {
                score[index].textContent = +score[index].textContent + 1;
            }
        });

        minus.forEach((element, index) => {
            element.addEventListener('click', minusScore);

            function minusScore() {
                score[index].textContent = +score[index].textContent - 1;
            }
        });
    }

    const reply = () => {
        const reply = document.querySelectorAll('.card__reply');
        const replyContainer = document.querySelectorAll('.card-js');

        reply.forEach((element, index) => {
            element.addEventListener('click', () => {
                replyContainer[index].classList.toggle('card--not-active');
            });
        });
        console.log(reply);
    }

    return {
        displayAllComment,
        score,
        reply,
    }
}

const card = cardFactory();
card.displayAllComment();
card.score();
card.reply();
comment();

function comment() {
    const send = document.getElementById('send');
    const comment = document.querySelector('#comment-input');
    send.addEventListener('click', () => {
        const cardContainer = document.createElement('div');

        cardContainer.classList.add('card', 'card-comment');

        cardContainer.innerHTML = `
        <div class="card__header">
            <img class="card__image" src="${data.currentUser.image.webp}" alt="">
            <p class="card__name">${data.currentUser.username}</p>
            <p class="card__time">Seconds ago</p>
        </div>
        <div class="card__body">
            <p class="card__copy">${comment.value}</p>
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
        comment.value = "";
        deleteComment();
        editComment();
    })
}

function deleteComment(){
    const comment = document.querySelectorAll('.card-comment');
    const deleteComment = document.querySelectorAll('.delete');

    deleteComment.forEach((element, index) => {
        element.addEventListener('click', ()=>{
            comment[index].remove();
        })
    });
}

function editComment(){
    const edit = document.querySelector('.edit');
}
