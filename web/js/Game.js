
var Rect = require('./Rect');
var PrimitiveDraw = require('./PrimitiveDraw');
var NetManager = require('./NetManager');
var LoadingScene = require('./logic/LoadingScene');

// var SceneManager = require('./SceneManager');

// 全局变量
// var scenes = {};
// scenes['loading'] =


class Game{
    constructor(w,h){
        this.width = w;
        this.height = h;
        this.context = null;

        // ui
        this.userNameEl = null;
        this.pwdEl = null;
        this.loginBtn = null;
        this.loginDiv = null;
        this.gameDiv = null;
        this.netManager = new NetManager(this);

        // 游戏有哪些场景?
        this.curScene = null;
    }


    initGame(){

        var self = this;

        // 1. 显示登陆界面,登陆成功后-->跳转到游戏界面
        this.loginDiv = document.getElementById('loginDiv');
        this.gameDiv = document.getElementById('gameDiv');

        this.loginDiv.style.display = 'block';
        this.gameDiv.style.display = 'none';

        this.userNameEl = document.getElementById('userName');
        this.pwdEl = document.getElementById('pwd');
        this.loginBtn = document.getElementById('loginBtn');

        var canvas = document.getElementById('game');
        this.context = canvas.getContext('2d');

        this.loginBtn.onclick = function () {
            self.login();
        };

        canvas.width = this.width;
        canvas.height = this.height;
    }

    // 登陆
    login() {
        // alert(userNameEl.value + " and " + pwdEl.value);
        if(this.userNameEl.value.length < 1 || this.pwdEl.value.length < 1){
            alert('请输入账号密码!');
            return;
        }

        // 将账号密码发送到服务端
        this.netManager.setAuth(this.userNameEl.value,this.pwdEl.value);
        this.netManager.connect('ws://127.0.0.1:9999');
    }

    // 显示游戏主界面
    showGamePage() {
        console.log('showGamePage called!');
        this.loginDiv.style.display = 'none';
        this.gameDiv.style.display = 'block';

        this.replaceScene(new LoadingScene(this));

        requestAnimationFrame(this.mainLoop.bind(this));
    }

    // 切换scene
    replaceScene(newScene){
        if(null != this.curScene){
            if(typeof this.curScene.exit === 'function'){
                this.curScene.exit();
            }
        }
        this.curScene = newScene;
        if(typeof this.curScene.enter === 'function'){
            this.curScene.enter();
        }
    }

    mainLoop() {

        this.context.clearRect(0,0,this.width,this.height);

        if(null != this.curScene){
            this.curScene.update();
            this.curScene.render(this.context);
        }

        requestAnimationFrame(this.mainLoop.bind(this));
    }


    // static instance(){
    //     return Game.g_Instance;
    // }
}
// Game.g_Instance = null;
module.exports = Game;