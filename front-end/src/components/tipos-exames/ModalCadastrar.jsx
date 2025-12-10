import { useState } from "react";
import TipoExameService from "../../services/TipoExameService.js";
import { Modal, Button, Row, Form, Col, Alert } from "react-bootstrap"; 

function ModalCadastrar({ show, onHide, Cadastro }) {
    const [mensagem, setMensagem] = useState({tipo: '', texto: ''});
    
    const [formTipoExame, setFormTipoExame] = useState({ 
        te_nome: '',
    });


    const [erros, setErros] = useState({});

    const validarFormulario = () => {
        const novosErros = {};
        if (!formTipoExame.te_nome) novosErros.tipoExame = 'O nome do tipo de exame é obrigatório.';

        setErros(novosErros);
        return Object.keys(novosErros).length === 0; 
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormTipoExame(prevState => ({
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
            await TipoExameService.salvar(formTipoExame);
            setFormTipoExame({ te_nome: '' });
            setErros({});
            setMensagem({ tipo: 'success', texto: 'Tipo de exame cadastrado com sucesso!' });
            if (Cadastro) {
                Cadastro();
            }
        } catch (error) {
            setMensagem({ tipo: 'danger', texto: 'Erro ao salvar tipo de exame. Tente novamente.' });
        }
    };

    const handleClose = () => {
        setMensagem({ tipo: '', texto: '' });
        setErros({});
        setFormTipoExame({ te_nome: '' });
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
                        CADASTRO DE TIPOS DE EXAME
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
                            <Form.Group>
                                <Form.Label>Tipo de Exame *</Form.Label>
                                <Form.Control
                                    placeholder="Digite aqui..."
                                    name="te_nome"
                                    value={formTipoExame.te_nome}
                                    onChange={handleChange}
                                    isInvalid={!!erros.tipoExame}
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