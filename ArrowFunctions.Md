# Arrow functions

Uma expressão arrow function possui uma sintaxe mais curta quando comparada a uma expressão de função (function expression) e não tem seu próprio this, arguments, super ou new.target. Estas expressões de funções são melhor aplicadas para funções que não sejam métodos, e elas não podem ser usadas como construtoras (constructors).

## JavaScript Demo: Functions =>

...
const materials = [
  'Hydrogen',
  'Helium',
  'Lithium',
  'Beryllium'
];

console.log(materials.map(material => material.length));
// expected output: Array [8, 6, 7, 9]

...

## Sintaxe
### Sintaxe básica

...
(param1, param2, …, paramN) => { statements }
(param1, param2, …, paramN) => expression
// equivalente a: => { return expression; }
...

...
// Parênteses são opcionais quando só há um nome de parâmetro:
(singleParam) => { statements }
singleParam => { statements }
...

...
// A lista de parâmetros para uma função sem parâmetros deve ser escrita com um par de parênteses.
() => { statements }
...

### Sintaxe avançada


...

// Envolva o corpo da função em parênteses para retornar uma expressão literal de objeto:
params => ({foo: bar})

...

...

// Parâmetros rest (rest parameters) e parâmetros padrões (default parameters) são suportados
(param1, param2, ...rest) => { statements }
(param1 = defaultValue1, param2, …, paramN = defaultValueN) => { statements }
...

...

// Desestruturação (destructuring) dentro da lista de parâmetros também é suportado
var f = ([a, b] = [1, 2], {x: c} = {x: a + b}) => a + b + c;
f(); // 6
...


### Descrição

Veja também "ES6 In Depth: Arrow functions" on hacks.mozilla.org.

Dois fatores influenciaram a introdução das arrow functions: funções mais curtas e a inexistência da palavra chave this.

#### Funções mais curtas

...

var elements = [
  'Hydrogen',
  'Helium',
  'Lithium',
  'Beryllium'
];

elements.map(function(element) {
  return element.length;
}); // esta sentença retorna o array: [8, 6, 7, 9]

// A função regular acima pode ser escrita como a arrow function abaixo
elements.map((element) => {
  return element.length;
}); // [8, 6, 7, 9]

// Quando só existe um parâmetro, podemos remover os parênteses envolvendo os parâmetros:
elements.map(element => {
  return element.length;
}); // [8, 6, 7, 9]

// Quando a única sentença em uma arrow function é `return`, podemos remover `return` e remover
// as chaves envolvendo a sentença
elements.map(element => element.length); // [8, 6, 7, 9]

// Neste caso, porque só precisamos da propriedade length, podemos usar o parâmetro de destruição (destructing parameter):
// Note que a string `"length"` corresponde a propriedade que queremos obter enquanto que a
// obviamente propriedade não especial `lengthFooBArX` é só o nome de uma variável que pode ser mudado
// para qualquer nome válido de variável que você quiser
elements.map(({ "length": lengthFooBArX }) => lengthFooBArX); // [8, 6, 7, 9]

// Esta atribuição de parâmetro de destruição (destructing parameter) pode ser escrita como visto abaixo. Entretanto, note que
// não há um específico `"length"` para selecionar qual propriedade nós queremos obter. Ao invés disso, o nome literal
// da própria variável `length` é usado como a propriedade que queremos recuperar do objeto.
elements.map(({ length }) => length); // [8, 6, 7, 9]
...

### Sem this separado

Antes das arrow functions, toda nova função definia seu próprio valor de this (baseado em como a função era chamada, um novo objeto no caso de um construtor, undefined em chamadas de funções com modo estrito (strict mode), o objeto base se a função é chamada como um "método de objeto", etc.). Este comportamento é importuno com um estilo de programação orientado a objeto.

...

function Person() {
  // O contrutor Person() define `this` como uma instância dele mesmo.
  this.age = 0;

  setInterval(function growUp() {
    // Em modo não estrito, a função growUp() define `this`
    // como o objeto global (porque é onde growUp() é executado.),
    // que é diferente ao `this`
    // definido pelo construtor Person().
    this.age++;
  }, 1000);
}

var p = new Person();
...

No ECMAScript 3/5, este comportamento era corrigido definindo o valor em this à uma variável que pudesse ser encapsulada.

...
function Person() {
  var that = this;
  that.age = 0;

  setInterval(function growUp() {
    // A chamada a função refere à variáevel `that` da qual
    // o valor é o objeto esperado.
    that.age++;
  }, 1000);
}
...

