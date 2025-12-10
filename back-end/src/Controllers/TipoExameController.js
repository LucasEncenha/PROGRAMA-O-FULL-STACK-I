import TipoExameModal from "../Models/TipoExameModal.js";

class TipoExameController{
    static async listar(req, res) { 
        try {
            const {termo} = req.query;
            let tiposExames;
            
            if(termo) {
                let filtro = JSON.parse(termo);
                tiposExames = await TipoExameModal.filtrar(filtro);
            } else {
                tiposExames = await TipoExameModal.listarTiposExames();
            }

            res.json(tiposExames);

        } catch (error) {
            console.log('Erro ao listar tipos de exame: ', error);
            console.log(error);
            res.status(500).json({ error: 'Erro ao listar tipos de exame' });
        }
    }

    static async criar(req, res) {
        try {
            const {te_nome} = req.body;
            if(!te_nome) {
                return res.status(400).json({error: 'Todos os campos são obrigatorios'});
            }

            const tipoExame = await TipoExameModal.criar({te_nome});
            res.status(201).json(tipoExame);

        } catch (error) {
            console.error("Erro ao criar tipo de exame: ", error);
            res.status(500).json({error: "Erro ao criar tipo de exame"});
        }
    }

    static async atualizar(req, res) {
        try {
            const {id} = req.params;
            const {te_nome, te_status} = req.body;
            if(!te_nome || !te_status) {
                return res.status(400).json({error: 'Todos os campos são obrigatorios'});
            }

            console.log('cheuguei aqui')
            const tipoExame = await TipoExameModal.atualizar(id,{te_nome, te_status});
            res.status(201).json(tipoExame);

        } catch (error) {
            console.error("Erro ao atualizar tipo de exame: ", error);
            res.status(500).json({error: "Erro ao atualizar tipo de exame"});
        }
    }

    static async excluir(req, res) {
        try {
            const {id} = req.params;
            const sucesso = await TipoExameModal.excluir(id);

            if(!sucesso) {
                return res.status(404).json({error: 'Tipo de exame não encontrado'});
            }

            res.json({message: 'Tipo de exame excluido com sucesso'});

        } catch (error) {
            console.error("Erro ao excluir tipo de exame: ", error);
            res.status(500).json({error: "Erro ao excluir tipo de exame"});
        }
    }
}

export default TipoExameController;