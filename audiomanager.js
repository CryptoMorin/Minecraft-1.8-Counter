let audioStopped = false;

const startAudio = new Audio('Genshin.mp3');
const startButtonSound = new Audio('startclick.ogg');
const startButtonAmbient = new Audio('start.ogg');
const countDownSound = new Audio('countdown.mp3');
const oFortuna = new Audio('OFortuna.mp3');

const audioButton = document.getElementById('audio');
window.addEventListener('load', () => drawAudioButton);
startButtonAmbient.onended = () => {
    startButtonAmbient.currentTime = 0;
    startButtonAmbient.play();
}

function onAudioButton() {
    if (audioStopped) startAudio();
    else stopAudio();
}

function stopAudio() {
    startAudio.pause();
    oFortuna.pause();
    oFortuna.currentTime = 0;
}

function drawAudioButton() {
    context.beginPath();
    context.ellipse(100, 75, 50, 70, 0, 0, Math.PI * 2);
    context.fillStyle = 'red';
    context.fill();
}

function start() {
    if (started) oFortuna.play();
    else startAudio.play();
}