import type { Categories } from "./categorie";

export interface Ad {
    id: number;
    title: string;
    description: string;
    owner: string;
    picture: string;
    price: number;
    location: string;
    createdAt: Date;
    categories: Categories;
    tags?: string[];
}