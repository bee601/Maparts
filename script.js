const upload = document.getElementById('upload');
const outputGrid = document.getElementById('outputGrid');
const downloadBtn = document.getElementById('downloadBtn');
const MAP_SIZE = 128; 

upload.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
            outputGrid.innerHTML = ''; // Vorherige Vorschau löschen
            const cols = 5;
            const rows = 5; // Festgelegt auf 5x5 wie in deinem Wunsch-Layout

            // Erstelle die einzelnen Map-Kacheln
            for (let y = 0; y < rows; y++) {
                for (let x = 0; x < cols; x++) {
                    const canvas = document.createElement('canvas');
                    canvas.width = MAP_SIZE;
                    canvas.height = MAP_SIZE;
                    const ctx = canvas.getContext('2d');

                    // Zeichne den Ausschnitt des Bildes auf die 128x128 Kachel
                    ctx.drawImage(img, 
                        (x * img.width / cols), (y * img.height / rows), 
                        (img.width / cols), (img.height / rows), 
                        0, 0, MAP_SIZE, MAP_SIZE
                    );
                    
                    outputGrid.appendChild(canvas);
                }
            }
            downloadBtn.style.display = 'inline-block';
        };
        img.src = event.target.result;
    };
    reader.readAsDataURL(file);
});

// Funktion um das gesamte Grid als ein großes Bild zu speichern
downloadBtn.onclick = () => {
    const finalCanvas = document.createElement('canvas');
    finalCanvas.width = MAP_SIZE * 5;
    finalCanvas.height = MAP_SIZE * 5;
    const finalCtx = finalCanvas.getContext('2d');

    const canvases = outputGrid.querySelectorAll('canvas');
    canvases.forEach((canvas, index) => {
        const x = (index % 5) * MAP_SIZE;
        const y = Math.floor(index / 5) * MAP_SIZE;
        finalCtx.drawImage(canvas, x, y);
    });

    const link = document.createElement('a');
    link.download = 'minecraft_map_grid.png';
    link.href = finalCanvas.toDataURL();
    link.click();
};
