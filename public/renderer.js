fetch('/image.json')
.then(response => response.json())
.then((data) =>{    
    
    
    for(let i = 0; i < tile_arr.length; i++){
        let red = data['Image'][i]['red']
        let green = data['Image'][i]['green']
        let blue = data['Image'][i]['blue']
        tile_arr[i].setColour(`rgba(${red},${green},${blue}, 1)`)
    }

    socket.on('client-change', (message) =>{
        data['Image'][message['index']]['red'] = message['color']['red']
        data['Image'][message['index']]['green'] = message['color']['green']
        data['Image'][message['index']]['blue'] = message['color']['blue']
        tile_arr[message['index']].setColour(`rgba(${message['color']['red']}, ${message['color']['green']}, ${message['color']['blue']}, 1)`)
    })

})
.catch((error) =>{
    console.log(error)
})