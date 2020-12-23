'use strict';
export const radioPlayerInit = () => {
    const radio = document.querySelector('.radio');
    const radioCoverImg = document.querySelector('.radio-cover__img');
    const radioNavigation = document.querySelector('.radio-navigation');
    const radioHeaderBig = document.querySelector('.radio-header__big');
    const radioItem = document.querySelectorAll('.radio-item');
    const radioStop = document.querySelector('.radio-stop');

    const audio = new Audio(); // Создаём объект конструктора Аудио
    audio.type = 'audio/aac'; // Указываем тип данных

    radioStop.disabled  = true; // Блокируем кнопку play

    const changeIconPlay = () => { // функция изменения иконок
        if (audio.paused) {
            radio.classList.remove('play');
            radioStop.classList.add('fa-play');
            radioStop.classList.remove('fa-stop');
        } else {
            radio.classList.add('play');
            radioStop.classList.remove('fa-play');
            radioStop.classList.add('fa-stop');
        }
    };

    const selectItem = (elem) => { // функция добавления обводки выделенному элементу
        radioItem.forEach(item => item.classList.remove('select')); // убираем у всех класс select
        elem.classList.add('select'); // добавляем класс select
    };

    radioNavigation.addEventListener('change', (event) => {
        const target = event.target; // в переменную записываем элемент по которому кликнули
        const parrent = target.closest('.radio-item'); // Получаем родителя по селектору
        selectItem(parrent); // вызываем функцию добавления обводки
        
        const title = parrent.querySelector('.radio-name').textContent; // Находим элемент по селектору и получаем контент
        radioHeaderBig.textContent = title; // в заголовок записываем переменную title

        const img = parrent.querySelector('.radio-img').src; // Находим по селектору изображение и берём src
        radioCoverImg.src = img; // D элемент с картинкой записываем переменную img

        radioStop.disabled = false; // разблокируем кнопку стоп
        
        
        audio.src = target.dataset.radioStantion; // Из data атрибута получаем данные и записываем в src
        audio.play(); // Запускаем музыку
        changeIconPlay();
    });

    radioStop.addEventListener('click', () => { // Функция запуска и остановки музыки
        if (audio.paused) {
            audio.play();
        } else {
            audio.pause();
        }
        changeIconPlay();
    });
};