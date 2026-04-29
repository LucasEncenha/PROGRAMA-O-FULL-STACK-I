import { useState, useEffect } from "react";
import { Modal, Button, Row, Form, Col, Alert } from "react-bootstrap";
import ExameService from "../../services/ExameService.js";
import PacienteService from "../../services/PacienteService.js";
import TipoExameService from "../../services/TipoExameService.js";

function ModalCadastrar({ show, onHide, Cadastro }) {
    const [mensagem, setMensagem] = useState({ tipo: '', texto: '' });
    const [erros, setErros] = useState({});
    const [pacientes, setPacientes] = useState([]);
    const [tiposExames, setTiposExames] = useState([]);

    const [formExame, setFormExame] = useState({
        ex_paciente_id: '',
        ex_tipo_exame_id: '',
        ex_data: ''
    });

    useEffect(() => {
        if (show) {
            PacienteService.listarTodos().then(setPacientes).catch(() => setPacientes([]));
            TipoExameService.listarTodos().then(setTiposExames).catch(() => setTiposExames([]));
        }
    }, [show]);

    const validarFormulario = () => {
        const novosErros = {};
        if (!formExame.ex_paciente_id) novosErros.ex_paciente_id = 'Selecione o paciente.';
        if (!formExame.ex_tipo_exame_id) novosErros.ex_tipo_exame_id = 'Selecione o tipo de exame.';
        if (!formExame.ex_data) novosErros.ex_data = 'Informe a data do exame.';
        setErros(novosErros);
        return Object.keys(novosErros).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormExame(prev => ({ ...prev, [name]: value }));
        if (erros[name]) setErros(prev => ({ ...prev, [name]: null }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMensagem({ tipo: '', texto: '' });

        if (!validarFormulario()) {
            setMensagem({ tipo: 'danger', texto: 'Preencha todos os campos obrigatórios.' });
            return;
        }

        try {
            await ExameService.salvar(formExame);
            setFormExame({ ex_paciente_id: '', ex_tipo_exame_id: '', ex_data: '' });
            setErros({});
            setMensagem({ tipo: 'success', texto: 'Exame cadastrado com sucesso!' });
            if (Cadastro) Cadastro();
        } catch (error) {
            setMensagem({ tipo: 'danger', texto: 'Erro ao salvar exame. Tente novamente.' });
        }
    };

    const handleClose = () => {
        setMensagem({ tipo: '', texto: '' });
        setErros({});
        setFormExame({ ex_paciente_id: '', ex_tipo_exame_id: '', ex_data: '' });
        onHide();
    };

    return (
        <Modal show={show} onHide={handleClose} size="lg" centered>
            <Form onSubmit={handleSubmit} noValidate>
                <Modal.Header closeButton>
                    <Modal.Title>CADASTRO DE EXAME</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    {mensagem.texto && (
                        <Alert variant={mensagem.tipo}>{mensagem.texto}</Alert>
                    )}

                    <Row>
                        <Col md={6} className="mb-3">
                            <Form.Group>
                                <Form.Label>Paciente *</Form.Label>
                                <Form.Select
                                    name="ex_paciente_id"
                                    value={formExame.ex_paciente_id}
                                    onChange={handleChange}
                                    isInvalid={!!erros.ex_paciente_id}
                                >
                                    <option value="">Selecione o paciente...</option>
                                    {pacientes.map(p => (
                                        <option key={p.pa_id} value={p.pa_id}>
                                            {p.pa_nome} — {p.pa_cpf}
                                        </option>
                                    ))}
                                </Form.Select>
                                <Form.Control.Feedback type="invalid">{erros.ex_paciente_id}</Form.Control.Feedback>
                            </Form.Group>
                        </Col>

                        <Col md={6} className="mb-3">
                            <Form.Group>
                                <Form.Label>Tipo de Exame *</Form.Label>
                                <Form.Select
                                    name="ex_tipo_exame_id"
                                    value={formExame.ex_tipo_exame_id}
                                    onChange={handleChange}
                                    isInvalid={!!erros.ex_tipo_exame_id}
                                >
                                    <option value="">Selecione o tipo de exame...</option>
                                    {tiposExames.map(t => (
                                        <option key={t.te_id} value={t.te_id}>
                                            {t.te_nome}
                                        </option>
                                    ))}
                                </Form.Select>
                                <Form.Control.Feedback type="invalid">{erros.ex_tipo_exame_id}</Form.Control.Feedback>
                            </Form.Group>
                        </Col>

                        <Col md={6} className="mb-3">
                            <Form.Group>
                                <Form.Label>Data do Exame *</Form.Label>
                                <Form.Control
                                    type="date"
                                    name="ex_data"
                                    value={formExame.ex_data}
                                    onChange={handleChange}
                                    isInvalid={!!erros.ex_data}
                                />
                                <Form.Control.Feedback type="invalid">{erros.ex_data}</Form.Control.Feedback>
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