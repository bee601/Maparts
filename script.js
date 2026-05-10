const upload = document.getElementById('upload');
const canvas = document.getElementById('preview');
const ctx = canvas.getContext('2d');
const sizeInput = document.getElementById('size');

upload.addEventListener('change', (e) => {
    const reader = new FileReader();
    reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
            const size = parseInt(sizeInput.value);
            canvas.width = size;
            canvas.height = size;
            
            // Bild auf Map-Größe zeichnen
            ctx.drawImage(img, 0, 0, size, size);
        };
        img.src = event.target.result;
    };
    reader.readAsDataURL(e.target.files[0]);
});

document.getElementById('download').onclick = () => {
    alert("Vorschau bereit! Um eine .schematic Datei zu speichern, müsste ein NBT-Exporter (wie Prismarine-NBT) eingebunden werden.");
};
