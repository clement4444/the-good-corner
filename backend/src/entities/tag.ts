import {
    BaseEntity,
    Column, Entity,
    ManyToMany,
    PrimaryGeneratedColumn
} from "typeorm";
import { Ad } from "./ad";
import { Field, ObjectType } from "type-graphql";

@Entity()
@ObjectType()
export class Tag extends BaseEntity {
    @PrimaryGeneratedColumn()
    @Field()
    id: number;

    @Column()
    @Field()
    nom: string;

    @ManyToMany(() => Ad, ad => ad.tags)
    @Field(() => [Ad])
    ad: Ad[];
}
