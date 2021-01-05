'use strict';
import {addZero} from './supScript.js'; // импортируем функцию addZero
export const videoPlayerInit = () => {
    const videoPlayer = document.querySelector('.video-player');
    const videoButtonPlay = document.querySelector('.video-button__play');
    const videoButtonStop = document.querySelector('.video-button__stop');
    const videoTimePassed = document.querySelector('.video-time__passed');
    const videoProgress = document.querySelector('.video-progress');
    const videoTimeTotal = document.querySelector('.video-time__total');
    const videoVolume = document.querySelector('.video-volume');
    const videoIconDown = document.querySelector('.video-icon-down');
    const videoIconUp = document.querySelector('.video-icon-up');
    const videoFullscreen = document.querySelector('.video-fullscreen');


let currentVideoVolume = videoPlayer.volume; // переменная для получения текущего значения звука

    console.dir(videoPlayer);

    videoFullscreen.addEventListener('click', () => {
        videoPlayer.requestFullscreen();
    });

    const toggleIcon = () => { // функция меняющая иконки play и pause
        if (videoPlayer.paused) {
            videoButtonPlay.classList.remove('fa-pause');
            videoButtonPlay.classList.add('fa-play');
        } else {
            videoButtonPlay.classList.add('fa-pause');
            videoButtonPlay.classList.remove('fa-play');
        }
    };

    const tooglePlay = (event) => { // функция запускающая и останавливающая плеер
        event.preventDefault();
        if (videoPlayer.paused) {
            videoPlayer.play(); // по клику на видеоплеер запускаем видео
        } else {
            videoPlayer.pause(); // ставим плеер на паузу
        }
        // toggleIcon(); // запускаем функцию меняющую иконки play и pause
    };
    
    const stopPlay = () => {
        videoPlayer.pause(); // ставим плеер на паузу
        videoPlayer.currentTime = 0; // обнуляем текущее время
    };

    // const addZero = n => n < 10 ? '0' + n : n; // функция добавленияноля к числу

    const changeValue = () => { // функция изменения звука
        const valueVolume = videoVolume.value; 
        videoPlayer.volume = valueVolume / 100;
    };

    const minSound = () => { // функция отключения звука и определения текущего положения громкости звука
        if (videoPlayer.volume) { // если у видео плеера звук не равен "0" выполняем код
            currentVideoVolume = videoPlayer.volume; // записываем в переменную текущую громкость
            videoPlayer.volume = 0; // устанавливаем громкость на ноль
        } else { 
            videoPlayer.volume = currentVideoVolume; // иначе записываем громкость из переменной currentVideoVolume
        }
    };
    const maxSound = () => {
        if (videoPlayer.volume !== 1) { // если у видео плеера звук не равен "1" выполняем код
            currentVideoVolume = videoPlayer.volume; // записываем в переменную текущую громкость
            videoPlayer.volume = 1; // устанавливаем громкость на "1"
        } else { 
            videoPlayer.volume = currentVideoVolume; // иначе в видео плеер записываем громкость из переменной currentVideoVolume
        }
        // videoPlayer.muted = false;
        // videoPlayer.volume = 1;
    };

    videoIconDown.addEventListener('click', minSound);
    videoIconUp.addEventListener('click', maxSound);
    

    videoPlayer.addEventListener('click', tooglePlay); // по клику на видеоплеер выполняем функцию "tooglePlay" 
    videoButtonPlay.addEventListener('click', tooglePlay); // по клику на кноплу play выполняем функцию "tooglePlay"
    
    videoPlayer.addEventListener('play', toggleIcon); // по событию play выполняем функцию  "toggleIcon"
    videoPlayer.addEventListener('pause', toggleIcon); // по событию pause выполняем функцию  "toggleIcon"

    videoButtonStop.addEventListener('click', stopPlay); // по клику на кнопку "стоп" выполняем функцию "stopPlay"

    videoPlayer.addEventListener('timeupdate', () => { // по событию  "timeupdate" выполняем callBack функцию
        const currentTime = videoPlayer.currentTime; // заносим в переменную текущее время
        const duration = videoPlayer.duration; // заносим в переменную время окончания видео

        videoProgress.value = (currentTime /  duration) * 100; // В шкалу времени заносим процент от текущего времени

        let minutePassed = Math.floor(currentTime / 60); // Округляем текущие минуты
        let secondPassed = Math.floor(currentTime % 60); // Округляем текущие секунды

        let minuteTotal = Math.floor(duration / 60); // Округляем количество всего минут
        let secondTotal = Math.floor(duration % 60); // Округляем количество всего секунд

        videoTimePassed.textContent = `${minutePassed}:${addZero(secondPassed)}`; // Шаблонной строкой выводим в DOM кол-во прошедших минут, секунд и добавляем ноль к секундам
        // videoTimePassed.textContent = minutePassed + ':' + addZero(secondPassed); // выводим в DOM кол-во прошедших минут, секунд и добавляем ноль к секундам
        
        videoTimeTotal.textContent = minuteTotal + ':' + addZero(secondTotal); // выводим конечное кол-во минут, секунд и добавляем ноль к секундам

        videoProgress.addEventListener('input', () => {
            const duration = videoPlayer.duration; // заносим в переменную время окончания видео
            const value = videoProgress.value; // Записываем в переменную текущее значение шкалы времени
            videoPlayer.currentTime = (value * duration) / 100; // устанавливаем значение в процентах для переключения видео кликнув по шкале времени
        });
    });

    videoVolume.addEventListener('input', changeValue); // при изменении ползунка звука, выполняем функцию "changeValue"

    videoPlayer.addEventListener('volumechange', () => { // функция изменения шкалы звука при fullscreen экране
        videoVolume.value = Math.round(videoPlayer.volume * 100);
    });

    changeValue();

    return () => {
        videoPlayer.pause();
        toggleIcon();
    };
};