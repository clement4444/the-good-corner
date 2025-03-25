export interface Ad {
  id: number;
  titre: string;
  imgUrl: string;
  prix: number;
  link: string;
}

interface AdCardProps {
  ad: Ad;
}

const AdCard = ({ ad }: AdCardProps) => {
  return (
    <div className="ad-card-container">
      <a className="ad-card-link" href={ad.link}>
        <img className="ad-card-image" src={ad.imgUrl} />
        <div className="ad-card-text">
          <div className="ad-card-title">{ad.titre}</div>
          <div className="ad-card-price">{ad.prix} €</div>
        </div>
      </a>
    </div>
  );
};

export default AdCard;