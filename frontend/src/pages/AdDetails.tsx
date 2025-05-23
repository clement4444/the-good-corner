import { useParams } from "react-router";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useGetAdByIdQuery } from "../generated/graphql-types";

const AdDetails = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);

  const { data: ad, loading, error } = useGetAdByIdQuery({ variables: { getAdByIdId: Number(id) } });

  if (loading) return <div>Loading...</div>;
  if (error) {
    toast.error("Une erreur est survenue");
    console.error(error);
    return (
      <div>
        <p>une eurreur c'est produite</p>
        <button type="button">Revenir a la home page</button>
      </div>
    )
  }
  if (!ad) {
    return <p>Aucune article trouver avec id {id}</p>
  }

  return (
    <>
      <main className="main-content">
        <h2 className="ad-details-title">{ad.getAdById.title}</h2>
        <section className="ad-details">
          <div className="ad-details-image-container">
            <img className="ad-details-image" src={ad.getAdById.picture} />
          </div>
          <div className="ad-details-info">
            <div className="ad-details-price">{ad.getAdById.price} €</div>
            <div className="ad-details-description">
              {ad.getAdById.description}
            </div>
            <hr className="separator" />
            <div className="ad-details-owner">
              Annoncée publiée par <b>{ad.getAdById.owner}</b> {String(ad.getAdById.createdAt)}.
            </div>
            <a
              href=""
              className="button button-primary link-button"
            >
              <svg
                aria-hidden="true"
                width="16"
                height="16"
                viewBox="0 0 32 32"
                xmlns="http://www.w3.org/2000/svg"
                className="styled__BaseIcon-sc-1jsm4qr-0 llmHhT"
              >
                <path d="M25 4H7a5 5 0 0 0-5 5v14a5 5 0 0 0 5 5h18a5 5 0 0 0 5-5V9a5 5 0 0 0-5-5ZM7 6h18a3 3 0 0 1 2.4 1.22s0 0-.08 0L18 15.79a3 3 0 0 1-4.06 0L4.68 7.26H4.6A3 3 0 0 1 7 6Zm18 20H7a3 3 0 0 1-3-3V9.36l8.62 7.9a5 5 0 0 0 6.76 0L28 9.36V23a3 3 0 0 1-3 3Z"></path>
              </svg>
              Envoyer un email
            </a>
          </div>
        </section>
      </main>
    </>
  )
};

export default AdDetails;