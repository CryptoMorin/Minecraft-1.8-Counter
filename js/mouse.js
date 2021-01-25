/**
 * @type {MouseEvent}
 */
let contextMenu;
const contextMenDiv = document.getElementById('contextMenu');
document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
    contextMenu = e;
    drawContextMenu();
}, false);

function drawContextMenu() {
    contextMenDiv.style.display = 'inherit';
    let x = contextMenu.x,
        y = contextMenu.y;
    if (x + contextMenDiv.offsetWidth > window.innerWidth) x -= contextMenDiv.offsetWidth;
    if (y + contextMenDiv.offsetHeight > window.innerHeight) y -= contextMenDiv.offsetHeight;
    contextMenDiv.style.left = x + 'px';
    contextMenDiv.style.top = y + 'px';

    // const blob = document.createElement("div");
    // blob.className = "rightClickEffect";
    // blob.style.top = (y + (contextMenDiv.offsetHeight / 2)) + "px";
    // blob.style.left = (x + (contextMenDiv.offsetWidth / 2)) + "px";

    // document.body.appendChild(blob);
    // blob.onanimationend = () => blob.remove();
}

const characterList = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'
];
const layers = {
    n: 5, //number of layers
    letters: [100, 40, 30, 20, 10], //letters per layer (starting from the deepest layer)
    coef: [0.1, 0.2, 0.4, 0.6, 0.8], //how much the letters move from the mouse (starting from the deepest layer)
    size: [16, 22, 36, 40, 46], //font size of the letters (starting from the deepest layer)
    font: 'MGE'
};

const characters = [];
let mouse = {
    x: 0,
    y: 0
}

window.addEventListener('mousemove', function(e) {
    mouse.x = e.x;
    mouse.y = e.y;
});

function drawLetter(char) {
    msCtx.font = char.size + 'px ' + layers.font;
    msCtx.fillStyle = char.color;

    const x = char.posX + (mouse.x - canvas.width / 2) * char.coef;
    const y = char.posY + (mouse.y - canvas.height / 2) * char.coef;

    msCtx.fillText(char.char, x, y);
}
// document.addEventListener('mousemove', function(ev) {
//     mouseX = ev.pageX - canvas.offsetLeft;
//     mouseY = ev.pageY - canvas.offsetTop;
//     window.requestAnimationFrame(updateLetters)
// });

function renderLetters() {
    for (let i = 0; i < characters.length; i++) drawLetter(characters[i]);
}

function createLetters() {
    for (let i = 0; i < layers.n; i++) {
        for (let j = 0; j < layers.letters[i]; j++) {
            const character = randomArrayItem(characterList);
            const x = randInt(0, canvas.width);
            const y = randInt(0, canvas.height);

            characters.push({
                char: character,
                size: layers.size[i],
                color: randomHexColor(),
                layer: i,
                coef: layers.coef[i],
                posX: x,
                posY: y
            });
        }
    }
}

document.addEventListener('click', function(e) {
    const blob = document.createElement("div");
    blob.className = "clickEffect";
    blob.style.top = e.clientY + "px";
    blob.style.left = e.clientX + "px";

    document.body.appendChild(blob);
    blob.onanimationend = () => blob.remove();
    contextMenDiv.style.display = 'none';
});