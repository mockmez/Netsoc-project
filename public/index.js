const tile_canvas = document.getElementById('tileCanvas')
const color_palette = document.getElementById('color-palette')

tile_canvas.width = 1920;
tile_canvas.height = 1080;

const tile_ctx = tile_canvas.getContext('2d')
const palette_ctx = color_palette.getContext('2d')

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

//Color Palette canvas

const gradient = palette_ctx.createLinearGradient(0, 0, color_palette.width, color_palette.height)
gradient.addColorStop(0, 'blue')
gradient.addColorStop(1, 'red')

palette_ctx.fillStyle = gradient; // Set the gradient as the background
palette_ctx.fillRect(0, 0, color_palette.width, color_palette.height)

const palette_arr = []

const selectedColor = new Color(color_palette.width - 23, 10, 18, 65, 'white')

for(let i = 0; i < 2; i++){
    for(let j = 0; j < 16; j++){
        palette_arr.push(new Color( 5 + (17 * j), 10 + (35 * i), 15, 30, 'white'))
    }
}

const place_button = new Button(5, 90, color_palette.width - 10, color_palette.height - 95, 'beige')

palette_arr[0].setColour('rgba(109, 0, 26, 1)')
palette_arr[1].setColour('rgba(190, 0, 57, 1)')
palette_arr[2].setColour('rgba(255, 69, 0, 1)')
palette_arr[3].setColour('rgba(255, 168, 0, 1)')
palette_arr[4].setColour('rgba(255, 214, 53, 1)')
palette_arr[5].setColour('rgba(255, 248, 184, 1)')
palette_arr[6].setColour('rgba(0, 163, 104, 1)')
palette_arr[7].setColour('rgba(0, 204, 120, 1)')
palette_arr[8].setColour('rgba(126, 237, 86, 1)')
palette_arr[9].setColour('rgba(0, 117, 111, 1)')
palette_arr[10].setColour('rgba(0, 158, 170, 1)')
palette_arr[11].setColour('rgba(0, 204, 192, 1)')
palette_arr[12].setColour('rgba(36, 80, 164, 1)')
palette_arr[13].setColour('rgba(54, 144, 234, 1)')
palette_arr[14].setColour('rgba(81, 233, 244, 1)')
palette_arr[15].setColour('rgba(73, 58, 193, 1)')
palette_arr[16].setColour('rgba(106, 92, 255, 1)')
palette_arr[17].setColour('rgba(148, 179, 255, 1)')
palette_arr[18].setColour('rgba(129, 30, 159, 1)')
palette_arr[19].setColour('rgba(180, 74, 192, 1)')
palette_arr[20].setColour('rgba(228, 171, 255, 1)')
palette_arr[21].setColour('rgba(222, 16, 127, 1)')
palette_arr[22].setColour('rgba(255, 56, 129, 1)')
palette_arr[23].setColour('rgba(255, 153, 170, 1)')
palette_arr[24].setColour('rgba(109, 72, 47, 1)')
palette_arr[25].setColour('rgba(156, 105, 38, 1)')
palette_arr[26].setColour('rgba(255, 180, 112, 1)')
palette_arr[27].setColour('rgba(0, 0, 0, 1)')
palette_arr[28].setColour('rgba(81, 82, 82, 1)')
palette_arr[29].setColour('rgba(137, 141, 144, 1)')
palette_arr[30].setColour('rgba(212, 215, 217, 1)')
palette_arr[31].setColour('rgba(255, 255, 255, 1)')

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

//Colour palette

const color_width = palette_arr[0].width
const color_height = palette_arr[0].height

color_palette.addEventListener('click', (event) =>{
    palette_arr.every((color) =>{
        
        const clickX = event.clientX - color_palette.getBoundingClientRect().left
        const clickY = event.clientY - color_palette.getBoundingClientRect().top

        if(((clickX >= color.x) && (clickX <= color.x + color_width)) && ((clickY >= color.y)&&(clickY <= color.y + color_height))){
            selectedColor.setColour(color.getColour())
            console.log(color.getColour())
            return false;
        }
        
        return true;

    })
})



//ANIMATION LOOP

function frame_draw(){

    for(let i = 0; i < tile_arr.length; i++){
        tile_arr[i].draw()
    }

    for(let i = 0; i < palette_arr.length; i++){
        palette_arr[i].draw()
    }

    selectedColor.draw()
    cursor.draw()

    place_button.draw()

    requestAnimationFrame(frame_draw)
}

frame_draw()