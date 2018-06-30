

var Utils = {};

// 判断元素 value 是否在 arr数组里面
Utils.valueInArray = function (arr,value) {
    if(!(arr instanceof Array)){
        console.log('arr is not Array!');
        return false;
    }

    for(var i = 0,len = arr.length; i < len; ++i){
        if(arr[i] == value){
            return true;
        }
    }
    return false;
};

module.exports = Utils;