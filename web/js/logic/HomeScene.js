var Scene = require('../Scene');
var Loader = require('../framework/Loader');
var Button = require('../framework/Button');
var Node = require('../framework/Node');

var Sprite = require('../framework/Sprite');
var MouseEvent = require('../framework/MouseEvent');

class HomeScene{

    constructor(game){
        this.game = game;
        this.root = new Node();
    }

    enter(){
        var btn = Button.makeTextButton('你这个小表渣');
        btn.setPosition(100,100);
        this.root.addChild(btn);

        var btn2 = Button.makeImageButton(Loader.getImage('desk'));
        btn2.setPosition(200,200);
        this.root.addChild(btn2);

        btn2.setScale(2,2);
        btn2.setRotate(10);

        // 大图片下面放小图片
        var sp = new Sprite(Loader.getImage('bird1'));
        sp.setPosition(20,0);
        btn2.addChild(sp);

        MouseEvent.addNode(btn2);
    }

    render(context){
        this.root.render(context);
    }
    update(){
        this.root.update();
    }
}

module.exports = HomeScene;