import { useState } from "react";
import { Container, Card, Form, Button, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";

export default function RecuperarSenha() {
    const [etapa, setEtapa] = useState('email'); // 'email' | 'nova-senha'
    const [email, setEmail] = useState("");
    const [form, setForm] = useState({ novaSenha: "", confirmarSenha: "" });
    const [erros, setErros] = useState({});
    const [mensagem, setMensagem] = useState("");
    const [erro, setErro] = useState("");
    const [carregando, setCarregando] = useState(false);

    const handleVerificarEmail = async (e) => {
        e.preventDefault();
        setErro("");
        setMensagem("");

        if (!email) {
            setErros({ email: "Informe o e-mail." });
            return;
        }

        setCarregando(true);
        try {
            await axios.post('http://localhost:3000/auth/verificar-email', { email }, { withCredentials: true });
            setEtapa('nova-senha');
            setErros({});
        } catch (error) {
            setErro(error.response?.data?.erro || "E-mail não encontrado.");
        } finally {
            setCarregando(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
        if (erros[name]) setErros(prev => ({ ...prev, [name]: null }));
    };

    const handleRedefinirSenha = async (e) => {
        e.preventDefault();
        setErro("");
        setMensagem("");

        const novosErros = {};
        if (!form.novaSenha || form.novaSenha.length < 6) novosErros.novaSenha = "A senha deve ter pelo menos 6 caracteres.";
        if (form.novaSenha !== form.confirmarSenha) novosErros.confirmarSenha = "As senhas não coincidem.";

        if (Object.keys(novosErros).length > 0) {
            setErros(novosErros);
            return;
        }

        setCarregando(true);
        try {
            await axios.post('http://localhost:3000/auth/redefinir-senha', { email, novaSenha: form.novaSenha }, { withCredentials: true });
            setMensagem("Senha redefinida com sucesso!");
            setEtapa('email');
            setEmail("");
            setForm({ novaSenha: "", confirmarSenha: "" });
        } catch (error) {
            setErro(error.response?.data?.erro || "Erro ao redefinir senha.");
        } finally {
            setCarregando(false);
        }
    };

    return (
        <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
            <Card className="shadow p-4" style={{ width: "100%", maxWidth: "400px" }}>
                <Card.Body>
                    <h2 className="text-center mb-4 fw-bold text-primary">
                        Recuperar Senha
                    </h2>

                    {mensagem && <Alert variant="success">{mensagem}</Alert>}
                    {erro && <Alert variant="danger">{erro}</Alert>}

                    {etapa === 'email' && (
                        <Form onSubmit={handleVerificarEmail} noValidate>
                            <p className="text-muted mb-4">
                                Informe seu e-mail cadastrado para redefinir sua senha.
                            </p>

                            <Form.Group className="mb-4">
                                <Form.Label>E-mail</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="exemplo@email.com"
                                    value={email}
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                        if (erros.email) setErros({});
                                    }}
                                    isInvalid={!!erros.email}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {erros.email}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Button type="submit" variant="primary" disabled={carregando} style={{ width: '100%' }}>
                                {carregando ? 'Verificando...' : 'Continuar'}
                            </Button>

                            <div className="text-center mt-3">
                                <Link to="/login" className="text-decoration-none text-secondary">
                                    Voltar para o Login
                                </Link>
                            </div>
                        </Form>
                    )}

                    {etapa === 'nova-senha' && (
                        <Form onSubmit={handleRedefinirSenha} noValidate>
                            <p className="text-muted mb-4">
                                E-mail encontrado. Defina sua nova senha abaixo.
                            </p>

                            <Form.Group className="mb-3">
                                <Form.Label>Nova Senha *</Form.Label>
                                <Form.Control
                                    type="password"
                                    name="novaSenha"
                                    value={form.novaSenha}
                                    onChange={handleChange}
                                    isInvalid={!!erros.novaSenha}
                                    placeholder="Mínimo 6 caracteres"
                                />
                                <Form.Control.Feedback type="invalid">
                                    {erros.novaSenha}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group className="mb-4">
                                <Form.Label>Confirmar Nova Senha *</Form.Label>
                                <Form.Control
                                    type="password"
                                    name="confirmarSenha"
                                    value={form.confirmarSenha}
                                    onChange={handleChange}
                                    isInvalid={!!erros.confirmarSenha}
                                    placeholder="Repita a nova senha"
                                />
                                <Form.Control.Feedback type="invalid">
                                    {erros.confirmarSenha}
                                </Form.Control.Feedback>
                            </Form.Group>

                            <Button type="submit" variant="success" disabled={carregando} style={{ width: '100%' }}>
                                {carregando ? 'Salvando...' : 'Redefinir Senha'}
                            </Button>

                            <div className="text-center mt-3">
                                <span
                                    className="text-secondary"
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => { setEtapa('email'); setErro(''); setMensagem(''); }}
                                >
                                    Voltar
                                </span>
                            </div>
                        </Form>
                    )}
                </Card.Body>
            </Card>
        </Container>
    );
}