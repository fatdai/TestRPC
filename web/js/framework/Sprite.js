
var Node = require('./Node');

class Sprite extends Node{
    constructor(img){
        super();
        this.img = img;
        this.width = img.width;
        this.height = img.height;
        this.anchorX = 0.5;
        this.anchorY = 0.5;
    }


    renderSelf(context){
        context.translate(this.x,this.y);
        context.drawImage(this.img,-this.width*this.anchorX,-this.height*this.anchorY);
    }

    render(context){
        context.save();
        this.renderSelf(context);
        this.renderChildren(context);
        context.restore();
    }

}

module.exports = Sprite;
