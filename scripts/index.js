'use strict';

import {radioPlayerInit} from './radioPlayer.js'; // Подключаем экспортируемый файл
import {musicPlayerInit} from './musicPlayer.js'; // Подключаем экспортируемый файл
import {videoPlayerInit} from './videoPlayer.js'; // Подключаем экспортируемый файл

// const playerVideo = document.querySelector('.player-video');
const playerBtn = document.querySelectorAll('.player-btn');
const playerBlock = document.querySelectorAll('.player-block');
const temp = document.querySelector('.temp');

const deactivationPlayer = () => {  // убираем заголовок и класс "active" 
    temp.style.display = 'none';
    playerBtn.forEach( item => item.classList.remove('active'));
    playerBlock.forEach( item => item.classList.remove('active'));
};

playerBtn.forEach((btn, i) => btn.addEventListener('click', () => { // На кнопки навешиваем событие "клик"
deactivationPlayer(); // вызываем функцию убирающую заголовок и классы "active"
btn.classList.add('active'); // по клику на кнопку добавляем ей класс "active"
playerBlock[i].classList.add('active'); // Обращаемся к элементу через индекс и добавляем ему класс "active"
}));

radioPlayerInit();
musicPlayerInit();
videoPlayerInit();