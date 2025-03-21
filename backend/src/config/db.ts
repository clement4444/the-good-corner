import { DataSource } from "typeorm";
import { Ad_tag } from "../entities/ad_tag";
import { Ad } from "../entities/ad";
import { Category } from "../entities/category";
import { Tag } from "../entities/tag";

export const dataSource = new DataSource({
    type: "sqlite",
    database: "../../baseDonner/good_corner.sqlite",
    entities: [Ad, Ad_tag, Category, Tag],
    synchronize: true
});