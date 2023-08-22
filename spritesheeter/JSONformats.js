
function formatForPixieJS(data) {
    data = {
        frames: {},
        animations: {},
        meta: {
            app: 'SpriteDatSheet',
            image: 'spritesheet.png',
            format: 'RGBA8888',
            size: { w: $canvas.width, h: $canvas.height },
            scale: 1,
        }
    };
    json.animations.forEach(animation => {
        data.animations[animation.name] = [];
        animation.frames.forEach((frame) => {
            data.animations[animation.name].push(frame.name);
            data.frames[frame.name] = {
                frame: {
                    x: frame.x,
                    y: frame.y,
                    w: frame.width,
                    h: frame.height,
                },
                rotate: false,
                pivot: {
                    x: 0.5,
                    y: 0.5,
                },
                sourceSize: { w: frame.width, h: frame.height },
                spriteSourceSize: { x: 0, y: 0, w: frame.width, h: frame.height },
            };
        });

    });
    return data;
}

function formatForUnity2D(data) {

}

function formatForPhaser3(data) {
    const result = {
        textures: [
            {
                image: 'spritesheet.png',
                format: 'RGBA8888',
                size: { w: $canvas.width, h: $canvas.height },
                scale: 1,
                frames: [],
                animations: {},
            },
        ],
        meta: {
            app: 'SpriteDatSheet',
        }
    };
    const frames = {};
    data.animations.forEach(animation => {
        animation.frames.forEach(frame => {
            frames[frame.name] = frame;
        });
    });

    Object.values(frames).forEach(frame => {
        result.textures[0].frames.push({
            filename: frame.name + '.png',
            rotated: false,
            trimmed: false,
            sourceSize: {
                w: frame.width,
                h: frame.height,
            },
            spriteSourceSize: {
                x: frame.x,
                y: frame.y,
                w: frame.width,
                h: frame.height,
            },
            frame: {
                x: frame.x,
                y: frame.y,
                w: frame.width,
                h: frame.height,
            },
        });
    });

    data.animations.forEach(animation => {
        result.textures[0].animations[animation.name] = animation.frames.map(f => f.name + '.png');
    });
    return result;

}


function formatForGodot(data) {
    const result = {
        textures: [
            {
                image: 'spritesheet.png',
                size: { w: $canvas.width, h: $canvas.height },
                animations: {},
                sprites: [],
            },
        ],
        meta: {
            app: 'SpriteDatSheet',
        }
    };
    const frames = {};
    data.animations.forEach(animation => {
        animation.frames.forEach(frame => {
            frames[frame.name] = frame;
        });
    });

    Object.values(frames).forEach(frame => {
        result.textures[0].sprites.push({
            filename: frame.name + '.png',
            region: {
                x: frame.x,
                y: frame.y,
                w: frame.width,
                h: frame.height,
            },
            margin: {
                "x": 0,
                "y": padding/2,
                "w": 0,
                "h": padding/2,
            },
        });
    });

    data.animations.forEach(animation => {
        result.textures[0].animations[animation.name] = animation.frames.map(f => f.name + '.png');
    });
    return result;
}

function formatForJSONHash(data) {
    return formatForPixieJS(data);
}
function formatForJSONArray(data) {
    const frames = {};
    data.animations.forEach(animation => {
        animation.frames.forEach(frame => {
            frames[frame.name] = frame;
        });
    });

    return Object.values(frames);
}