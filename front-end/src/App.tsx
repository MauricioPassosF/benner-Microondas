/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable class-methods-use-this */
/* eslint-disable @typescript-eslint/ban-types */
import React from 'react';
import Swal from 'sweetalert2';
import IMicroondas from './interfaces/iMicroondas';
import './App.css';
import programasPredefinidos from './assets/ProgramasPreDefinidos';
import IProgramas from './interfaces/IProgramas';

class App extends React.Component<{}, IMicroondas> {
  constructor(props: {}) {
    super(props);
    this.state = {
      tempo: 0,
      potencia: 10,
      aquecimento: '',
      aquecendo: false,
      programas: programasPredefinidos,
      desativado: false,
      string: '.',
      novoPrograma: {
        nome: '',
        alimento: '',
        tempo: 0,
        potencia: 0,
        instrucoes: '',
        caracter: '',
      },
    };
    this.aquecer = this.aquecer.bind(this);
    this.pausarOuCancelar = this.pausarOuCancelar.bind(this);
    this.iniciarAquecimento = this.iniciarAquecimento.bind(this);
    this.handlerTempo = this.handlerTempo.bind(this);
    this.handlerPotencia = this.handlerPotencia.bind(this);
    this.handlerNovoPrograma = this.handlerNovoPrograma.bind(this);
    this.ativarPrograma = this.ativarPrograma.bind(this);
    this.adicionarPrograma = this.adicionarPrograma.bind(this);
  }

  async componentDidMount() {
    try {
      // substituir a porta do back-end na linha abaixo
      const response = await fetch('https://localhost:5107/microondas');
      const data = await response.json();
      this.setState({ programas: [...programasPredefinidos, ...data] });
    } catch (error) {
      Swal.fire({
        title: 'Erro',
        text: `${error}`,
      });
    }
  }

