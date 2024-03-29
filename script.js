let bImg = 'random.png';
let defWidth = 192;
let defRot = 0;
let randomizedSize = false;
let randomizedRot = false;
let generating = false;
let following = false;

let canvas = document.getElementById('canvas');
//let canvas4 = document.getElementById('canvas4');
let canvas5 = document.getElementById('canvas5');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
//canvas4.width = window.innerWidth;
//canvas4.height = window.innerHeight;
canvas5.width = window.innerWidth;
canvas5.height = window.innerHeight;
let ctx = canvas.getContext('2d');
//let ctx4 = canvas4.getContext('2d');
let ctx5 = canvas5.getContext('2d');

let bg = 0;
function switchBg() {
    //ctx4.clearRect(0, 0, canvas.width, canvas.height);

    if (bg == 0) {
        document.body.classList.remove('bg-white');
        document.body.classList.add('bg-red-400');
        bg++;
    } else if (bg == 1) {
        document.body.classList.remove('bg-red-400');
        document.body.classList.add('bg-orange-400');
        bg++;
    } else if (bg == 2) {
        document.body.classList.remove('bg-orange-400');
        document.body.classList.add('bg-yellow-400');
        bg++;
    } else if (bg == 3) {
        document.body.classList.remove('bg-yellow-400');
        document.body.classList.add('bg-green-400');
        bg++;
    } else if (bg == 4) {
        document.body.classList.remove('bg-green-400');
        document.body.classList.add('bg-blue-400');
        bg++;
    } else if (bg == 5) {
        document.body.classList.remove('bg-blue-400');
        document.body.classList.add('bg-purple-400');
        bg++;
    } else if (bg == 6) {
        document.body.classList.remove('bg-purple-400');
        document.body.classList.add('bg-pink-400');
        bg++;
    } else if (bg == 7) {
        document.body.classList.remove('bg-pink-400');
        document.body.classList.add('bg-gray-950');
        bg++;
    } else if (bg == 8) {
        document.body.classList.remove('bg-gray-950');
        document.body.classList.add('bg-white');
        bg = 0;
    }
}

let bButtons = document.querySelectorAll('.bunnyB');
bButtons.forEach((bunnyB) => {
    bunnyB.addEventListener('click', () => {
        // remove classes from all bButtons
        bButtons.forEach((bunnyB) => {
            bunnyB.classList.remove('bg-lightGreen/90');
            bunnyB.classList.remove('md:bg-lightGreen/90');
            bunnyB.classList.remove('border-gray-400/90');
            bunnyB.classList.remove('md:border-gray-400/90');
            bunnyB.classList.add('hover:enabled:bg-gray-200/90');
            bunnyB.classList.add('active:enabled:bg-gray-300/90');
        });

        // add classes to the dButton that has been clicked
        bunnyB.classList.add('bg-lightGreen/90');
        bunnyB.classList.add('border-gray-400/90');
        bunnyB.classList.remove('hover:enabled:bg-gray-200/90');
        bunnyB.classList.remove('active:enabled:bg-gray-300/90');
    });
});

window.onload = function () {
    document.getElementById('optionsDiv').style.left = document.getElementById('bunnySelector').offsetWidth + 'px';
    document.getElementById('optionsDiv').style.top = document.getElementById('decorDock').offsetHeight + 'px';

    document.getElementById('bunnySelector').style.top = document.getElementById('decorDock').offsetHeight + 'px';
    document.getElementById('bunnySelector').style.paddingBottom = document.getElementById('decorDock').offsetHeight + 'px';

    switchSelected();
}

function closeSelector() {
    document.getElementById('bunnySelector').classList.remove('block');
    document.getElementById('bunnySelector').classList.add('hidden');
}

function toggleB() {
    if (document.getElementById('bunnySelector').classList.contains('md:block')) {
        hideB();
    } else {
        showB();
    }
}

