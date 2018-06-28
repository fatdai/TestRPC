class Rect{

    constructor(){
        this.x = 0;
        this.y = 0;
        this.w = 0;
        this.h = 0;
    }

    static makeRect(x,y,w,h){
        var rect = new Rect();
        rect.x = x;
        rect.y = y;
        rect.w = w;
        rect.h = h;
        return rect;
    }

    draw(context){
        context.save();
        context.fillStyle = '#ff0000';
        // context.strokeRect(this.x,this.y,this.w,this.h);
        context.fillRect(this.x,this.y,this.w,this.h);
        context.restore();
    }
}

module.exports = Rect;