function foo(n) {
    var f = (...args) => args[0] + n;
    return f(10);
}

foo(1); // 11