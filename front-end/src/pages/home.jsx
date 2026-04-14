import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { Container, Row, Col, Card } from "react-bootstrap";
import DoadorService from "../services/DoadorService.js";
import PacienteService from "../services/PacienteService.js";
import TipoExameService from "../services/TipoExameService.js";

export default function Home() {
    const { usuario } = useAuth();
    const navigate = useNavigate();

    const [stats, setStats] = useState({
        pacientes: '--',
        doadores: '--',
        tiposExame: '--',
    });

    useEffect(() => {
        async function carregarStats() {
            try {
                const [pacientes, doadores, tiposExame] = await Promise.allSettled([
                    PacienteService.listarTodos(),
                    DoadorService.listarTodos(),
                    TipoExameService.listarTodos(),
                ]);

                setStats({
                    pacientes: pacientes.status === 'fulfilled' ? pacientes.value.length : '--',
                    doadores: doadores.status === 'fulfilled' ? doadores.value.length : '--',
                    tiposExame: tiposExame.status === 'fulfilled' ? tiposExame.value.length : '--',
                });
            } catch (_) {}
        }
        carregarStats();
    }, []);

    const saudacao = () => {
        const h = new Date().getHours();
        if (h < 12) return 'Bom dia';
        if (h < 18) return 'Boa tarde';
        return 'Boa noite';
    };


    const atalhos = [
        {
            label: 'Pacientes',
            descricao: 'Cadastrar e gerenciar pacientes',
            path: '/pacientes',
            icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
                </svg>
            ),
        },
        {
            label: 'Tipos de Exame',
            descricao: 'Gerencie os tipos de exame',
            path: '/exames',
            icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 1-2-2V9m0 0h18"/>
                </svg>
            ),
        },
        {
            label: 'Doadores',
            descricao: 'Registros e histórico de doações',
            path: '/doadores',
            icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                </svg>
            ),
        },
    ];

    return (
        <Container className="py-4">
            <div className="d-flex justify-content-between align-items-center mb-5">
                <div>
                    <p className="text-muted mb-0 fs-5">{saudacao()},</p>
                    <h1 className="fw-bold mb-0">{usuario.nome}.</h1>
                </div>
            </div>

            <Row className="mb-5 g-3">
                <Col md={4}>
                    <Card className="text-center shadow-sm border-0 bg-light">
                        <Card.Body>
                            <Card.Title className="text-muted">Pacientes</Card.Title>
                            <Card.Text className="fs-2 fw-bold text-primary">{stats.pacientes}</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card className="text-center shadow-sm border-0 bg-light">
                        <Card.Body>
                            <Card.Title className="text-muted">Doadores</Card.Title>
                            <Card.Text className="fs-2 fw-bold text-primary">{stats.doadores}</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card className="text-center shadow-sm border-0 bg-light">
                        <Card.Body>
                            <Card.Title className="text-muted">Tipos de Exame</Card.Title>
                            <Card.Text className="fs-2 fw-bold text-primary">{stats.tiposExame}</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <h2 className="mb-4 text-secondary">Acesso rápido</h2>

            <Row className="g-3">
                {atalhos.map(({ label, descricao, path, icon }) => (
                    <Col md={4} key={path}>
                        <Card 
                            className="h-100 shadow-sm border-primary" 
                            style={{ cursor: 'pointer', transition: '0.2s' }}
                            onClick={() => navigate(path)}
                            onMouseOver={(e) => e.currentTarget.classList.add('bg-primary', 'text-white')}
                            onMouseOut={(e) => e.currentTarget.classList.remove('bg-primary', 'text-white')}
                        >
                            <Card.Body className="d-flex align-items-center">
                                <div className="me-3">
                                    {icon}
                                </div>
                                <div>
                                    <h5 className="mb-1 fw-bold">{label}</h5>
                                    <p className="mb-0 small opacity-75">{descricao}</p>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
}