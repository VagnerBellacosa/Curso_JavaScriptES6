# O que é e como usar o ES6

#### - Como usar o Babel
#### - Como declarar variáveis em ES6
#### - Classes
#### - let, const, arrow functions, destructuring
#### - Módulos

## O que é ES6, ECMAScript 6 ou ES2015

**JavaScript ES6**  é simplesmente a mais nova versão do JavaScript.

Na verdade, o nome mais usado atualmente é ES2015. A ideia do comitê responsável (conhecido como TC39) pelas atualizações da linguagem é justamente fazer um release anual. Então nesse ano teremos o ES2016 (ou ES7). E assim sucessivamente.

### ECMAScript x JavaScript x ES

Uma dúvida bem comum é o porquê dessa mudança do nome.

Na verdade não houve nenhuma mudança: JavaScript é como nós chamamos a linguagem, só que esse nome é um trademark da Oracle (que veio após a compra da Sun). O nome oficial da linguagem é **ECMAScript**. *E ES* é simplesmente uma abreviação do mesmo.

### Objetivos do ES6

O **TC39** focou em alguns objetivos no desenvolvimento do ES6:

- Ser uma linguagem melhor para construir aplicações complexas
- Resolver problemas antigos do JavaScript
- Facilidade no desenvolvimento de libraries

Esses objetivos ficarão mais claros quando olharmos na prática as features do ES6.

### Como usar

No momento que esse post está sendo escrito, a grande maioria dos browsers ainda não dão suporte ao ES6, então o que podemos fazer para contornar essa limitação?

Podemos usar um transpiler como o **Babel**.

O Babel transforma o seu código de ES6 para ES5 (versão que a maioria dos browsers dá suporte hoje).

### Transpilando ES6 para ES5

Vamos começar um projeto simples para demonstrar o uso do Babel:

| mkdir es6 |
| cd es6 |
| touch index.js .babelrc |

Agora vamos iniciar o npm com:

| npm init |

Aceite todas as opções e agora entre com o comando:

| npm --save-dev babel-cli babel-preset-es2015 |

Vamos agora abrir o index.js para escrever código em ES6:

O Babel por si só não sabe como transpilar o código. Por isso ele precisa de alguns plugins.

Vamos alterar o .babelrc para informar ao Babel qual plugin estamos utilizando para fazer a conversão de que precisamos. Como iremos usar o ES2015, nosso .babelrc deverá ficar assim:

| { |
|  'presets': ['es2015'] |
| } |

Basta então rodarmos o comando abaixo para que o transpile seja concluído.

| babel index.js -o script.js |

O comando pode ser traduzido da seguinte forma: Babel, pegue o arquivo index.js e gere um output com o nome script.js.

Se abrirmos o novo arquivo (script.js) que foi gerado, ele ficará assim:

Portanto, geramos um arquivo ES5 a partir de um ES6. Obviamente o que foi feito acima não é recomendado para aplicações reais, mas apenas uma forma rápida de se demonstrar a utilidade de transpilers.

## Quais as novidades do ES6

Agora que já sabemos o que é o ES6 e como podemos usá-lo hoje mesmo com o Babel, podemos então ver as features que ele adicionará na linguagem e seus benefícios.

### Declaração de variáveis

Para entender os benefícios da nova forma de se declarar variáveis em ES6 com let e const, precisamos antes entender o conceito de **hoisting**.

### var x let

A diferença principal entre o var e o let é que enquanto o primeiro tem escopo de função, o segundo possui escopo de bloco:

|  // escopo de função com var |  
|  function doSomething() { |  
|    var a = 1; |  
|    if (true) { |  
|      var b = 2; // b é declarado dentro do if mas é visível fora |  
|    } |  
|    var c = a + b; // 3 |  
|  } |  
|   |  
|  //escopo de bloco com let |  
|  function doSomethingElse() { |  
|    let a = 1 |  
|     if (true) { |  
|      let b = 2 // b é declarado dentro do if e não é visível fora |  
|    } |  
|    let c = a + b // Uncaught ReferenceError: b is not defined |  
|  } |  

