
// var EventManager = require('./EventManager');
// EventManager.mouseEvent = new EventManager();

var MouseEvent = {};
MouseEvent.nodes = [];

MouseEvent.addNode = function (node) {
    for(var i = 0; i < MouseEvent.nodes.length; ++i){
        if(MouseEvent.nodes[i] == node){
            return;
        }
    }

    MouseEvent.nodes.push(node);
};

MouseEvent.removeNode = function (node) {
    for(var i = 0; i < MouseEvent.nodes.length; ++i){
        if(MouseEvent.nodes[i] == node){
            MouseEvent.nodes.splice(i,1);
            return;
        }
    }
};

MouseEvent.mouseDown = function () {
    var args = [].slice.call(arguments,0);
    for(var i = 0; i < MouseEvent.nodes.length; ++i){
        if(typeof MouseEvent.nodes[i].mouseDown == 'function') {
            MouseEvent.nodes[i].mouseDown.apply(MouseEvent.nodes[i],args);
        }
    }
};
MouseEvent.mouseUp = function () {
    var args = [].slice.call(arguments,0);
    for(var i = 0; i < MouseEvent.nodes.length; ++i){
        if(typeof MouseEvent.nodes[i].mouseUp == 'function') {
            MouseEvent.nodes[i].mouseUp.apply(MouseEvent.nodes[i],args);
        }
    }
};
MouseEvent.mouseMove = function () {
    var args = [].slice.call(arguments,0);
    for(var i = 0; i < MouseEvent.nodes.length; ++i){
        if(typeof MouseEvent.nodes[i].mouseMove == 'function') {
            MouseEvent.nodes[i].mouseMove.apply(MouseEvent.nodes[i],args);
        }
    }
};


module.exports = MouseEvent;