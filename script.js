const upload = document.getElementById('upload');
const outputGrid = document.getElementById('outputGrid');
const MAP_SIZE = 128; // Minecraft Map Standard

upload.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
            outputGrid.innerHTML = ''; // Grid leeren

            // Wir berechnen, wie viele 128er Maps ins Bild passen
            // Hier im Beispiel fest auf 5 Spalten begrenzt (wie dein Bild)
            const cols = 5;
            const rows = Math.ceil((img.height / img.width) * cols);

            for (let y = 0; y < rows; y++) {
                for (let x = 0; x < cols; x++) {
                    const canvas = document.createElement('canvas');
                    canvas.width = MAP_SIZE;
                    canvas.height = MAP_SIZE;
                    const ctx = canvas.getContext('2d');

                    // Zeichnet den jeweiligen Ausschnitt des Bildes
                    ctx.drawImage(img, 
                        (x * img.width / cols), (y * img.height / rows), 
                        (img.width / cols), (img.height / rows), 
                        0, 0, MAP_SIZE, MAP_SIZE
                    );
                    
                    outputGrid.appendChild(canvas);
                }
            }
        };
        img.src = event.target.result;
    };
    reader.readAsDataURL(file);
});const upload = document.getElementById('upload');
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
