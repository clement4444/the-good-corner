import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useForm, SubmitHandler } from "react-hook-form";
import type { Categories } from "@/types/categorie";
import { toast } from "react-toastify";

type Inputs = {
  title: string;
  description: string;
  owner: string;
  picture: string;
  price: number;
  location: string;
  category_id: number;
}

const NewAdForm = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<Categories[]>([]);

  //préparation du formulaire
  const {
    register,
    handleSubmit,
  } = useForm<Inputs>()

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      await axios.post(`${import.meta.env.VITE_URL_API}/ads`, data);
      toast.success("Annonce crée avec succès");
      navigate("/");
    } catch (error) {
      alert("Erreur lors de l'envoie de l'annonce");
      console.error(error);
    }
  };

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
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* titre */}
        <label>
          Titre de l'annonce:
          <input
            className="text-field"
            defaultValue="maison"
            {...register("title", { required: true })}
          />
        </label>

        <br />

        {/* description */}
        <label>
          description:
          <input
            className="text-field"
            defaultValue="maison 200km²"
            {...register("description", { required: true })}
          />
        </label>

        <br />

        {/* auteur */}
        <label>
          mail:
          <input
            className="text-field"
            defaultValue="auteur@gmail.com"
            {...register("owner", { required: true })}
          />
        </label>

        <br />

        {/* prix */}
        <label>
          prix:
          <input
            className="text-field"
            defaultValue="2"
            {...register("price", { required: true })}
          />
        </label>

        <br />

        {/* image */}
        <label>
          image:
          <input
            className="text-field"
            defaultValue="https://th.bing.com/th/id/R.712ff44360b0eec68b6766f8fc43caa0?rik=duVyXCtTsD%2b2mg&pid=ImgRaw&r=0"
            {...register("picture", { required: true })}
          />
        </label>

        <br />

        {/* localisation */}
        <label>
          localisation:
          <input
            className="text-field"
            defaultValue="grenland"
            {...register("location", { required: true })}
          />
        </label>

        <br />

        {categories.length > 0 &&
          <label>
            Choisissez une catégorie:
            <select
              className="text-field"
              defaultValue={categories[0].id}
              {...register("category_id", { required: true })}
            >
              {categories.map((ca) => (
                <option key={ca.id} value={ca.id}>
                  {ca.nom}
                </option>
              ))}
            </select>
          </label>
        }
        <button className="button">Envoyer</button>
      </form>
    </>
  );
};

export default NewAdForm;