import type { Ad } from "./AdCard";
import AdCard from "./AdCard";

const RecentAds = () => {
  const ads: Ad[] = [
    {
      id: 1,
      titre: "Table",
      imgUrl: "/images/table.webp",
      prix: 120,
      link: "/ads/table"
    },
    {
      id: 2,
      titre: "Dame-jeanne",
      imgUrl: "/images/dame-jeanne.webp",
      prix: 75,
      link: "/ads/dame-jeanne"
    },
    {
      id: 3,
      titre: "Vide-poche",
      imgUrl: "/images/vide-poche.webp",
      prix: 4,
      link: "/ads/vide-poche"
    },
    {
      id: 4,
      titre: "Vaisselier",
      imgUrl: "/images/vaisselier.webp",
      prix: 900,
      link: "/ads/vaisselier"
    },
    {
      id: 5,
      titre: "Bougie",
      imgUrl: "/images/bougie.webp",
      prix: 8,
      link: "/ads/bougie"
    },
    {
      id: 6,
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
        {ads.map((ad) => (
          <AdCard
            key={ad.id}
            ad={ad}
          />
        ))}
      </section>
    </>
  );
};

export default RecentAds;