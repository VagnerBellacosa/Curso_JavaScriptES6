'use strict';

var obj = {
    a: 10
};

Object.defineProperty(obj, 'b', {
    get: () => {
        console.log(this.a, typeof this.a, this); // undefined 'undefined' Window {...} (ou o objeto global)
        return this.a + 10; // representa o objeto global 'Window', portanto 'this.a' retorna 'undefined'
    }
});