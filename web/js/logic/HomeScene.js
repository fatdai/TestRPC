var Scene = require('../Scene');
var Loader = require('../framework/Loader');





class HomeScene{

    constructor(game){
        this.game = game;
    }

    render(context){
        context.restore();
        // console.log('homeScene called!');
        // 绘制一行文字
        context.fillStyle = '#0000ff';
        context.font = '30px Arial';
        context.textAlign = 'center';
        context.fillText('Hello World',100,100);
        // context.fillRect(0,0,200,200);

        context.drawImage(Loader.getImage('bird1'),0,0);
    }
    update(){

    }
}

module.exports = HomeScene;