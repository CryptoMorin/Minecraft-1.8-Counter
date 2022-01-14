import { random, randomArrayItem, randomHexColor, distance, addAlpha, hexToRgbWithAlpha } from './utils.js';
import { characterList } from './mouse.js';
import { context as ctx } from './canvas.js';

export let ball = {
        x: 0,
        y: 0,
        vx: 0,
        vy: 0,
        r: 0,
        enhanced: false,
        alpha: 1,
        limit: optimalBallLimit()
    };
let ball_color = {
        r: 0,
        g: 100,
        b: 200
    },
    R = 3,
    balls = [],
    alphaFrequency = 0.01,

    line = {
        color: {
            r: 255,
            g: 0,
            b: 0
        },
        width: {
            max: 1,
            min: 0.5
        }
    },

    nodeLinkingDistance = 250, mouseNodeLinkingDistance = 400,
    distBorderLimit = nodeLinkingDistance / 2,
    mouse_ball = {
        x: 0,
        y: 0,
        vx: 0,
        vy: 0,
        r: 0,
        char: null,
        color: '#00FF00',
        type: 'mouse'
    };

function getRandomSpeed(pos) {
    const min = -1, max = 1;
    switch (pos) {
        case 'top':
            return [random(min, max), random(0.1, max)];
        case 'right':
            return [random(min, -0.1), random(min, max)];
        case 'bottom':
            return [random(min, max), random(min, -0.1)];
        case 'left':
            return [random(0.1, max), random(min, max)];
    }
}

function getRandomBall() {
    const pos = randomArrayItem(['top', 'right', 'bottom', 'left']);
    let speeds = getRandomSpeed(pos);
    speeds = {
        vx: speeds[0],
        vy: speeds[1],
    }

    switch (pos) {
        case 'top':
            return {
                x: randomSidePos(canvas.width),
                y: -R,
                ...speeds
            }
        case 'right':
            return {
                x: canvas.width + R,
                y: randomSidePos(canvas.height),
                ...speeds
            }
        case 'bottom':
            return {
                x: randomSidePos(canvas.width),
                y: canvas.height + R,
                ...speeds
            }
        case 'left':
            return {
                x: -R,
                y: randomSidePos(canvas.height),
                ...speeds
            }
    }
}

function randomSidePos(length) {
    return Math.ceil(Math.random() * length);
}

function renderBalls() {
    for (const b of balls) {
        if (!b.hasOwnProperty('type')) {
            //                const close = distance(mouse_ball, b) < dis_limit;
            //ctx.font = close ? '50px MGE' : '30px MGE';
            if (b.enhanced) ctx.font = '30px MGE';
            ctx.fillStyle = addAlpha(b.color, b.alpha);
            // ctx.fillStyle = 'rgba(' + ball_color.r + ',' + ball_color.g + ',' + ball_color.b + ',' + b.alpha + ')';

            ctx.beginPath();
            ctx.arc(b.x, b.y, R, 0, Math.PI * 2);
            if (b.enhanced) ctx.fillText(b.char, b.x - 10, b.y + 10);
            else ctx.fill();
            ctx.closePath();
        }
    }
}

function isInFrame(b) {
    return b.x > -distBorderLimit && 
        b.x < (canvas.width + distBorderLimit) && 
        b.y > -distBorderLimit && 
        b.y < (canvas.height + distBorderLimit);
}

function updateBalls() {
    const newBalls = [];
    for (const b of balls) {
        b.x += b.vx;
        b.y += b.vy;

        if (isInFrame(b)) {
            newBalls.push(b);

            // Blink
            if (b.fadeIn) b.alpha += alphaFrequency;
            else b.alpha -= alphaFrequency;

            if (b.enhanced != ball.enhanced) b.switchBallStyle = true;
            if (b.alpha <= 0) {
                if (b.switchBallStyle) b.enhanced = !b.enhanced;
                b.switchBallStyle = false;
                b.fadeIn = true;
                b.alpha = 0;
            } else if (b.alpha >= 1) {
                b.fadeIn = false;
                b.alpha = 1;
            }

            // Another way:
            // b.alpha = Math.abs(Math.cos(b.alpha));
        }
    }

    balls = newBalls.slice(0);
}

