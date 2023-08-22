let $dropArea;
let $gallery;
let $animationSelector;
let $canvas;
let ctx;
let $playback;
let playbackCtx;
let files = [];
let animations = [];
let selectedAnimation = null;
let printLabels = true;
let printBorders = false;
let fps = 3.5;
let json = {
    animations: [],
};

document.addEventListener('DOMContentLoaded', () => {


    document.getElementById('addAnimaton').addEventListener('click', addAnimaton);
    document.getElementById('deleteAnimation').addEventListener('click', deleteAnimation);
    document.getElementById('fpsPicker').addEventListener('click', setFPS);
    setupDropArea();
    setAnimationSelector();
    setupCanvas();

    document.getElementById('downloadPNG').addEventListener('click', () => {
        var anchor = document.createElement("a");
        anchor.href = $canvas.toDataURL("image/png");
        anchor.download = "spritesheet.png";
        anchor.click();
    });

    document.getElementById('downloadJSONArray').addEventListener('click', () => exportJSON('json-array'));
    document.getElementById('downloadJSONHash').addEventListener('click', () => exportJSON('json-hash'));
    document.getElementById('downloadJSONPixie').addEventListener('click', () => exportJSON('pixie'));
    document.getElementById('downloadJSONPhaser3').addEventListener('click', () => exportJSON('phaser3'));
    document.getElementById('downloadJSONGodot').addEventListener('click', () => exportJSON('godot'));

    document.getElementById('labelToggle').addEventListener('change', (e) => {
        printLabels = e.target.checked;
        updateCanvasDimensions();
    });

    document.getElementById('bordersToggle').addEventListener('change', (e) => {
        printBorders = e.target.checked;
        renderImages();
    });
});


function exportJSON(format = 'custom') {
    console.log('exporting');
    let data = json;
    switch (format) {
        case 'pixie': data = formatForPixieJS(json); break;
        case 'json-array': data = formatForJSONArray(json); break;
        case 'json-hash': data = formatForJSONHash(json); break;
        case 'phaser3': data = formatForPhaser3(json); break;
        case 'godot': data = formatForGodot(json); break;
        case 'cocos2d': data = formatForCocos2D(json); break;
    }

    console.log(data);

    const jsonString = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const anchor = document.createElement("a");
    anchor.download = `spritesheet_${format}.json`;
    anchor.href = window.URL.createObjectURL(blob);
    anchor.dataset.downloadUrl = ['application/json', anchor.download, anchor.href].join(':');
    anchor.click();
}