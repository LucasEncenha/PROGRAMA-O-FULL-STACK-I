import "./Cursos.css";
import AlertCompra from "./AlertCompra.jsx";

function Cursos(props) {
    return (
        <div className="cursos">
            {props.array.map((curso) => (
                <div className="curso" key={curso}>
                    <h4>{curso}</h4>
                    <p>Está é uma descrição de exemplo</p>
                    <AlertCompra funcao={
                        () => alert(`${curso} comprado com sucesso!`)
                    }/>
                </div>
                )
            )}
        </div>
    );
}

export default Cursos;