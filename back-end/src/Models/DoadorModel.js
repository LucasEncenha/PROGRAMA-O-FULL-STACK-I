import pool from "../config/database.js";

class DoadorModel {
    static async listarDoadores() {
        const [rows] = await pool.query('SELECT * FROM doadores');
        return rows;
    }

    static async criar(doador) {
        const {do_nome, do_endereco, do_telefone, do_valor_doado} = doador;

        const [result] = await pool.query(
            "INSERT INTO doadores (do_nome, do_endereco, do_telefone, do_valor_doado) VALUES (?,?,?,?)",
            [do_nome, do_endereco, do_telefone, do_valor_doado]
        );

        return { id: result.insertId, do_nome, do_endereco, do_telefone };
    }

    static async atualizar(id, doador) {
        const {do_nome, do_endereco, do_telefone, do_valor_doado} = doador;
        
        const [result] = await pool.query("UPDATE doadores SET do_nome = ?, do_endereco = ?, do_telefone = ?, do_valor_doado = ? WHERE do_id = ?", [do_nome, do_endereco, do_telefone, do_valor_doado, id]);

        if(result.affectedRows === 0){
            return null;
        }

        return {id: id, do_nome, do_endereco, do_telefone, do_valor_doado};
    }

    static async excluir(id) {
        const [result] = await pool.query("DELETE FROM doadores WHERE do_id = ?", [id]);

        return result.affectedRows > 0;
    }


    static async filtrar(termo) { 
        const termoBusca = `%${termo}%`;
        const [rows] = await pool.query(
            'SELECT * FROM doadores WHERE do_nome LIKE ? OR do_endereco LIKE ? OR do_telefone LIKE ? OR do_valor_doado LIKE ? ORDER BY do_id DESC',
            [termoBusca, termoBusca, termoBusca, termoBusca]
        );

        return rows;
    }
}

export default DoadorModel;