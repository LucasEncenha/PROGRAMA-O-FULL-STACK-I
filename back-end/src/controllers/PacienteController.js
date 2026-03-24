import PacienteModel from "../Models/PacienteModel.js";

class PacienteController {
    static async listar(req, res) {
        try {
            const { termo } = req.query;
            let pacientes;

            if (termo) {
                pacientes = await PacienteModel.filtrar(termo);
            } else {
                pacientes = await PacienteModel.listarPacientes();
            }

            res.json(pacientes);

        } catch (error) {
            console.error('Erro ao listar pacientes: ', error);
            res.status(500).json({ error: 'Erro ao listar pacientes' });
        }
    }

    static async criar(req, res) {
        try {
            const { pa_cpf, pa_nome, pa_data_nascimento, pa_telefone, pa_endereco } = req.body;

            if (!pa_cpf || !pa_nome || !pa_data_nascimento || !pa_telefone || !pa_endereco) {
                return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
            }

            const pacienteExistente = await PacienteModel.buscarPorCPF(pa_cpf);
            if (pacienteExistente.length > 0) {
                return res.status(400).json({ error: 'CPF já cadastrado!', dados: pacienteExistente });
            }

            const paciente = await PacienteModel.criar({ pa_cpf, pa_nome, pa_data_nascimento, pa_telefone, pa_endereco });
            res.status(201).json(paciente);

        } catch (error) {
            console.error("Erro ao criar paciente: ", error);
            res.status(500).json({ error: "Erro ao criar paciente" });
        }
    }

    static async atualizar(req, res) {
        try {
            const { id } = req.params;
            const { pa_cpf, pa_nome, pa_data_nascimento, pa_telefone, pa_endereco } = req.body;

            if (!pa_cpf || !pa_nome || !pa_data_nascimento || !pa_telefone || !pa_endereco) {
                return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
            }

            const paciente = await PacienteModel.atualizar(id, { pa_cpf, pa_nome, pa_data_nascimento, pa_telefone, pa_endereco });

            if (!paciente) {
                return res.status(404).json({ error: 'Paciente não encontrado' });
            }

            res.json(paciente);

        } catch (error) {
            console.error("Erro ao atualizar paciente: ", error);
            res.status(500).json({ error: "Erro ao atualizar paciente" });
        }
    }

    static async excluir(req, res) {
        try {
            const { id } = req.params;
            const sucesso = await PacienteModel.excluir(id);

            if (!sucesso) {
                return res.status(404).json({ error: 'Paciente não encontrado' });
            }

            res.json({ message: 'Paciente excluído com sucesso' });

        } catch (error) {
            console.error("Erro ao excluir paciente: ", error);
            res.status(500).json({ error: "Erro ao excluir paciente" });
        }
    }
}

export default PacienteController;