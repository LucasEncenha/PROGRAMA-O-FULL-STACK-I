import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';

import PacientesRotas from './routes/PacienteRotas.js';
import TipoExameRotas from './routes/TipoExameRotas.js';
import DoadorRotas from './routes/DoadorRotas.js';
import AuthRotas  from './routes/AuthRotas.js';
import ExameRotas from './routes/ExameRotas.js';
import DoacaoRotas from './routes/DoacaoRotas.js';

dotenv.config();
const PORT = process.env.PORT;
const app = express();

app.use(cors({
    origin: ["http://127.0.0.1:5173", "http://localhost:5173"],
    credentials: true
}));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/auth', AuthRotas);
app.use('/api', PacientesRotas);
app.use('/api', TipoExameRotas);
app.use('/api', DoadorRotas);
app.use('/api', ExameRotas);
app.use('/api', DoacaoRotas);

app.get('/',(req,res) => {
    res.json({message: 'API pacientes está rodando'})
});
app.use((req,res) => {
    res.status(404).json({error: 'Rota não encontrada'})
});

app.listen(PORT,() => {
    console.log('Servidor rodando na porta:' + PORT);
})

export default app;