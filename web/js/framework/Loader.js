
var Texture = require('./Texture');

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