import { useEffect, useState } from "react";
import "./Descricao.css";

function Descricao({ titulo, children }) {
    const [verMais, setVerMais] = useState(1);

    useEffect(() => {
        const esconder = document.getElementById('verMais');
        if(verMais == 0) {
            esconder.style.display = 'block';
            esconder.style.margin = '2em'
        } else {
            esconder.style.display = 'none';
        }
    }, [verMais]);

    return (
        <div className="descricao">
            <h3 className="titulo">{titulo}</h3>
            <div className="conteudo">
                {children}

                <button onClick={ () => setVerMais(verMais == 1 ? 0 : 1) }>Ver mais</button>
                <div id="verMais">
                    Mais cursos serão cadastrados futuramente para servir de exemplo na aplicação, aguarde por novas atualizações.
                </div>
            </div>
        </div>
    );
}

export default Descricao;