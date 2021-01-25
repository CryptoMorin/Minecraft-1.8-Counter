/** @type {Element} */
let startButton;
let startButtonHover = false;

window.onload = () => {
    startButton = document.getElementById('start');
    startButton.onmouseenter = () => {
        ball.enhanced = true;
        startButtonAmbient.play();
    }
    startButton.onmouseleave = () => {
            ball.enhanced = false;
            startButtonAmbient.pause();
            startButtonAmbient.currentTime = 0;
        }
        // window.addEventListener('mousemove', (e) => {
        //     const x = -e.offsetX + "deg";
        //     const y = -e.offsetY + "deg";
        //     const boundings = startButton.getBoundingClientRect();
        //     const boxCenter = [boundings.left + boundings.width / 2, boundings.top + boundings.height / 2];
        //     const angle = Math.atan2(e.pageX - boxCenter[0], -(e.pageY - boxCenter[1])) * (180 / Math.PI);
        //     startButton.style.transform = "rotate(" + angle + "deg" + ')';
        //     startButton.style.mozTransform = x + ',' + y;
        //     startButton.style.webkitTransform = x + ',' + y;
        // });
    startAudio.loop = true;
    startAudio.play();
}

function start() {
    startButton.remove();
    startAudio.remove();
    startAudio.pause();
    startButtonAmbient.pause();
    startButtonAmbient.remove();
    startButtonSound.play();
    started = false;

    // Change PNG Icon to Gif
    const link = document.querySelector("link[rel*='icon']"); // || document.createElement('link');
    link.type = 'image/gif';
    link.rel = 'icon';
    link.href = 'favicon.gif';
    document.head.appendChild(link);

    // import('./timer.js');
    include('js/timer.js');
    app.initialize();
}