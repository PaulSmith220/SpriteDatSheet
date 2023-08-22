

function setupDropArea() {
    $gallery = document.getElementById('gallery');
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
    
    function handleFiles(files) {
        ([...files]).forEach(f => {
            previewFile(f);
        });
    }

    function handleSelect(e) {
        $img = e.target;
        const isSelected = $img.classList.contains('selected');
        $img.classList.toggle('selected', !isSelected);
        if (!isSelected) {
            selectedAnimation.frames.push($img.dataset['name']);
        } else {
            selectedAnimation.frames = selectedAnimation.frames.filter(n => n !==$img.dataset['name']);
        }
        selectFrames();
    }
    
    function previewFile(file, name) {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = function() {
          let img = document.createElement('img');
          let imgOriginal = document.createElement('img');
          img.src = reader.result;
          imgOriginal.src = reader.result;
          img.className = "preview-img";
          img.title=name || file.name;
          img.dataset['name'] = name || file.name;
          img.onclick = handleSelect;
          $gallery.appendChild(img);
          files.push({
            name: name || file.name,
            data: reader.result,
            img: imgOriginal,
        });
        }
      }
    
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
        for (var i = 0 ; i < e.clipboardData.items.length ; i++) {
	        var item = e.clipboardData.items[i];
	        console.log("Item type: " + item.type);
	        if (item.type.indexOf("image") != -1) {
                const file = item.getAsFile();
                previewFile(file, `clipboard_${Date.now()}_${i}`);
	        } else {
	            console.log("Discarding non-image paste data");
	        }
	    }
    }
}