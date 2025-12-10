import { Table, Modal, Button, Alert } from "react-bootstrap";
import { BsPencilSquare, BsTrash } from "react-icons/bs";
import { useState } from "react";
import ModalEditar from "./ModalEditar.jsx";

function Dados({ tiposExames, ExcluirTipoExame, Cadastro }) {
    const [modalShow, setShowModal] = useState(false);
    const [modalShowEditar, setModalShowEditar] = useState(false);
    const [tipoExameExcluir, setTipoExameExcluir] = useState(null);
    const [editandoTipoExame, setEditandoTipoExame] = useState(null);

    const confirmarExclusao = (tipoExame) => {
        setTipoExameExcluir(tipoExame);
        setShowModal(true);
    };

    const excluirTipoExame = async () => {
        if (!tipoExameExcluir) return;

        try {
            await ExcluirTipoExame(tipoExameExcluir.te_id); 
        } catch (error) {
            console.error("Erro ao excluir tipo de exame:", error);
            alert("Não foi possível excluir o tipo de exame.");
        } finally {
            setShowModal(false);
            setTipoExameExcluir(null);
        }
    };

    const atualizar = (dataTipoExame) => {
        setEditandoTipoExame(dataTipoExame);
        setModalShowEditar(true);
    }

    const handleEditarTipoExame = () => {
        setModalShowEditar(false);
        Cadastro();
    }

    const renderCorpoTabela = () => {
        if (!tiposExames) {
            return (
                <tr>
                    <td colSpan="6">
                        <Alert variant="info" className="m-0">
                            Nenhum tipo de exame encontrado. Tente limpar os filtros ou cadastre um novo.
                        </Alert>
                    </td>
                </tr> 
            );
        }

        return tiposExames.map(tipoExame => (
            <tr key={tipoExame.te_id}>
                <td>{tipoExame.te_nome}</td>
                <td>{tipoExame.te_status == '1' ? 'Ativo' : 'Inativo'}</td>
                <td>
                    <Button variant="warning" onClick={() => atualizar(tipoExame)}>
                        <BsPencilSquare/>
                    </Button>
                    <Button 
                        className="m-1" 
                        variant="danger"
                        onClick={() => confirmarExclusao(tipoExame)}
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
                        <th>Tipo</th>
                        <th>Status</th>
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
                    {tipoExameExcluir && (
                        <p>
                            Tem certeza que deseja excluir o tipo de exame:<br/>
                            Tipo: <strong>{tipoExameExcluir.te_nome}</strong><br/>
                            Status: <strong>{tipoExameExcluir.te_status}</strong><br />
                        </p>
                    )}
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Cancelar
                    </Button>
                    <Button variant="danger" onClick={excluirTipoExame}>
                        Confirmar Exclusão
                    </Button>
                </Modal.Footer>
            </Modal>

            <ModalEditar
                show={modalShowEditar}
                onHide={() => setModalShowEditar(false)}
                editandoTipoExame={editandoTipoExame}
                Cadastro={handleEditarTipoExame}
            />
        </>
    )
}

export default Dados;