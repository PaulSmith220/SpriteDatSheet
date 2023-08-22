let currentFrame = 0;
function setOptions() {
    $animationSelector.innerHTML = animations.map(animation => `<option value="${animation.name}">${animation.name}</option>`).join('\n');

}

function setAnimationSelector() {
    $animationSelector = document.getElementById('animationSelector');
    $animationSelector.addEventListener('change', selectAnimation);
    if (animations.length > 0) {
        setOptions();
    }
}

function selectAnimation() {
    selectedAnimation = animations.find(a => a.name === $animationSelector.value);
    selectFrames();
}


function addAnimaton() {
    const name = prompt('What is the name of the animation?', 'noname');
    if (!name) {
        return;
    }
    if (animations.find(a => a.name === name)) {
        alert('Animation with this name already exists!');
        return;
    }
    animations.push({
        name,
        frames: [],
    });
    
    setOptions();
    $animationSelector.value = name;
    selectAnimation();
}

function deleteAnimation() {
    animations = animations.filter(a => a.name !== selectedAnimation.name);
    setOptions();
    selectAnimation();
}

function selectFrames() {
    const frames = selectedAnimation.frames;
    $gallery.querySelectorAll('img').forEach($img => {
        $img.classList.toggle('selected', frames.includes($img.dataset.name));
    });
    updateCanvasDimensions();
    currentFrame = 0;
    playAnimation();
}

let fpsInterval = 1000 / fps;
let then = Date.now();
let startTime = then;

function setFPS(e) {
    fps = e.target.value;
    fpsInterval = 1000 / fps;
}

function playAnimation() {
    requestAnimationFrame(playAnimation);
    now = Date.now();
    elapsed = now - then;

    if (elapsed > fpsInterval) {
        then = now - (elapsed % fpsInterval);

        if (selectAnimation === null) {
            return;
        }
        playbackCtx.fillStyle = "transparent";
        playbackCtx.clearRect(0, 0, $playback.width, $playback.height);
        const frame = files.find(f => f.name == selectedAnimation.frames[currentFrame]);
        if (!frame) {
            return;
        }
        const {
            offsetX,
            offsetY,
            width,
            height
        } = contain($playback.width, $playback.height, frame.img.width, frame.img.height);
        playbackCtx.drawImage(frame.img, offsetX, offsetY, width, height);
        currentFrame++;
        if (currentFrame > selectedAnimation.frames.length - 1) {
            currentFrame = 0;
        }

    }
}


function contain(parentWidth, parentHeight, childWidth, childHeight, scale = 1, offsetX = 0.5, offsetY = 0.5) {
    const childRatio = childWidth / childHeight
    const parentRatio = parentWidth / parentHeight
    let width = parentWidth * scale
    let height = parentHeight * scale

    if (true ? (childRatio > parentRatio) : (childRatio < parentRatio)) {
        height = width / childRatio
    } else {
        width = height * childRatio
    }

    return {
        width,
        height,
        offsetX: (parentWidth - width) * offsetX,
        offsetY: (parentHeight - height) * offsetY
    }
}
