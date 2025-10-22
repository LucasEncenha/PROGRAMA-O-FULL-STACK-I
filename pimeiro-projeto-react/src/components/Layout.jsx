import "./Layout.css";

function Layout({ children }) {
    return (
        <div>
            <header>
                <h1>SITE CURSOS</h1>
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