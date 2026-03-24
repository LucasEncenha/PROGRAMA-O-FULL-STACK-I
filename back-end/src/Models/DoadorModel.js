import pool from "../config/database.js";

class DoadorModel {
    static async listarDoadores() {
        const [rows] = await pool.query('SELECT * FROM doadores');
        return rows;
    }

    static async criar(doador) {
        const { do_nome, do_email, do_telefone, do_valor_doado, do_data_doacao } = doador;

        const [result] = await pool.query(
            'INSERT INTO doadores (do_nome, do_email, do_telefone, do_valor_doado, do_data_doacao) VALUES (?,?,?,?,?)',
            [do_nome, do_email, do_telefone, do_valor_doado, do_data_doacao]
        );

        return { do_id: result.insertId, do_nome, do_email, do_telefone, do_valor_doado, do_data_doacao };
    }

    static async atualizar(id, doador) {
        const { do_nome, do_email, do_telefone, do_valor_doado, do_data_doacao } = doador;

        const [result] = await pool.query(
            'UPDATE doadores SET do_nome = ?, do_email = ?, do_telefone = ?, do_valor_doado = ?, do_data_doacao = ? WHERE do_id = ?',
            [do_nome, do_email, do_telefone, do_valor_doado, do_data_doacao, id]
        );

        if (result.affectedRows === 0) return null;

        return { do_id: id, do_nome, do_email, do_telefone, do_valor_doado, do_data_doacao };
    }

    static async excluir(id) {
        const [result] = await pool.query('DELETE FROM doadores WHERE do_id = ?', [id]);
        return result.affectedRows > 0;
    }

    static async filtrar(termo) {
        const termoBusca = `%${termo}%`;
        const [rows] = await pool.query(
            'SELECT * FROM doadores WHERE do_nome LIKE ? OR do_email LIKE ? OR do_telefone LIKE ? ORDER BY do_id DESC',
            [termoBusca, termoBusca, termoBusca]
        );
        return rows;
    }
}

export default DoadorModel;