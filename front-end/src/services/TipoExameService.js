import ApiService from "./ApiService.js";

class TipoExameService {

    async listarTodos() {
        try {
            return await ApiService.get('/tipoExame');
        } catch (error) {
            console.error('Erro ao listar tipos de exames:', error);
            return [];
        }
    }

    async buscarPorId(id) {
        const tiposExames = await this.listarTodos();
        return tiposExames.find(v => v.id === id);
    } 

    async salvar(tiposExames) {
        console.log(tiposExames);
        if (tiposExames.id) {
            return await ApiService.put(`/tipoExame/${tiposExames.id}`, tiposExames);
        } else {
           return await ApiService.post('/tipoExame', tiposExames);
        }    
    }

    async excluir(id) {
        try {
            await ApiService.delete(`/tipoExame/${id}`);
            return true;
        } catch (error) {
            console.error('Erro ao excluir tipo de exame:', error);
            return [];
        }
    }

    async filtrar(termo) {
        try {
            const filtro = JSON.stringify(termo);
            return await ApiService.get(`/tipoExame?termo=${filtro}`);
        } catch (error) {
            console.error('Erro ao listar tipos de exames:', error);
            return [];
        }
    }
}

export default new TipoExameService();