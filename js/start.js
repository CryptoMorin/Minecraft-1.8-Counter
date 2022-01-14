import { audios } from './audiomanager.js';
import { ball, onCounterStart } from './nano.js';
import { init } from './canvas.js';
import { fadeAudio } from './utils.js';

/** @type {Element} */
const startButton = document.getElementById('start');
let startButtonHover = false;
const fadeListener = { startButtonAmbient: null };

startButton.onmouseenter = () => {
    if (fadeListener.startButtonAmbient) {
        clearInterval(fadeListener.startButtonAmbient);
        fadeAudio(audios.startButtonAmbient, 1.0, 1_000, interval => fadeListener.startButtonAmbient = interval);
    }
    ball.enhanced = true;
    audios.startButtonAmbient.currentTime = 0;
    audios.startButtonAmbient.play();
}
startButton.onmouseleave = () => {
    ball.enhanced = false;
    fadeAudio(audios.startButtonAmbient, 0, 2_000, interval => fadeListener.startButtonAmbient = interval).then(() => {
        audios.startButtonAmbient.pause();
        audios.startButtonAmbient.volume = 1.0;
        fadeListener.startButtonAmbient = null;
    });
}
audios.startAudio.loop = true;
audios.startAudio.play().catch(x => {
    if ((x.name ?? x) === 'NotAllowedError') {
        console.error("%cFUCK YOU. ENABLE AUTO AUTOPLAY FOR AUDIOS", 
           "color: red; background: black; font-family: revamped; font-size: xxx-large;" + 
            "cursor: url(resources/images/middlefinger.cur), grabbing");
            //window.location.href = '404.html';
    }
});

document.getElementById('start').addEventListener('click', () => {
    const { startAudio, startButtonAmbient, startButtonSound } = audios;

    startButton.remove();
    startAudio.remove();
    startAudio.pause();
    startButtonAmbient.pause();
    startButtonAmbient.remove();
    startButtonSound.play();
    onCounterStart();

    // Change PNG Icon to Gif
    Object.assign(document.head.querySelector("link[rel*='icon']"), {
        type: 'image/gif',
        rel: 'icon',
        href: 'resources/images/favicon.gif'
    });

    import('./timer.js').then(() => init());
}, { passive: true });