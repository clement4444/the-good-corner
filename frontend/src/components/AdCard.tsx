
export interface AdCardProps {
  titre: string;
  imgUrl: string;
  prix: number;
  link: string;
}

const AdCard = ({ titre, imgUrl, prix, link }: AdCardProps) => {
  return (
    <div className="ad-card-container">
      <a className="ad-card-link" href={link}>
        <img className="ad-card-image" src={imgUrl} />
        <div className="ad-card-text">
          <div className="ad-card-title">{titre}</div>
          <div className="ad-card-price">{prix} €</div>
        </div>
      </a>
    </div>
  );
};

export default AdCard;