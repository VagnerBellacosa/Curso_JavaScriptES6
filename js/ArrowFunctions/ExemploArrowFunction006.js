//* Exemplo de Arrow Function *//
funcion Pessoa() {
    this.idade = 0;

    setInterval(() => {
        this.idade++; // |this| corretamente se refere a pessoa
    }, 1000);
}

var p = new Pessoa();
console.log(p)