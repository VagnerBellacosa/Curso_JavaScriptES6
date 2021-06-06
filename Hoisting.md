# Introdução ao hoisting JavaScript

Quando você executa uma parte do código, o motor JavaScript cria o Contexto de Execução Global.

O Contexto de Execução Global possui duas fases:

- Fase de Criação
- Fase de Execução

Durante a Fase de Criação, o motor JavaScript move todas as declarações de variáveis e de funções para o topo do seu código. Esse recurso é conhecido como hoisting JavaScript.

## Içamento de Variáveis: Variable Hoisting

**Hoisting**  de variáveis significa que o motor JavaScript move as declarações de variáveis para o topo do script. 

O exemplo a seguir declara a variável counter e define que seu valor é 1.

| console.log(counter): // undefined |
| var = counter = 1; |

A primeira linha do código não causa um erro porque o motor JavaScript moveu a declaração da variável para o topo do script antes de começar a Fase de Execução. Tecnicamente o código se parece da seguinte forma em sua Fase de Execução:

| var = counter; |
| console.log(counter): // undefined |
| counter = 1; |

Tecnicamente falando, durante a Fase de Criação do Contexto de Execução Global, o motor JavaScript coloca a variável counter na memória e inicializa seu valor como undefined.

### A palavra-chave "let"

O seguinte código declara a variável counter usando a palavra-chave let.

| console.log(counter); |
| let counter = 1; |

O JavaScritp emite o seguinte erro:

| ReferenceError: Cannot access "counter" before initialization |

A mensagem desse erro diz que a variável counter já está na memória heap, porém ela não foi inicializada.
Nos bastidores, o motor JavaScript levanta as declarações de variáveis que usam a palavra-chave let. No entanto, ele não inicializa essas variáveis. Observe que se você acessar uma variável que não existe, o JavaScript gerará um erro diferente:

| console.log(alien); |
| let counter = 1; |

Erro:

| "ReferencerError:" alien is not defined |

### Içamento de Funções: Function Hoisting

Assim como nas variáveis, o motor JavaScript também eleva as declarações de funções. Ele move as declarações de funções para o início do sript. Por exemplo:

| console.log(result); | 
| | 
| function add(a,b){ | 
| return a + b; | 
| } | 

Neste exemplo, chamamos a função add() antes de defini-la. O código acima é equivalente ao seguinte:

| function add(a,b){ | 
| return a + b; | 
| } | 
| let x = 20 , |
|     y = 10; |
| let result = add( x , y) |
| console.log(result); | 

Durante a Fase de Criação do Contexto de Execução, o motor JavaScript coloca a declaração da função add() na memória heap.

Para ser preciso, o JavaScript cria um objeto do tipo Function e uma referência de função chamada add que se refere ao objeto da função.

### Expressão de Função: Function Expression

O exemplo a seguir altera a função add de uma função regular para uma expressão de função:


| let x = 20,  | 
|     y = 10; | 
|  | 
| let result = add (x, y); | 
| console.log(result); | 
|  | 
| var add = function (x,y){ | 
| return x + y; | 
| } | 

Se você executar esse código vai se deparar com um erro:

| "TypeError: add is not a function |

Durante a Fase de Criação do Contexto de Execução Global, o motor JavaScript cria a variável add na memória e inicializa seu valor como undefined. Ao executar o código a seguir, add é undefined e não uma função.

| let result = add(x,y); |

A variável add é atribuída a uma função anônima apenas durante a Fase de Execução do Contexto de Execução Global.

### Arrow Functions

O exemplo a seguir alteara a expressão da função add para uma arrow function.

| let x = 20,  | 
|     y = 10; | 
|  | 
| let result = add (x, y); | 
| console.log(result); | 
|  | 
| var add = (x,y) => x + y ;  | 

O código também emite o mesmo erro que o exemplo de expressão de função porque as arrow functions são na verdade apenas uma abreviação de sintaxe para definir expressões de funções.

| "TypeError: add is not a function |

Semelhante às expressões de funções, as arrow functions não são içadas.

## Resumo

**Hoisting JavaScript** é o deslocamento da declaração de todas as variáveis e funções para o topo do código.

A mudança (içamento) ocorre durante a fase de Criação do Contexto de Execução que move as declarações de variáveis e de funções para o início do script.

O motor JavaScript move para o topo as variáveis declaradas com a palavra-chave let, mas não as inicializa como as variáveis declaradas com a palavra chave var.

Expressões de funções e arrow functions não são movidas.





