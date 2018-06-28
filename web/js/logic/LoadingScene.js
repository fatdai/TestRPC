
var Loader = require('../framework/Loader');
var res = require('./Resources');
var HomeScene = require('./HomeScene');

// async function sleep(ms) {
//     return new Promise(resolve => setTimeout(resolve,ms));
// }

class LoadingScene{
    constructor(game){

        this.game = game;
        this.loadPercent = 0;

        this.progressBg = {};
        this.progressBg.x = 320 - 150;
        this.progressBg.y = 240 - 30;
        this.progressBg.w = 300;
        this.progressBg.h = 60;

        this.prog = {};
        this.prog.x = this.progressBg.x;
        this.prog.y = this.progressBg.y;
        this.prog.w = 0;
        this.prog.h = this.progressBg.h;
    }

    enter(){
        var self = this;
        Loader.loadImgs(res,function (percent) {
            console.log('Loader.loadImgs called!');
            self.loadPercent = percent;
            self.prog.w = 300 * percent;
            if(percent === 1){
                // 加载完毕,切换到 homeScene
                console.log('准备切换 scene ......');
                self.game.replaceScene(new HomeScene(this));
            }
        });
    }

    render(context){
        // 绘制一个进度条
        context.save();

        // 绘制背景
        context.strokeStyle = '#000000';
        context.strokeRect(this.progressBg.x,this.progressBg.y,this.progressBg.w,this.progressBg.h);


        // 绘制当前进度
        context.fillStyle = '#ff0000';
        context.fillRect(this.prog.x,this.prog.y,this.prog.w,this.prog.h);

        context.restore();
    }

    update(){

    }
}

module.exports = LoadingScene;