Um outro exemplo de coisas inesperadas que acontecem quando usamos o var:

 |  for (var i = 0; i < 5; i++) { /* do something */ }  |  
 |  for (let j = 0; j < 5; j++) { /* do something else */}  |  
 |    |  
 |  console.log(i); // 5  |  
 |  console.log(j); // Uncaught ReferenceError: j is not defined |  

Em resumo, let conserta o antigo problema causado pelo hoisting fazendo com que a declaração de variáveis funcione da forma esperada pela maioria dos desenvolvedores.

### let x const

const funciona de forma semelhante. A única diferença é que as variáveis criadas não podem ser reatribuídas:

 |  let a = 1 |  
 |  a = 2 |  
 |   |  
 |  const b = 1 |  
 |  b = 2 // Uncaught SyntaxError "b" is read-only |  

É comum achar que const deixa a variável imutável, assim como algumas libs como ImmutableJS. Isso não é verdade. As propriedades de um objeto, por exemplo, podem ser alteradas:

 | const object = { | 
 |   property: 1 | 
 | } | 
 |  | 
 | object.property = 2 | 
 | console.log(object.property) // 2 | 

A minha opinião é de que devemos declarar todas as variáveis com const e quando a variável precisa ser reatribuída, e somente nesse caso, devemos usar o let. Não devemos usar o var (praticamente) nunca.

### Parâmetro de funções

Algumas pequenas alterações foram adicionadas em relação a parametrização de funções. Apesar dessas mudanças serem pequenas, elas trazem enormes benefícios.

#### default parameters

Os parâmetros de funções tem undefined como valor default. Porém, em alguns casos, pode ser necessário utilizar um outro valor. Com a versão atual do JavaScript (ES5) nós já podemos fazer isso dessa forma:

 | var multiply = function(x, y) { | 
 |    y = y | 1; | 
 |    return x * y; | 
 | }; | 
 |  | 
 | multiply(3, 2); // 6 | 
 | multiply(3); // 3  | 

O ES6 introduziu uma nova forma, bem mais simples, de se fazer isso. Basta adicionar o valor default na definição do parâmetro desejado:

 | const multiply = (x, y = 1) => { | 
 |   return x * y | 
 | } | 
 |  | 
 | multiply(3, 2) // 6 | 
 | multiply(3) // 3 | 

Ou então, com apenas uma linha:

 | const multiply = (x, y = 1) => x * y | 
 |  | 
 | multiply(3, 2) // 6 | 
 | multiply(3) // 3 | 

#### rest parameters 

Na versão atual do JavaScript podemos utilizar o objeto arguments para pegar todos os parâmetros de uma função:

 | var sum = function() { | 
 |     var result = 0; | 
 |     for (var i=0; i < arguments.length; i++) { | 
 |         result += arguments[i]; | 
 |     } | 
 |     return result; | 
 | } | 
 |  | 
 | sum(1, 2, 3, 4, 5); // 15 | 

O arguments porém, apresenta alguns problemas:

1. O objeto parece com um array, mas não é exatamente um
2. Todos os parâmetros da função são automaticamente atribuídos ao arguments. Não temos uma forma clara de diferenciar os parâmetros.

Com esses problemas em mente, os Rest Parameters foram adicionados no ES6. O mesmo exemplo da soma poderia ser reescrito dessa forma:

 | function sum(...numbers) { | 
 |   let result = 0 | 
 |   numbers.forEach((number) => { | 
 |     result += number | 
 |   }) | 
 |   return result | 
 | } | 
 |  | 
 | sum(1, 2, 3, 4, 5) // 15 | 

Ou dessa forma mais funcional:

 | const sum = (...numbers) =>  | 
 |     numbers.reduce((acc, current) => acc + current, 0) | 
 |  | 
 | sum(1, 2, 3, 4, 5) // 15 | 

