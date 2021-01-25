function randomArrayItem(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function random(min, max) {
    return Math.random() * (max - min) + min;
}

function randInt(min, max) {
    return Math.floor(random(min, max));
}

function distance(a, b) {
    const delta_x = Math.abs(a.x - b.x),
        delta_y = Math.abs(a.y - b.y);
    return Math.sqrt(delta_x * delta_x + delta_y * delta_y);
}

function randomHexColor() {
    return "#" + ((1 << 24) * Math.random() | 0).toString(16);
}

/**
 * 
 * @param {string} hex
 * @returns {string}
 */
function hexToRgba(hex) {
    var bigint = parseInt(hex.charAt(0) == '#' ? hex.slice(1) : hex, 16);
    var r = ((bigint >> 24) & 255);
    var g = (bigint >> 16) & 255;
    var b = (bigint >> 8) & 255;
    var a = bigint & 255;

    return 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')';
}

/**
 * 
 * @param {string} hex
 * @param {number} alpha
 * @returns {string}
 */
function hexToRgbWithAlpha(hex, a) {
    var bigint = parseInt(hex.charAt(0) == '#' ? hex.slice(1) : hex, 16);
    var r = (bigint >> 16) & 255;
    var g = (bigint >> 8) & 255;
    var b = bigint & 255;

    return 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')';
}

/**
 * @param {string} hex 
 * @param {number} alpha
 * @returns {string} in the format of <hex>aa most commonly "#rrggbbaa"
 */
function addAlpha(hex, alpha) {
    let alphaHex = Math.round(alpha * 255).toString(16);
    if (alphaHex.length == 1) alphaHex = '0' + alphaHex;
    return hex + alphaHex;
}

/**
 * @param {File} file 
 */
function include(file) {
    const script = document.createElement('script');
    script.src = file;
    script.type = 'text/javascript';
    script.defer = true;

    document.body.appendChild(script);
}

/**
 * Only if it was possible to have zero interval.
 * @param {number[]} oldRGB 
 * @param {number[]} newRGB 
 * @param {function handle(r, g, b, a)} handle 
 * @param {number} duration The duration of the animation in milliseconds.
 */
function gradientQuantumTransition(oldRGB, newRGB, handle, duration) {
    // if (duration < 10) duration = 10;

    let r = oldRGB[0],
        g = oldRGB[1],
        b = oldRGB[2],
        a = oldRGB[3];
    const newR = newRGB[0],
        newG = newRGB[1],
        newB = newRGB[2],
        newA = newRGB[3];
    const diffR = newR - r,
        diffG = newG - g,
        diffB = newB - b,
        diffA = newA - a;
    const rModifier = diffR / duration,
        gModifier = diffG / duration,
        bModifier = diffB / duration,
        aModifier = diffA / duration;

    const animation = setInterval(() => {
        r += rModifier;
        g += gModifier;
        b += bModifier;
        a += aModifier;
        handle(r, g, b, a);
        if (--duration == 0) clearInterval(animation);
    }, 1);
}

/**
 * 
 * @param {number[]} oldRGB 
 * @param {number[]} newRGB 
 * @param {function handle(r, g, b, a)} handle 
 * @param {number} speed
 */
function gradientTransition(oldRGB, newRGB, handle, speed = 1) {
    let r = oldRGB[0],
        g = oldRGB[1],
        b = oldRGB[2],
        a = oldRGB[3];
    const newR = newRGB[0],
        newG = newRGB[1],
        newB = newRGB[2],
        newA = newRGB[3];

    let max = 0;
    for (let i = 0; i < 4; i++) {
        const oldC = oldRGB[i];
        const newC = newRGB[i];
        const diff = Math.abs(oldC - newC);
        if (diff > max) max = diff;
    }
    if (max <= 0) return;

    const rAscending = r < newR,
        gAscending = g < newG,
        bAscending = b < newB,
        aAscending = a < newA;
    const rModifier = rAscending ? 1 : -1;
    const gModifier = gAscending ? 1 : -1;
    const bModifier = bAscending ? 1 : -1;
    const aModifier = aAscending ? .1 : -.1;
    let stopR, stopG, stopB, stopA;

    const animation = setInterval(() => {
        if (!stopR) {
            r += rModifier;
            stopR = rAscending ? r >= newR : r <= newR;
        }
        if (!stopG) {
            g += gModifier;
            stopG = gAscending ? g >= newG : r <= newG;
        }
        if (!stopB) {
            b += bModifier;
            stopB = bAscending ? b >= newB : b <= newB;
        }
        if (!stopA) {
            a += aModifier;
            stopA = aAscending ? a >= newA : a <= newA;
        }

        handle(r, g, b, a);
        if (--max == 0) clearInterval(animation);
    }, speed);
}