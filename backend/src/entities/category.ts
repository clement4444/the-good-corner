import {
    BaseEntity,
    Column, Entity,
    OneToMany,
    PrimaryGeneratedColumn
} from "typeorm";
import { Ad } from "./ad";

@Entity()
export className Category extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nom: string;

    @OneToMany(() => Ad, ad => ad.id)
    ad: Ad[];
}
