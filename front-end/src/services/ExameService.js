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

    async buscarPorId(id) {
        const exames = await this.listarTodos();
        return exames.find(v => v.id === id);
    }

    async salvar(exame) {
        console.log(exame);
        if (exame.id) {
            return await ApiService.put(`/exames/${exame.id}`, exame);
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
            return [];
        }
    }

    async filtrar(termo) {
        try {
            return await ApiService.get(`/exames?termo=${termo}`);
        } catch (error) {
            console.error('Erro ao listar exames:', error);
            return [];
        }
    }
}

export default new ExameService();