import pool from "../config/database.js";

class ExameModel {
    static async listarExames() {
        const [rows] = await pool.query('SELECT * FROM exames');
        return rows;
    }

    static async buscarPorId(id) {
        const [rows] = await pool.query('SELECT * FROM exames WHERE ex_id = ?', [id]);
        return rows;
    }

    static async criar(exame) {
        const {ex_paciente, ex_data, ex_tipo, ex_status} = exame;

        const [result] = await pool.query(
            "INSERT INTO exames (ex_paciente, ex_data, ex_tipo, ex_status) VALUES (?,?,?,?)",
            [ex_paciente, ex_data, ex_tipo, ex_status]
        );

        return { id: result.insertId, ex_paciente, ex_data, ex_tipo, ex_status };
    }

    static async atualizar(id, exame) {
        const {ex_paciente, ex_data, ex_tipo, ex_status} = exame;
        
        const [result] = await pool.query("UPDATE exames SET ex_paciente = ?, ex_data = ?, ex_tipo = ?, ex_status = ? WHERE ex_id = ?", [ex_paciente, ex_data, ex_tipo, ex_status, id]);

        if(result.affectedRows === 0){
            return null;
        }

        return {id: result.insertId, ex_paciente, ex_data, ex_tipo, ex_status};
    }

    static async excluir(id) {
        const [result] = await pool.query("DELETE FROM exames WHERE ex_id = ?", [id]);

        return result.affectedRows > 0;
    }


    static async filtrar(termo) { 
        const termoBusca = `%${termo}%`;
        const [rows] = await pool.query('SELECT * FROM exames WHERE ex_paciente LIKE ? OR ex_data LIKE ? OR ex_tipo LIKE ? OR ex_status LIKE ? ORDER BY ex_id DESC', [termoBusca, termoBusca, termoBusca, termoBusca]);

        console.log('passei aqui')
        console.log(rows);

        return rows;
    }
}

export default ExameModel;