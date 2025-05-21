import { DataSource } from "typeorm";
import { Ad } from "../entities/ad";
import { Category } from "../entities/category";
import { Tag } from "../entities/tag";

const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_DATABASE } = process.env;

export const dataSource = new DataSource({
    type: "postgres",
    host: DB_HOST,
    username: DB_USER,
    password: DB_PASSWORD,
    database: DB_DATABASE,
    port: Number(DB_PORT),

    entities: [Ad, Category, Tag],
    synchronize: true,
    // logging: ["error", "query"]
});