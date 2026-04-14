import { AuthProvider } from './context/AuthContext'
import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';

import Login from './pages/Login';
import Home from './pages/home';
import TelaDoadores from "./components/doadores/Tela.jsx";
import TelaTipoExame from './components/tipos-exames/Tela.jsx';
import TelaPaciente from "./components/pacientes/Tela.jsx";
import NavBar from "./components/NavBar.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Perfil from "./components/Perfil.jsx";
import RecuperarSenha from "./components/RecuperarSenha.jsx";

function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <div className="App">
                    <NavBar />
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route path="/recuperar-senha" element={<RecuperarSenha />} />


                        <Route path="/" element={
                            <ProtectedRoute>
                                <Home />
                            </ProtectedRoute>
                        } />

                        <Route path="/pacientes" element={
                            <ProtectedRoute roles={['admin', 'operador', 'usuario']}>
                                <TelaPaciente />
                            </ProtectedRoute>
                        } />

                        <Route path="/exames" element={
                            <ProtectedRoute roles={['admin', 'operador']}>
                                <TelaTipoExame />
                            </ProtectedRoute>
                        } />

                        <Route path="/doadores" element={
                            <ProtectedRoute roles={['admin']}>
                                <TelaDoadores />
                            </ProtectedRoute>
                        } />

                        <Route path="/perfil" element={
                            <ProtectedRoute>
                                <Perfil />
                            </ProtectedRoute>
                        } />

                    </Routes>
                </div>
            </AuthProvider>
        </BrowserRouter>
    );
}

export default App;