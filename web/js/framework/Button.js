
var MouseEvent = require('./MouseEvent');


class Button{
    constructor(text){
        this.text = text;
    }
}

// usage:
// var btn = new Button('btn1');
// btn.setClickListener(xx);
// xxx.add();

module.exports = Button;