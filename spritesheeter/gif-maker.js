
function saveGif() {
    var gif = new GIF({
        workers: 2,
        quality: 1,
        workerScript: './spritesheeter/libs/gif.worker.js',
        background: '#fff',
      });
      
      selectedAnimation.frames.forEach((name) => {
        const file = files.find(f => f.name === name);
        if (file) {
            gif.addFrame(file.img, { delay: 1000 / fps});
        }
      });
      
      gif.on('finished', function(blob) {
        window.open(URL.createObjectURL(blob));
      });
      
      gif.render();
}