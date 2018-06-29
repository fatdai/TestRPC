

// 管理鼠标事件
class  EventManager{

    constructor(){
        this.events = {};
    }

    on(eventName,listener){
        if(this.events[eventName]){
            this.events[eventName].push(listener);
        }else{
            this.events[eventName] = [];
            this.events[eventName].push(listener);
        }
    }

    trigger(eventName){
        if(this.events[eventName]){
            for(var i = 0; i < this.events[eventName].length;++i){
                if(this.events[eventName][i]){
                    this.events[eventName][i]();
                }
            }
        }
    }
}

var em = new EventManager();

class Button{
    constructor(name,em){
        this.name = name;
        this.em = em;
    }

    on(eventName,cb){
        this.em.on(eventName,cb);
    }
}

var e1 = new EventManager();

var btn1 = new Button('btn1',e1);
btn1.on('click',function () {
   console.log('I am btn1 clicked!');
});


var btn2 = new Button('btn2',e1);
btn2.on('click',function () {
    console.log('I am btn2 clicked!');
});


e1.trigger('click');


// usage:
// this.setMouseCallback(downFunc,moveFunc,upFunc);

module.exports = EventManager;