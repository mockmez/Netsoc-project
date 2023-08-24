class Tile{
    constructor(x, y, width, height, color){
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
        this.color = color;
    }

    draw(){
        tile_ctx.fillStyle = this.color
        tile_ctx.fillRect(this.x, this.y, this.width, this.height)
    }

    getMidX(){
        return this.x + (this.width/2);
    }

    getMidY(){
        return this.y + (this.height/2);
    }

}

class Cursor{
    constructor(width, height, color){
        this.width = width;
        this.height = height;
        this.x = 0;
        this.y = 0;
        this.color = color;
        this.tile = null;
    }

    draw(){
        
        tile_ctx.lineWidth = 8;
        tile_ctx.strokeStyle = this.color;

        tile_ctx.beginPath();

        tile_ctx.moveTo(this.x, this.y);
        tile_ctx.lineTo(this.x + 20, this.y);
        tile_ctx.stroke();

        tile_ctx.moveTo(this.x, this.y);
        tile_ctx.lineTo(this.x, this.y + 20);
        tile_ctx.stroke();

        tile_ctx.moveTo(this.x + tile_width - 20, this.y);
        tile_ctx.lineTo(this.x + tile_width, this.y);
        tile_ctx.stroke();

        tile_ctx.moveTo(this.x + tile_width, this.y);
        tile_ctx.lineTo(this.x + tile_width, this.y + 20);
        tile_ctx.stroke();

        tile_ctx.moveTo(this.x, this.y + tile_height);
        tile_ctx.lineTo(this.x, this.y + tile_height - 20);
        tile_ctx.stroke();

        tile_ctx.moveTo(this.x, this.y + tile_height);
        tile_ctx.lineTo(this.x + 20 , this.y + tile_height);
        tile_ctx.stroke();

        tile_ctx.moveTo(this.x + tile_width, this.y + tile_height);
        tile_ctx.lineTo(this.x + tile_width - 20, this.y + tile_height);
        tile_ctx.stroke();

        tile_ctx.moveTo(this.x + tile_width, this.y + tile_height);
        tile_ctx.lineTo(this.x + tile_width, this.y + tile_height - 20);
        tile_ctx.stroke();

        tile_ctx.closePath();
    }

    setCoordinate(tileParam){
        this.tile = tileParam;
        this.x = tileParam.x;
        this.y = tileParam.y;
    }

    getTile(){
        return this.tile;
    }

}