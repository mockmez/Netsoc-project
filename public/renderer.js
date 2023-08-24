var image_json

let k = 0;

fetch('http://localhost:3000/image.json')
.then(response => response.json())
.then((data) =>{    
    
    console.log(tile_arr.length)
    
    for(let i = 0; i < tile_arr.length; i++){
        let red = data['Image'][i]['red']
        let green = data['Image'][i]['green']
        let blue = data['Image'][i]['blue']
        console.log(red, green, blue)
        k++;
        tile_arr[i].setColour(`rgba(${red},${green},${blue}, 1)`)
    }

})
.catch((error) =>{
    console.log(error)
    console.log(k)
})