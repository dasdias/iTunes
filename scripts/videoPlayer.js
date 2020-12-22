'use strict';
export const videoPlayerInit = () => {
    const videoPlayer = document.querySelector('.video-player');
    const videoButtonPlay = document.querySelector('.video-button__play');
    const videoButtonStop = document.querySelector('.video-button__stop');
    const videoTimePassed = document.querySelector('.video-time__passed');
    const videoProgress = document.querySelector('.video-progress');
    const videoTimeTotal = document.querySelector('.video-time__total');

    console.dir(videoPlayer);
    const toggleIcon = () => { // функция меняющая иконки play и pause
        if (videoPlayer.paused) {
            videoButtonPlay.classList.remove('fa-pause');
            videoButtonPlay.classList.add('fa-play');
        } else {
            videoButtonPlay.classList.add('fa-pause');
            videoButtonPlay.classList.remove('fa-play');
        }
    };

    const tooglePlay = () => { // функция запускающая и останавливающая плеер
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

    const addZero = n => n < 10 ? '0' + n : n; // функция добавленияноля к числу

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

        videoProgress.addEventListener('change', () => {
            const duration = videoPlayer.duration; // заносим в переменную время окончания видео
            const value = videoProgress.value; // Записываем в переменную текущее значение шкалы времени
            videoPlayer.currentTime = (value * duration) / 100; // устанавливаем значение в процентах для переключения видео кликнув по шкале времени
        });
    });

};