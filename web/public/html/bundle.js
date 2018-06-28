/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {





var Game = __webpack_require__(1);
var Scene = __webpack_require__(12);

window.onload = function () {
    var app = new Game(640,480);
    app.initGame();
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {


var Rect = __webpack_require__(2);
var PrimitiveDraw = __webpack_require__(3);
var NetManager = __webpack_require__(4);
var LoadingScene = __webpack_require__(7);

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

/***/ }),
/* 2 */
/***/ (function(module, exports) {

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

/***/ }),
/* 3 */
/***/ (function(module, exports) {



var PrimitiveDraw = {};

// 绘制直线
PrimitiveDraw.drawLine = function (context,p0,p1,color) {
    context.save();
    if(typeof color !== 'undefined'){
        context.strokeStyle = color;
    }
    context.moveTo(p0.x,p0.y);
    context.lineTo(p1.x,p1.y);
    context.stroke();
    context.restore();
};

// 绘制矩形
PrimitiveDraw.drawRect = function (context,origin,size,color) {
    context.save();
    if(typeof color !== 'undefined'){
        context.fillStyle = color;
    }
    context.fillRect(origin.x,origin.y,size.w,size.h);
    context.restore();
};

module.exports = PrimitiveDraw;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {


var GenId = __webpack_require__(5);
var Codes = __webpack_require__(6);
// var Game = require('./Game');  // 不能循环引用
// console.log('Game',Game);
// console.log('Codes',Codes);
class NetManager{
    constructor(game){
        this.rpc = {};
        this.cbs = {};
        this.ws = null;
        this.userName = '';
        this.pwd = '';
        this.game = game;
    }

    setAuth(userName,pwd){
        this.userName = userName;
        this.pwd = pwd;
    }

    addRpc(name,func){
        if(typeof name !== 'string' || typeof func !== 'function'){
            alert('addRpc 参数错误. name:'+ name + ", func:" + func);
            return;
        }
        this.rpc[name] = func.bind(self);
    }

    connect(wsUrl){
        var self = this;
        var ws = new WebSocket(wsUrl);
        this.ws = ws;
        ws.onopen = function () {
            // 验证账号密码
            self.invoke('checkAuth',self.userName,self.pwd,function (ret) {

                console.log('checkAuth cb called!....');
                if(ret.code != Codes.OK){
                    //  出现错误
                    alert('err:' + ret);
                    return;
                }
                console.log("THIS:",this);
                // 开始显示游戏主界面
                // Game.g_Instance.showGamePage();
                self.game.showGamePage();
            });

        };
        ws.onmessage = function (ev) {
            console.log(ev);
            var data = JSON.parse(ev.data);
            if(data.type == 1){
                //describe

            }else if(data.type == 2){
                // call function

            }else if(data.type == 3){
                // cb

                var cbId = data.cbId;
                var ret = data.rData;
                if(self.cbs[cbId]){
                    console.log('invoke cb called!....');
                    self.cbs[cbId].bind(self,ret)();
                    self.cbs[cbId] = null;
                }
            }else {
                console.log('unknow message!');
            }
        };

        ws.onerror = function (err) {
            console.log('error:',err);
        };

        ws.onclose = function () {
            console.log('websocket closed!');
        };
    }

    // 第一个参数  是方法名
    // 最后一个参数应该是回调函数
    invoke(){
        if (arguments.length < 2){
            alert('参数错误! 至少需要2个参数,第一个为 服务端的方法名,第2个为 回调函数');
            return;
        }

        if(typeof arguments[0] !== 'string'){
            alert('第一个参数必须为 字符串,表示服务端的方法名.');
            return;
        }

        if(typeof  arguments[arguments.length - 1] !== 'function'){
            alert('最后一个参数必须为 function,表示客户端这边的回调函数.');
            return;
        }

        var cb = arguments[arguments.length - 1];
        var cbId = GenId();
        this.cbs[cbId] = cb;

        var sendObj = {};
        sendObj.type = 2; // call function
        sendObj.name = arguments[0];
        sendObj.params = [].slice.call(arguments,1,arguments.length - 1) || [];
        sendObj.cbId = cbId;
        this.ws.send(JSON.stringify(sendObj));
    }

    // static instance(){
    //     if (NetManager.g_Instance == null){
    //         NetManager.g_Instance = new NetManager();
    //     }
    //     return NetManager.g_Instance;
    // }
}

// NetManager.g_Instance = null;
module.exports = NetManager;

/***/ }),
/* 5 */
/***/ (function(module, exports) {

// 产生id
function GenIDFunc() {
    var start = 1;
    return function () {
        ++start;
        return start;
    }
}

var GenId = GenIDFunc();
module.exports = GenId;

/***/ }),
/* 6 */
/***/ (function(module, exports) {



var Codes = {};

Codes.OK = 1;
Codes.ERROR = -1;

module.exports = Codes;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {


var Loader = __webpack_require__(8);
var res = __webpack_require__(10);
var HomeScene = __webpack_require__(11);

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

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {


var Texture = __webpack_require__(9);

// usage:
// var res = {};
// res.basePath = '../../';
// res.img = {}; // 存放图片资源
// res.audio = {}; // 存放声音资源
//
// res.img['bird1'] = 'imgs/bird1.png';
// res.img['desk'] = 'imgs/desk.png';
// res.img['pig01'] = 'imgs/pig01.png';
// res.img['pig02'] = 'imgs/pig02.png';
// res.img['remove'] = 'imgs/remove.png';
// res.img['st21'] = 'imgs/st21.png';

var Loader = {};
Loader.imgLoadedCount = 0;
Loader.imgTotalCount = 0;
Loader.caches = {};


function imgLoaded(cb) {
    Loader.imgLoadedCount++;
    if(Loader.imgLoadedCount == Loader.imgTotalCount){
        // 加载完毕,跳转到游戏界面
        cb(1);
    }else{
        cb(Loader.imgLoadedCount/Loader.imgTotalCount);
    }
}

Loader.loadImgs = function (res,cb) {
    Loader.imgLoadedCount = 0;
    for(var key in res.img){
        Loader.imgTotalCount++;
        var img = new Image();
        img.src = res.basePath + res.img[key];
        img.onload = imgLoaded.bind(this,cb);
        Loader.caches[key] = new Texture(img.src,img);
    }
};


Loader.getImage = function (key) {
   return Loader.caches[key].img;
};

// console.log(23/100);

module.exports = Loader;

/***/ }),
/* 9 */
/***/ (function(module, exports) {

class Texture{
    constructor(imgPath,img){
        this.imgPath = imgPath;
        this.img = img;

    }
}

module.exports = Texture;

/***/ }),
/* 10 */
/***/ (function(module, exports) {

var res = {};
res.basePath = '../../';
res.img = {}; // 存放图片资源
res.audio = {}; // 存放声音资源

res.img['bird1'] = 'imgs/bird1.png';
res.img['desk'] = 'imgs/desk.png';
res.img['pig01'] = 'imgs/pig01.png';
res.img['pig02'] = 'imgs/pig02.png';
res.img['remove'] = 'imgs/remove.png';
res.img['st21'] = 'imgs/st21.png';

module.exports = res;


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

var Scene = __webpack_require__(12);
var Loader = __webpack_require__(8);

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

/***/ }),
/* 12 */
/***/ (function(module, exports) {



class Scene{
    constructor(){}
}

module.exports = Scene;

/***/ })
/******/ ]);