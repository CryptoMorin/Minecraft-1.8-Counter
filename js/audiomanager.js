import { context } from './canvas.js';

export const audios = {
    startAudio: getAudio('Genshin.mp3'),
    startButtonSound: getAudio('startclick.ogg'),
    startButtonAmbient: getAudio('start.ogg'),

    _countDownSound: null,
    get countDownSound() { return this._countDownSound ?? (this._countDownSound = getAudio('countdown.mp3')) },

    _oFortuna: null,
    get oFortuna()       { return this._oFortuna       ?? (this._oFortuna       = getAudio('OFortuna.mp3'))  }
}

function getAudio(name) {
    return new Audio("resources/audios/" + name);
}

audios.startButtonAmbient.loop = true;
export let audioStopped = false;
//const audioButton = document.getElementById('audio');

// TODO implement audio button, but why?
function onAudioButton() {
    if (audioStopped) startAudio();
    else stopAudio();
}

export function stopAudio() {
    audios.startAudio.pause();
    audios.oFortuna.pause();
    audios.oFortuna.currentTime = 0;
}

function drawAudioButton() {
    context.beginPath();
    context.ellipse(100, 75, 50, 70, 0, 0, Math.PI * 2);
    context.fillStyle = 'red';
    context.fill();
}
