'use strict';

import {radioPlayerInit} from './radioPlayer.js';
import {musicPlayerInit} from './musicPlayer.js';
import {videoPlayerInit} from './videoPlayer.js';

// const playerVideo = document.querySelector('.player-video');
const playerBtn = document.querySelectorAll('.player-btn');
const playerBlock = document.querySelectorAll('.player-block');
const temp = document.querySelector('.temp');

const deactivationPlayer = () => {
    temp.style.display = 'none';
    playerBtn.forEach( item => item.classList.remove('active'));
    playerBlock.forEach( item => item.classList.remove('active'));
};
// radioPlayerInit();
// musicPlayerInit();
// videoPlayerInit();

playerBtn.forEach((btn, i) => btn.addEventListener('click', () => {
        deactivationPlayer();
        btn.classList.add('active');
        playerBlock[i].classList.add('active');
    }));