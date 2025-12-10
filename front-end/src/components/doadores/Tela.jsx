import { Button, Form, InputGroup } from "react-bootstrap";
import { BsSearch } from "react-icons/bs";
import { useState, useEffect } from "react"; 

import Dados from './Dados.jsx';
import ModalCadastrar from './ModalCadastrar.jsx';
import DoadorService from '../../services/DoadorService.js';

function TelaDoadores() {
    const [modalShow, setModalShow] = useState(false);
    const [doador, setDoador] = useState([]);
    const [filtro, setFiltro] = useState('');

    useEffect(() => {
        carregarDoadores();
    }, []);

    const carregarDoadores = async () => {
        try {
            const dados = await DoadorService.listarTodos();
            setDoador(dados);
        } catch (error) {
            console.error('Erro ao carregar:', error);
        }
    };

    const handleBuscar = async () => {
        try {
            const dados = await DoadorService.filtrar(filtro);
            setDoador(dados);
        } catch (error) {
            setDoador([]);
        }
    };

    const handleAposCadastro = () => {
        setModalShow(false);
        carregarDoadores(); 
    };

    const handleExcluir = async (id) => {
        try {
            await DoadorService.excluir(id);
            await carregarDoadores();
        } catch (error) {
            alert("Erro ao excluir.");
        }
    };

    return (
        <>
            <h1 className="mb-5">GERENCIAR DOADORES</h1>
            
            <InputGroup className="mb-3">
                <Form.Control
                    placeholder="Filtrar por nome, endereço..."
                    value={filtro}
                    onChange={(e) => setFiltro(e.target.value)}
                />
                <Button variant="outline-primary" onClick={handleBuscar}>
                    <BsSearch /> Buscar
                </Button>
            </InputGroup>
            
            <div className="mb-3">
                <Button variant="primary" onClick={() => setModalShow(true)}>
                    + Cadastrar Novo Doador
                </Button>
            </div>
            
            <Dados
                doadores={doador} 
                ExcluirDoador={handleExcluir}
                Cadastro={handleAposCadastro}
            />

            <ModalCadastrar
                show={modalShow}
                onHide={() => setModalShow(false)}
                Cadastro={handleAposCadastro} 
            />
        </>
    );
}

export default TelaDoadores;