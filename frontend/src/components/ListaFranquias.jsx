import { useState } from "react";
import { Layers, X } from "lucide-react";

export default function ListaFranquias({ series = [], alternarStatusSerie }) {
  const [filtroTipo, setFiltroTipo] = useState("todos");
  const [franquiaAtivaNome, setFranquiaAtivaNome] = useState(null);

  // Agrupa os documentos da coleção Series pelo nome da franquia
  const mapaFranquias = {};
  series.forEach((serie) => {
    const nome = serie.franquia || serie.titulo;
    if (!mapaFranquias[nome]) {
      mapaFranquias[nome] = {
        nome,
        tipo: serie.tipo,
        jogos: []
      };
    }
    mapaFranquias[nome].jogos.push(serie);
  });

  const listaFranquias = Object.values(mapaFranquias).filter(
    (f) => filtroTipo === "todos" || f.tipo === filtroTipo
  );

  const franquiaModal = franquiaAtivaNome ? mapaFranquias[franquiaAtivaNome] : null;
  const totalModal = franquiaModal ? franquiaModal.jogos.length : 0;
  const zeradosModal = franquiaModal
    ? franquiaModal.jogos.filter((j) => j.status === "Finalizada").length
    : 0;
  const percentModal = totalModal > 0 ? Math.round((zeradosModal / totalModal) * 100) : 0;

  return (
    <section className="page-section">
      <div className="section-header">
        <div>
          <h2 className="section-title">
            <Layers size={20} className="icon-indigo" />
            Séries e Franquias do Canal
          </h2>
          <p className="section-subtitle">
            Clique na franquia para gerenciar os jogos zerados e atualizar o progresso
          </p>
        </div>

        <div className="filter-group">
          {[
            { valor: "todos", rotulo: "Todos" },
            { valor: "Zerável", rotulo: "Zeráveis" },
            { valor: "Inzerável", rotulo: "Inzeráveis" }
          ].map((opcao) => (
            <button
              key={opcao.valor}
              type="button"
              onClick={() => setFiltroTipo(opcao.valor)}
              className={`type-filter-btn ${filtroTipo === opcao.valor ? "active" : ""}`}
            >
              {opcao.rotulo}
            </button>
          ))}
        </div>
      </div>

      <div className="cards-grid">
        {listaFranquias.length === 0 ? (
          <p style={{ color: "#94a3b8", fontSize: "14px" }}>
            Nenhuma franquia cadastrada ainda. Clique em &quot;+ Nova Série&quot; para começar.
          </p>
        ) : (
          listaFranquias.map((franquia) => {
            const totalJogos = franquia.jogos.length;
            const zerados = franquia.jogos.filter((j) => j.status === "Finalizada").length;
            const percent = totalJogos > 0 ? Math.round((zerados / totalJogos) * 100) : 0;

            return (
              <div
                key={franquia.nome}
                className="card"
                style={{ cursor: "pointer" }}
                onClick={() => setFranquiaAtivaNome(franquia.nome)}
              >
                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start"
                    }}
                  >
                    <h3 className="card-title-text">{franquia.nome}</h3>
                    <span
                      style={{
                        padding: "0.25rem 0.625rem",
                        borderRadius: "9999px",
                        fontSize: "10px",
                        fontWeight: 700,
                        backgroundColor: "rgba(99, 102, 241, 0.1)",
                        color: "#818cf8",
                        border: "1px solid rgba(99, 102, 241, 0.2)"
                      }}
                    >
                      {franquia.tipo}
                    </span>
                  </div>

                  {franquia.tipo === "Zerável" ? (
                    <div className="progress-box">
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          fontSize: "12px"
                        }}
                      >
                        <span style={{ color: "#94a3b8" }}>Franquia Zerada</span>
                        <strong style={{ color: "#ffffff" }}>
                          {zerados} / {totalJogos} jogos
                        </strong>
                      </div>

                      <div className="progress-bar-bg">
                        <div
                          className="progress-bar-fill"
                          style={{ width: `${percent}%` }}
                        ></div>
                      </div>

                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center"
                        }}
                      >
                        <span style={{ fontSize: "10px", color: "#64748b" }}>
                          {percent}% concluído
                        </span>
                        <span style={{ fontSize: "11px", color: "#818cf8", fontWeight: 600 }}>
                          Clique para ver jogos
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="progress-box" style={{ textAlign: "center" }}>
                      <span style={{ fontSize: "12px", color: "#c084fc" }}>
                        Jogo Contínuo / Sem Fim
                      </span>
                    </div>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

      {franquiaModal && (
        <div className="modal-overlay">
          <div className="modal-card">
            <button
              type="button"
              onClick={() => setFranquiaAtivaNome(null)}
              className="btn-close"
            >
              <X size={20} />
            </button>

            <div>
              <h3 className="modal-title">{franquiaModal.nome}</h3>
              <p className="modal-subtitle">Marque os jogos concluídos da franquia</p>
            </div>

            <div className="progress-box">
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px" }}>
                <span style={{ color: "#94a3b8" }}>Progresso da Franquia</span>
                <strong style={{ color: "#ffffff" }}>
                  {zeradosModal} / {totalModal} jogos
                </strong>
              </div>
              <div className="progress-bar-bg">
                <div
                  className="progress-bar-fill"
                  style={{ width: `${percentModal}%` }}
                ></div>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "8px",
                maxHeight: "280px",
                overflowY: "auto",
                paddingRight: "4px"
              }}
            >
              {franquiaModal.jogos.map((jogo) => {
                const concluido = jogo.status === "Finalizada";
                return (
                  <label key={jogo._id} className="jogo-checkbox-item">
                    <input
                      type="checkbox"
                      checked={concluido}
                      onChange={() =>
                        alternarStatusSerie(
                          jogo._id,
                          concluido ? "Em Espera" : "Finalizada"
                        )
                      }
                    />
                    <span className={concluido ? "completed-text" : ""}>{jogo.titulo}</span>
                  </label>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}