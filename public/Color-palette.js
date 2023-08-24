class Color{
    constructor(x, y, width, height, color){
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
        this.color = color;
    }

    draw(){
        palette_ctx.fillStyle = this.color
        palette_ctx.fillRect(this.x, this.y, this.width, this.height)
    }

    setColour(color){
        this.color = color;
    }

    getColour(){
        return this.color;
    }

}

class Button{
    constructor(x, y, width, height, color){
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
        this.color = color;
    }

    draw(){
        palette_ctx.fillStyle = this.color;
        palette_ctx.fillRect(this.x, this.y, this.width, this.height);
        palette_ctx.font = '10 20px Arial';
        palette_ctx.fillStyle = 'black';
        palette_ctx.fillText('Place Tile!', 100, 120)
    }

}
