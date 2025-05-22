// import type { Ad } from "@type/adType";
import AdCard from "./AdCard";
// import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router";
import { toast } from "react-toastify";
import { useGetAllAdsQuery, useDeleteAdMutation } from "../generated/graphql-types";

const RecentAds = () => {
  const [total, setTotal] = useState(0);
  // const [ads, setAds] = useState<Ad[]>([]);
  const [searchParams] = useSearchParams();

  const { data, loading, error } = useGetAllAdsQuery();

  // const fetchData = async () => {
  //   try {
  //     //prépare l'url de la request
  //     let url_request = `${import.meta.env.VITE_URL_API}/ads`;

  //     //réuni toute les requetes dans un tableau
  //     const param = [
  //       {
  //         nom: "categorie",
  //         valeur: searchParams.get("categorie")
  //       },
  //       {
  //         nom: "search",
  //         valeur: searchParams.get("search")
  //       }
  //     ]

  //     //si il a au moins une requete non null
  //     if (param.some((p) => p !== null)) {
  //       //rajoute le ? dans url
  //       url_request += "?";
  //       for (let i = 0; i < param.length; i++) {
  //         //rajoute les parametres dans l'url
  //         if (param[i].valeur !== null) {
  //           url_request += `${param[i].nom}=${param[i].valeur}&`;
  //         }
  //       }
  //       //retire le dernier &
  //       url_request = url_request.slice(0, -1);
  //     }

  //     //fait la request au serveur
  //     const result = await axios.get(url_request);
  //     setAds(result.data);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

  // useEffect(() => {
  //   fetchData()
  // }, [searchParams]);

  // // rajout 1 par seconde
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setTotal(prevTotal => prevTotal + 1);
  //   }, 100000);

  //   return () => clearInterval(interval);
  // }, []);

  const delArticle = async (id: number) => {
    const [deleteAd] = useDeleteAdMutation();
    // deleteAd(id )

    toast.promise(
      deleteAd({ variables: { deleteAdId: id } }),
      {
        pending: "Suppression de l'annonce...",
        success: "Annonce supprimée ✅",
        error: "Erreur lors de la suppression ❌",
      }
    );


    // toast.promise(
    //   {
    //   }
    // );
    // if (error) toast.error("Erreur lors de la suppression de l'annonce");
    // if (data) toast.success("Annonce supprimée");

    // try {
    //   await axios.delete(`${import.meta.env.VITE_URL_API}/ads/${id}`);
    //   toast.success("Annonce supprimée");
    //   fetchData();
    // } catch (error) {
    //   toast.error("Erreur lors de la suppression de l'annonce");
    //   console.error(error);
    // }
  }

  // const dupliquerArticle = async (ad: Ad) => {
  //   const data = {
  //     title: ad.title,
  //     description: ad.description,
  //     owner: ad.owner,
  //     price: ad.price,
  //     picture: ad.picture,
  //     location: ad.location,
  //     category_id: ad.categories.id,
  //   }
  //   try {
  //     await axios.post(`${import.meta.env.VITE_URL_API}/ads`, data);
  //     toast.success("Annonce dupliquée");
  //     fetchData();
  //   } catch (error) {
  //     toast.error("Erreur lors de la duplication de l'annonce");
  //     console.error(error);
  //   }
  // }

  //returne

  if (loading) return <p>Chargement...</p>;
  console.log(error)

  if (error) return <p>Erreur lors de la récupération des annonces, esseyer plus tard...</p>;

  return (
    <>
      <h2>Annonces récentes</h2>
      <h3>Total : {total} €</h3>
      <section className="recent-ads">
        {data && data.getAllAds.length > 0 ?
          data.getAllAds.map((ad) => (
            <div key={ad.id}>
              <AdCard
                ad={ad = { id: ad.id, picture: ad.picture, title: ad.title, price: ad.price }}
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
              <button
                className="button"
              // onClick={() => dupliquerArticle(ad)}
              >
                Duplique
              </button>
              <Link to={`/ad/${ad.id}/modification`}>
                <button className="button">
                  Modifier
                </button>
              </Link>
            </div>
          ))
          :
          <p>Aucune annonce trouvée</p>}
      </section>
    </>
  );
};

export default RecentAds;