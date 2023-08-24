let fileNumerator = 0;
function handleFiles(files) {
    ([...files]).forEach(f => {
        previewFile(f);
    });
}

function previewFile(file, name) {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = function () {
        const filename = name || `${fileNumerator++}_${file.name}`;
        let img = document.createElement('img');
        let imgOriginal = document.createElement('img');
        img.src = reader.result;
        imgOriginal.src = reader.result;
        img.className = "preview-img";
        img.title = file.name;
        img.dataset['name'] = filename;
        img.onclick = handleSelect;
        $gallery.appendChild(img);
        files.push({
            name: filename,
            data: reader.result,
            img: imgOriginal,
        });
    }
}
function preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
}

function highlight(e) {
    $dropArea.classList.add('highlight');
}

function unhighlight(e) {
    $dropArea.classList.remove('highlight');
}


function handleSelect(e) {
    $img = e.target;
    const isSelected = $img.classList.contains('selected');
    $img.classList.toggle('selected', !isSelected);
    if (!isSelected) {
        selectedAnimation.frames.push($img.dataset['name']);
    } else {
        selectedAnimation.frames = selectedAnimation.frames.filter(n => n !== $img.dataset['name']);
    }
    selectFrames();
}

function setupDropArea() {
    $gallery = document.getElementById('gallery');



    $dropArea = document.getElementById('drop-area');

    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        $dropArea.addEventListener(eventName, preventDefaults, false);
    });

    ['dragenter', 'dragover'].forEach(eventName => {
        $dropArea.addEventListener(eventName, highlight, false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
        $dropArea.addEventListener(eventName, unhighlight, false);
    });

    $dropArea.addEventListener('drop', handleDrop, false);


    $dropArea.addEventListener('paste', handlePaste, false);


    function handleDrop(e) {
        let dt = e.dataTransfer;
        let files = dt.files;

        handleFiles(files);
    }

    function handlePaste(e) {
        for (var i = 0; i < e.clipboardData.items.length; i++) {
            var item = e.clipboardData.items[i];
            if (item.type.indexOf("image") != -1) {
                const file = item.getAsFile();
                previewFile(file, `${fileNumerator++}_clipboard_${Date.now()}`);
            } else {
                console.log("Discarding non-image paste data");
            }
        }
    }
}