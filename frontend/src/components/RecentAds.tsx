import type { Ad } from "./AdCard";
import AdCard from "./AdCard";
import axios from "axios";
import { useState, useEffect } from "react";

const RecentAds = () => {
  const [total, setTotal] = useState(0);
  const [ads, setAds] = useState<Ad[]>([]);

  const fetchData = async () => {
    try {
      const result = await axios.get(`${import.meta.env.VITE_URL_API}/ads`);
      setAds(result.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchData()
  }, []);

  // rajout 1 par seconde
  useEffect(() => {
    const interval = setInterval(() => {
      setTotal(prevTotal => prevTotal + 1);
    }, 100000);

    return () => clearInterval(interval);
  }, []);

  const delArticle = async (id: number) => {
    try {
      await axios.delete(`${import.meta.env.VITE_URL_API}/ads/${id}`);
      fetchData();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <h2>Annonces récentes</h2>
      <h3>Total : {total} €</h3>
      <section className="recent-ads">
        {ads.map((ad) => (
          <div key={ad.id}>
            <AdCard
              ad={ad}
            />
            <button
              className="button"
              onClick={() => setTotal(total + ad.price)}
            >
              Ajouter au panier {ad.price} €
            </button>
            <button
              className="button"
              onClick={() => delArticle(ad.id)}
            >
              Supprimer
            </button>
          </div>
        ))}
      </section>
    </>
  );
};

export default RecentAds;