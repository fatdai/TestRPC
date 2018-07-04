class Matrix{
    constructor(){
        this.arr = [1,0,0,0,
                    0,1,0,0,
                    0,0,1,0,
                    0,0,0,1];

    }


    identity(){
        this.arr = [1,0,0,0,
            0,1,0,0,
            0,0,1,0,
            0,0,0,1];
    }

    translate(x,y){
        var t = new Matrix();
        t.arr[12] = x;
        t.arr[13] = y;
        return this.multiply(t);
    }

    scale(sx,sy){
        var s = new Matrix();
        s.arr[0] = sx;
        s.arr[5] = sy;
        return this.multiply(s);
    }

    rotate(rad){
        var cos = Math.cos(rad);
        var sin = Math.sin(rad);
        var r = new Matrix();
        r.arr[0] = cos;
        r.arr[1] = sin;
        r.arr[3] = -sin;
        r.arr[5] = cos;
        return this.multiply(r);
    }

    multiply(other){
        var ret = new Matrix();
        ret.arr[0] = this.arr[0] * other.arr[0] + this.arr[4] * other.arr[1] + this.arr[8] * other.arr[2] + this.arr[12] * other.arr[3];
        ret.arr[1] = this.arr[1] * other.arr[0] + this.arr[5] * other.arr[1] + this.arr[9] * other.arr[2] + this.arr[13] * other.arr[3];
        ret.arr[2] = this.arr[2] * other.arr[0] + this.arr[6] * other.arr[1] + this.arr[10] * other.arr[2] + this.arr[14] * other.arr[3];
        ret.arr[3] = this.arr[3] * other.arr[0] + this.arr[7] * other.arr[1] + this.arr[11] * other.arr[2] + this.arr[15] * other.arr[3];

        ret.arr[4] = this.arr[0] * other.arr[4] + this.arr[4] * other.arr[5] + this.arr[8] * other.arr[6] + this.arr[12] * other.arr[7];
        ret.arr[5] = this.arr[1] * other.arr[4] + this.arr[5] * other.arr[5] + this.arr[9] * other.arr[6] + this.arr[13] * other.arr[7];
        ret.arr[6] = this.arr[2] * other.arr[4] + this.arr[6] * other.arr[5] + this.arr[10] * other.arr[6] + this.arr[14] * other.arr[7];
        ret.arr[7] = this.arr[3] * other.arr[4] + this.arr[7] * other.arr[5] + this.arr[11] * other.arr[6] + this.arr[15] * other.arr[7];

        ret.arr[8] = this.arr[0] * other.arr[8] + this.arr[4] * other.arr[9] + this.arr[8] * other.arr[10] + this.arr[12] * other.arr[11];
        ret.arr[9] = this.arr[1] * other.arr[8] + this.arr[5] * other.arr[9] + this.arr[9] * other.arr[10] + this.arr[13] * other.arr[11];
        ret.arr[10] = this.arr[2] * other.arr[8] + this.arr[6] * other.arr[9] + this.arr[10] * other.arr[10] + this.arr[14] * other.arr[11];
        ret.arr[11] = this.arr[3] * other.arr[8] + this.arr[7] * other.arr[9] + this.arr[11] * other.arr[10] + this.arr[15] * other.arr[11];

        ret.arr[12] = this.arr[0] * other.arr[12] + this.arr[4] * other.arr[13] + this.arr[8] * other.arr[14] + this.arr[12] * other.arr[15];
        ret.arr[13] = this.arr[1] * other.arr[12] + this.arr[5] * other.arr[13] + this.arr[9] * other.arr[14] + this.arr[13] * other.arr[15];
        ret.arr[14] = this.arr[2] * other.arr[12] + this.arr[6] * other.arr[13] + this.arr[10 * other.arr[14] + this.arr[14] * other.arr[15];
        ret.arr[15] = this.arr[3] * other.arr[12] + this.arr[7] * other.arr[13] + this.arr[11] * other.arr[14] + this.arr[15] * other.arr[15];

        return ret;
    }

    static makeTranslateMatrix(x,y){
        var t = new Matrix();
        t.arr[12] = x;
        t.arr[13] = y;
        return t;
    }

    static makeScaleMatrix(sx,sy){
        var s = new Matrix();
        s.arr[0] = sx;
        s.arr[5] = sy;
        return s;
    }
    static  makeRotationMatrix(rad){
        var cos = Math.cos(rad);
        var sin = Math.sin(rad);
        var r = new Matrix();
        r.arr[0] = cos;
        r.arr[1] = sin;
        r.arr[3] = -sin;
        r.arr[5] = cos;
        return r;
    }
}

module.exports = Matrix;