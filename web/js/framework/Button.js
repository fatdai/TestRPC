
var Node = require('./Node');
var Matrix = require('./Matrix');

class Button extends Node{

    constructor(){
        super();
        this.text = '';
        this.textColor = '#ffff00';
        this.img = null;

        this.anchorX = 0.5;
        this.anchorY = 0.5;
    }

    renderSelf(context){
        if(this.img == null){
            context.textAlign = 'center';
            context.font = '20px Arial';
            this.width = context.measureText(this.text).width;
            this.height = 35;
        }

        // for debug
        context.fillStyle = '#00ff00';
        context.fillRect(0,0,200,200);

        context.translate(this.x,this.y);
        context.scale(this.scaleX,this.scaleY);

        // context.translate(this.anchorX * this.width,this.anchorY * this.height);
        context.rotate(Math.PI/this.angle);
        if(this.img == null){
            context.fillStyle = '#cccccc';
            context.fillRect(-this.anchorX * this.width,-this.anchorY * this.height,this.width,this.height);

            context.fillStyle = this.textColor;
            context.fillText(this.text,0,6);
        }else{
            context.drawImage(this.img,-this.anchorX * this.width,-this.anchorY * this.height);
        }
        //context.translate(-this.anchorX * this.width,-this.anchorY * this.height);
    }

    render(context){
        context.save();
        this.renderSelf(context);
        this.renderChildren(context);
        context.restore();
    }

    setClickListener(cb){

    }


    static makeTextButton(text,textColor){
        var btn = new Button();
        btn.text = text;
        btn.textColor = textColor || btn.textColor;
        return btn;
    }

    static makeImageButton(img){
        var btn = new Button();
        btn.img = img;
        btn.width = img.width;
        btn.height = img.height;
        return btn;
    }

    getBoundsInWorld(){
        var ret = {};
        ret.x = 0;
        ret.y = 0;
        ret.width = this.width;
        ret.height = this.height;

        var temp = this;
        while (temp.parent != null){
            ret.x
        }

    }

    getModelMatrix(){
        var t = Matrix.makeTranslateMatrix(this.x + this.width * this.anchorX,this.y + this.height * this.anchorY);
        var s = Matrix.makeScaleMatrix(this.scaleX,this.scaleY);
        var r = Matrix.makeRotationMatrix(this.angle * Math.PI/180);
        return r * s * t;
    }

    getRootNode(){
        var root = this;
        while (root.parent != null){
            root = root.parent;
        }
        return root;
    }

    mouseDown(){
        var e = arguments[0];
        var x = e.clientX;
        var y = e.clientY;
        // 计算按钮的有效区域

    }

    mouseMove(){

    }

    mouseUp(){

    }

}

// usage:
// var btn = new Button('btn1');
// btn.setClickListener(xx);
// xxx.add();

module.exports = Button;