// 产生id
function GenIDFunc() {
    var start = 1;
    return function () {
        ++start;
        return start;
    }
}

var GenId = GenIDFunc();
module.exports = GenId;