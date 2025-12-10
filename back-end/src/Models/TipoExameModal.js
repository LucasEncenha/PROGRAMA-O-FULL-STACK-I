import pool from "../config/database.js";

class TipoExameModel {
    static async listarTiposExames() {
        const [rows] = await pool.query('SELECT * FROM tipos_exames');
        return rows;
    }

    static async criar(tipoExame) {
        const {te_nome} = tipoExame;

        const [result] = await pool.query(
            "INSERT INTO tipos_exames (te_nome) VALUES (?)",
            [te_nome]
        );

        return { id: result.insertId, te_nome };
    }

    static async atualizar(id, tipoExame) {
        const {te_nome, te_status} = tipoExame;
        
        const [result] = await pool.query("UPDATE tipos_exames SET te_nome = ?, te_status = ? WHERE te_id = ?", [te_nome, te_status, id]);

        if(result.affectedRows === 0){
            return null;
        }

        return {id: id, te_nome, te_status};
    }

    static async excluir(id) {
        const [result] = await pool.query("DELETE FROM tipos_exames WHERE te_id = ?", [id]);

        return result.affectedRows > 0;
    }


    static async filtrar(filtro) {
        console.log(filtro);
        let query;

        if(filtro['nome'] != '' && filtro['status'] != '') {
            query = `SELECT * FROM tipos_exames WHERE te_nome LIKE '%${filtro['nome']}%' AND te_status = ${filtro['status']} ORDER BY te_id DESC`;
        }
        if(filtro['nome'] == '' && filtro['status'] != '') {
            query = `SELECT * FROM tipos_exames WHERE te_status = ${filtro['status']} ORDER BY te_id DESC`;
        }
        if(filtro['nome'] != '' && filtro['status'] == '') {
            query = `SELECT * FROM tipos_exames WHERE te_nome LIKE '%${filtro['nome']}%' ORDER BY te_id DESC`;
        }

        const [rows] = await pool.query(query);

        return rows;
    }
}

export default TipoExameModel;