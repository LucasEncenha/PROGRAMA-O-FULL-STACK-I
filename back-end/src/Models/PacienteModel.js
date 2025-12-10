import pool from "../config/database.js";

class PacienteModel {
    static async listarPacientes() {
        const [rows] = await pool.query('SELECT * FROM pacientes');
        return rows;
    }

    static async buscarPorCPF(pa_cpf) {
        const [rows] = await pool.query('SELECT * FROM pacientes WHERE pa_cpf = ?', [pa_cpf]);
        return rows;
    }

    static async criar(paciente) {
        const {pa_cpf, pa_nome, pa_data_nascimento, pa_contato, pa_info_emergencia} = paciente;

        const [result] = await pool.query(
            "INSERT INTO pacientes (pa_cpf, pa_nome, pa_data_nascimento, pa_contato, pa_info_emergencia) VALUES (?,?,?,?,?)",
            [pa_cpf, pa_nome, pa_data_nascimento, pa_contato, pa_info_emergencia]
        );

        return { id: result.insertId, pa_cpf, pa_nome, pa_data_nascimento, pa_contato, pa_info_emergencia };
    }

    static async atualizar(id, paciente) {
        const {pa_cpf, pa_nome, pa_data_nascimento, pa_contato, pa_info_emergencia} = paciente;
        
        const [result] = await pool.query("UPDATE pacientes SET pa_cpf = ?, pa_nome = ?, pa_data_nascimento = ?, pa_contato = ?, pa_info_emergencia = ? WHERE pa_id = ?", [pa_cpf, pa_nome, pa_data_nascimento, pa_contato, pa_info_emergencia, id]);

        if(result.affectedRows === 0){
            return null;
        }

        return {id: id, pa_cpf, pa_nome, pa_data_nascimento, pa_contato, pa_info_emergencia};
    }

    static async excluir(id) {
        const [result] = await pool.query("DELETE FROM pacientes WHERE pa_id = ?", [id]);

        return result.affectedRows > 0;
    }


    static async filtrar(termo) { 
        const termoBusca = `%${termo}%`;
        const [rows] = await pool.query(
            'SELECT * FROM pacientes WHERE pa_cpf LIKE ? OR pa_nome LIKE ? OR pa_data_nascimento LIKE ? OR pa_contato LIKE ? OR pa_info_emergencia LIKE ? ORDER BY pa_id DESC',
            [termoBusca, termoBusca, termoBusca, termoBusca, termoBusca]
        );

        return rows;
    }
}

export default PacienteModel;