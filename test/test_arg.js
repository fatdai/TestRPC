
function say() {
    // show_info(arguments);

    // var args = [].slice.call(arguments);
    // console.log(args instanceof Array);
    // for(var i = 0; i < args.length;++i){
    //     console.log('xxx->',arguments[i]);
    // }
    for(var i = 0; i < arguments.length;++i){
        console.log('xxx->',arguments[i]);
    }
}

function show_info() {
    var args = [].slice.call(arguments,0);
    for(var i = 0; i < args.length;++i){
        console.log('xxx->',arguments[i]);
    }
}

say('1',2,3,4,5,6);
// say();