import jwt from 'jsonwebtoken';
import pool from "../config/database.js";

class AuthController {
    static async login(req, res) {
        try {
            const { email, senha } = req.body;

            if (!email || !senha) {
                return res.status(400).json({ erro: 'Preencha e-mail e senha.' });
            }

            const [usuarios] = await pool.query(
                'SELECT * FROM usuarios WHERE usu_email = ? AND usu_senha = ?',
                [email, senha]
            );
            const user = usuarios[0];

            if (!user) {
                return res.status(401).json({ erro: 'Credenciais inválidas. Verifique seus dados.' });
            }

            const secret = process.env.JWT_SECRET || 'chave_super_secreta_padrao';
            const expiresIn = process.env.JWT_EXPIRES_IN || '1d';

            const token = jwt.sign(
                { sub: user.usu_id, role: user.usu_nivel },
                secret,
                { expiresIn, issuer: 'myapp' }
            );

            res.cookie('auth_token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                maxAge: 24 * 60 * 60 * 1000
            });

            return res.json({
                usuario: {
                    id: user.usu_id,
                    nome: user.usu_nome,
                    email: user.usu_email,
                    nivel: user.usu_nivel
                }
            });

        } catch (error) {
            console.error('Erro ao fazer login: ', error);
            res.status(500).json({ erro: 'Erro interno ao realizar login' });
        }
    }

    static async registrar(req, res) {
        try {
            const { nome, email, senha } = req.body;

            if (!nome || !email || !senha) {
                return res.status(400).json({ erro: 'Preencha todos os campos.' });
            }

            const [usuariosExistentes] = await pool.query(
                'SELECT * FROM usuarios WHERE usu_email = ?',
                [email]
            );

            if (usuariosExistentes.length > 0) {
                return res.status(400).json({ erro: 'Este e-mail já está cadastrado.' });
            }

            await pool.query(
                'INSERT INTO usuarios (usu_nome, usu_email, usu_senha, usu_nivel) VALUES (?, ?, ?, ?)',
                [nome, email, senha, 'usuario']
            );

            return res.status(201).json({ mensagem: 'Usuário cadastrado com sucesso!' });

        } catch (error) {
            console.error("Erro ao cadastrar usuário: ", error);
            return res.status(500).json({ erro: 'Erro interno ao cadastrar usuário', error });
        }
    }

    static async getMe(req, res) {
        try {
            const [usuarios] = await pool.query(
                'SELECT * FROM usuarios WHERE usu_id = ?',
                [req.user.sub]
            );
            const user = usuarios[0];

            if (!user) {
                return res.status(404).json({ erro: 'Usuário não encontrado' });
            }

            return res.json({
                usuario: {
                    id: user.usu_id,
                    nome: user.usu_nome,
                    email: user.usu_email,
                    nivel: user.usu_nivel
                }
            });

        } catch (error) {
            console.error("Erro ao buscar perfil: ", error);
            res.status(500).json({ erro: 'Erro ao buscar perfil do usuário' });
        }
    }

    static async logout(req, res) {
        try {
            res.clearCookie('auth_token');
            return res.json({ mensagem: 'Logout realizado com sucesso' });
        } catch (error) {
            console.error("Erro ao fazer logout: ", error);
            res.status(500).json({ erro: 'Erro ao fazer logout' });
        }
    }
}

export default AuthController;