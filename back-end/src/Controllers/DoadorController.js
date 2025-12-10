import DoadorModel from "../Models/DoadorModel.js";

class DoadorController{
    static async listar(req, res) { 
        try {
            const {termo} = req.query;
            let doadores;

            if(termo) {
                doadores = await DoadorModel.filtrar(termo);
            } else {
                doadores = await DoadorModel.listarDoadores();
            }

            res.json(doadores);

        } catch (error) {
            console.log('Erro ao listar doadores: ', error);
            res.status(500).json({ error: 'Erro ao listar doadores' });
        }
    }

    static async criar(req, res) {
        try {
            const {do_nome, do_endereco, do_telefone, do_valor_doado} = req.body;
            if(!do_nome || !do_endereco || !do_telefone || !do_valor_doado) {
                return res.status(400).json({error: 'Todos os campos são obrigatorios'});
            }

            const doador = await DoadorModel.criar({do_nome, do_endereco, do_telefone, do_valor_doado});
            res.status(201).json(doador);

        } catch (error) {
            console.error("Erro ao criar doador: ", error);
            res.status(500).json({error: "Erro ao criar doador"});
        }
    }

    static async atualizar(req, res) {
        try {
            const {id} = req.params;
            const {do_nome, do_endereco, do_telefone, do_valor_doado} = req.body;
            if(!do_nome || !do_endereco || !do_telefone || !do_valor_doado) {
                return res.status(400).json({error: 'Todos os campos são obrigatorios'});
            }

            const doador = await DoadorModel.atualizar(id,{do_nome, do_endereco, do_telefone, do_valor_doado});
            res.status(201).json(doador);

        } catch (error) {
            console.error("Erro ao atualizar doador: ", error);
            res.status(500).json({error: "Erro ao atualizar doador"});
        }
    }

    static async excluir(req, res) {
        try {
            const {id} = req.params;
            const sucesso = await DoadorModel.excluir(id);

            if(!sucesso) {
                return res.status(404).json({error: 'Doador não encontrado'});
            }

            res.json({message: 'Doador excluido com sucesso'});

        } catch (error) {
            console.error("Erro ao excluir doador: ", error);
            res.status(500).json({error: "Erro ao excluir doador"});
        }
    }
}

export default DoadorController;