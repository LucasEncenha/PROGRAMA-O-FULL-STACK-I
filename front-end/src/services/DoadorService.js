import ApiService from "./ApiService.js";

class DoadorService {

    async listarTodos() {
        try {
            return await ApiService.get('/doadores');
        } catch (error) {
            console.error('Erro ao listar doadores:', error);
            return [];
        }
    }

    async buscarPorId(id) {
        const doadores = await this.listarTodos();
        return doadores.find(v => v.id === id);
    } 

    async salvar(doador) {
        console.log(doador);
        if (doador.id) {
            return await ApiService.put(`/doadores/${doador.id}`, doador);
        } else {
           return await ApiService.post('/doadores', doador);
        }    
    }

    async excluir(id) {
        try {
            await ApiService.delete(`/doadores/${id}`);
            return true;
        } catch (error) {
            console.error('Erro ao excluir doadores:', error);
            return [];
        }
    }

    async filtrar(termo) {
        try {
            return await ApiService.get(`/doadores?termo=${termo}`);
        } catch (error) {
            console.error('Erro ao listar doadores:', error);
            return [];
        }
    }
}

export default new DoadorService();