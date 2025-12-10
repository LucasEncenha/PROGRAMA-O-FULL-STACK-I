import { useState } from "react";
import { IMaskInput } from "react-imask";
import PacienteService from "../../services/PacienteService.js";
import { Modal, Button, Row, Form, Col, Alert } from "react-bootstrap"; 

function ModalCadastrar({ show, onHide, Cadastro }) {
    const [mensagem, setMensagem] = useState({tipo: '', texto: ''});
    
    const [formPaciente, setFormPaciente] = useState({ 
        pa_cpf: '',
        pa_nome: '',
        pa_data_nascimento: '',
        pa_contato: '',
        pa_info_emergencia: ''
    });

    const [erros, setErros] = useState({});

    const validarFormulario = () => {
        const novosErros = {};
        if (!formPaciente.pa_cpf) novosErros.pa_cpf = 'O CPF do paciente é obrigatório.';
        if (!formPaciente.pa_nome) novosErros.pa_nome = 'O nome é obrigatório.';
        if (!formPaciente.pa_data_nascimento) novosErros.pa_data_nascimento = 'A data de nascimento é obrigatória.';
        if (!formPaciente.pa_contato) novosErros.pa_contato = 'O contato é obrigatório.';
        if (!formPaciente.pa_info_emergencia) novosErros.pa_info_emergencia = 'Info. emergência é obrigatória.';

        setErros(novosErros);
        return Object.keys(novosErros).length === 0; 
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormPaciente(prevState => ({
            ...prevState,
            [name]: value
        }));
        if (erros[name]) {
            setErros(prevErros => ({ ...prevErros, [name]: null }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMensagem({ tipo: '', texto: '' });

        if (!validarFormulario()) {
            setMensagem({ tipo: 'danger', texto: 'Preencha todos os campos obrigatórios.' });
            return;
        }
        
        try {
            await PacienteService.salvar(formPaciente);
            setFormPaciente({ pa_cpf: '', pa_nome: '', pa_data_nascimento: '', pa_contato: '', pa_info_emergencia: '' });
            setErros({});
            setMensagem({ tipo: 'success', texto: 'Paciente cadastrado com sucesso!' });
            if (Cadastro) Cadastro();
        } catch (error) {
            setMensagem({ tipo: 'danger', texto: 'Erro ao salvar paciente.' });
        }
    };

    const handleClose = () => {
        setMensagem({ tipo: '', texto: '' });
        setErros({});
        setFormPaciente({ pa_cpf: '', pa_nome: '', pa_data_nascimento: '', pa_contato: '', pa_info_emergencia: '' });
        onHide();
    } 

    return (
        <Modal show={show} onHide={handleClose} size="lg" centered>
            <Form onSubmit={handleSubmit} noValidate>
                <Modal.Header closeButton>
                    <Modal.Title>CADASTRO DE PACIENTES</Modal.Title>
                </Modal.Header>
                
                <Modal.Body>
                    {mensagem.texto && (
                        <Alert variant={mensagem.tipo}>{mensagem.texto}</Alert>
                    )}
                
                    <Row>
                        <Col md={6} className="mb-3">
                            <Form.Group>
                                <Form.Label>CPF *</Form.Label>
                                <Form.Control
                                    as={IMaskInput}
                                    mask="000.000.000-00"
                                    placeholder="000.000.000-00"
                                    name="pa_cpf"
                                    value={formPaciente.pa_cpf}
                                    onChange={handleChange}
                                    isInvalid={!!erros.pa_cpf}
                                />
                                <Form.Control.Feedback type="invalid">{erros.pa_cpf}</Form.Control.Feedback>
                            </Form.Group>
                        </Col>

                        <Col md={6} className="mb-3">
                            <Form.Group>
                                <Form.Label>Nome do paciente *</Form.Label>
                                <Form.Control
                                    placeholder="Nome completo"
                                    name="pa_nome"
                                    value={formPaciente.pa_nome}
                                    onChange={handleChange}
                                    isInvalid={!!erros.pa_nome}
                                />
                                <Form.Control.Feedback type="invalid">{erros.pa_nome}</Form.Control.Feedback>
                            </Form.Group>
                        </Col>

                        <Col md={6} className="mb-3">
                            <Form.Group>
                                <Form.Label>Data de Nascimento *</Form.Label>
                                <Form.Control
                                    as={IMaskInput}
                                    mask="00/00/0000"
                                    placeholder="DD/MM/AAAA"
                                    name="pa_data_nascimento"
                                    value={formPaciente.pa_data_nascimento}
                                    onChange={handleChange}
                                    isInvalid={!!erros.pa_data_nascimento}
                                />
                                <Form.Control.Feedback type="invalid">{erros.pa_data_nascimento}</Form.Control.Feedback>
                            </Form.Group>
                        </Col>

                        <Col md={6} className="mb-3">
                            <Form.Group>
                                <Form.Label>Contato *</Form.Label>
                                <Form.Control
                                    as={IMaskInput}
                                    mask={[
                                        { mask: '(00) 0000-0000' },
                                        { mask: '(00) 00000-0000' }
                                    ]}
                                    placeholder="(00) 00000-0000"
                                    name="pa_contato"
                                    value={formPaciente.pa_contato}
                                    onChange={handleChange}
                                    isInvalid={!!erros.pa_contato}
                                />
                                <Form.Control.Feedback type="invalid">{erros.pa_contato}</Form.Control.Feedback>
                            </Form.Group>
                        </Col>

                        <Col md={6} className="mb-3">
                            <Form.Group>
                                <Form.Label>Informações de Emergência *</Form.Label>
                                <Form.Control
                                    placeholder="Alergias, plano de saúde..."
                                    name="pa_info_emergencia"
                                    value={formPaciente.pa_info_emergencia}
                                    onChange={handleChange}
                                    isInvalid={!!erros.pa_info_emergencia}
                                />
                                <Form.Control.Feedback type="invalid">{erros.pa_info_emergencia}</Form.Control.Feedback>
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