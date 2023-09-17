const socket = io('/players')

function selectColor(element){
    const color = window.getComputedStyle(element).backgroundColor
    const selectionDisplay = document.getElementById('selected-color')
    selectionDisplay.style.backgroundColor = color
}

function select_color_mobile(element){
    console.log(window.getComputedStyle(element).backgroundColor)
    console.log('Test')
    selectColor(element)
    const wrapperParent = document.getElementById('palette-wrapper')
    const children = wrapperParent.children
    for(let i = 0; i < children.length; i++){
        children[i].style.transform = `scale(${1})`
    }
    element.style.transform = `scale(${0.8})`
}

function setColour(){
    
    console.log('test message')

    const color = window.getComputedStyle(document.getElementById('selected-color')).backgroundColor
    //cursor.getTile().setColour(color)
    
    const rgbaString = color
    const regExRGBA = /rgb\((\d+),\s*(\d+),\s*(\d+)\)/

    const match = rgbaString.match(regExRGBA)

    if(match){
        const red = parseInt(match[1], 10);
        const green = parseInt(match[2], 10);
        const blue = parseInt(match[3], 10);

        console.log('Test point')

        socket.emit('color-change', {
            color:{
                red: red,
                green: green,
                blue: blue
            },
            index: cursor.getTile().getTileIndex()
        })
    }
    else{
        console.log('No match')
    }
}

window.addEventListener('beforeunload', () => {
    if (socket) {
      socket.disconnect();
    }
  });