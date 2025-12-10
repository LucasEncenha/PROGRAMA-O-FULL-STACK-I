import { Button, Form, Row, Col } from "react-bootstrap";
import { BsSearch } from "react-icons/bs";
import { useState, useEffect } from "react"; 

import Dados from './Dados.jsx';
import ModalCadastrar from './ModalCadastrar.jsx';
import TipoExameService from '../../services/TipoExameService.js';

function TelaTipoExame() {
    const [modalShow, setModalShow] = useState(false);
    const [tipoExame, setTipoExame] = useState([]);
    const [filtro, setFiltro] = useState({
        nome: '',
        status: ''
    });

    useEffect(() => {
        carregarTipoExame();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFiltro(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const carregarTipoExame = async () => {
        try {
            const dados = await TipoExameService.listarTodos();
            setTipoExame(dados);
        } catch (error) {
            console.error('Erro ao carregar:', error);
        }
    };

    const handleBuscar = async () => {
        try {
            let dados;
            if(filtro.nome || filtro.status) {
                dados = await TipoExameService.filtrar(filtro);
            } else {
                dados = await TipoExameService.listarTodos();
            }
            setTipoExame(dados);
        } catch (error) {
            setTipoExame([]);
        }
    };

    const handleAposCadastro = () => {
        setModalShow(false);
        carregarTipoExame(); 
    };

    const handleExcluir = async (id) => {
        try {
            await TipoExameService.excluir(id);
            await carregarTipoExame();
        } catch (error) {
            alert("Erro ao excluir.");
        }
    };

    return (
        <>
            <h1 className="mb-5">GERENCIAR TIPOS DE EXAME</h1>
            
            <Row className="mb-4 align-items-end">
                <Col md={6} xs={12} className="mb-2 mb-md-0">
                    <Form.Label htmlFor="filtroNome">Filtrar por Nome</Form.Label>
                    <Form.Control
                        name="nome"
                        placeholder="Filtrar por nome..."
                        value={filtro.nome}
                        onChange={handleChange}
                    />
                </Col>
                <Col md={3} xs={12} className="mb-2 mb-md-0">
                    <Form.Label htmlFor="filtroStatus">Status</Form.Label>
                    <Form.Select 
                        name="status"
                        value={filtro.status} 
                        onChange={handleChange}
                    >
                        <option value="">Todos</option>
                        <option value="1">Ativo</option>
                        <option value="0">Inativo</option>
                    </Form.Select>
                </Col>
                <Col md={3} xs={12}>
                    <Button 
                        variant="primary" 
                        onClick={handleBuscar} 
                        className="w-100 mt-md-3"
                    >
                        <BsSearch className="me-2" /> Buscar
                    </Button>
                </Col>
            </Row>
            
            <div className="mb-3">
                <Button variant="primary" onClick={() => setModalShow(true)}>
                    + Cadastrar Novo Tipo de Exame
                </Button>
            </div>
            
            <Dados
                tiposExames={tipoExame} 
                ExcluirTipoExame={handleExcluir}
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

export default TelaTipoExame;