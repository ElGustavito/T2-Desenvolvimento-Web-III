import { Kanban, Sparkles, Library, Plus } from "lucide-react";

export default function Navbar({ abaAtiva, setAbaAtiva, abrirNovaSerie }) {
  return (
    <header className="navbar">
      <div className="navbar-container">
        <div className="brand" onClick={() => setAbaAtiva("gerenciamento")}>
          <div>
            <h1 className="logo-title">Zerando Todos</h1>
            <p className="logo-subtitle">Central dos Zeradores</p>
          </div>
        </div>

        <nav className="nav-tabs">
          <button
            type="button"
            onClick={() => setAbaAtiva("gerenciamento")}
            className={`tab-btn ${abaAtiva === "gerenciamento" ? "active" : ""}`}
          >
            <Kanban size={16} />
            <span>Gerenciamento</span>
          </button>

          <button
            type="button"
            onClick={() => setAbaAtiva("zeradores")}
            className={`tab-btn ${abaAtiva === "zeradores" ? "active" : ""}`}
          >
            <Sparkles size={16} />
            <span>Zeradores</span>
          </button>

          <button
            type="button"
            onClick={() => setAbaAtiva("franquias")}
            className={`tab-btn ${abaAtiva === "franquias" ? "active" : ""}`}
          >
            <Library size={16} />
            <span>Séries / Franquias</span>
          </button>
        </nav>

        <button type="button" onClick={abrirNovaSerie} className="btn-primary">
          <Plus size={16} />
          <span>Nova Série</span>
        </button>
      </div>
    </header>
  );
}