
var GenId = require('./IDs');
var Codes = require('./Codes');
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