function hideB() {
    document.getElementById('bunnySelector').classList.remove('md:block');
    document.getElementById('bunnySelector').classList.add('hidden');
    document.getElementById('decorDock').classList.remove('md:block');
    document.getElementById('decorDock').classList.add('hidden');
    document.getElementById('optionsDiv').style.top = '0px';
    document.getElementById('optionsDiv').style.left = '0px';
    document.getElementById('optionsDiv').classList.add('hover:opacity-100');
    document.getElementById('hideI').classList.remove('fa-angle-left');
    document.getElementById('hideI').classList.add('fa-angle-right');
    document.getElementById('hideBtn').classList.add('border-l-2');
    ctx5.clearRect(0, 0, canvas.width, canvas.height);
}

function showB() {
    document.getElementById('bunnySelector').classList.remove('hidden');
    document.getElementById('bunnySelector').classList.add('md:block');
    document.getElementById('decorDock').classList.remove('hidden');
    document.getElementById('decorDock').classList.add('md:block');
    document.getElementById('optionsDiv').style.left = document.getElementById('bunnySelector').offsetWidth + 'px';
    document.getElementById('optionsDiv').style.top = document.getElementById('decorDock').offsetHeight + 'px';
    document.getElementById('optionsDiv').classList.remove('hover:opacity-100');
    document.getElementById('hideI').classList.remove('fa-angle-right');
    document.getElementById('hideI').classList.add('fa-angle-left');
    document.getElementById('hideBtn').classList.remove('border-l-2');
}

function changeSize() {
    if (defWidth == 96) {
        defWidth = 128;
        document.getElementById('sizeBtn').innerText = 'Size: Small (0.67x)';
    } else if (defWidth == 128) {
        defWidth = 192;
        document.getElementById('sizeBtn').innerText = 'Size: Normal (1x)';
    } else if (defWidth == 192) {
        defWidth = 256;
        document.getElementById('sizeBtn').innerText = 'Size: Large (1.3x)';
    } else if (defWidth == 256) {
        defWidth = 320;
        document.getElementById('sizeBtn').innerText = 'Size: Huge (1.7x)';
    } else if (defWidth == 320) {
        defWidth = 384;
        document.getElementById('sizeBtn').innerText = 'Size: Gigantic (2x)';
    } else if (defWidth == 384) {
        defWidth = 480;
        document.getElementById('sizeBtn').innerText = 'Size: Colossal (2.5x)';
    } else if (defWidth == 480) {
        defWidth = 96;
        document.getElementById('sizeBtn').innerText = 'Size: Tiny (0.5x)';
    }

    if (!generating) {
        if (!doneLoading) switchSelected();

        ctx5.clearRect(0, 0, canvas.width, canvas.height);

        finalX = x - defWidth / 2;
        finalY = y - defWidth / 2;
        finalW = defWidth;
        finalH = defWidth;

        place(ctx5);
        if (following) place(ctx);
    }
}

function changeRotation() {
    defRot += 30;
    document.getElementById('rotationBtn').innerText = 'Rotation: ' + defRot + '°';

    if (defRot >= 360) {
        defRot = 0;
        document.getElementById('rotationBtn').innerText = 'Rotation: 0°';
    }

    if (!generating) {
        if (!doneLoading) switchSelected();

        ctx5.clearRect(0, 0, canvas.width, canvas.height);

        finalX = x - defWidth / 2;
        finalY = y - defWidth / 2;
        finalW = defWidth;
        finalH = defWidth;

        place(ctx5);
        if (following) place(ctx);
    }
}

function changeRandomSize() {
    if (!randomizedSize) {
        randomizedSize = true;
        document.getElementById('randomSizeBtn').innerText = 'Random Size: On';
    } else if (randomizedSize) {
        randomizedSize = false;
        document.getElementById('randomSizeBtn').innerText = 'Random Size: Off';
    }

    if (!generating) {
        if (!doneLoading) switchSelected();

        ctx5.clearRect(0, 0, canvas.width, canvas.height);

        finalX = x - defWidth / 2;
        finalY = y - defWidth / 2;
        finalW = defWidth;
        finalH = defWidth;

        place(ctx5);
        if (following) place(ctx);
    }
}

function changeRandomRot() {
    if (!randomizedRot) {
        randomizedRot = true;
        document.getElementById('randomRotBtn').innerText = 'Random Rotation: On';
    } else if (randomizedRot) {
        randomizedRot = false;
        document.getElementById('randomRotBtn').innerText = 'Random Rotation: Off';
    }

    if (!generating) {
        if (!doneLoading) switchSelected();

        ctx5.clearRect(0, 0, canvas.width, canvas.height);

        finalX = x - defWidth / 2;
        finalY = y - defWidth / 2;
        finalW = defWidth;
        finalH = defWidth;

        place(ctx5);
        if (following) place(ctx);
    }
}

