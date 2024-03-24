import IProgramas from './IProgramas';

export default interface IMicroondas {
  tempo: number,
  potencia: number,
  aquecimento: string,
  aquecendo: boolean,
  programas: IProgramas[],
  desativado: boolean,
  string: string,
  novoPrograma: IProgramas
}
