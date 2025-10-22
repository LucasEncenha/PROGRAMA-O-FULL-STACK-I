import Cursos from "./components/Cursos.jsx";
import Descricao from "./components/Descricao.jsx";
import Layout from "./components/Layout.jsx";

function App() {
  return (
    <>
      <Layout>
        <Cursos
          array={["Curso 1", "Curso 2", "Curso 3"]}
        />
        <Descricao titulo="AVISO!">
            <p>Todos os cursos apresentados são fictícios e foram criados exclusivamente para a realização desta atividade.</p>
            <p>Agradeço pela atenção.</p>
        </Descricao>
      </Layout>
    </>
  )
}

export default App
