import { IMaskInput } from "react-imask";
import { useState, useEffect } from "react";
import DoadorService from "../../services/DoadorService.js";
import { Modal, Button, Row, Form, Col, Alert } from "react-bootstrap"; 

function ModalEditar({ show, onHide, editandoDoador, Cadastro }) {
    const [mensagem, setMensagem] = useState({tipo: '', texto: ''});    
    const [erros, setErros] = useState({});
    
    const [formDoador, setFormDoador] = useState({
        do_nome: '',
        do_endereco: '',
        do_telefone :'',
        do_valor_doado: ''
    });

    useEffect(() => {
        if (editandoDoador) {
            setFormDoador({
                id: editandoDoador.do_id,
                do_nome: editandoDoador.do_nome,
                do_endereco: editandoDoador.do_endereco || '',
                do_telefone: editandoDoador.do_telefone || '',
                do_valor_doado: editandoDoador.do_valor_doado || '',
            });
        }
    }, [editandoDoador]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormDoador(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const validarFormulario = () => {
        const novosErros = {};
        if (!formDoador.do_nome) novosErros.do_nome = 'O nome do doador é obrigatório.';
        if (!formDoador.do_endereco) novosErros.do_endereco = 'O endereço do doador é obrigatório.';
        if (!formDoador.do_telefone) novosErros.do_telefone = 'O telefone do doador é obrigatório.';
        if (!formDoador.do_valor_doado) novosErros.do_valor_doado = 'O valor doado é obrigatório.';

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
            console.log(formDoador)
            await DoadorService.salvar(formDoador);
            setErros({});
            setMensagem({ tipo: 'success', texto: 'Doador atualizado com sucesso!' });

            if (Cadastro) {
                Cadastro();
            }
            
        } catch (error) {
            setMensagem({ tipo: 'danger', texto: 'Erro ao salvar doador. Tente novamente.' });
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
                        EDITAR DOADOR
                    </Modal.Title>
                </Modal.Header>
                
                <Modal.Body>
                    {mensagem.texto && (
                        <Alert variant={mensagem.tipo}>
                            {mensagem.texto}
                        </Alert>
                    )}
                
                    {formDoador && (
                        <Row>
                            <Col md={6} className="mb-3">
                                <Form.Group>
                                    <Form.Label>Nome do doador *</Form.Label>
                                    <Form.Control
                                        placeholder="Digite aqui..."
                                        name="do_nome"
                                        value={formDoador.do_nome}
                                        onChange={handleChange}
                                        isInvalid={!!erros.do_nome}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6} className="mb-3">
                                <Form.Group>
                                    <Form.Label>Endereço *</Form.Label>
                                    <Form.Control
                                        placeholder="Digite aqui..."
                                        name="do_endereco"
                                        value={formDoador.do_endereco}
                                        onChange={handleChange}
                                        isInvalid={!!erros.do_endereco}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6} className="mb-3">
                                <Form.Group>
                                    <Form.Label>Telefone *</Form.Label>
                                    <Form.Control
                                        as={IMaskInput}
                                        mask={[
                                            { mask: '(00) 0000-0000' },
                                            { mask: '(00) 00000-0000' }
                                        ]}
                                        placeholder="(00) 00000-0000"
                                        name="do_telefone"
                                        value={formDoador.do_telefone}
                                        onChange={handleChange}
                                        isInvalid={!!erros.do_telefone}
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6} className="mb-3">
                                <Form.Group>
                                    <Form.Label>Valor Doado *</Form.Label>
                                    <Form.Control
                                        placeholder="Digite aqui..."
                                        type="number"
                                        name="do_valor_doado"
                                        value={formDoador.do_valor_doado}
                                        onChange={handleChange}
                                        isInvalid={!!erros.do_valor_doado}
                                    />
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