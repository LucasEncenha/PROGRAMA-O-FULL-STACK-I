import { useState, useEffect } from "react";
import { IMaskInput } from "react-imask";
import PacienteService from "../../services/PacienteService.js";
import { Modal, Button, Row, Form, Col, Alert } from "react-bootstrap"; 

function ModalEditar({ show, onHide, editandoPaciente, Cadastro }) {
    const [mensagem, setMensagem] = useState({tipo: '', texto: ''});    
    const [erros, setErros] = useState({});
    
    const [formPaciente, setFormPaciente] = useState({
        pa_id: '',
        pa_cpf: '',
        pa_nome: '',
        pa_data_nascimento: '',
        pa_contato: '',
        pa_info_emergencia: ''
    });

    useEffect(() => {
        if (editandoPaciente) {
            setFormPaciente({
                pa_id: editandoPaciente.pa_id,
                pa_nome: editandoPaciente.pa_nome || '',
                pa_cpf: editandoPaciente.pa_cpf || '',
                pa_data_nascimento: editandoPaciente.pa_data_nascimento || '',
                pa_contato: editandoPaciente.pa_contato || '',
                pa_info_emergencia: editandoPaciente.pa_info_emergencia || ''
            });
            setErros({});
            setMensagem({ tipo: '', texto: '' });
        }
    }, [editandoPaciente]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormPaciente(prev => ({
            ...prev,
            [name]: value
        }));
        
        if (erros[name]) {
            setErros(prev => ({
                ...prev,
                [name]: null
            }));
        }
    };

    const validarFormulario = () => {
        const novosErros = {};
        
        if (!formPaciente.pa_cpf) novosErros.pa_cpf = 'O CPF do paciente é obrigatório.';
        if (!formPaciente.pa_nome) novosErros.pa_nome = 'O nome é obrigatório.';
        if (!formPaciente.pa_data_nascimento) novosErros.pa_data_nascimento = 'A data de nascimento é obrigatória.';
        if (!formPaciente.pa_contato) novosErros.pa_contato = 'O contato é obrigatório.';
        if (!formPaciente.pa_info_emergencia) novosErros.pa_info_emergencia = 'Informação de emergência é obrigatória.';

        setErros(novosErros);
        return Object.keys(novosErros).length === 0; 
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
            setErros({});
            setMensagem({ tipo: 'success', texto: 'Paciente atualizado com sucesso!' });

            if (Cadastro) {
                Cadastro();
            }
            
        } catch (error) {
            console.error(error);
            setMensagem({ tipo: 'danger', texto: 'Erro ao atualizar paciente. Tente novamente.' });
        }
    };

    const handleClose = () => {
        setMensagem({ tipo: '', texto: '' });
        setErros({});
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
                        EDITAR PACIENTE
                    </Modal.Title>
                </Modal.Header>
                
                <Modal.Body>
                    {mensagem.texto && (
                        <Alert variant={mensagem.tipo} dismissible onClose={() => setMensagem({tipo:'', texto:''})}>
                            {mensagem.texto}
                        </Alert>
                    )}

                    <Row>
                        <Col md={6} className="mb-3">
                            <Form.Group>
                                <Form.Label>CPF do paciente</Form.Label>
                                <p className="m-1">{formPaciente.pa_cpf}</p>
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
                                <Form.Control.Feedback type="invalid">
                                    {erros.pa_nome}
                                </Form.Control.Feedback>
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
                                <Form.Control.Feedback type="invalid">
                                    {erros.pa_data_nascimento}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>

                        <Col md={6} className="mb-3">
                            <Form.Group>
                                <Form.Label>Contato *</Form.Label>
                                <Form.Control
                                    placeholder="Ex: (11) 99999-9999"
                                    name="pa_contato"
                                    value={formPaciente.pa_contato}
                                    onChange={handleChange}
                                    isInvalid={!!erros.pa_contato}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {erros.pa_contato}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        
                        <Col md={12} className="mb-3">
                            <Form.Group>
                                <Form.Label>Informações de Emergência *</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={2}
                                    placeholder="Ex: Alérgico a Dipirona; Contato de emergência: Mãe (Maria)..."
                                    name="pa_info_emergencia"
                                    value={formPaciente.pa_info_emergencia}
                                    onChange={handleChange}
                                    isInvalid={!!erros.pa_info_emergencia}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {erros.pa_info_emergencia}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>
                </Modal.Body>
                
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>CANCELAR</Button>
                    <Button type="submit" variant="success">SALVAR ALTERAÇÕES</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
}

export default ModalEditar;