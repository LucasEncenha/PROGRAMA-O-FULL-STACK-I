import { Table, Modal, Button, Alert } from "react-bootstrap";
import { BsPencilSquare, BsTrash } from "react-icons/bs";
import { useState } from "react";
import ModalEditar from "./ModalEditar.jsx";

function Dados({ exames, ExcluirExame, Cadastro }) {
    const [modalShow, setShowModal] = useState(false);
    const [modalShowEditar, setModalShowEditar] = useState(false);
    const [exameExcluir, setExameExcluir] = useState(null);
    const [editandoExame, setEditandoExame] = useState(null);

    const confirmarExclusao = (exame) => {
        setExameExcluir(exame);
        setShowModal(true);
    };

    const excluirExame = async () => {
        if (!exameExcluir) return;
        try {
            await ExcluirExame(exameExcluir.ex_id);
        } catch (error) {
            console.error("Erro ao excluir exame:", error);
            alert("Não foi possível excluir o exame.");
        } finally {
            setShowModal(false);
            setExameExcluir(null);
        }
    };

    const atualizar = (exame) => {
        setEditandoExame(exame);
        setModalShowEditar(true);
    };

    const handleEditarExame = () => {
        setModalShowEditar(false);
        Cadastro();
    };

    const formatarData = (data) => {
        if (!data) return '—';
        return new Date(data).toLocaleDateString('pt-BR', { timeZone: 'UTC' });
    };

    const renderCorpoTabela = () => {
        if (!exames || exames.length === 0) {
            return (
                <tr>
                    <td colSpan="4">
                        <Alert variant="info" className="m-0">
                            Nenhum exame encontrado. Cadastre um novo.
                        </Alert>
                    </td>
                </tr>
            );
        }

        return exames.map(exame => (
            <tr key={exame.ex_id}>
                <td className="fw-semibold">{exame.pa_nome}</td>
                <td>{exame.pa_cpf}</td>
                <td>{exame.te_nome}</td>
                <td>{formatarData(exame.ex_data)}</td>
                <td style={{ width: '120px' }}>
                    <Button size="sm" variant="warning" className="me-1" onClick={() => atualizar(exame)}>
                        <BsPencilSquare />
                    </Button>
                    <Button size="sm" variant="danger" onClick={() => confirmarExclusao(exame)}>
                        <BsTrash />
                    </Button>
                </td>
            </tr>
        ));
    };

    return (
        <>
            <Table responsive="lg" hover className="mb-0">
                <thead style={{ background: '#f8f9fa', borderBottom: '2px solid #dee2e6' }}>
                    <tr>
                        <th style={{ fontWeight: 600, color: '#495057' }}>Paciente</th>
                        <th style={{ fontWeight: 600, color: '#495057' }}>CPF</th>
                        <th style={{ fontWeight: 600, color: '#495057' }}>Tipo de Exame</th>
                        <th style={{ fontWeight: 600, color: '#495057' }}>Data</th>
                        <th style={{ fontWeight: 600, color: '#495057' }}>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {renderCorpoTabela()}
                </tbody>
            </Table>

            <Modal show={modalShow} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>⚠️ Confirmar Exclusão</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {exameExcluir && (
                        <p>
                            Tem certeza que deseja excluir o exame:<br />
                            Paciente: <strong>{exameExcluir.pa_nome}</strong><br />
                            Tipo: <strong>{exameExcluir.te_nome}</strong><br />
                            Data: <strong>{formatarData(exameExcluir.ex_data)}</strong>
                        </p>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>Cancelar</Button>
                    <Button variant="danger" onClick={excluirExame}>Confirmar Exclusão</Button>
                </Modal.Footer>
            </Modal>

            <ModalEditar
                show={modalShowEditar}
                onHide={() => setModalShowEditar(false)}
                editandoExame={editandoExame}
                Cadastro={handleEditarExame}
            />
        </>
    );
}

export default Dados;