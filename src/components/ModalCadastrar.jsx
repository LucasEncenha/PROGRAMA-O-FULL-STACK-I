import { useState } from "react";
import ExameService from "../services/ExameService.js";
import { Modal, Button, Row, Form, Col, Alert } from "react-bootstrap"; 

function ModalCadastrar({ show, onHide, Cadastro }) {
    const [mensagem, setMensagem] = useState({tipo: '', texto: ''});
    
    const [formExame, setFormExame] = useState({ 
        paciente: '',
        data: '',
        tipo: '',
        status: ''
    });

    const [erros, setErros] = useState({});

    const validarFormulario = () => {
        const novosErros = {};
        if (!formExame.paciente) novosErros.paciente = 'O nome do paciente é obrigatório.';
        if (!formExame.data) novosErros.data = 'A data é obrigatória.';
        if (!formExame.tipo) novosErros.tipo = 'O tipo de exame é obrigatório.';
        if (!formExame.status) novosErros.status = 'O status é obrigatório.';

        setErros(novosErros);
        return Object.keys(novosErros).length === 0; 
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormExame(prevState => ({
            ...prevState,
            [name]: value
        }));
        if (erros[name]) {
            setErros(prevErros => ({
                ...prevErros,
                [name]: null
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMensagem({ tipo: '', texto: '' });
        if (!validarFormulario()) {
            setMensagem({ tipo: 'danger', texto: 'Há campos que não foram preenchidos.' });
            return;
        }
        try {
            await ExameService.salvar(formExame);
            setFormExame({ paciente: '', data: '', tipo: '', status: '' });
            setErros({});
            setMensagem({ tipo: 'success', texto: 'Exame cadastrado com sucesso!' });
            if (Cadastro) {
                Cadastro();
            }
        } catch (error) {
            setMensagem({ tipo: 'danger', texto: 'Erro ao salvar exame. Tente novamente.' });
        }
    };

    const handleClose = () => {
        setMensagem({ tipo: '', texto: '' });
        setErros({});
        setFormExame({ paciente: '', data: '', tipo: '', status: '' });
        onHide();
    }

    return (
        <Modal
            show={show} 
            onHide={handleClose}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Form onSubmit={handleSubmit} noValidate>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        CADASTRO DE EXAMES
                    </Modal.Title>
                </Modal.Header>
                
                <Modal.Body>
                    {mensagem.texto && (
                        <Alert variant={mensagem.tipo}>
                            {mensagem.texto}
                        </Alert>
                    )}
                
                    <Row>
                        <Col md={6} className="mb-3">
                            <Form.Group controlId="formPaciente">
                                <Form.Label>Nome do paciente *</Form.Label>
                                <Form.Control
                                    placeholder="Digite aqui..."
                                    name="paciente"
                                    value={formExame.paciente}
                                    onChange={handleChange}
                                    isInvalid={!!erros.paciente}
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6} className="mb-3">
                            <Form.Group controlId="formData">
                                <Form.Label>Data *</Form.Label>
                                <Form.Control
                                    type="date"
                                    name="data"
                                    value={formExame.data}
                                    onChange={handleChange}
                                    isInvalid={!!erros.data}
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6} className="mb-3">
                            <Form.Group controlId="formTipo">
                                <Form.Label>Tipo de Exame *</Form.Label>
                                <Form.Control
                                    placeholder="Ex: Raio-X, Sangue..."
                                    name="tipo"
                                    value={formExame.tipo}
                                    onChange={handleChange}
                                    isInvalid={!!erros.tipo}
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6} className="mb-3">
                            <Form.Group controlId="formStatus">
                                <Form.Label>Status *</Form.Label>
                                <Form.Control
                                    placeholder="Ex: Pendente, Concluído..."
                                    name="status"
                                    value={formExame.status}
                                    onChange={handleChange}
                                    isInvalid={!!erros.status}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                </Modal.Body>
                
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>FECHAR</Button>
                    <Button type="submit" variant="success">CADASTRAR</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
}

export default ModalCadastrar;