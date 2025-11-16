import { Table, Modal, Button, Spinner, Alert } from "react-bootstrap";
import { useState } from "react";

function Dados({ exames, loading, ExcluirExame }) {
    const [modalShow, setShowModal] = useState(false);
    const [exameExcluir, setExameExcluir] = useState(null);

    const confirmarExclusao = (exame) => {
        setExameExcluir(exame);
        setShowModal(true);
    };

    const excluirExame = async () => {
        if (!exameExcluir) return;

        try {
            await ExcluirExame(exameExcluir.id); 
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

        if (exames.length == 0) {
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
            <tr key={exame.id}>
                <td>{exame.paciente}</td>
                <td>{formatarData(exame.data)}</td>
                <td>{exame.tipo}</td>
                <td>{exame.status}</td>
                <td>
                    <Button 
                        className="m-1" 
                        variant="danger" 
                        size="sm"
                        onClick={() => confirmarExclusao(exame)}
                    >
                        EXCLUIR
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
                            Paciente: <strong>{exameExcluir.paciente}</strong><br/>
                            Data: <strong>{formatarData(exameExcluir.data)}</strong><br/>
                            Tipo: <strong>{exameExcluir.tipo}</strong><br/>
                            Status: <strong>{exameExcluir.status}</strong>
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
        </>
    )
}

export default Dados;