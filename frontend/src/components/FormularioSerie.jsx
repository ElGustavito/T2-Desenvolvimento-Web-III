import { useEffect, useState } from "react";
import { X, PlusCircle, Edit3 } from "lucide-react";
import { zeradores } from "../data/zeradores";

export default function FormularioSerie({
  aberto,
  fecharModal,
  alterarSerie,
  incluirSerie,
  alterando,
  serieAtual,
  franquiasExistentes = []
}) {
  const [titulo, setTitulo] = useState("");
  const [franquiaSelecionada, setFranquiaSelecionada] = useState("nova_franquia");
  const [nomeNovaFranquia, setNomeNovaFranquia] = useState("");
  const [tipo, setTipo] = useState("Zerável");
  const [status, setStatus] = useState("Em Espera");
  const [gravador, setGravador] = useState(zeradores[0].nome);
  const [coplayers, setCoplayers] = useState("");

  useEffect(() => {
    if (aberto) {
      if (alterando && serieAtual) {
        setTitulo(serieAtual.titulo || "");
        setTipo(serieAtual.tipo || "Zerável");
        setStatus(serieAtual.status || "Em Espera");
        setGravador(serieAtual.gravador || zeradores[0].nome);
        setCoplayers(serieAtual.coplayers || "");

        if (serieAtual.franquia && franquiasExistentes.includes(serieAtual.franquia)) {
          setFranquiaSelecionada(serieAtual.franquia);
          setNomeNovaFranquia("");
        } else {
          setFranquiaSelecionada("nova_franquia");
          setNomeNovaFranquia(serieAtual.franquia || "");
        }
      } else {
        setTitulo("");
        setFranquiaSelecionada("nova_franquia");
        setNomeNovaFranquia("");
        setTipo("Zerável");
        setStatus("Em Espera");
        setGravador(zeradores[0].nome);
        setCoplayers("");
      }
    }
  }, [aberto, alterando, serieAtual]);

  if (!aberto) return null;

  function processarEnvio(evento) {
    evento.preventDefault();

    const franquiaFinal =
      franquiaSelecionada === "nova_franquia"
        ? nomeNovaFranquia.trim() || titulo.trim()
        : franquiaSelecionada;

    if (titulo.trim() === "" || franquiaFinal === "" || gravador.trim() === "") {
      alert("Preencha todos os campos obrigatórios.");
      return;
    }

    const dadosSerie = {
      titulo: titulo.trim(),
      franquia: franquiaFinal,
      tipo,
      status,
      gravador,
      coplayers: coplayers.trim()
    };

    if (alterando && serieAtual) {
      alterarSerie(serieAtual._id, dadosSerie);
    } else {
      incluirSerie(dadosSerie);
    }

    fecharModal();
  }

  return (
    <div className="modal-overlay">
      <div className="modal-card">
        <button type="button" onClick={fecharModal} className="btn-close">
          <X size={20} />
        </button>

        <div className="modal-title-box">
          <h3 className="modal-title">
            {alterando ? (
              <>
                <Edit3 size={20} className="icon-emerald" />
                Editar Série
              </>
            ) : (
              <>
                <PlusCircle size={20} className="icon-emerald" />
                Nova Série / Fila
              </>
            )}
          </h3>
          <p className="modal-subtitle">
            Cadastre a série e defina quem estará no comando da gravação
          </p>
        </div>

        <form onSubmit={processarEnvio} className="form-body">
          <div className="form-group">
            <label htmlFor="tituloJogo">Nome da Série / Jogo</label>
            <input
              type="text"
              id="tituloJogo"
              required
              placeholder="Ex: Resident Evil 2, Borderlands 3"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="franquiaSelect">Pertence a qual Franquia?</label>
            <select
              id="franquiaSelect"
              value={franquiaSelecionada}
              onChange={(e) => setFranquiaSelecionada(e.target.value)}
            >
              <option value="nova_franquia">+ Criar Nova Franquia</option>
              {franquiasExistentes.map((nomeFranquia) => (
                <option key={nomeFranquia} value={nomeFranquia}>
                  {nomeFranquia}
                </option>
              ))}
            </select>
          </div>

          {franquiaSelecionada === "nova_franquia" && (
            <div className="form-group">
              <label htmlFor="nomeNovaFranquia">Nome da Nova Franquia</label>
              <input
                type="text"
                id="nomeNovaFranquia"
                placeholder="Ex: Resident Evil"
                value={nomeNovaFranquia}
                onChange={(e) => setNomeNovaFranquia(e.target.value)}
              />
            </div>
          )}

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="tipoJogo">Tipo do Jogo</label>
              <select id="tipoJogo" value={tipo} onChange={(e) => setTipo(e.target.value)}>
                <option value="Zerável">Zerável (Modo História)</option>
                <option value="Inzerável">Inzerável (Competitivo/Sandbox)</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="statusJogo">Status Atual</label>
              <select id="statusJogo" value={status} onChange={(e) => setStatus(e.target.value)}>
                <option value="Em Espera">Em Espera</option>
                <option value="Gravando">Gravando</option>
                <option value="Finalizada">Finalizada</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="gravadorPrincipal">Gravador Principal (Foco do Vídeo)</label>
            <select
              id="gravadorPrincipal"
              value={gravador}
              onChange={(e) => setGravador(e.target.value)}
            >
              {zeradores.map((z) => (
                <option key={z.id} value={z.nome}>
                  {z.nome}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="outrosJogadores">Co-players &amp; Personagens (Opcional)</label>
            <input
              type="text"
              id="outrosJogadores"
              placeholder="Ex: Felipe (Siren), Kreski (Berserker)"
              value={coplayers}
              onChange={(e) => setCoplayers(e.target.value)}
            />
          </div>

          <div className="modal-actions">
            <button type="button" onClick={fecharModal} className="btn-cancel">
              Cancelar
            </button>
            <button type="submit" className="btn-save">
              {alterando ? "Salvar Alterações" : "Salvar Série"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}