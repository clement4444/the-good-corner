import type { AdCardProps } from "./AdCard";
import AdCard from "./AdCard";

const RecentAds = () => {
  const ads: AdCardProps[] = [
    {
      titre: "Table",
      imgUrl: "/images/table.webp",
      prix: 120,
      link: "/ads/table"
    },
    {
      titre: "Dame-jeanne",
      imgUrl: "/images/dame-jeanne.webp",
      prix: 75,
      link: "/ads/dame-jeanne"
    },
    {
      titre: "Vide-poche",
      imgUrl: "/images/vide-poche.webp",
      prix: 4,
      link: "/ads/vide-poche"
    },
    {
      titre: "Vaisselier",
      imgUrl: "/images/vaisselier.webp",
      prix: 900,
      link: "/ads/vaisselier"
    },
    {
      titre: "Bougie",
      imgUrl: "/images/bougie.webp",
      prix: 8,
      link: "/ads/bougie"
    },
    {
      titre: "Porte-magazine",
      imgUrl: "/images/porte-magazine.webp",
      prix: 45,
      link: "/ads/porte-magazine"
    }
  ];

  return (
    <>
      <h2>Annonces récentes</h2>
      <section className="recent-ads">
        {ads.map((ad, index) => (
          <AdCard
            key={index}
            titre={ad.titre}
            imgUrl={ad.imgUrl}
            prix={ad.prix}
            link={ad.link}
          />
        ))}
      </section>
    </>
  );
};

export default RecentAds;