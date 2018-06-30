

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

module.exports = EventManager;