

var PrimitiveDraw = {};

// 绘制直线
PrimitiveDraw.drawLine = function (context,p0,p1,color) {
    context.save();
    if(typeof color !== 'undefined'){
        context.strokeStyle = color;
    }
    context.moveTo(p0.x,p0.y);
    context.lineTo(p1.x,p1.y);
    context.stroke();
    context.restore();
};

// 绘制矩形
PrimitiveDraw.drawRect = function (context,origin,size,color) {
    context.save();
    if(typeof color !== 'undefined'){
        context.fillStyle = color;
    }
    context.fillRect(origin.x,origin.y,size.w,size.h);
    context.restore();
};

module.exports = PrimitiveDraw;