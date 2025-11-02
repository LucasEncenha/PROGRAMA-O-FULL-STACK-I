import "./Descricao.css";

function Descricao({ titulo, children }) {
    return (
        <div className="descricao">
            <h3 className="titulo">{titulo}</h3>
            <div className="conteudo">
                {children}
            </div>
        </div>
    );
}

export default Descricao;