
var Utils = require('./Utils');

class Node{

    constructor(){
        this.children = [];
        this.parent = null;

        // 在父元素里面的坐标
        this.x = 0;
        this.y = 0;
        this.angle = 0;
        this.scaleX = 1.0;
        this.scaleY = 1.0;
        this.anchorX  = 0; // 锚点,默认为0,0
        this.anchorY = 0;
        this.width = 0;
        this.height = 0;
    }

    setPosition(x,y){
        this.x = x;
        this.y = y;
    }
    setScale(sx,sy){
        this.scaleX = sx;
        this.scaleY = sy;
    }
    setRotate(angle){
        this.angle = angle;
    }

    addChild(node){
        if(node.parent != null){
            console.log('node alread has parent!');
            return;
        }

        this.children.push(node);
        node.parent = this;
    }

    // node 必须为当前元素的子元素
    removeChild(node){
        for(var i = 0,len = this.children.length; i < len; ++i){
            if(this.children[i] == node){
                this.children.splice(i,1);
                node.parent = null;
                return;
            }
        }
    }

    removeFromParent(){
        if(this.parent != null){
            this.parent.removeChild(this);
        }else{
            this.children = [];
        }
    }

    // render and update
    render(context){

        // 先绘制自己,再绘制子节点
        if(typeof  this.renderSelf == 'function'){
            this.updateSelf();
        }
        this.renderChildren(context);
    }

    renderChildren(context){
        for(var i = 0,len = this.children.length; i < len; ++i){
            if(typeof this.children[i].render == 'function'){
                this.children[i].render(context);
            }
        }
    }

    update(){
        // 先更新自己？再更新子节点
        if(typeof this.updateSelf == 'function'){
            this.updateSelf();
        }

        for(var i = 0,len = this.children.length; i < len; ++i){
            if(typeof this.children[i].update == 'function'){
                this.children[i].update();
            }
        }
    }

}

module.exports = Node;