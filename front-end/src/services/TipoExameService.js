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
        return tiposExames.find(v => v.te_id === id);
    }

    async salvar(tipoExame) {
        if (tipoExame.te_id) {
            return await ApiService.put(`/tipoExame/${tipoExame.te_id}`, tipoExame);
        } else {
            return await ApiService.post('/tipoExame', tipoExame);
        }
    }

    async excluir(id) {
        try {
            await ApiService.delete(`/tipoExame/${id}`);
            return true;
        } catch (error) {
            console.error('Erro ao excluir tipo de exame:', error);
            return false;
        }
    }

    async filtrar(filtro) {
        try {
            return await ApiService.get(`/tipoExame?termo=${encodeURIComponent(JSON.stringify(filtro))}`);
        } catch (error) {
            console.error('Erro ao filtrar tipos de exames:', error);
            return [];
        }
    }
}

export default new TipoExameService();