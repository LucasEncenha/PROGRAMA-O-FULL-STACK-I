import { useEffect, useState } from "react";
import "./Layout.css";

function Layout({ children }) {
    const [tema, setTema] = useState(0);

    useEffect(() => {
        if(tema == 0) {
            document.body.style.color = 'black';
            document.body.style.backgroundColor = 'white';
        } else {
            document.body.style.color = 'white';
            document.body.style.backgroundColor = 'black';
        }
    }, [tema]);

    return (
        <div>
            <header>
                <h1>SITE CURSOS</h1>
                <button className="botaoTema" onClick={ () => setTema(tema == 0 ? 1 : 0) }>MUDAR TEMA</button>
            </header>
            
            <main>
                {children}
            </main>
            
            <footer>
                <p>© 2025 Meu Site de Cursos</p>
            </footer>
        </div>
    );
}

export default Layout;