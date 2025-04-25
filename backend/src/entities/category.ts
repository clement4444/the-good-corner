import {
    BaseEntity,
    Column, Entity,
    OneToMany,
    PrimaryGeneratedColumn
} from "typeorm";
import { Ad } from "./ad";
import { Field, ObjectType } from "type-graphql";

@Entity()
@ObjectType()
export class Category extends BaseEntity {
    @PrimaryGeneratedColumn()
    @Field()
    id: number;

    @Column()
    @Field()
    nom: string;

    @OneToMany(() => Ad, ad => ad.categories)
    @Field(() => [Ad])
    ad: Ad[];
}
