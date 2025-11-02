import "./AlertCompra.css"

function AlertCompra({ funcao }) {
    return (
        <>
            <button onClick={funcao}>COMPRAR</button>
        </>
    );
}

export default AlertCompra;