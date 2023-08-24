var image_json

const tile_canvas = document.getElementById('tile-canvas')
const ctx = tile_canvas.getContext('2d')

class Tile{
    constructor(x, y, width, height, color){
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
        this.color = color;
    }

    draw(){
        ctx.fillStyle = this.color
        ctx.fillRect(this.x, this.y, this.width, this.height)
    }
}

const tile_count_x = 16
// const tile_count_y = 9

// const tile_width = tile_canvas.width / tile_count_x
// const tile_height = tile_canvas.height / tile_count_y

// const tile_arr = []


// fetch('http://localhost:3000/image.json')
// .then(response => response.json())
// .then((data) =>{
//     console.log(data)
//     image_json = data
//     let k = 0;
//     for(let i = 0; i < tile_count_y; i++){
//         for(let j = 0; j < tile_count_x; j++){
//             tile_arr[k].push(new Tile(
//                 j*tile_width, 
//                 i*tile_height, 
//                 tile_width, tile_height, 
//                 `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 1)`))
//             tile_arr[k].draw()
//             k ++
//         }
//     }

// })
// .catch((error) =>{
//     console.log("Error")
// })