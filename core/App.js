const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 9999 });

var Codes = require('./Codes');

// RPC 需要实现的功能
// 1. 服务端调用客户端的方法
// 2. 客户端调用服务端的方法
// 3. 传递普通参数,将对象作为参数,传递回调函数


var rpc = {}; // 用于保存服务端的方法

var proxy = {};  // 用于调用客户端的方法


function GenIDFunc() {
    var start = 1;
    return function () {
        ++start;
        return start;
    }
}

var GenId = GenIDFunc();


//------------- test service method -----------
function checkAuth(userName,pwd) {
    console.log('checkAuth called!');
    return userName + '_' + pwd;
}



// 将可以让客户端调用的服务  注册到rpc
rpc['checkAuth'] = checkAuth;


wss.on('connection', function connection(ws) {

    console.log('有客户端连接上了. 将可以让客户端调用的服务传递给客户端');
    
    

    ws.on('message', function (msg) {
        console.log('received: %s', msg);
        var data = JSON.parse(msg);
        if(data.type == 1){
            //describe

        }else if(data.type == 2){
            // call function
            var cbId = data.cbId;
            var params = data.params;
            var name = data.name;
            var ret = rpc[name].apply(null,params);

            var sendObj = {};
            sendObj.type = 3; // 表示回调函数
            sendObj.cbId = cbId;
            sendObj.rData = {};
            sendObj.rData.code = Codes.OK;
            sendObj.rData.data = ret;
            ws.send(JSON.stringify(sendObj));

        }else if(data.type == 3){
            // cb

        }else {
            console.log('unknow message!');
        }
    });
});


// methods
// function sendDescribe(ws) {
//     var sendObj = {};
//     sendObj.type = 1; // describe
// }

console.log('rpc服务器启动成功......');