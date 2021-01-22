// https://minecraft.gamepedia.com/Java_Edition_1.8.8
const oneEightRelease = new Date('July 27, 2015');
if (!audioStopped) oFortuna.play();

setTimeout(() => {
    countDownSound.loop = true;
    countDownSound.volume = 0.3;
    countDownSound.play();
    setTimeout(() => {
            app.color = 'black';
            app.rate = Math.PI / 100;
            const oldRGB = [40, 45, 112, 1];
            const newRGB = [180, 0, 0, 0.01];
            gradientTransition(oldRGB, newRGB, (r, g, b) => document.body.style.background = `radial-gradient(rgb(${r},${g},${b}),#000000)`);
        }, 1000 * 94) // 1:36 - 2 for the sake of the delay.
    setTimeout(() => {
        app.rate = Math.PI / 50;
        let time = 3000 / 20;
        const stopRate = app.rate / time;
        const interval = setInterval(() => {
            app.radius -= 1;
            app.radius2 -= 1;
            app.rate -= stopRate;
            if (--time == 0) {
                clearInterval(interval);
                app.prepareStop();
            }
        }, 20);
    }, 1000 * ((60 * 5) + 10)); // 5:21 -> 5:10 for more sudden effect.
}, 1000 * 3);

function format(time) {
    time = Math.floor(time);
    return time < 10 ? '0' + time : time;
}

const digitSegments = [
    [1, 2, 3, 4, 5, 6],
    [2, 3],
    [1, 2, 7, 5, 4],
    [1, 2, 7, 3, 4],
    [6, 7, 2, 3],
    [1, 6, 7, 3, 4],
    [1, 6, 5, 4, 3, 7],
    [1, 2, 3],
    [1, 2, 3, 4, 5, 6, 7],
    [1, 2, 7, 3, 6]
]

// document.addEventListener('DOMContentLoaded', function() {
const clock = document.createElement('div');
clock.className = 'clock';

const dateDiv = document.createElement('div');
dateDiv.className = 'date';
clock.appendChild(dateDiv);
// const year = [document.createElement('div'), document.createElement('div'), document.createElement('div'), document.createElement('div')];
// year[0].className = 'digit year';
// year[1].className = 'digit year';
// year[2].className = 'digit year';
// year[3].className = 'digit year';
// generateSegments(year);

// const month = [document.createElement('div'), document.createElement('div')];
// month[0].className = 'digit month';
// month[1].className = 'digit month';
// generateSegments(month);

// const days = [document.createElement('div'), document.createElement('div')];
// days[0].className = 'digit days';
// days[1].className = 'digit days';
// generateSegments(days);

const hours = [document.createElement('div'), document.createElement('div')];
hours[0].className = 'digit hours';
hours[1].className = 'digit hours';
generateSegments(hours);
appendSeparator();
const minutes = [document.createElement('div'), document.createElement('div')];
minutes[0].className = 'digit minutes';
minutes[1].className = 'digit minutes';
generateSegments(minutes);
appendSeparator();
const seconds = [document.createElement('div'), document.createElement('div')];
seconds[0].className = 'digit seconds';
seconds[1].className = 'digit seconds';
generateSegments(seconds);
appendSeparator('separator small');
const milliSecs = [document.createElement('div'), document.createElement('div')];
milliSecs[0].className = 'digit milliSecs small';
// milliSecs[1].className = 'digit milliSecs small';
// generateSegments(milliSecs);
clock.appendChild(milliSecs[0]);

document.body.appendChild(clock);

function generateSegments(currClass) {
    for (const curr of currClass) {
        console.log
        for (let j = 0; j < 7; j++) {
            const segment = document.createElement('div');
            segment.className = "segment";
            curr.appendChild(segment);
        }
        clock.appendChild(curr);
    }
}

function appendSeparator(name = 'separator') {
    const separator = document.createElement('div');
    separator.className = name;
    clock.appendChild(separator);
}

function loadTimerCss() {
    const css = document.createElement("link");
    css.rel = "stylesheet";
    css.type = "text/css";
    css.href = "main.css";
    document.head.appendChild(css);
}

setInterval(function() {
    const time = new Date();
    const diff = time - oneEightRelease;

    const millis = diff;
    const absoluteSeconds = Math.floor(millis / 1000);
    const absoluteMinutes = absoluteSeconds / 60;
    const absoluteHours = absoluteMinutes / 60;
    const absoluteDays = absoluteHours / 24;
    const absoluteWeeks = absoluteDays / 7;
    const absoluteMonths = absoluteDays / 30;
    const years = Math.floor(absoluteDays / 365);

    let ms = Math.floor(millis % 1000);
    const secs = Math.floor(absoluteSeconds % 60);
    const mins = Math.floor(absoluteMinutes % 60);
    const hrs = Math.floor(absoluteHours % 24);
    const d = Math.floor(absoluteDays % 30);
    const months = Math.floor(absoluteMonths % 12);

    // setNumber(year[0], Math.floor(years / 1000));
    // setNumber(year[1], Math.floor(years / 100));
    // setNumber(year[2], Math.floor(years / 10));
    // setNumber(year[3], Math.floor(years % 1000));

    // setNumber(month[0], Math.floor(months / 10));
    // setNumber(month[1], months % 10);

    // setNumber(days[0], Math.floor(d / 10));
    // setNumber(days[1], d % 10);
    dateDiv.innerHTML = years + " Years - " + months + " Months - " + d + " Days";

    setNumber(hours[0], Math.floor(hrs / 10));
    setNumber(hours[1], hrs % 10);

    setNumber(minutes[0], Math.floor(mins / 10));
    setNumber(minutes[1], mins % 10);

    setNumber(seconds[0], Math.floor(secs / 10));
    setNumber(seconds[1], secs % 10);

    ms = Math.floor(ms / 10); // Round to 0-100
    if (ms < 10) ms = '0' + ms;
    milliSecs[0].innerHTML = ms;
    // setNumber(milliSecs[0], Math.floor(ms / 10));
    // setNumber(milliSecs[1], ms % 10);
}, 10);
// });

function setNumber(digit, number) {
    const segments = digit.querySelectorAll('.segment');
    const current = parseInt(digit.data);

    // only switch if number has changed or wasn't set
    if (!isNaN(current) && current != number) {
        // unset previous number
        digitSegments[current].forEach(function(digitSegment, index) {
            setTimeout(function() {
                segments[digitSegment - 1].classList.remove('on');
            }, index * 45)
        });
    }

    if (isNaN(current) || current != number) {
        // set new number after
        setTimeout(function() {
            digitSegments[number].forEach(function(digitSegment, index) {
                setTimeout(function() {
                    segments[digitSegment - 1].classList.add('on');
                }, index * 45)
            });
        }, 250);
        digit.data = number;
    }
}