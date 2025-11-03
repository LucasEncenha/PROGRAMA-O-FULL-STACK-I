import { useState } from "react";
import "./AlertCompra.css"

function AlertCompra({ funcao }) {
    const [botao, setBotao] = useState();

    const mudarBotao = (event) => {
        setBotao(event.target.checked);
    }

    return (
        <>
            <input type="checkbox" id="checkbox" onChange={mudarBotao}/>
            <button onClick={funcao} disabled={botao}>COMPRAR</button>
        </>
    );
}

export default AlertCompra;