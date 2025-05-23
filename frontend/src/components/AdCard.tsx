import { Link } from "react-router";
import { GetAllAdsQuery } from "../generated/graphql-types";

type AdType = GetAllAdsQuery["getAllAds"][number];

const AdCard = ({ ad }: { ad: AdType }) => {

  return (
    <div className="ad-card-container">
      <Link className="ad-card-link" to={`/ad/${ad.id}`}>
        <img className="ad-card-image" src={ad.picture} />
        <div className="ad-card-text">
          <div className="ad-card-title">{ad.title}</div>
          <div className="ad-card-price">{ad.price} €</div>
        </div>
      </Link>
    </div>
  );
};

export default AdCard;