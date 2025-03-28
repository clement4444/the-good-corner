import axios from "axios";
import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import type { Categories } from "@/types/categorie";
import type { Tags } from "@/types/tags";
import type { Ad } from "@/types/adType";
import { toast } from "react-toastify";
import { useParams } from "react-router";

type Inputs = {
    title: string;
    description: string;
    owner: string;
    picture: string;
    price: number;
    location: string;
    categories: number;
    tags: String[];
}

const ModificationAd = () => {
    const { id } = useParams();
    const [categories, setCategories] = useState<Categories[]>([]);
    const [ad, setAd] = useState<Ad>();
    const [tags, setTags] = useState<Tags[]>([]);

    //préparation du formulaire
    const {
        register,
        handleSubmit,
    } = useForm<Inputs>()

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        try {
            if (ad) {
                console.log(data);
                await axios.put(`${import.meta.env.VITE_URL_API}/ads/${ad.id}`, data);
                toast.success("Modifier avec succès");
                return;
            }
            toast.error("Erreur de chargement de l'annonce pour la modification");
        } catch (error) {
            toast.error("Erreur lors de l'envoie de l'annonce");
            console.error(error);
        }
    };

    const fetchData = async () => {
        try {
            //fait la request au serveur
            const result = await axios.get(`${import.meta.env.VITE_URL_API}/ads/${id}`);
            if (result.data.length === 0) {
                toast.error("Annonce non trouvée");
            }
            setAd(result.data[0]);
        } catch (error) {
            toast.error("Une erreur est survenue");
            console.error(error);
        }
    }

    useEffect(() => {
        fetchData()
    }, []);

    //charger les catégories
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

    //charger les tags
    useEffect(() => {
        const fetchTags = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_URL_API}/tags`);
                setTags(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchTags();
    }, []);

    return (
        <>
            {ad &&
                <form onSubmit={handleSubmit(onSubmit)}>
                    {/* titre */}
                    <label>
                        Titre de l'annonce:
                        <input
                            className="text-field"
                            defaultValue={ad.title}
                            {...register("title", { required: true })}
                        />
                    </label>

                    <br />

                    {/* description */}
                    <label>
                        description:
                        <input
                            className="text-field"
                            defaultValue={ad.description}
                            {...register("description", { required: true })}
                        />
                    </label>

                    <br />

                    {/* auteur */}
                    <label>
                        mail:
                        <input
                            className="text-field"
                            defaultValue={ad.owner}
                            {...register("owner", { required: true })}
                        />
                    </label>

                    <br />

                    {/* prix */}
                    <label>
                        prix:
                        <input
                            className="text-field"
                            defaultValue={ad.price}
                            {...register("price", { required: true })}
                        />
                    </label>

                    <br />

                    {/* image */}
                    <label>
                        image:
                        <input
                            className="text-field"
                            defaultValue={ad.picture}
                            {...register("picture", { required: true })}
                        />
                    </label>

                    <br />

                    {/* localisation */}
                    <label>
                        localisation:
                        <input
                            className="text-field"
                            defaultValue={ad.location}
                            {...register("location", { required: true })}
                        />
                    </label>

                    <br />

                    {categories.length > 0 &&
                        <label>
                            Choisissez une catégorie:
                            <select
                                className="text-field"
                                defaultValue={ad.categories.id}
                                {...register("categories", { required: true })}
                            >
                                {categories.map((ca) => (
                                    <option key={ca.id} value={ca.id}>
                                        {ca.nom}
                                    </option>
                                ))}
                            </select>
                        </label>
                    }

                    {tags.length > 0 &&
                        tags.map((tag) => (
                            <label key={tag.id}>
                                <input
                                    type="checkbox"
                                    defaultChecked={ad.tags.some((el) => el.id === tag.id)}
                                    value={tag.id}
                                    {...register("tags")}
                                />
                                {tag.nom}
                            </label>
                        ))
                    }
                    <button className="button">Modifier</button>
                </form>}
        </>
    );
};

export default ModificationAd;