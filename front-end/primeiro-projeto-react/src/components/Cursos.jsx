import React, { Component } from 'react';
import "./Cursos.css";
import AlertCompra from "./AlertCompra.jsx";

class Cursos extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    novosAlunos = (nome) => {
        const alunos = this.state[nome] ? this.state[nome] : 0;
        
        this.setState({ [nome]: alunos + 1 });
    }

    render() {
        return (
            <div className="cursos">
                {this.props.array.map((curso) => (
                    <div className="curso" key={curso}>
                        <h4>{curso}</h4>
                        <p>Está é uma descrição de exemplo</p>
                        <AlertCompra funcao={
                            () => {
                                alert(`${curso} comprado com sucesso!`),
                                this.novosAlunos(curso)
                            }
                        }/>
                        <p>Alunos: {this.state[curso]}</p>
                    </div>
                ))}
            </div>
        );
    }
}

export default Cursos;