import { Router } from "express";
import AuthController from "../controllers/AuthController.js"; 
import { authenticate } from "../middlewares/auth.js";

const router = Router();

router.post('/login', AuthController.login); 
router.post('/register', AuthController.registrar); 
router.post('/logout', AuthController.logout);
router.get('/perfil', authenticate, AuthController.getMe); 

export default router;