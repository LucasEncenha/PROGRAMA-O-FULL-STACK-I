class ExameService {

    async listarTodos() {
        try {
            const dados = localStorage.getItem('exames');
            return dados ? JSON.parse(dados) : [];
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
        const exames = await this.listarTodos();

        if (exame.id) {
            const index = exames.findIndex(v => v.id === exame.id);
        if (index !== -1) {
            exames[index] = exame;
        }
        } else {
            exame.id = Date.now();
            exames.push(exame);
        }

        localStorage.setItem('exames', JSON.stringify(exames));
        return exame;
    }

    async excluir(id) {
        const exames = await this.listarTodos();
        const examesFiltrados = exames.filter(v => v.id !== id);
        localStorage.setItem('exames', JSON.stringify(examesFiltrados));
        return true;
    }
}

export default new ExameService();