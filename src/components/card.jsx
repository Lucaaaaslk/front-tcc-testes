import React from "react";
import styles from "../pages/escolha.module.css";
import noimage from "../img/noimage.png";
import axios from "axios";

function createVoto(id) {
  axios.post(`http://localhost:5000/api/votos`, { id_projeto: id });
}

export default function ProjetoCard({ id, titulo, percentual, selecionado }) {
  return (
    <div className={styles.card}>
      <img src={noimage} alt="Imagem do projeto" className={styles.imagem} />
      <h3>{titulo}</h3>
      <p>Percentual: {percentual}%</p>
      <button className={styles.botaoVotar} onClick={() => createVoto(id)}>
        Votar
      </button>
    </div>
  );
}
