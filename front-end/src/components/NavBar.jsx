import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const NavBar = () => {
    const { usuario, logout } = useAuth();

    const handleLogout = async () => {
        if (window.confirm('Deseja sair do sistema?')) {
            await logout();
        }
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
                <Link className="navbar-brand" to="/">
                    Sistema ProntosPvidaSys
                </Link>

                {usuario && (
                    <>
                        <div className="navbar-nav me-auto">
                            <Link className="nav-link" to="/pacientes">Paciente</Link>
                            <Link className="nav-link" to="/exames">Exame</Link>
                            <Link className="nav-link" to="/doadores">Doadores</Link>
                            <Link className="nav-link" to="/perfil">Meu Perfil</Link>
                        </div>

                        <div className="navbar-nav">
                            <span className="navbar-text me-3">
                                Olá, {usuario.nome} ({usuario.nivel})
                            </span>
                            <button
                                className="btn btn-outline-light btn-sm"
                                onClick={handleLogout}
                            >
                                Sair
                            </button>
                        </div>
                    </>
                )}
            </div>
        </nav>
    );
};

export default NavBar;