// Render the line linking surrounding balls and the mouse.
function renderLines() {
    const len = balls.length;
    for (let i = 0; i < len; i++) {
        for (let j = i + 1; j < len; j++) {
            const first = balls[i],
                second = balls[j];
            const isFirstMouse = first.hasOwnProperty('type'),
                isSecondMouse = second.hasOwnProperty('type'),
                isMouse = isFirstMouse || isSecondMouse;
            const fraction = distance(first, second) / (isMouse ? mouseNodeLinkingDistance : nodeLinkingDistance);

            if (fraction < 1) {
                const alpha = 1 - fraction;
                if (isMouse) {
                    let gradient;
                    if (isFirstMouse) {
                        gradient = ctx.createLinearGradient(first.x, first.y, second.x, second.y);
                        gradient.addColorStop(0, hexToRgbWithAlpha(first.color, alpha));
                        gradient.addColorStop(0.7, hexToRgbWithAlpha(second.color, alpha));
                    } else {
                        gradient = ctx.createLinearGradient(second.x, second.y, first.x, first.y);
                        gradient.addColorStop(0.7, hexToRgbWithAlpha(first.color, alpha));
                        gradient.addColorStop(0, hexToRgbWithAlpha(second.color, alpha));
                    }

                    ctx.strokeStyle = gradient;
                } else ctx.strokeStyle = `rgba(${line.color.r},${line.color.g},${line.color.b},${alpha})`;
                ctx.lineWidth = line.width.max;

                ctx.beginPath();
                ctx.moveTo(first.x, first.y);
                ctx.lineTo(second.x, second.y);
                ctx.stroke();
                ctx.closePath();
            }
        }
    }
}

function ensureBallCount() {
    if (balls.length < ball.limit) {
        const randBall = getRandomBall();
        randBall.r = R;
        randBall.enhanced = ball.enhanced;
        randBall.alpha = Math.random();
        randBall.color = randomHexColor();
        randBall.char = randomArrayItem(characterList);
        balls.push(randBall);
    }
}

function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (render.stop) return;

    renderLines();
    renderBalls();
    updateBalls();
    ensureBallCount();
    window.requestAnimationFrame(render);
}

function initBalls(num) {
    for (let i = 0; i <= num; i++) {
        balls.push({
            x: randomSidePos(canvas.width),
            y: randomSidePos(canvas.height),
            vx: getRandomSpeed('top')[0],
            vy: getRandomSpeed('top')[1],
            r: R,
            enhanced: ball.enhanced,
            color: randomHexColor(),
            char: randomArrayItem(characterList),
            alpha: Math.random()
        });
    }
}

// Init
initBalls(30);
window.requestAnimationFrame(render);

function optimalBallLimit() {
    return (((window.innerHeight / 10) / 2) + ((window.innerWidth / 10) / 1.5)) / 2;
}

// Mouse Events
const mouseOver = () => balls.push(mouse_ball);
const onResize = () => ball.limit = optimalBallLimit();
const mouseOut = () => {
    const newBalls = [];
    for (const b of balls) {
        if (!b.hasOwnProperty('type')) newBalls.push(b);
    }
    balls = newBalls.slice(0);
}
const mouseMove = (e) => {
    mouse_ball.x = e.x;
    mouse_ball.y = e.y;
}

window.addEventListener('mouseover', mouseOver, { passive: true });
window.addEventListener('mouseout', mouseOut, { passive: true });
window.addEventListener('mousemove', mouseMove, { passive: true });
window.addEventListener('resize', onResize, { passive: true });

export function onCounterStart() {
    if (onCounterStart.executed) throw new Error('Cannot execute onCounterStart twice.');
    onCounterStart.executed = true;

    render.stop = true;
    window.removeEventListener('mouseover', mouseOver);
    window.removeEventListener('mouseout', mouseOut);
    window.removeEventListener('mousemove', mouseMove);
    window.removeEventListener('resize', onResize);
}
