export default class IProgramas {
  nome: string;

  alimento: string;

  tempo: number;

  potencia: number;

  instrucoes: string;

  caracter: string;

  constructor(
    nome: string,
    alimento: string,
    tempo: number,
    potencia: number,
    instrucoes: string,
    caractere: string,
  ) {
    this.nome = nome;
    this.alimento = alimento;
    this.tempo = tempo;
    this.potencia = potencia;
    this.instrucoes = instrucoes;
    this.caracter = caractere;
  }
}
