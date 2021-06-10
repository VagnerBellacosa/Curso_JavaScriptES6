'use strict';

var obj = {
    i: 10,
    b: () => console.log(this.i, this),
    c: function() {
        console.log(this.i, this);
    }
}

obj.b(); // imprime undefined, Window {...} (ou o objeto global)
obj.c(); // imprime 10, Object {...}