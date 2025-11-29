import { Container, Button, Row, Col, Nav, Form, InputGroup } from "react-bootstrap";
import { BsSearch } from "react-icons/bs";
import Dados from "./components/Dados.jsx";
import { useState, useEffect } from "react"; 
import ModalCadastrar from "./components/ModalCadastrar.jsx";
import ExameService from "./services/ExameService.js"; 
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    const [modalShow, setModalShow] = useState(false);
    const [loading, setLoading] = useState(false); 
    const [exames, setExames] = useState([]);
    const [filtro, setFiltro] = useState('');

    const carregarExames = async () => {
        setLoading(true);
        try {
            const dados = await ExameService.listarTodos();
            setExames(dados);
        } catch (error) {
            console.error('Erro ao carregar exames:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleBuscar = async () => {
        setLoading(true);
        try {
            const dadosFiltrados = await ExameService.filtrar(filtro);
            setExames(dadosFiltrados);
        } catch (error) {
            console.error("Erro ao buscar:", error);
            setExames([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        carregarExames();
    }, []);

    const handleCadastroExame = () => {
        setModalShow(false);
        carregarExames(); 
    };

    const handleExcluirExame = async (id) => {
        try {
            await ExameService.excluir(id);
            await carregarExames(); 
        } catch (error) {
            console.error("Erro ao excluir exame:", error);
            alert("Não foi possível excluir o exame.");
        }
    };

    return (
        <>
            <Container fluid>
                <Row>
                    <Col md={3} lg={2} className="bg-primary text-white min-vh-100 p-4">
                        <h3 className="mb-4">ProntosPvidaSys</h3>
                        <Nav className="flex-column">
                            <hr />
                            <Nav.Link href="#home" className="text-white"><strong>EXAMES</strong></Nav.Link>
                        </Nav>
                    </Col>
                    
                    <Col md={9} lg={10} className="p-4">
                        <h1 className="mb-5">GERENCIAR EXAMES</h1>
                        
                        <InputGroup className="mb-3">
                            <Form.Control
                                placeholder="Filtrar exames por paciente, data, tipo ou status..."
                                value={filtro}
                                onChange={(e) => setFiltro(e.target.value)}
                            />
                            <Button variant="outline-primary" onClick={handleBuscar}>
                                <BsSearch /> Buscar
                            </Button>
                        </InputGroup>
                        
                        <div className="d-flex justify-content mb-3">
                            <Button variant="primary" onClick={() => setModalShow(true)}>
                                + Cadastrar Novo Exame
                            </Button>
                        </div>
                        
                        <Dados 
                            exames={exames} 
                            loading={loading} 
                            ExcluirExame={handleExcluirExame}
                            Cadastro={handleCadastroExame}
                        />

                        <ModalCadastrar
                            show={modalShow}
                            onHide={() => setModalShow(false)}
                            Cadastro={handleCadastroExame} 
                        />
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default App;