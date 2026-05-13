import ConsultaModel from "../Models/ConsultaModel.js";

class ConsultaController {
    static async listar(req, res) {
        try {
            const { termo } = req.query;
            const consultas = termo
                ? await ConsultaModel.filtrar(termo)
                : await ConsultaModel.listarConsultas();
            res.json(consultas);
        } catch (error) {
            console.error('Erro ao listar consultas:', error);
            res.status(500).json({ error: 'Erro ao listar consultas' });
        }
    }

    static async buscarPacientePorCPF(req, res) {
        try {
            const { cpf } = req.params;
            const paciente = await ConsultaModel.buscarPorCPF(cpf);
            if (!paciente) return res.status(404).json({ error: 'Paciente não encontrado.' });
            res.json(paciente);
        } catch (error) {
            console.error('Erro ao buscar paciente:', error);
            res.status(500).json({ error: 'Erro ao buscar paciente' });
        }
    }

    static async criar(req, res) {
        try {
            const { con_paciente_id, con_medico_id, con_data, con_hora, con_tipo, con_status, con_observacoes } = req.body;

            if (!con_paciente_id || !con_medico_id || !con_data || !con_hora) {
                return res.status(400).json({ error: 'Paciente, médico, data e hora são obrigatórios.' });
            }

            const disponivel = await ConsultaModel.verificarDisponibilidade(con_medico_id, con_data, con_hora);
            if (!disponivel) {
                return res.status(409).json({ error: 'Horário indisponível para este médico.' });
            }

            const consulta = await ConsultaModel.criar({ con_paciente_id, con_medico_id, con_data, con_hora, con_tipo, con_status, con_observacoes });
            res.status(201).json(consulta);
        } catch (error) {
            console.error('Erro ao criar consulta:', error);
            res.status(500).json({ error: 'Erro ao criar consulta' });
        }
    }

    static async atualizar(req, res) {
        try {
            const { id } = req.params;
            const { con_paciente_id, con_medico_id, con_data, con_hora, con_tipo, con_status, con_observacoes } = req.body;

            if (!con_paciente_id || !con_medico_id || !con_data || !con_hora) {
                return res.status(400).json({ error: 'Paciente, médico, data e hora são obrigatórios.' });
            }

            const disponivel = await ConsultaModel.verificarDisponibilidade(con_medico_id, con_data, con_hora, id);
            if (!disponivel) {
                return res.status(409).json({ error: 'Horário indisponível para este médico.' });
            }

            const consulta = await ConsultaModel.atualizar(id, { con_paciente_id, con_medico_id, con_data, con_hora, con_tipo, con_status, con_observacoes });
            if (!consulta) return res.status(404).json({ error: 'Consulta não encontrada' });
            res.json(consulta);
        } catch (error) {
            console.error('Erro ao atualizar consulta:', error);
            res.status(500).json({ error: 'Erro ao atualizar consulta' });
        }
    }

    static async excluir(req, res) {
        try {
            const { id } = req.params;
            const sucesso = await ConsultaModel.excluir(id);
            if (!sucesso) return res.status(404).json({ error: 'Consulta não encontrada' });
            res.json({ message: 'Consulta excluída com sucesso' });
        } catch (error) {
            console.error('Erro ao excluir consulta:', error);
            res.status(500).json({ error: 'Erro ao excluir consulta' });
        }
    }
}

export default ConsultaController;