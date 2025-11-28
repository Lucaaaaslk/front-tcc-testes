import React, { useState, useEffect } from "react";
import styles from "../pages/ranking.module.css";
import noimage from "../img/noimage.png";
import Menuhamburguer from "../components/Menuhamburguer";
import axios from "axios";

export default function Ranking() {
  const [ranking, setRanking] = useState([]);
  const [loading, setLoading] = useState(true);

  async function loadRanking() {
    try {
      const res = await axios.get("http://localhost:5000/api/projetos/rank");
      setRanking(res.data);
    } catch (err) {
      console.error("Erro ao carregar ranking:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadRanking();
  }, []);

  return (
    <div className={styles["ranking-container"]}>
      <Menuhamburguer />
      <h1 className={styles["ranking-title"]}>Ranking</h1>''

      {loading ? (
        <p>Carregando...</p>
      ) : (
        <div className={styles["ranking-cards"]}>
          {ranking.map((item, index) => (
            <div
              key={item.id_projeto}
              className={`${styles.card} ${styles[`pos-${index + 1}`]}`}
            >
              <img
                src={`/projetos/${item.id_projeto}.png`}
                
                className={styles["card-img"]}
              />
              <div className={styles["card-info"]}>
                <h2>{item.nome_projeto}</h2>
                <p>{item.turma}</p>
                <p>Votos: {item.votos}</p>
              </div>
              <div className={`${styles.medal} ${styles[`medal-${index + 1}`]}`}>
                {index + 1}

              
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
