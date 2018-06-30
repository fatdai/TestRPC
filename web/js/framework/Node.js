
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

    }

    update(){
        
    }

}

module.exports = Node;