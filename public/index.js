const tile_canvas = document.getElementById('tileCanvas')
const color_palette = document.getElementById('color-palette')

tile_canvas.width = 1920;
tile_canvas.height = 1080;

const tile_ctx = tile_canvas.getContext('2d')

const resolution_factor = 2

const tile_count_x = 16 * resolution_factor
const tile_count_y = 9 * resolution_factor

const tile_width = tile_canvas.width / tile_count_x
const tile_height = tile_canvas.height / tile_count_y

//Tile canvas

const tile_arr = []
let temp_size = 0
for(let i = 0; i < tile_count_y; i++){
    for(let j = 0; j < tile_count_x; j++){
        tile_arr.push(new Tile(j*tile_width, i*tile_height, tile_width, tile_height, 
            `rgba(${Math.random()*256}, 
            ${Math.random()*256}, 
            ${Math.random()*256}, 1)`,
            temp_size++))
    }
}

console.log('Initial size: ')
console.log(tile_arr.length)

//Cursor

const cursor = new Cursor(tile_width, tile_height, 'white')
cursor.setCoordinate(tile_arr[0])

//Events (ASYNCHRONOUS FUNCTIONS)

//Tile Canvas

let currentScale = 1;

document.addEventListener('wheel', (event) =>{
    
    if(event.ctrlKey){
        
        event.preventDefault()

        // tile_canvas.style.transformOrigin = `${cursor.getTile().getMidX()}px ${cursor.getTile().getMidY()}px`
        
        if(event.deltaY < 0){
            if(currentScale < 10)
            currentScale *= 1.05
        }
        else if(event.deltaY > 0){
            if(currentScale > 0.5)
            currentScale /= 1.05
        }
    
        tile_canvas.style.transform = `scale(${currentScale})`
        tile_canvas.style.translate = `${offsetX}px ${offsetY}px`
    }

}, {passive: false})

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

let isDragging = false
let startX, startY, offsetX = 0, offsetY = 0

tile_canvas.addEventListener('mousedown', (event) =>{
    isDragging = true
    startX = event.clientX
    startY = event.clientY
    offsetX = tile_canvas.offsetLeft
    offsetY = tile_canvas.offsetTop
    tile_canvas.style.cursor = 'grabbing'
})

tile_canvas.addEventListener('touchdown', (event) =>{

})

document.addEventListener('mousemove', (event) =>{
    if(!isDragging)
    return

    const newX = offsetX + event.clientX - startX
    const newY = offsetY + event.clientY - startY

    tile_canvas.style.left = `${newX}px`
    tile_canvas.style.top = `${newY}px`

})

document.addEventListener('mouseup', () =>{
    isDragging = false
    tile_canvas.style.cursor = 'grab'
})


//ANIMATION LOOP

function frame_draw(){

    for(let i = 0; i < tile_arr.length; i++){
        tile_arr[i].draw()
    }
    cursor.draw()
    requestAnimationFrame(frame_draw)
}

frame_draw()