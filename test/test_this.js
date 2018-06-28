



// function func1(){
//     console.log('This:',this);
//     console.log('This is func1 called!');
// }
//
// func1.name = 'func_1';
//
//
// // setTimeout(func1,1000);
//
//
// class Button{
//     constructor(name){
//         this.name = name;
//         this.cb = null;
//     }
//
//     setClickListener(cb){
//         this.cb = cb;
//     }
//
//     btnClicked(){
//         if(this.cb){
//             this.cb();
//         }
//     }
// }
//
//
// var btn = new Button('btn1');
// btn.setClickListener(func1.bind(func1));
// btn.btnClicked();


// var scenes = {};
// var loading = {};
// loading.name = 'xx';
// loading.onStart = function () {
//   console.log('onStart:',this);
// };
//
// scenes['loading'] = loading;
//
//
// var curScene = scenes.loading;
//
// curScene.onStart();

class Person{
    constructor(name){
        this.name =  name;
    }

    shwoName(){
        console.log('shwoName:',this);
        // console.log('this.name:',this.name);
        console.log('show name called!');
    }
}
var p = new Person('zhangsan');
console.log(typeof p.shwoName);
p.shwoName.bind(null)();