// hide hide/show button after 5 seconds of inactivity when menu is also hidden
let timeout = function () {
    if (!document.getElementById('bunnySelector').classList.contains('md:block')) {
        document.getElementById('optionsDiv').classList.add('opacity-50');
        timer2 = setTimeout(timeout2, 3000);
    }
}

let timeout2 = function () {
    if (!document.getElementById('bunnySelector').classList.contains('md:block')) {
        document.getElementById('optionsDiv').classList.remove('opacity-50');
        document.getElementById('optionsDiv').classList.add('opacity-0');
    }
}

let timeout3 = function () {
    ctx5.clearRect(0, 0, canvas.width, canvas.height);
}

let timer;
let timer2;
let timer3;
window.addEventListener('mousemove', function () {
    clearTimeout(timer);
    clearTimeout(timer2);
    clearTimeout(timer3);
    timer = setTimeout(timeout, 2000);
    timer3 = setTimeout(timeout3, 3000);

    if (!document.getElementById('bunnySelector').classList.contains('md:block')) {
        document.getElementById('optionsDiv').classList.remove('opacity-50');
        document.getElementById('optionsDiv').classList.remove('opacity-0');
    }
}, false);

let genTimeout = function () {
    x = Math.floor(Math.random() * (canvas.width + 1));
    y = Math.floor(Math.random() * (canvas.height + 1));
    finalX = x - defWidth / 2;
    finalY = y - defWidth / 2;
    finalW = defWidth;
    finalH = defWidth;

    if (randomizedSize) randomSize();
    if (randomizedRot) randomRot();
    if (bImg == 'random.png') {
        /* random selection */
        d = document.getElementById('bunnies/' + bunniesArray[Math.floor(Math.random() * bunniesArray.length)] + '.png');
    } else {
        /* specific selection */
        d = document.getElementById('bunnies/' + bImg + '.png');
    }
    place(ctx);

    if (generating) genTimer = setTimeout(genTimeout, 50);
}

function toggleGen() {
    if (document.getElementById('genBtn').innerText == 'Start Generation') {
        genTimer = setTimeout(genTimeout, 50);
        generating = true;
        ctx5.clearRect(0, 0, canvas.width, canvas.height);
        document.getElementById('genBtn').innerText = 'Stop Generation';
    } else {
        clearTimeout(genTimeout);
        generating = false;
        document.getElementById('genBtn').innerText = 'Start Generation';
    }
}

function toggleFollow() {
    if (document.getElementById('followBtn').innerText == 'Follow Cursor: Off') {
        following = true;
        document.getElementById('followBtn').innerText = 'Follow Cursor: On';
    } else {
        following = false;
        document.getElementById('followBtn').innerText = 'Follow Cursor: Off';
    }
}

function calcDistance(x1, y1, x2, y2) {
    return Math.sqrt(((x1 - x2) * (x1 - x2)) + ((y1 - y2) * (y1 - y2)));
}

let doneLoading = false;
// i have no idea how this works
// https://stackoverflow.com/a/60949881
Promise.all(Array.from(document.images).filter(img => !img.complete).map(img => new Promise(resolve => { img.onload = img.onerror = resolve; }))).then(() => {
    doneLoading = true;
});

let d = document.getElementById('bunnies/red-bunny-2022.png');
let farEnough = false;
point1 = [0, 0];

