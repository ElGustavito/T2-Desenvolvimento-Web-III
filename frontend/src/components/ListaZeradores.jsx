import { useState } from "react";
import { Users, X } from "lucide-react";
import { zeradores, getMemberByName } from "../data/zeradores";

export default function ListaZeradores({ series = [] }) {
  const [membroSelecionado, setMembroSelecionado] = useState(null);

  const apenasZeradores = zeradores.filter((member) => member.nome !== "Não Definido");

  const detalhesMembro = membroSelecionado ? getMemberByName(membroSelecionado) : null;
  const gravadas = membroSelecionado
    ? series.filter((s) => s.gravador === membroSelecionado)
    : [];
  const participacoes = membroSelecionado
    ? series.filter(
        (s) =>
          s.gravador !== membroSelecionado &&
          s.coplayers &&
          s.coplayers.toLowerCase().includes(membroSelecionado.toLowerCase())
      )
    : [];

  return (
    <section className="page-section">
      <div className="section-header">
        <div>
          <h2 className="section-title">
            <Users size={20} className="icon-purple" />
            Integrantes do Canal &amp; Artes Chibi
          </h2>
          <p className="section-subtitle">
            Clique no card de um integrante para ver seu histórico detalhado
          </p>
        </div>
      </div>

      <div className="zeradores-grid">
        {apenasZeradores.map((member) => {
          const principalCount = series.filter(
            (s) => s.gravador === member.nome && s.status === "Gravando"
          ).length;

          const totalParticipando = series.filter(
            (s) =>
              s.gravador === member.nome ||
              (s.coplayers && s.coplayers.toLowerCase().includes(member.nome.toLowerCase()))
          ).length;

          return (
            <div
              key={member.id}
              className="zerador-card"
              style={{ cursor: "pointer" }}
              onClick={() => setMembroSelecionado(member.nome)}
            >
              <div className="chibi-avatar-frame" style={{ borderColor: member.cor }}>
                <img src={member.avatar} alt={member.nome} />
              </div>

              <div>
                <h3 style={{ fontSize: "1.125rem", fontWeight: 800, color: member.cor }}>
                  {member.nome}
                </h3>
                <span
                  style={{
                    fontSize: "10px",
                    fontWeight: 700,
                    color: "#64748b",
                    textTransform: "uppercase"
                  }}
                >
                  Zerador do Canal
                </span>
              </div>

              <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: "6px" }}>
                <div className="zerador-stat-row">
                  <span style={{ color: "#94a3b8" }}>Gravando:</span>
                  <strong style={{ color: "#34d399" }}>{principalCount}</strong>
                </div>
                <div className="zerador-stat-row">
                  <span style={{ color: "#94a3b8" }}>Participando:</span>
                  <strong style={{ color: "#c084fc" }}>{totalParticipando}</strong>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {detalhesMembro && (
        <div className="modal-overlay">
          <div className="modal-card">
            <button
              type="button"
              onClick={() => setMembroSelecionado(null)}
              className="btn-close"
            >
              <X size={20} />
            </button>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "1rem",
                borderBottom: "1px solid #1f2333",
                paddingBottom: "1rem"
              }}
            >
              <div
                className="chibi-avatar-frame"
                style={{ width: "64px", height: "64px", borderColor: detalhesMembro.cor }}
              >
                <img src={detalhesMembro.avatar} alt={detalhesMembro.nome} />
              </div>
              <div>
                <h3
                  style={{
                    fontSize: "1.25rem",
                    fontWeight: 800,
                    color: detalhesMembro.cor
                  }}
                >
                  {detalhesMembro.nome}
                </h3>
                <p style={{ fontSize: "12px", color: "#94a3b8" }}>
                  Histórico de Séries e Participações
                </p>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
                maxHeight: "350px",
                overflowY: "auto",
                marginTop: "0.5rem"
              }}
            >
              <div>
                <h4
                  style={{
                    fontSize: "12px",
                    fontWeight: 700,
                    color: "#34d399",
                    textTransform: "uppercase",
                    marginBottom: "0.5rem"
                  }}
                >
                  Séries Gravadas (Principal)
                </h4>
                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  {gravadas.length > 0 ? (
                    gravadas.map((s) => (
                      <div key={s._id} className="detail-item-box">
                        <strong style={{ color: "#ffffff" }}>{s.titulo}</strong>
                        <span>({s.status})</span>
                      </div>
                    ))
                  ) : (
                    <p style={{ color: "#64748b", fontSize: "12px" }}>
                      Nenhuma série como gravador principal.
                    </p>
                  )}
                </div>
              </div>

              <div>
                <h4
                  style={{
                    fontSize: "12px",
                    fontWeight: 700,
                    color: "#c084fc",
                    textTransform: "uppercase",
                    marginBottom: "0.5rem"
                  }}
                >
                  Participações (Co-player)
                </h4>
                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  {participacoes.length > 0 ? (
                    participacoes.map((s) => (
                      <div key={s._id} className="detail-item-box">
                        <strong style={{ color: "#ffffff" }}>{s.titulo}</strong>
                        <span>({s.status})</span>
                      </div>
                    ))
                  ) : (
                    <p style={{ color: "#64748b", fontSize: "12px" }}>
                      Nenhuma participação cadastrada.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}