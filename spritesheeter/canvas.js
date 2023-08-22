
const padding = 4;
const titleWidth = 150;
let animationRows = [];

function setupCanvas() {
    $canvas = document.getElementById("spritesheet");
    ctx = $canvas.getContext("2d");

    $playback = document.getElementById("playback");
    playbackCtx = $playback.getContext("2d");
    playbackCtx.webkitImageSmoothingEnabled = false;
    playbackCtx.mozImageSmoothingEnabled = false;
    playbackCtx.imageSmoothingEnabled = false;
}

function updateCanvasDimensions() {
    let height = 0;
    let width = 0;

    animationRows = animations.map(animation => {
        const an = {
            name: animation.name,
            frames: animation.frames.map(f => files.find(ff => ff.name == f))
        }

        let maxHeight = 0;
        let totalWidth = 0;
        an.frames.forEach(frame => {
            if (frame.img.height > maxHeight) {
                maxHeight = frame.img.height;
            }
            totalWidth += padding + frame.img.width;
            if (frame.img.width > $playback.width) {
                // $playback.width = frame.img.width;
            }
        });
        height += maxHeight + padding;
        if (totalWidth > width) {
            width = totalWidth;
        }
        an.height = maxHeight;
        if (maxHeight > $playback.height) {
            // $playback.height = maxHeight;
        }
        return an;
    });
    $canvas.width = width + (printLabels ? titleWidth : 0);
    $canvas.height = height + padding;
    renderImages();
}

function renderImages() {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    json.animations = [];
    animationRows.filter(r => r.frames.length > 0).forEach((animation, index) => {
        const jsonObj = {
            name: animation.name,
            frames: [],
        };
        json.animations.push(jsonObj);
        let y = index * (animation.height + padding) + (index == 0 ? padding : 0);
        if (printLabels) {
            ctx.font = "16px Arial";
            let textParts = [animation.name];
            if (animation.name.length > 15) {
                textParts = animation.name.match(/.{1,15}/g);
            }

            textParts.forEach((str, index) => {
                ctx.fillText(str, 4, y + animation.height / 2 - (8 * textParts.length) + index * 18);
            });
        }

        let x = 0 + printLabels ? titleWidth : 0;
        animation.frames.forEach(frame => {
            if (printBorders) {
                ctx.strokeStyle = "#ddd"
                ctx.strokeRect( x-1, y-1, frame.img.width+2, frame.img.height+2);
            }
            ctx.drawImage(frame.img, x, y);
            jsonObj.frames.push({
                x,
                y,
                width: frame.img.width,
                height: frame.img.height,
                name: frame.name.replace(/\.png$/, ''),
            });
            x += frame.img.width + padding;
        });

    });

}

