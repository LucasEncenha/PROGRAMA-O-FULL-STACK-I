import pool from "../config/database.js";

class ExameModel {
    static async listarExames() {
        const [rows] = await pool.query(`
            SELECT 
                e.ex_id,
                e.ex_data,
                p.pa_id,
                p.pa_nome,
                p.pa_cpf,
                t.te_id,
                t.te_nome
            FROM exames e
            INNER JOIN pacientes p ON e.ex_paciente_id = p.pa_id
            INNER JOIN tipos_exames t ON e.ex_tipo_exame_id = t.te_id
            ORDER BY e.ex_id DESC
        `);
        return rows;
    }

    static async criar(exame) {
        const { ex_paciente_id, ex_tipo_exame_id, ex_data } = exame;

        const [result] = await pool.query(
            'INSERT INTO exames (ex_paciente_id, ex_tipo_exame_id, ex_data) VALUES (?,?,?)',
            [ex_paciente_id, ex_tipo_exame_id, ex_data]
        );

        return { ex_id: result.insertId, ex_paciente_id, ex_tipo_exame_id, ex_data };
    }

    static async atualizar(id, exame) {
        const { ex_paciente_id, ex_tipo_exame_id, ex_data } = exame;

        const [result] = await pool.query(
            'UPDATE exames SET ex_paciente_id = ?, ex_tipo_exame_id = ?, ex_data = ? WHERE ex_id = ?',
            [ex_paciente_id, ex_tipo_exame_id, ex_data, id]
        );

        if (result.affectedRows === 0) return null;

        return { ex_id: id, ex_paciente_id, ex_tipo_exame_id, ex_data };
    }

    static async excluir(id) {
        const [result] = await pool.query('DELETE FROM exames WHERE ex_id = ?', [id]);
        return result.affectedRows > 0;
    }

    static async filtrar(termo) {
        const termoBusca = `%${termo}%`;
        const [rows] = await pool.query(`
            SELECT 
                e.ex_id,
                e.ex_data,
                p.pa_id,
                p.pa_nome,
                p.pa_cpf,
                t.te_id,
                t.te_nome
            FROM exames e
            INNER JOIN pacientes p ON e.ex_paciente_id = p.pa_id
            INNER JOIN tipos_exames t ON e.ex_tipo_exame_id = t.te_id
            WHERE p.pa_nome LIKE ? OR p.pa_cpf LIKE ? OR t.te_nome LIKE ? OR e.ex_data LIKE ?
            ORDER BY e.ex_id DESC
        `, [termoBusca, termoBusca, termoBusca, termoBusca]);
        return rows;
    }
}

export default ExameModel;