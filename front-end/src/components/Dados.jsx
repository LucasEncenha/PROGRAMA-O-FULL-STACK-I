import { Table, Modal, Button, Spinner, Alert } from "react-bootstrap";
import { BsPencilSquare, BsTrash } from "react-icons/bs";
import { useState } from "react";
import ModalEditar from "./ModalEditar.jsx";

function Dados({ exames, loading, ExcluirExame, Cadastro }) {
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

    const formatarData = (dataExame) => {
        if (!dataExame) return '';
        const data = new Date(dataExame);
        return data.toLocaleDateString('pt-BR', {
            timeZone: 'UTC'
        });
    };

    const atualizar = (dataExame) => {
        setEditandoExame(dataExame);
        setModalShowEditar(true);
    }

    const handleEditarExame = () => {
        setModalShowEditar(false);
        Cadastro();
    }

    const renderCorpoTabela = () => {
        if (loading) {
            return (
                <tr>
                    <td colSpan="6" className="text-center">
                        <Spinner animation="border" variant="primary" />
                        <span className="ms-2">Carregando...</span>
                    </td>
                </tr>
            );
        }

        if (!exames) {
            return (
                <tr>
                    <td colSpan="6">
                        <Alert variant="info" className="m-0">
                            Nenhum exame encontrado. Tente limpar os filtros ou cadastre um novo.
                        </Alert>
                    </td>
                </tr>
            );
        }

        return exames.map(exame => (
            <tr key={exame.ex_id}>
                <td>{exame.ex_paciente}</td>
                <td>{formatarData(exame.ex_data)}</td>
                <td>{exame.ex_tipo}</td>
                <td>{exame.ex_status}</td>
                <td>
                    <Button variant="warning" onClick={() => atualizar(exame)}>
                        <BsPencilSquare/>
                    </Button>
                    <Button 
                        className="m-1" 
                        variant="danger"
                        onClick={() => confirmarExclusao(exame)}
                    >
                        <BsTrash />
                    </Button>
                </td>
            </tr>
        ));
    };


    return (
        <>
            <Table responsive="lg" striped bordered hover>
                <thead>
                    <tr>
                        <th>Paciente</th>
                        <th>Data</th>
                        <th>Tipo de Exame</th>
                        <th>Status</th>
                        <th>Ações</th>
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
                            Tem certeza que deseja excluir o exame:<br/>
                            Paciente: <strong>{exameExcluir.ex_paciente}</strong><br/>
                            Data: <strong>{formatarData(exameExcluir.ex_data)}</strong><br/>
                            Tipo: <strong>{exameExcluir.ex_tipo}</strong><br/>
                            Status: <strong>{exameExcluir.ex_status}</strong>
                        </p>
                    )}
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Cancelar
                    </Button>
                    <Button variant="danger" onClick={excluirExame}>
                        Confirmar Exclusão
                    </Button>
                </Modal.Footer>
            </Modal>


            <ModalEditar
                show={modalShowEditar}
                onHide={() => setModalShowEditar(false)}
                editandoExame={editandoExame}
                Cadastro={handleEditarExame}
            />
        </>
    )
}

export default Dados;