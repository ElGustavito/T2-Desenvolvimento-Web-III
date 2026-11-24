import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./components/Navbar";
import ListaGerenciamento from "./components/ListaGerenciamento";
import ListaZeradores from "./components/ListaZeradores";
import ListaFranquias from "./components/ListaFranquias";
import FormularioSerie from "./components/FormularioSerie";

function App() {
  const [series, setSeries] = useState([]);
  const [atualizacao, setAtualizacao] = useState(0);
  const [abaAtiva, setAbaAtiva] = useState("gerenciamento");

  const [modalAberto, setModalAberto] = useState(false);
  const [alterando, setAlterando] = useState(false);
  const [serieAlterando, setSerieAlterando] = useState(null);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/series`)
      .then((resposta) => {
        setSeries(resposta.data);
      })
      .catch((erro) => {
        console.log(erro.message);
      });
  }, [atualizacao]);

  function incluirSerie(novaSerie) {
    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/series`, novaSerie)
      .then((resposta) => {
        if (resposta.status === 201) {
          alert("Série incluída com sucesso.");
          setAtualizacao(atualizacao + 1);
        }
      })
      .catch((erro) => {
        console.log(erro.message);
        alert("Erro ao cadastrar série.");
      });
  }

  function alterarSerie(id, serieAtualizada) {
    axios
      .put(`${import.meta.env.VITE_BACKEND_URL}/series/${id}`, serieAtualizada)
      .then((resposta) => {
        if (resposta.status === 200) {
          alert("Série alterada com sucesso.");
          setAtualizacao(atualizacao + 1);
          setAlterando(false);
          setSerieAlterando(null);
        } else {
          alert("Falha na atualização.");
        }
      })
      .catch((erro) => {
        console.log(erro.message);
      });
  }

  function alternarStatusSerie(id, novoStatus) {
    axios
      .patch(`${import.meta.env.VITE_BACKEND_URL}/series/${id}/status`, { status: novoStatus })
      .then((resposta) => {
        if (resposta.status === 200) {
          setAtualizacao(atualizacao + 1);
        }
      })
      .catch((erro) => {
        console.log(erro.message);
      });
  }

  function excluirSerie(id) {
    axios
      .delete(`${import.meta.env.VITE_BACKEND_URL}/series/${id}`)
      .then((resposta) => {
        if (resposta.status === 200) {
          alert("Série excluída com sucesso.");
          setAtualizacao(atualizacao + 1);
        } else {
          alert("Falha na exclusão.");
        }
      })
      .catch((erro) => {
        console.log(erro.message);
      });
  }

  function abrirNovaSerie() {
    setAlterando(false);
    setSerieAlterando(null);
    setModalAberto(true);
  }

  function iniciarAlteracao(serie) {
    setAlterando(true);
    setSerieAlterando(serie);
    setModalAberto(true);
  }

  function fecharModal() {
    setModalAberto(false);
    setAlterando(false);
    setSerieAlterando(null);
  }

  // Extrai nomes únicos das franquias já cadastradas no banco para o select
  const franquiasExistentes = [...new Set(series.map((s) => s.franquia).filter(Boolean))];

  return (
    <>
      <Navbar
        abaAtiva={abaAtiva}
        setAbaAtiva={setAbaAtiva}
        abrirNovaSerie={abrirNovaSerie}
      />

      <main className="main-container">
        {abaAtiva === "gerenciamento" && (
          <ListaGerenciamento
            series={series}
            excluirSerie={excluirSerie}
            iniciarAlteracao={iniciarAlteracao}
          />
        )}

        {abaAtiva === "zeradores" && <ListaZeradores series={series} />}

        {abaAtiva === "franquias" && (
          <ListaFranquias
            series={series}
            alternarStatusSerie={alternarStatusSerie}
          />
        )}
      </main>

      <FormularioSerie
        aberto={modalAberto}
        fecharModal={fecharModal}
        alterarSerie={alterarSerie}
        incluirSerie={incluirSerie}
        alterando={alterando}
        serieAtual={serieAlterando}
        franquiasExistentes={franquiasExistentes}
      />
    </>
  );
}

export default App;