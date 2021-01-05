'use strict';
import {addZero} from './supScript.js'; // импортируем функцию addZero
export const musicPlayerInit = () => {
    const audio = document.querySelector('.audio');
    const audioImg = document.querySelector('.audio-img');
    const audioHeader = document.querySelector('.audio-header');
    const audioPlayer = document.querySelector('.audio-player');
    const audioNavigation = document.querySelector('.audio-navigation');
    const audioButtonPlay = document.querySelector('.audio-button__play');
    const audioProgress = document.querySelector('.audio-progress');
    const audioProgressTiming = document.querySelector('.audio-progress__timing');
    const audioTimePassed = document.querySelector('.audio-time__passed');
    const audioTimeTotal = document.querySelector('.audio-time__total');

    const playList = ['hello', 'flow', 'speed']; // создаем массив треков

    let trackIndex = 0; // указываем начальный трек

    const loadTrack = () => { // функция запуска музыки
        const isPlayed = audioPlayer.paused; // записываем в переменную, стоит ли сейчас пауза
        const track = playList[trackIndex]; // записываем в переменную track индекс массива playList


        audioPlayer.src = `./audio/${track}.mp3`; // в src аудио плеера записываем трек из папки
        audioHeader.textContent = track.toLocaleUpperCase(); // при переключении песни в заголовок выводим название песни из массива и приводим все буквы к верхнему регистру
        audioImg.src = `./audio/${track}.jpg`; // Записываем с src текущую картинку

        if (isPlayed) { // если песня проигрывается то ставим на паузу
            audioPlayer.pause();
        } else {
            audioPlayer.play(); // иначе запускаем музыку
        }
    };

    const prevTrack = () => { // функция предыдущая песня
        if (trackIndex !== 0 ) { // если индекс не равен "0" то уменьшаем индекс на 1
            trackIndex--;
        } else {
            trackIndex = playList.length -1; // проверяем сколько в массиве песен и отнимаем 1, что бы получить индекс массива
        }
        loadTrack();
    };

    const nextTrack = () => { // функция следующая песня
        if (trackIndex === playList.length -1) { // если трек последний, то trackIndex присваиваем 0 индекс песни
                trackIndex = 0;
            } else {
                trackIndex++; // иначе прибавляем "1", тоесть индекс следующей песни
            }
            loadTrack();  
    };

    audioNavigation.addEventListener('click', event => {
        const target = event.target; // путем делегирования, получаем дом елемент на который кликнули
        const track = playList[trackIndex]; // записываем в переменную track индекс массива playList

        if (target.classList.contains('audio-button__play')) { // если мы кликнули по кнопке с классом audio-button__play, то выполняем код
            audio.classList.toggle('play'); // при клике на audio переключаем класс play
            audioButtonPlay.classList.toggle('fa-play'); // при клике на audioButtonPlay переключаем класс fa-play
            audioButtonPlay.classList.toggle('fa-pause'); // при клике на audioButtonPlay переключаем класс fa-pause

            if (audioPlayer.paused) { 
                audioPlayer.play(); // Если аудио плеер на паузе, то запускаем плеер
            } else {
                audioPlayer.pause(); // еначе, ставим на паузу
            }
             audioHeader.textContent = track.toLocaleUpperCase(); // при переключении песни в заголовок выводим название песни из массива и приводим все буквы к верхнему регистру
        }
            
        if (target.classList.contains('audio-button__prev')) { //выполняем код, если кликнули на кнопку предыдущий трек
            prevTrack(); // вызываем функцию предыдущая песня
        }

        if (target.classList.contains('audio-button__next')) { //выполняем код, если кликнули на кнопку следующий трек
            nextTrack(); // вызываем функцию следующая песня
        }
    });

    audioPlayer.addEventListener('ended', () => { //событие когда песня заканчивается
        nextTrack(); // вызываем функцию следующая песня
        audioPlayer.play(); // запускаем плеер
    });

    audioPlayer.addEventListener('timeupdate', () => { // обрабатываем событие timeupdate
        const duration = audioPlayer.duration; // заносим в переменную время окончания трека
        const currentTime = audioPlayer.currentTime; // заносим в переменную текущее время
        const progress = (currentTime / duration) * 100; // высчитываем в процентах текущую позицию времени

        audioProgressTiming.style.width = progress + '%'; // в шкалу прогресса записываем текущий процент времени

        const minutePassed = Math.floor(currentTime / 60) || '0'; // Округляем текущие минуты
        const secondPassed = Math.floor(currentTime % 60) || '0'; // Округляем текущие секунды

        const minuteTotal = Math.floor(duration / 60) || '0'; // Округляем количество всего минут
        const secondTotal = Math.floor(duration % 60) || '0'; // Округляем количество всего секунд

        audioTimePassed.textContent = `${addZero(minutePassed)}:${addZero(secondPassed)}`; // округляем текущие минуты, секунды и выводим на страницу
        audioTimeTotal.textContent = `${addZero(minuteTotal)}:${addZero(secondTotal)}`;  // округляем конечное время минуты, секунды  и выводим на страницу
    });

    audioProgress.addEventListener('click', (e) => {
        const x = e.offsetX; // получаем координаты ширины прогресс шкалы
        const allWidth = audioProgress.clientWidth; // получаем ширину прогресс шкаля
        const progress = (x / allWidth) * audioPlayer.duration; // высчитываем проценту шкалы
        audioPlayer.currentTime = progress; //  в currentTime шкалы времени записываем значение куда кликнул пользователь
    });

    return () => {
        audioPlayer.pause(); // ставим плеер на паузу
        audio.classList.remove('play'); // при клике на audio переключаем класс play
        if (audioPlayer.paused) {
            audioButtonPlay.classList.add('fa-play'); // если плеер на паузе добавляем класс fa-play
            audioButtonPlay.classList.remove('fa-pause'); // если плеер на паузе удаляем класс fa-pause
        } 
    };
};