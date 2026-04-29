import ExameModel from "../Models/ExameModel.js";

class ExameController {
    static async listar(req, res) {
        try {
            const { termo } = req.query;
            let exames;

            if (termo) {
                exames = await ExameModel.filtrar(termo);
            } else {
                exames = await ExameModel.listarExames();
            }

            res.json(exames);

        } catch (error) {
            console.error('Erro ao listar exames: ', error);
            res.status(500).json({ error: 'Erro ao listar exames' });
        }
    }

    static async criar(req, res) {
        try {
            const { ex_paciente_id, ex_tipo_exame_id, ex_data } = req.body;

            if (!ex_paciente_id || !ex_tipo_exame_id || !ex_data) {
                return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
            }

            const exame = await ExameModel.criar({ ex_paciente_id, ex_tipo_exame_id, ex_data });
            res.status(201).json(exame);

        } catch (error) {
            console.error("Erro ao criar exame: ", error);
            res.status(500).json({ error: "Erro ao criar exame" });
        }
    }

    static async atualizar(req, res) {
        try {
            const { id } = req.params;
            const { ex_paciente_id, ex_tipo_exame_id, ex_data } = req.body;

            if (!ex_paciente_id || !ex_tipo_exame_id || !ex_data) {
                return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
            }

            const exame = await ExameModel.atualizar(id, { ex_paciente_id, ex_tipo_exame_id, ex_data });

            if (!exame) {
                return res.status(404).json({ error: 'Exame não encontrado' });
            }

            res.json(exame);

        } catch (error) {
            console.error("Erro ao atualizar exame: ", error);
            res.status(500).json({ error: "Erro ao atualizar exame" });
        }
    }

    static async excluir(req, res) {
        try {
            const { id } = req.params;
            const sucesso = await ExameModel.excluir(id);

            if (!sucesso) {
                return res.status(404).json({ error: 'Exame não encontrado' });
            }

            res.json({ message: 'Exame excluído com sucesso' });

        } catch (error) {
            console.error("Erro ao excluir exame: ", error);
            res.status(500).json({ error: "Erro ao excluir exame" });
        }
    }
}

export default ExameController;