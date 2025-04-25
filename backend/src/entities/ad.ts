import { BaseEntity, Column, Entity, JoinTable, ManyToMany, ManyToOne, JoinColumn, PrimaryGeneratedColumn, CreateDateColumn } from "typeorm";
import { Category } from "./category";
import { Tag } from "./tag";
import { Field, InputType, ObjectType, ID } from "type-graphql";

@Entity()
@ObjectType()
export class Ad extends BaseEntity {
    @PrimaryGeneratedColumn()
    @Field()
    id: number;

    @Column()
    @Field()
    title: string;

    @Column()
    @Field()
    description: string;

    @Column()
    @Field()
    owner: string;

    @Column()
    @Field()
    price: number;

    @Column()
    @Field()
    picture: string;

    @Column()
    @Field()
    location: string;

    @CreateDateColumn()
    @Field()
    createdAt: Date;

    //category obligatoire
    @ManyToOne(() => Category, category => category.id, { nullable: false })
    @JoinColumn({ name: "category_id" })
    @Field(() => Category)
    categories: Category;

    @ManyToMany(() => Tag, tag => tag.ad, { eager: true })
    @JoinTable({
        name: "ads_tags",
        joinColumns: [{ name: "ad_id" }],
        inverseJoinColumns: [{ name: "tag_id" }]
    })
    @Field(() => [Tag])
    tags: Tag[];
}


@InputType()
export class AdInput {
    @Field()
    title: string;

    @Field()
    description: string;

    @Field()
    owner: string;

    @Field()
    price: number;

    @Field()
    picture: string;

    @Field()
    location: string;

    @Field(() => ID)
    categories: Category;

    @Field(() => [ID])
    tags: Tag[];
}