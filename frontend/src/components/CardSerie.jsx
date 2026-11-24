import { Edit3, Trash2 } from "lucide-react";
import { getMemberByName } from "../data/zeradores";

export default function CardSerie({ serie, excluirSerie, iniciarAlteracao }) {
  const member = getMemberByName(serie.gravador);
  const statusClass = serie.status.toLowerCase().replace(" ", "-");

  return (
    <div className="card">
      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <span className="card-type-label">
              {serie.tipo} {serie.franquia ? `• ${serie.franquia}` : ""}
            </span>
            <h3 className="card-title-text">{serie.titulo}</h3>
          </div>

          <span className={`badge-status ${statusClass}`}>
            <span className="dot"></span>
            {serie.status}
          </span>
        </div>

        <div className="recorder-card-box">
          <div className="recorder-avatar-frame">
            {member.avatar && <img src={member.avatar} alt={member.nome} />}
          </div>
          <div>
            <span className="recorder-label">Gravando (Principal)</span>
            <span className="recorder-name" style={{ color: member.cor }}>
              {member.nome}
            </span>
          </div>
        </div>

        {serie.coplayers && (
          <div className="coplayers-box">
            <span className="coplayers-label">Co-players &amp; Personagens</span>
            <p style={{ color: "#cbd5e1" }}>{serie.coplayers}</p>
          </div>
        )}
      </div>

      <div className="card-footer">
        <span>
          Status: <strong style={{ color: "#ffffff" }}>{serie.status}</strong>
        </span>
        <div style={{ display: "flex", gap: "4px" }}>
          <button
            type="button"
            onClick={() => iniciarAlteracao(serie)}
            className="icon-btn"
            title="Editar"
          >
            <Edit3 size={16} />
          </button>
          <button
            type="button"
            onClick={() => excluirSerie(serie._id)}
            className="icon-btn delete"
            title="Excluir"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}