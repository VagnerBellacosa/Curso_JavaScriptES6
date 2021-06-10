//* Exemplo de Arrow Function *//
const carro = {
    modelo: 'Fiesta',
    fabricante: 'Ford',
    NomeCompleto: => {
        return '${this.fabricante} ${this.modelo}'
    }
}

console.log(carro.NomeCompleto());