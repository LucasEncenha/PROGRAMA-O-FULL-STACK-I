import express from 'express';
import ExameController from '../controllers/ExameController.js';

const router = express.Router();

router.get('/exames', ExameController.listar);
router.post('/exames', ExameController.criar);
router.put('/exames/:id', ExameController.atualizar);
router.delete('/exames/:id', ExameController.excluir);

export default router;