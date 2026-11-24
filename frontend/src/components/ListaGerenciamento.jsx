import { useState } from "react";
import { Clapperboard } from "lucide-react";
import CardSerie from "./CardSerie";

export default function ListaGerenciamento({ series = [], excluirSerie, iniciarAlteracao }) {
  const [filtroStatus, setFiltroStatus] = useState("todas");

  const seriesFiltradas = series.filter(
    (item) => filtroStatus === "todas" || item.status === filtroStatus
  );

  const opcoesFiltro = [
    { valor: "todas", rotulo: "Todas" },
    { valor: "Em Espera", rotulo: "Em Espera" },
    { valor: "Gravando", rotulo: "Gravando" },
    { valor: "Finalizada", rotulo: "Finalizada" }
  ];

  return (
    <section className="page-section">
      <div className="section-header">
        <div>
          <h2 className="section-title">
            <Clapperboard size={20} className="icon-emerald" />
            Gerenciamento de Gravações
          </h2>
          <p className="section-subtitle">
            Fila de espera, gravações ativas e projetos concluídos
          </p>
        </div>

        <div className="filter-group">
          {opcoesFiltro.map((opcao) => (
            <button
              key={opcao.valor}
              type="button"
              onClick={() => setFiltroStatus(opcao.valor)}
              className={`status-filter-btn ${filtroStatus === opcao.valor ? "active" : ""}`}
            >
              {opcao.rotulo}
            </button>
          ))}
        </div>
      </div>

      <div className="cards-grid">
        {seriesFiltradas.length === 0 ? (
          <p style={{ color: "#94a3b8", fontSize: "14px" }}>
            Nenhuma série encontrada nesta categoria.
          </p>
        ) : (
          seriesFiltradas.map((serie) => (
            <CardSerie
              key={serie._id}
              serie={serie}
              excluirSerie={excluirSerie}
              iniciarAlteracao={iniciarAlteracao}
            />
          ))
        )}
      </div>
    </section>
  );
}