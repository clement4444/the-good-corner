import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useForm, SubmitHandler } from "react-hook-form";
import type { Categories } from "@/types/categorie";
import type { Tags } from "@/types/tags";
import { toast } from "react-toastify";
import { useGetAllCategoriesQuery, useGetAllTagsQuery, useCreateAdMutation, CreateAdMutationVariables } from "../generated/graphql-types";
import { GET_ALL_ADS } from "../graphql/operations";

type Inputs = {
  title: string;
  description: string;
  owner: string;
  picture: string;
  price: number;
  location: string;
  category_id: number;
  tags: String[] | boolean;
}

const NewAdForm = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<Categories[]>([]);
  const [tags, setTags] = useState<Tags[]>([]);

  const { data: dataCategorie } = useGetAllCategoriesQuery();
  const { data: dataTags } = useGetAllTagsQuery();

  type CreateAdType = CreateAdMutationVariables["data"];
  const [createAd] = useCreateAdMutation({ refetchQueries: [GET_ALL_ADS] });


  //préparation du formulaire
  const {
    register,
    handleSubmit,
  } = useForm<CreateAdType>()

  const onSubmit: SubmitHandler<CreateAdType> = async (data) => {
    try {
      console.log(data);
      createAd({ variables: { data } });
      toast.success("Annonce crée avec succès");
      navigate("/", { replace: true });
    } catch (error) {
      toast.error("Erreur lors de l'envoie de l'annonce");
      console.error(error);
    }
  };

  // //charger les catégories
  // useEffect(() => {
  //   const fetchCategories = async () => {
  //     try {
  //       const response = await axios.get(`${import.meta.env.VITE_URL_API}/categories`);
  //       setCategories(response.data);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };
  //   fetchCategories();
  // }, []);

  // //charger les tags
  // useEffect(() => {
  //   const fetchTags = async () => {
  //     try {
  //       const response = await axios.get(`${import.meta.env.VITE_URL_API}/tags`);
  //       setTags(response.data);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };
  //   fetchTags();
  // }, []);

  if (!dataCategorie || !dataTags) {
    return <p>Loading...</p>;
  }

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

        {dataCategorie.getAllCategories.length > 0 &&
          <label>
            Choisissez une catégorie:
            <select
              className="text-field"
              defaultValue={dataCategorie.getAllCategories[0].id}
              {...register("category_id", { required: true })}
            >
              {dataCategorie.getAllCategories.map((ca) => (
                <option key={ca.id} value={ca.id}>
                  {ca.nom}
                </option>
              ))}
            </select>
          </label>
        }

        {dataTags.getAllTags.length > 0 &&
          dataTags.getAllTags.map((tag) => (
            <label key={tag.id}>
              <input
                type="checkbox"
                value={tag.id}
                {...register("tags")}
              />
              {tag.nom}
            </label>
          ))}
        <button className="button">Envoyer</button>
      </form>
    </>
  );
};

export default NewAdForm;