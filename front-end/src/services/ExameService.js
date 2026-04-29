import ApiService from "./ApiService.js";

class ExameService {

    async listarTodos() {
        try {
            return await ApiService.get('/exames');
        } catch (error) {
            console.error('Erro ao listar exames:', error);
            return [];
        }
    }

    async salvar(exame) {
        if (exame.ex_id) {
            return await ApiService.put(`/exames/${exame.ex_id}`, exame);
        } else {
            return await ApiService.post('/exames', exame);
        }
    }

    async excluir(id) {
        try {
            await ApiService.delete(`/exames/${id}`);
            return true;
        } catch (error) {
            console.error('Erro ao excluir exame:', error);
            return false;
        }
    }

    async filtrar(termo) {
        try {
            return await ApiService.get(`/exames?termo=${encodeURIComponent(termo)}`);
        } catch (error) {
            console.error('Erro ao filtrar exames:', error);
            return [];
        }
    }
}

export default new ExameService();