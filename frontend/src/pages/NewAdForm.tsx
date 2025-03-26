import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

interface category {
  id: number;
  nom: string;
}

interface AdFormData {
  titre: string;
  description: string;
  owner: string;
  price: number;
  picture: string;
  location: string;
  category: string;
}

const NewAdForm = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_URL_API}/categories`);
        setCategories(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCategories();
  }, []);

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);
        const formJson = Object.fromEntries(formData.entries());
        try {
          await axios.post(`${import.meta.env.VITE_URL_API}/ads`, formJson);
          navigate("/");
        } catch (error) {
          alert("Erreur lors de l'envoie de l'annonce");
          console.error(error);
        }
      }}
    >
      {/* titre */}
      <label>
        Titre de l'annonce:
        <input type="text" className="text-field" name="title" />
      </label>

      <br />

      {/* description */}
      <label>
        description:
        <input type="text" className="text-field" name="description" />
      </label>

      <br />

      {/* auteur */}
      <label>
        mail:
        <input type="email" className="text-field" name="owner" />
      </label>

      <br />

      {/* prix */}
      <label>
        prix:
        <input type="number" className="text-field" name="price" />
      </label>

      <br />

      {/* image */}
      <label>
        image:
        <input type="text" className="text-field" name="picture" />
      </label>

      <br />

      {/* localisation */}
      <label>
        localisation:
        <input type="text" className="text-field" name="location" />
      </label>

      <br />

      <label>
        Choisissez une catégorie:
        <select name="category_id" className="text-field">
          {categories.map((ca) => (
            <option key={ca.id} value={ca.id}>
              {ca.nom}
            </option>
          ))}
        </select>
      </label>
      <button className="button">Envoyer</button>
    </form>
  );
};

export default NewAdForm;