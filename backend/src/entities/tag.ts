import {
    BaseEntity,
    Column, Entity,
    ManyToMany,
    PrimaryGeneratedColumn
} from "typeorm";
import { Ad } from "./ad";

@Entity()
export className Tag extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nom: string;

    @ManyToMany(() => Ad, ad => ad.id)
    ads: Ad[];
}