canvas5.addEventListener('mousemove', function (event) {
    if (!generating) {
        if (!doneLoading) switchSelected();

        ctx5.clearRect(0, 0, canvas.width, canvas.height);

        x = event.pageX - canvas.offsetLeft;
        y = event.pageY - canvas.offsetTop;

        point2 = [x, y];

        if (calcDistance(point1[0], point1[1], point2[0], point2[1]) > 0) {
            farEnough = true;
            /* ctx.beginPath();
            ctx.arc(x, y, 50, 0, 2 * Math.PI);
            ctx.stroke(); */
        } else {
            farEnough = false;
        }

        if (bImg == 'random.png') {
            /* random selection */
            if (farEnough) d = document.getElementById('bunnies/' + bunniesArray[Math.floor(Math.random() * bunniesArray.length)] + '.png');
        } else {
            /* specific selection */
            d = document.getElementById('bunnies/' + bImg + '.png');
        }

        if (randomizedSize) randomSize();
        if (randomizedRot) randomRot();

        finalX = x - defWidth / 2;
        finalY = y - defWidth / 2;
        finalW = defWidth;
        finalH = defWidth;

        if (farEnough) point1 = point2;
        place(ctx5);
        if (following) place(ctx);
    }
}, false);

canvas5.addEventListener('click', function () {
    if (!doneLoading) switchSelected();
    place(ctx);
}, false);

function place(thisCtx) {
    thisCtx.translate(finalX + (finalW / 2), finalY + (finalH / 2));
    thisCtx.rotate(defRot * Math.PI / 180);
    thisCtx.drawImage(d, -finalW / 2, -finalH / 2, finalW, finalH);
    thisCtx.rotate(-defRot * Math.PI / 180);
    thisCtx.translate(-finalX - (finalW / 2), -finalY - (finalH / 2));
}

function randomSize() {
    const possibleSizes = [96, 128, 192, 256, 320, 384, 480];
    defWidth = possibleSizes[Math.floor(Math.random() * possibleSizes.length)];
    changeSize();
}

function randomRot() {
    defRot = Math.floor(Math.random() * 12) * 30;
    changeRotation();
}

let bunniesArray = [];
let currentType = 'selectBunny';

function switchSelected() {
    bunniesArray = [];
    currentType = document.getElementById('switchSelected').value;
    for (i = 0; i < document.getElementsByClassName('selectBunny').length; i++) {
        document.getElementsByClassName('selectBunny')[i].classList.add('hidden');
    }
    for (i = 0; i < document.getElementsByClassName(currentType).length; i++) {
        bunniesArray.push(document.getElementsByClassName(currentType)[i].id);
        document.getElementsByClassName(currentType)[i].classList.remove('hidden');
    }
    bunniesArray = bunniesArray.filter(e => e !== 'random');
    document.getElementById('random').classList.remove('hidden');
    document.getElementById('optionsDiv').style.left = document.getElementById('bunnySelector').offsetWidth + 'px';
}

function select(selectedB) {
    bImg = selectedB;
}

let bImgButtons = document.querySelectorAll('.' + currentType);
bImgButtons.forEach((selectBunny) => {
    selectBunny.addEventListener('click', () => {

        // removes classes from all bImgButtons
        bImgButtons.forEach((selectBunny) => {
            selectBunny.classList.remove('bg-lightGreen/90');
            selectBunny.classList.remove('border-gray-400/90');
            selectBunny.classList.add('hover:enabled:bg-gray-200/90');
            selectBunny.classList.add('active:enabled:bg-gray-300/90');
        });

        // add classes to the bImgButton that has been clicked
        selectBunny.classList.add('bg-lightGreen/90');
        selectBunny.classList.add('border-gray-400/90');
        selectBunny.classList.remove('hover:enabled:bg-gray-200/90');
        selectBunny.classList.remove('active:enabled:bg-gray-300/90');
    });
});

function download() {
    let link = document.createElement('a');
    link.download = 'my-bunnies.png';
    link.href = document.getElementById('canvas').toDataURL();
    link.click();
}

document.body.onkeyup = function (event) {
    if (event.keyCode == 27) {
        document.getElementById('hideBtn').click();
    } else if (event.keyCode == 49) {
        document.getElementById('sizeBtn').click();
    } else if (event.keyCode == 50) {
        document.getElementById('rotationBtn').click();
    } else if (event.keyCode == 51) {
        document.getElementById('randomSizeBtn').click();
    } else if (event.keyCode == 52) {
        document.getElementById('randomRotBtn').click();
    } else if (event.keyCode == 53) {
        document.getElementById('genBtn').click();
    } else if (event.keyCode == 54) {
        document.getElementById('followBtn').click();
    } else if (event.keyCode == 55) {
        document.getElementById('downloadBtn').click();
    }
}