## Programação Funcional

As minhas alterações preferidas do ES6 estão nessa categoria. Nos próximos exemplos tentarei mostrar o porquê.

### arrow functions 

Os arrow functions são um excelente syntax sugar na criação de funções. Uma função que seria escrita dessa forma em ES5:

 | var sum = function(x, y) { | 
 |  return x + y; | 
 | }; | 
 |  | 
 | sum(1, 2); // 3 | 

Pode ser escrita dessa forma em ES6 com o uso das arrow functions:

 | const sum = (x, y) => { | 
 |   return x + y | 
 | } | 
 |  | 
 | sum(1, 2) // 3 | 

Dessa forma já conseguimos ver uma maior expressividade e um menor número total de caracteres. Mas podemos melhorá-la ainda mais:

 | const sum = (x, y) => x + y | 
 |  | 
 | sum(1, 2) // 3 | 

Com funções de apenas uma linha, podemos simplesmente omitir o return e as chaves.

Mas o verdadeiro benefício das arrows functions não está na expressividade, ele se encontra na resolução de um antigo problema da linguagem: o this.

No exemplo abaixo em ES5, podemos observar o this sendo utilizado de forma errada:

 | function Widget() { | 
 | var button = document.getElementById('button'); | 
 |     button.addEventListener('click', function() { | 
 |         this.doSomething(); // o 'this' não aponta para Widget como esperado e provocará um erro. | 
 |     }); | 
 | } | 

Uma das formas mais comuns de resolver esse problema, como demonstrei nesse post, é usando o bind() ou então com self = this.
Com as arrow functions isso não é necessário. O this funcionará exatamente da forma esperada:

| function Widget() { | 
|     const button = document.getElementById('button') | 
|     button.addEventListener('click', () => { | 
|         this.doSomething() // o 'this' aponta para Widget e não provocará nenhum erro. | 
|     }) | 
| } | 

### destructuring 

Uma nova forma de declarar variáveis extraindo valores de objetos e arrays é através do destructuring. Ela funciona dessa forma:

 | const [a, b] = [1, 2] | 
 |  | 
 | console.log(a) // 1 | 
 | console.log(b) // 2 | 


E com rest parameters:

 | const [a, b, ...rest] = [1, 2, 3, 4, 5] | 
 |  | 
 | console.log(a) // 1 | 
 | console.log(b) // 2 | 
 | console.log(rest) // 3, 4, 5 | 

Com objetos ela funciona desse jeito:

 | var ReactRouter = require('react-router'); | 
 | var Route = ReactRouter.Route; | 
 | var Link = ReactRouter.Link; | 
 | var Router = ReactRouter.Router; | 

Provavelmente, o uso mais comum vai ser no import de libs. Vamos ter o poder de transformar isso:

Nisso:

 | const {  | 
 |   Route,  | 
 |   Link,  | 
 |   Router | 
 | } = require('react-router') | 

Você deve estar se perguntando sobre a minha motivação de ter colocado o destructuring na categoria de Programação Funcional.

A resposta é simples: destructuring é muito semelhante ao pattern matching, que é uma das bases das linguagens funcionais.

## Orientação a Objetos

Vamos falar agora sobre a feature mais polêmica do ES6: classes.
Eu pessoalmente não gosto dessa adição. Posso estar errado em relação a isso, e só o tempo vai confirmar ou não, mas acredito que os grandes problemas da linguagem foram causados por tentar se parecer com Java. Adicionar classes é algo que segue exatamente essa linha.
Mas independente da minha opinião elas foram adicionadas e vão trazer mudanças, então precisamos estudá-las.

### Classes

Classes nos dão uma sintaxe amigável que definem o estado e o comportamento de objetos que representam as abstrações que usamos diariamente.
constructor

Por exemplo, se necessitarmos de uma abstração para animais em que cada animal possui um nome, poderíamos implementar dessa forma:

