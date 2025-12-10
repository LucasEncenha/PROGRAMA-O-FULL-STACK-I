import { useState, useEffect } from "react";
import TipoExameService from "../../services/TipoExameService.js";
import { Modal, Button, Row, Form, Col, Alert } from "react-bootstrap"; 

function ModalEditar({ show, onHide, editandoTipoExame, Cadastro }) {
    const [mensagem, setMensagem] = useState({tipo: '', texto: ''});    
    const [erros, setErros] = useState({});
    
    const [formTipoExame, setFormTipoExame] = useState({
        te_nome: '',
        te_status: ''
    });

    useEffect(() => {
        console.log(editandoTipoExame);
        if (editandoTipoExame) {
            setFormTipoExame({
                id: editandoTipoExame.te_id,
                te_nome: editandoTipoExame.te_nome || '',
                te_status: editandoTipoExame.te_status || '',
            });
        }
    }, [editandoTipoExame]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormTipoExame(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const validarFormulario = () => {
        const novosErros = {};
        if (!formTipoExame.te_nome) novosErros.tipoExame = 'O tipo de exame é obrigatório.';

        setErros(novosErros);
        return Object.keys(novosErros).length === 0; 
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMensagem({ tipo: '', texto: '' });
        
        if (!validarFormulario()) {
            setMensagem({ tipo: 'danger', texto: 'Há campos que não foram preenchidos.' });
            return;
        }

        try {
            await TipoExameService.salvar(formTipoExame);
            setErros({});
            setMensagem({ tipo: 'success', texto: 'Tipo exame atualizado com sucesso!' });

            if (Cadastro) {
                Cadastro();
            }
            
        } catch (error) {
            setMensagem({ tipo: 'danger', texto: 'Erro ao salvar tipo exame. Tente novamente.' });
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
                        EDITAR DE TIPO DE EXAME
                    </Modal.Title>
                </Modal.Header>
                
                <Modal.Body>
                    {mensagem.texto && (
                        <Alert variant={mensagem.tipo}>
                            {mensagem.texto}
                        </Alert>
                    )}
                
                    {formTipoExame && (
                        <Row>
                            <Col md={6} className="mb-3">
                                <Form.Group>
                                    <Form.Label>Tipo de Exame *</Form.Label>
                                    <Form.Control
                                        placeholder="Digite aqui..."
                                        name="te_nome" 
                                        value={formTipoExame.te_nome} 
                                        onChange={handleChange}
                                        isInvalid={!!erros.paciente}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6} className="mb-3">
                                <Form.Group className="mb-3">
                                    <Form.Label>Status do Exame *</Form.Label>
                                    <Form.Select
                                        name="te_status"
                                        value={formTipoExame.te_status}
                                        onChange={handleChange}
                                        isInvalid={!!erros.status}
                                    >
                                        <option value="">Selecione uma opção...</option>
                                        <option value="1">Ativo</option>
                                        <option value="0">Inativo</option>
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                        </Row>
                    )}
                </Modal.Body>
                
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>FECHAR</Button>
                    <Button type="submit" variant="success">EDITAR</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
}

export default ModalEditar;