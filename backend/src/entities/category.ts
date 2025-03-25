import {
    BaseEntity,
    Column, Entity,
    OneToMany,
    PrimaryGeneratedColumn
} from "typeorm";
import { Ad } from "./ad";

@Entity()
export class Category extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nom: string;

    @OneToMany(() => Ad, ad => ad.id)
    ad: Ad[];
}
