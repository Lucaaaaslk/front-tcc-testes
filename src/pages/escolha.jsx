import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Menuhamburguer from "../components/Menuhamburguer";
import ProjetoCard from "../components/card.jsx";
import styles from "../pages/escolha.module.css";
import axios from "axios";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function Escolha() {
  const query = useQuery();
  const serie = localStorage.getItem("serie");

  const [projetos, setProjetos] = useState([]);
  const [erro, setErro] = useState(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const buscarProjetos = async () => {
      setCarregando(true);
      try {
        // ✅ ROTA CORRETA
        const resposta = await axios.get(
          `http://localhost:5000/api/projetos/serie/${serie}`
        );

        console.log("Projetos recebidos:", resposta.data);

        const projetosArray = Array.isArray(resposta.data)
          ? resposta.data
          : [resposta.data];

        setProjetos(projetosArray);
      } catch (err) {
        setErro("Erro ao buscar projetos.");
        console.error(err);
      } finally {
        setCarregando(false);
      }
    };

    buscarProjetos();
  }, [serie]);

  if (carregando) {
    return <div>Carregando projetos...</div>;
  }

  if (erro) {
    return <div>{erro}</div>;
  }

  if (!projetos || projetos.length === 0) {
    return <div>Nenhum projeto encontrado.</div>;
  }

  return (
    <div className={styles.principal}>
      <Menuhamburguer />
      <h1 className={styles.tituloEscolha}>{serie} ano</h1>
      <p className={styles.rodape}>VOTE NO SEU PROJETO FAVORITO</p>
      <div className={styles.grid}>
        {projetos.map((projeto) => (
          <ProjetoCard
            key={projeto.id_projeto}
            id={projeto.id_projeto}
            titulo={projeto.nome_projeto}
            percentual={
              projeto.votos.length > 0
                ? Math.round(
                    (projeto.votos.length /
                      projetos.reduce(
                        (total, p) => total + p.votos.length,
                        0
                      )) *
                      100
                  )
                : 0
            }
            selecionado={false}
          />
        ))}
      </div>
    </div>
  );
}