Alternativamente, uma função de ligação (bound function) pode ser criada para que o valor pré-atribuido à this seja passado para a função alvo de ligação (a função growUp() no exemplo acima.

Uma arrow function não tem seu próprio this; o valor this do contexto léxico encapsulado é usado. Ex: Arrow functions seguem as regras normais de pesquisa de variáveis. Então, ao procurar por this, que não está no escopo atual elas acabam encontrando this no escopo encapsulado. Assim, no código a seguir, o this dentro da função que é passado para setInterval tem o mesmo valor do this na função lexicamente encapsulada:

...
function Person(){
  this.age = 0;

  setInterval(() => {
    this.age++; // |this| corretamente se refere ao objeto Person
  }, 1000);
}

var p = new Person();
...

### Relação com strict mode

Considerando que this vem do contexto léxico envolvente, as regras do modo estrito (strict mode) em relação ao this são ignoradas.

...
var f = () => { 'use strict'; return this };
f() === window; // ou o objeto global
...

O restante das regras do modo estrito (strict mode) são aplicadas normalmente.

## Invocação por call ou apply

Já que as arrow functions não têm o próprio  this, os métodos call() ou apply() só podem passar parâmetros. thisArg é ignorado.

...
var adder = {
  base: 1,

  add: function(a) {
    var f = v => v + this.base;
    return f(a);
  },

  addThruCall: function(a) {
    var f = v => v + this.base;
    var b = {
      base: 2
    };

    return f.call(b, a);
  }
};

console.log(adder.add(1));         // Deve logar 2
console.log(adder.addThruCall(1)); // Deve logar 2 ainda
Sem ligação (binding) de argumentos (arguments)

...

Arrow functions não tem o próprio objeto argumentos (arguments object). Assim, neste exemplo, arguments é simplesmente uma referência aos argumentos do escopo encapsulado:

...

var arguments = [1, 2, 3];
var arr = () => arguments[0];

arr(); // 1

function foo(n) {
  var f = () => arguments[0] + n; // ligação implícita dos argumentos de foo. arguments[0] é n
  return f();
}

foo(3); // 6

...

Na maioria dos casos, usar parâmetros rest (rest parameters) é uma boa alternativa a usar um objeto arguments.

...
function foo(n) {
  var f = (...args) => args[0] + n;
  return f(10);
}

foo(1); // 11
...

### Arrow functions usadas como métodos

Como afirmado anteriormente, expressões arrow function são melhores para funções que não sejam métods. Vamos ver o que acontece quando tentamos usá-las como métodos.

...
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
...

Arrow functions não tem o próprio this. Outro exemplo envolvendo Object.defineProperty():

...
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
...

### Uso do operador new

Arrow functions não podem ser usadas como construtores e lançarão um erro quando usadas com o new.

### Uso da propriedade prototype

Arrow functions não têm a propriedade prototype.

...
var Foo = () => {};
console.log(Foo.prototype); // undefined
...

## Uso da palavra chave yield

A palavra chave yield não pode ser usada no corpo de uma arrow function (exceto quando permitido dentro de funções aninhadas dentro delas). como consequência, arrow functions não podem ser usadas como geradoras (generators).

### Corpo de função

Arrow functions podem ter um corpo conciso ("concise body") ou o usual corpo em bloco ("block body").

Em um concise body, apenas uma expressão é especificada, a qual se torna o valor de retorno implícito. Em um block body, você precisa explicitamente usar a declaração de retorno, ou seja, o return.

...
var func = x => x * x;
// sintaxe de concise body. O "return" é implícito

var func = (x, y) => { return x + y; };
// Em um função com block body, é necessário um "return" explícito
...

### Retornando objetos literais

Tenha em mente que retornar objetos literais usando a sintaxe de corpo conciso (concise body) params => {object:literal} não funcionará como esperado.

...
var func = () => { foo: 1 };
// Chamar func() retornará undefined!

var func = () => { foo: function() {} };
// SyntaxError (Erro de sintaxe): a declaração da função requer um nome
... 

Isto acontece porque o código dentro das chaves ({}) é convertido como uma sequência de sentenças (ex: foo é tratado como um título, não como uma chave num objeto literal).

Se lembre de envolver o objeto literal em parênteses.

...
var func = () => ({foo: 1});
...

### Quebras de linha

Uma arrow function não pode conter uma quebra de linha entre seus parâmetros e sua flecha.

...
var func = (a, b, c)
           => 1;
// SyntaxError (Erro de sintaxe): esperada expressão, mas obteve '=>'
...

Entretanto, isto pode ser corrigido ao usar parênteses ou colocar a quebra de linha dentro dos argumentos como visto abaixo para garantir que o código permaneça bonito e leve.

...

var func = (
  a,
  b,
  c
) => (
  1
);
// SyntaxError (erro de sintaxe) não é lançado
...
 
## Ordem de análise

Apesar de a flecha numa arrow function não ser um operador, arrow functions possuem regras especiais de análise que interagem diferentemente com precedência de operador (operator precedence) comparadas à funções comuns.

...
let callback;

callback = callback || function() {}; // ok

callback = callback || () => {};
// SyntaxError (Erro de sintaxe): argumentos inválidos de arrow-function

callback = callback || (() => {});    // ok
... 

## Mais exemplos

...
// Uma arrow function vazia retorna undefined
let empty = () => {};

(() => 'foobar')();
// Retorna "foobar"
// (esta é uma Expressão de Função Invocada Imediatamente (Immediately Invoked Function Expression)
// veja 'IIFE' no glossário)

var simple = a => a > 15 ? 15 : a;
simple(16); // 15
simple(10); // 10

let max = (a, b) => a > b ? a : b;

// Mapeamento, filtragem, ... simples de array

var arr = [5, 6, 13, 0, 1, 18, 23];

var sum = arr.reduce((a, b) => a + b);
// 66

var even = arr.filter(v => v % 2 == 0);
// [6, 0, 18]

var double = arr.map(v => v * 2);
// [10, 12, 26, 0, 2, 36, 46]

// Cadeias de promessa (promisse chains) mais concisas
promise.then(a => {
  // ...
}).then(b => {
  // ...
});

// Arrow functions sem parâmetros que são visualmente mais fáceis de analisar
setTimeout( () => {
  console.log('E aconteço antes');
  setTimeout( () => {
    // deeper code
    console.log('Eu aconteço depois');
  }, 1);
}, 1);
...

## Especificações


- ECMAScript 2015 (6th Edition, ECMA-262)
 The definition of 'Arrow Function Definitions' in that specification.	

- ECMAScript (ECMA-262)
  The definition of 'Arrow Function Definitions' in that specification.


[Artigo original](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Functions/Arrow_functions)