  handlerTempo(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ tempo: Number(event.target.value) });
  }

  handlerPotencia(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ potencia: Number(event.target.value) });
  }

  handlerNovoPrograma(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    if (name === 'tempo' || name === 'potencia') {
      this.setState((prevState) => ({
        novoPrograma: {
          ...prevState.novoPrograma,
          [name]: Number(value),
        },
      }));
    } else {
      this.setState((prevState) => ({
        novoPrograma: {
          ...prevState.novoPrograma,
          [name]: value,
        },
      }));
    }
  }

  adicionarPrograma() {
    const { novoPrograma, programas } = this.state;
    const caracteresUtilizados = ['.', ...programas.map((programa) => programa.caracter)];
    const {
      potencia, tempo, alimento, caracter, nome,
    } = novoPrograma;
    if (potencia < 0 || potencia > 10) {
      Swal.fire({
        title: 'Valor inválido',
        text: 'Potência inválida, digite valor de 1 a 10',
      });
    } else if (tempo <= 0) {
      Swal.fire({
        title: 'Valor inválido',
        text: 'Tempo inválido, tempo deve maior que 0',
      });
    } else if (nome.length <= 3) {
      Swal.fire({
        title: 'Valor inválido',
        text: 'Nome inválido, deve ter mais que 3 caracteres',
      });
    } else if (alimento.length <= 3) {
      Swal.fire({
        title: 'Valor inválido',
        text: 'Alimento inválido, deve ter mais que 3 caracteres',
      });
    } else if (caracter.length !== 1 || caracteresUtilizados.includes(caracter)) {
      Swal.fire({
        title: 'Valor inválido',
        text: 'Caracter inválido',
      });
    } else {
      // substituir a porta do back-end na linha abaixo
      fetch('http://localhost:5107/microondas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(novoPrograma),
      })
        .then((response) => response.json())
        .then((data) => {
          this.setState({ programas: [...programas, data] });
        })
        .catch((error) => {
          Swal.fire({
            title: 'Erro',
            text: `${error}`,
          });
        });
    }
  }

  pausarOuCancelar() {
    const { aquecendo, potencia } = this.state;
    if (!aquecendo) {
      this.setState({ tempo: 0, potencia: 10 });
    }
    this.aquecer(false, potencia);
    this.setState({ aquecendo: false });
  }

  iniciarAquecimento() {
    const {
      potencia, tempo, aquecendo, desativado, aquecimento, string,
    } = this.state;
    if (aquecendo && !desativado) {
      this.setState({ tempo: tempo + 30 });
    } else if (tempo === 0 && potencia === 10) {
      this.setState(
        { tempo: 30, aquecendo: true },
        () => { this.aquecer(true, potencia); },
      );
    } else if ((tempo < 1 || tempo > 120) && !desativado) {
      Swal.fire({
        title: 'Valor inválido',
        text: 'Tempo inválido, digite valor de 1 a 120 segundos',
      });
    } else if (potencia < 0 || potencia > 10) {
      Swal.fire({
        title: 'Valor inválido',
        text: 'Potência inválida, digite valor de 1 a 10',
      });
    } else if (!aquecendo && !desativado) {
      this.setState(
        { aquecendo: true },
        () => { this.aquecer(true, potencia); },
      );
    } else if (!aquecendo && desativado && !aquecimento.endsWith(`${string} `)) {
      this.setState(
        { aquecendo: true },
        () => { this.aquecer(true, potencia); },
      );
    }
  }

  aquecer(aquece: boolean, potencia: number) {
    const {
      tempo, aquecendo, string,
    } = this.state;
    if (!aquecendo) { return; }
    if (tempo > 1 || aquece) {
      this.setState((prevState) => ({
        tempo: prevState.tempo - 1,
        aquecimento: `${prevState.aquecimento}${string.repeat(potencia)} `,
      }));
      setTimeout(() => {
        if (tempo > 1) {
          this.aquecer(true, potencia);
        } else {
          this.aquecer(false, potencia);
        }
      }, 1000);
    } else {
      this.setState((prevState) => ({
        aquecimento: `${prevState.aquecimento}Aquecimento concluído`,
        aquecendo: false,
      }));
    }
  }

  ativarPrograma(programa: IProgramas) {
    this.setState({
      aquecendo: false,
      desativado: true,
      string: programa.caracter,
      tempo: programa.tempo,
      potencia: programa.potencia,
    });
  }

  render() {
    const {
      tempo, potencia, aquecimento, programas, desativado,
    } = this.state;
    return (
      <>
        <div>
          <h1>Micro-ondas</h1>
          <button type="button" onClick={this.iniciarAquecimento}>Iniciar</button>
          <button type="button" onClick={this.pausarOuCancelar}>Pausar/Cancelar</button>
          <button type="button">
            Tempo:
            {' '}
            {tempo <= 60 ? `${tempo}` : `${Math.floor(tempo / 60)}:${tempo % 60 < 10 ? `0${tempo % 60}` : tempo % 60}`}
          </button>
          <button type="button">
            Potência:
            {' '}
            {potencia}
          </button>
        </div>
        <div>
          Digite o tempo em segundos
          <input type="number" disabled={desativado} onChange={this.handlerTempo} value={tempo} />
          Digite a potência de 0 a 10
          <input type="number" disabled={desativado} onChange={this.handlerPotencia} value={potencia} />
        </div>
        <div>
          {programas.map((programa, id) => (
            <button type="button" key={programa.nome} onClick={() => this.ativarPrograma(programa)}>
              {id > 4 ? <i>{programa.nome}</i> : programa.nome}
            </button>
          ))}
        </div>
        <div>
          <p>{aquecimento}</p>
        </div>
        <div>
          Adicionar programa:
          Digite o nome:
          <input type="text" name="nome" onChange={this.handlerNovoPrograma} />
          Digite o tipo de alimento:
          <input type="text" name="alimento" onChange={this.handlerNovoPrograma} />
          Digite o tempo em segundos
          <input type="number" name="tempo" onChange={this.handlerNovoPrograma} />
          Digite a potência de 0 a 10
          <input type="number" name="potencia" onChange={this.handlerNovoPrograma} />
          Digite o caracter:
          <input type="text" name="caracter" onChange={this.handlerNovoPrograma} />
          Digite as instruções de aquecimento(opcional):
          <input type="text" name="instrucoes" onChange={this.handlerNovoPrograma} />
          <button type="button" onClick={this.adicionarPrograma}>Adicionar</button>
        </div>
      </>
    );
  }
}

export default App;
