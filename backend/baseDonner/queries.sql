-- faire une eurreur si une clé étrangère nexiste pas
PRAGMA foreign_keys = ON;

DROP TABLE IF EXISTS ad_tag;
DROP TABLE IF EXISTS ad;
DROP TABLE IF EXISTS tag;
DROP TABLE IF EXISTS category;

-- crée tables
CREATE TABLE category (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nom TEXT NOT NULL
);

CREATE TABLE tag (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nom TEXT NOT NULL
);

CREATE TABLE ad (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT,
    owner TEXT NOT NULL,
    price INTEGER NOT NULL,
    picture TEXT,
    location TEXT,
    createdAt DATE,
    categoryId INTEGER NOT NULL,
    FOREIGN KEY (categoryId) REFERENCES category(id)
);

CREATE TABLE ad_tag (
    adId INT NOT NULL,
    tagId INT NOT NULL,
    PRIMARY KEY (adId, tagId),
    FOREIGN KEY (adId) REFERENCES ad(id) ON DELETE CASCADE,
    FOREIGN KEY (tagId) REFERENCES tag(id) ON DELETE CASCADE
);

--insertion de données

INSERT INTO category (nom) VALUES ('Vélos'), ('Voitures'), ('Fournitures scolaires'), ('Meubles'), ('Électronique'), ('Sports & Loisirs'), ('Électroménager'), ('Jardin & Extérieur');

INSERT INTO ad (title, description, owner, price, createdAt, picture, location, categoryId) 
VALUES
    ("Vélo à vendre", "Vélo en bon état, peu servi", "john.doe@gmail.com", 150, "2024-03-19", NULL, "Paris", 1),
    ("Voiture d'occasion", "Voiture très bien entretenue", "jane.smith@gmail.com", 5000, "2024-03-18", "https://example.com/image1.jpg", "Lyon", 2),
    ("Stylo plume", "Stylo plume Parker, encre bleue", "writer.seller@gmail.com", 15, "2024-09-01", NULL, "Bordeaux", 3),
    ("Chaise pliante", "Chaise pliante pratique pour camping", "camping.seller@gmail.com", 30, "2024-09-01", NULL, "Paris", 4),
    ("Lampe de chevet", "Lampe LED moderne, plusieurs couleurs", "home.seller@gmail.com", 35, "2024-09-01", NULL, "Lyon", 4),
    ("Table en bois massif", "Table en chêne, très solide", "woodworker@gmail.com", 200, "2024-03-14", NULL, "Bordeaux", 4),
    ("Smartphone Android", "Samsung Galaxy S21, très bon état", "phone.seller@gmail.com", 500, "2024-03-13", "https://example.com/image3.jpg", "Paris", 5),
    ("Montre connectée", "Apple Watch Series 7, fonctionne parfaitement", "watch.seller@gmail.com", 250, "2024-03-12", NULL, "Lyon", 5),
    ("Console de jeux", "PlayStation 5, avec deux manettes", "gamer@gmail.com", 450, "2024-03-11", "https://example.com/image4.jpg", "Bordeaux", 5),
    ("Paquet de stylos", "Lot de 10 stylos Bic", "office.seller@gmail.com", 5, "2024-02-10", NULL, "Paris", 3),
    ("Câble USB-C", "Chargeur rapide USB-C 2m", "tech.seller@gmail.com", 12, "2024-02-15", NULL, "Lyon", 5),
    ("Sac à dos", "Sac à dos 20L, idéal pour la randonnée", "sport.seller@gmail.com", 35, "2024-02-20", NULL, "Bordeaux", 6),
    ("Aspirateur robot", "Roomba i7, fonctionne très bien", "clean.seller@gmail.com", 300, "2024-03-08", NULL, "Bordeaux", 7),
    ("Machine à café", "Nespresso Vertuo, avec capsules offertes", "coffee.seller@gmail.com", 120, "2024-03-06", NULL, "Lyon", 7),
    ("VTT tout terrain", "Vélo de montagne avec suspensions", "bike.seller@gmail.com", 400, "2024-03-05", NULL, "Bordeaux", 1),
    ("Clé USB 64Go", "Clé USB Kingston 64Go neuve", "data.seller@gmail.com", 20, "2024-09-02", NULL, "Paris", 5),
    ("Cahier de notes", "Cahier A4 200 pages, lignage classique", "student.seller@gmail.com", 10, "2024-09-03", NULL, "Lyon", 3),
    ("Tapis de course", "Tapis pliable, idéal pour la maison", "fitness.seller@gmail.com", 600, "2024-03-01", NULL, "Paris", 6),
    ("Barbecue à gaz", "Barbecue Weber, idéal pour l'été", "bbq.seller@gmail.com", 250, "2024-02-28", "https://example.com/image7.jpg", "Lyon", 8),
    ("Trousse scolaire", "Trousse avec 5 stylos et règle", "school.seller@gmail.com", 8, "2024-09-02", NULL, "Bordeaux", 3);

INSERT INTO tag (nom) VALUES
    ("Vélo"), ("Voiture"), ("Électronique"), ("Meuble"), ("Jeux vidéo"),
    ("Maison"), ("Sport"), ("École"), ("Jardin"), ("Camping"),
    ("Technologie"), ("Musique"), ("Art"), ("Informatique"), ("Loisirs"),
    ("Cuisine"), ("Bricolage"), ("Voyage"), ("Luxe"), ("Écologie"),
    ("Accessoires"), ("High-Tech"), ("Mobilier"), ("Transport"), ("Fitness"),
    ("Mode"), ("Bureau"), ("Santé"), ("Photographie"), ("DIY");

INSERT INTO ad_tag (adId, tagId) VALUES
    (1, 1), (1, 6), (1, 7),  
    (2, 2), (2, 24), (2, 20), 
    (3, 8), (3, 14), (3, 27),
    (4, 9), (4, 10), 
    (5, 6), (5, 15), 
    (6, 4), (6, 23),
    (7, 3), (7, 11), (7, 22), 
    (8, 3), (8, 12), (8, 28), 
    (9, 5), (9, 15), (9, 21), 
    (10, 8), (10, 27), 
    (11, 3), (11, 14), 
    (12, 7), (12, 18), (12, 19), 
    (13, 7), (13, 25), (13, 29),
    (14, 16), (14, 17),
    (15, 1), (15, 7), (15, 24), 
    (16, 3), (16, 11), 
    (17, 8), (17, 27), 
    (18, 7), (18, 26), 
    (19, 9), (19, 10), (19, 21),
    (20, 8), (20, 14), (20, 30);

SELECT * FROM ad;
SELECT * FROM category;
SELECT * FROM ad_tag;

--SELECT * FROM ad WHERE location = "Bordeaux";

--DELETE FROM ad WHERE price > 40;

--UPDATE ad SET price = 0 WHERE createdAt = "2024-09-01";

--SELECT AVG(price) AS moyen_prix FROM ad WHERE location = "Paris";

--SELECT AVG(price) AS moyen_prix, location FROM ad GROUP BY location;

-- DELETE FROM ad WHERE id = 1;

-- UPDATE FROM ad SET (title, description, owner, price, picture, location) VALUES (?, ?, ?, ?, ?, ?) WHERE id = 1;