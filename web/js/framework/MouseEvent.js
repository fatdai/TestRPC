
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
    for(var i = 0; i < MouseEvent.events.length; ++i){
        if(typeof MouseEvent.events[i].mouseDown == 'function') {
            MouseEvent.events[i].mouseDown();
        }
    }
};
MouseEvent.mouseUp = function () {
    for(var i = 0; i < MouseEvent.events.length; ++i){
        if(typeof MouseEvent.events[i].mouseUp == 'function') {
            MouseEvent.events[i].mouseUp();
        }
    }
};
MouseEvent.mouseMove = function () {
    for(var i = 0; i < MouseEvent.events.length; ++i){
        if(typeof MouseEvent.events[i].mouseMove == 'function') {
            MouseEvent.events[i].mouseMove();
        }
    }
};


module.exports = MouseEvent;