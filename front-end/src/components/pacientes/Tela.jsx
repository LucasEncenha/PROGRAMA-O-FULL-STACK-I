import { Button, Form, InputGroup } from "react-bootstrap";
import { BsSearch } from "react-icons/bs";
import { useState, useEffect } from "react"; 

import DadosPaciente from "./Dados.jsx";
import ModalCadastrarPaciente from "./ModalCadastrar.jsx";
import PacienteService from "../../services/PacienteService.js";

function TelaPaciente() {
    const [modalShow, setModalShow] = useState(false);
    const [pacientes, setPacientes] = useState([]);
    const [filtro, setFiltro] = useState('');

    useEffect(() => {
        carregarPacientes();
    }, []);

    const carregarPacientes = async () => {
        try {
            const dados = await PacienteService.listarTodos();
            setPacientes(dados);
        } catch (error) {
            console.error('Erro ao carregar:', error);
        }
    };

    const handleBuscar = async () => {
        try {
            const dados = await PacienteService.filtrar(filtro);
            setPacientes(dados);
        } catch (error) {
            setPacientes([]);
        }
    };

    const handleAposCadastro = () => {
        setModalShow(false);
        carregarPacientes(); 
    };

    const handleExcluir = async (id) => {
        try {
            await PacienteService.excluir(id);
            await carregarPacientes();
        } catch (error) {
            alert("Erro ao excluir.");
        }
    };

    return (
        <>
            <h1 className="mb-5">GERENCIAR PACIENTES</h1>
            
            <InputGroup className="mb-3">
                <Form.Control
                    placeholder="Filtrar por nome, CPF..."
                    value={filtro}
                    onChange={(e) => setFiltro(e.target.value)}
                />
                <Button variant="outline-primary" onClick={handleBuscar}>
                    <BsSearch /> Buscar
                </Button>
            </InputGroup>
            
            <div className="mb-3">
                <Button variant="primary" onClick={() => setModalShow(true)}>
                    + Cadastrar Novo Paciente
                </Button>
            </div>
            
            <DadosPaciente 
                pacientes={pacientes} 
                ExcluirPaciente={handleExcluir}
                Cadastro={handleAposCadastro}
            />

            <ModalCadastrarPaciente
                show={modalShow}
                onHide={() => setModalShow(false)}
                Cadastro={handleAposCadastro} 
            />
        </>
    );
}

export default TelaPaciente;