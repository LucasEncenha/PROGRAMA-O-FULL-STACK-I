import ApiService from "./ApiService.js";

class PacienteService {

    async listarTodos() {
        try {
            return await ApiService.get('/pacientes');
        } catch (error) {
            console.error('Erro ao listar pacientes:', error);
            return [];
        }
    }

    async buscarPorId(id) {
        const pacientes = await this.listarTodos();
        return pacientes.find(v => v.id === id);
    } 

    async salvar(paciente) {
        console.log(paciente);
        if (paciente.pa_id) {
            return await ApiService.put(`/pacientes/${paciente.pa_id}`, paciente);
        } else {
           return await ApiService.post('/pacientes', paciente);
        }    
    }

    async excluir(id) {
        try {
            await ApiService.delete(`/pacientes/${id}`);
            return true;
        } catch (error) {
            console.error('Erro ao excluir paciente:', error);
            return [];
        }
    }

    async filtrar(termo) {
        try {
            return await ApiService.get(`/pacientes?termo=${termo}`);
        } catch (error) {
            console.error('Erro ao listar pacientes:', error);
            return [];
        }
    }
}

export default new PacienteService();