import { Container, Row, Col, Nav } from "react-bootstrap";
import { useState } from "react"; 
import 'bootstrap/dist/css/bootstrap.min.css';

import TelaDoadores from "./components/doadores/Tela.jsx";
import TelaTipoExame from './components/tipos-exames/Tela.jsx';
import TelaPaciente from "./components/pacientes/Tela.jsx";


function App() {
    const [paginaAtual, setPaginaAtual] = useState('pacientes');

    const renderConteudo = () => {
        if (paginaAtual === 'pacientes') {
            return <TelaPaciente/>;
        }
        if (paginaAtual === 'tipo-exame') {
            return<TelaTipoExame />;
        }
        if (paginaAtual === 'doadores') {
            return  <TelaDoadores />;
        }
        return null;
    };

    return (
        <Container fluid>
            <Row>
                <Col md={3} lg={2} className="bg-primary text-white min-vh-100 p-4">
                    <h3 className="mb-4">ProntosPvidaSys</h3>
                    <Nav className="flex-column">
                        <hr />
                        <Nav.Link 
                            onClick={() => setPaginaAtual('pacientes')}
                            className={`mb-2 rounded ${paginaAtual === 'pacientes' ? 'bg-white text-primary fw-bold' : 'text-white'}`}
                            style={{ cursor: 'pointer' }}
                        >
                            PACIENTES
                        </Nav.Link>

                        <Nav.Link 
                            onClick={() => setPaginaAtual('tipo-exame')}
                            className={`mb-2 rounded ${paginaAtual === 'tipo-exame' ? 'bg-white text-primary fw-bold' : 'text-white'}`}
                            style={{ cursor: 'pointer' }}
                        >
                            TIPOS DE EXAME
                        </Nav.Link>

                        <Nav.Link 
                            onClick={() => setPaginaAtual('doadores')}
                            className={`mb-2 rounded ${paginaAtual === 'doadores' ? 'bg-white text-primary fw-bold' : 'text-white'}`}
                            style={{ cursor: 'pointer' }}
                        >
                            DOADORES
                        </Nav.Link>
                    </Nav>
                </Col>
                
                <Col md={9} lg={10} className="p-4">
                    {renderConteudo()}
                </Col>
            </Row>
        </Container>
    );
}

export default App;