class Animal {
  constructor(name) {
    this._name = name
  }

  getName() {
    return this._name
  }

  setName(name) {
    this._name = name
  }
}

const animal = new Animal('dog')
animal.getName() // dog
animal.setName('cat')
animal.getName() // cat

O método constructor tem como tarefa fazer a inicialização da instância. Ele é chamado automaticamente na criação da mesma e garante que ela esteja em um estado válido.
getters/setters

Como getters e setters são muito comuns na utilização de classes, o ES6 veio com um syntax sugar para lidar com os mesmos. Então podemos reescrever o exemplo anterior dessa forma melhorada:

class Animal {
  constructor(name) {
    this._name = name
  }

  get name() {
    return this._name
  }

  set name(name) {
    this._name = name
  }
}

const animal = new Animal('dog')
animal.name // dog
animal.name = 'cat'
animal.name // cat

Lembrando que a principal função dos getters/setters é proteger os dados internos das instâncias de um objeto.

Se você está se perguntando o porquê do underscore antes da propriedade name, a resposta simples é de que isso é uma convenção que indica que essa variável deve ser mantida privada.

### herança

Vamos pensar em um caso em que além de um nome, um Animal também terá um novo comportamento: emitir um som.
Podemos utilizar o conceito de herança com o extends e implementar dessa forma:

class Animal {
  constructor(name) {
    this._name = name
  }
   
  speak() {
    console.log(`${this._name} makes a noise`)
  }
}

class Dog extends Animal {
  speak() {
    console.log(`${this._name} barks`)
  }
}

class Cat extends Animal {
  speak() {
    console.log(`${this._name} meows`)
  }
}

const dog = new Dog('Rex')
dog.speak() // Rex barks

const cat = new Cat('Napoleon')
cat.speak() // Napoleon meows


# ES6 Classes

## Módulos

Um dos grandes problemas do JavaScript era não ter um sistema built-in de módulos assim como a maioria das linguagens possui.

Dessa ausência surgiram algumas possíveis soluções como CommonJS e AMD. Se você quiser saber mais sobre esses dois últimos, eu sugiro essa thread no Stack Overflow.
Nesse post falarei apenas sobre o novo sistema de módulos do ES6.

### ES6 Modules

A maioria dos desenvolvedores que já trabalhou em projetos grandes sabe a importância dos módulos: organizar o sistema, aumentar o reuso e diminuir a complexidade de cada pequeno trecho do seu code base.

#### export/import

Exportar módulos é bem simples. Após criarmos uma função podemos simplesmente adicionar a palavra export antes da definição da mesma:

// lib.js
export function sum(x, y) {
  return x + y
}

E para importar esse módulo em outro arquivo também é simples:

import { sum } from 'lib'

sum(1, 2) // 3

Com múltiplas funções é bem semelhante:

// lib.js
export function sum(x, y) {
  return x + y
}

export function mult(x, y) {
  return x * y
}

E para importar:

import { sum, mult } from 'lib'

sum(1, 2) // 3
mult(1, 2) // 2

Podemos também importar o módulo completo:

import * as lib from 'lib'

lib.sum(1, 2) // 3
lib.mult(1, 2) // 2

#### classes

Para importar e exportar classes também não há muitas mudanças, basta criar uma classe com o export na frente:

// developer.js
export class Developer {
  constructor(name) {
    this._name = name
  }

  get name() {
    return this._name
  }
}

Agora podemos importá-la assim:

import { Developer } from 'developer'

const dev = new Developer('Matheus')
dev.name // 'Matheus'

É comum termos a necessidade de exportar apenas uma função/classe por arquivo. Nesse cenário podemos utilizar a exportação default:

default

// square.js
export default function (x) {
  return x * x
}

Uma das vantagens é que o cliente (quem faz o import) é que vai setar o nome do módulo como bem quiser:

import square from 'square'

square(2) // 4
