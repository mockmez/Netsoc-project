const tile_canvas = document.getElementById('tileCanvas');
const color_palette = document.getElementById('color-palette');
const canvasContainer = document.getElementById('canvas-container');

tile_canvas.width = 1920;
tile_canvas.height = 1080;

const tile_ctx = tile_canvas.getContext('2d');

const resolution_factor = 2;

const tile_count_x = 16 * resolution_factor;
const tile_count_y = 9 * resolution_factor;

const tile_width = tile_canvas.width / tile_count_x;
const tile_height = tile_canvas.height / tile_count_y;

// Tile canvas

const tile_arr = [];
let temp_size = 0;
for (let i = 0; i < tile_count_y; i++) {
    for (let j = 0; j < tile_count_x; j++) {
        tile_arr.push(new Tile(j * tile_width, i * tile_height, tile_width, tile_height,
            `rgba(${Math.random() * 256},
            ${Math.random() * 256},
            ${Math.random() * 256}, 1)`,
            temp_size++));
    }
}

// Cursor

const cursor = new Cursor(tile_width, tile_height, 'white');
cursor.setCoordinate(tile_arr[0]);

// Events (ASYNCHRONOUS FUNCTIONS)

// Tile Canvas

let currentScale = 1;
let offsetX = 0;
let offsetY = 0;
let isDragging = false;
let scale = 1;
let lastScale = 1;

document.addEventListener('wheel', (event) => {
    
    if (event.ctrlKey) {
        event.preventDefault();

        if (event.deltaY < 0) {
            if (currentScale < 10) currentScale *= 1.05;
        } else if (event.deltaY > 0) {
            if (currentScale > 0.5) currentScale /= 1.05;
        }

        updateCanvasTransform();
    }
}, { passive: false });

tile_canvas.addEventListener('click', (event) =>{
    
    tile_arr.every((tile) =>{
        if((event.offsetX >= tile.x) && (event.offsetX <= tile.x + tile_width)){
            if((event.offsetY >= tile.y) &&(event.offsetY <= tile.y + tile_height)){
                cursor.setCoordinate(tile)
                return false;
            }
        }

        return true;

    })

})

tile_canvas.addEventListener('touchstart', (event) =>{
    
    tile_arr.every((tile) =>{
        if((event.offsetX >= tile.x) && (event.offsetX <= tile.x + tile_width)){
            if((event.offsetY >= tile.y) &&(event.offsetY <= tile.y + tile_height)){
                cursor.setCoordinate(tile)
                return false;
            }
        }

        return true;

    })

})

document.addEventListener('mousedown', (event) => {
    
    //updateCanvasTransform()
    
    isDragging = true;
    startX = event.clientX;
    startY = event.clientY;
    offsetX = tile_canvas.offsetLeft;
    offsetY = tile_canvas.offsetTop;
    tile_canvas.style.cursor = 'grabbing';
});

document.addEventListener('touchstart', (event) => {
    if (event.touches.length === 1) {
        isDragging = true;
        const touch = event.touches[0];
        startX = touch.clientX;
        startY = touch.clientY;
        offsetX = tile_canvas.offsetLeft;
        offsetY = tile_canvas.offsetTop;
        tile_canvas.style.cursor = 'grabbing';
    }
});

tile_canvas.addEventListener('mousemove', (event) => {
    if (!isDragging) return;

    //updateCanvasTransform();
    
    const newX = offsetX + event.clientX - startX;
    const newY = offsetY + event.clientY - startY;

    tile_canvas.style.left = `${newX}px`;
    tile_canvas.style.top = `${newY}px`;

    //updateCanvasTransform();

});

document.addEventListener('touchmove', (event) => {
    if (!isDragging || event.touches.length !== 1) return;

    const touch = event.touches[0];
    const newX = offsetX + touch.clientX - startX;
    const newY = offsetY + touch.clientY - startY;

    tile_canvas.style.left = `${newX}px`;
    tile_canvas.style.top = `${newY}px`;
});

document.addEventListener('mouseup', () => {
    isDragging = false;
    tile_canvas.style.cursor = 'grab';

    //updateCanvasTransform()

});

function updateCanvasTransform() {
    
    const wrapperParent = document.getElementById('canvas-container')
    
    
    var centerX = wrapperParent.getBoundingClientRect().left + (wrapperParent.getBoundingClientRect().width / 2);
    var centerY = wrapperParent.getBoundingClientRect().top + (wrapperParent.getBoundingClientRect().top / 2);
    
    const scaleTransform = `scale(${currentScale})`;
    const translateTransform = `translate(${offsetX}px, ${offsetY}px)`;
    tile_canvas.style.transform = `${centerX} ${centerY}`
    tile_canvas.style.transform = `${scaleTransform} ${translateTransform}`;
}

document.addEventListener("touchstart", (event) => {
    if (event.touches.length === 2) {
      lastScale = scale; // Store the current scale factor
    }
  });
  
document.addEventListener("touchmove", (event) => {
if (event.touches.length === 2) {
    // Calculate the current pinch scale
    const distance = Math.hypot(
    event.touches[0].clientX - event.touches[1].clientX,
    event.touches[0].clientY - event.touches[1].clientY);

    scale = (distance / initialDistance) * lastScale;

    // Apply the scale transformation
    const offsetX = (event.touches[0].clientX + event.touches[1].clientX) / 2;
    const offsetY = (event.touches[0].clientY + event.touches[1].clientY) / 2;
    tile_canvas.style.transformOrigin = `${offsetX}px ${offsetY}px`;
    tile_canvas.style.transform = `scale(${scale})`;
    }
});

document.addEventListener("touchend", (event) => {
if (event.touches.length < 2) {
    lastScale = scale; // Store the last scale factor when pinch ends
    }
});

// ANIMATION LOOP

function frame_draw() {
    for (let i = 0; i < tile_arr.length; i++) {
        tile_arr[i].draw();
    }
    cursor.draw();
    requestAnimationFrame(frame_draw);
}

frame_draw();