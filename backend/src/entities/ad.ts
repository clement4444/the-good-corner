import { BaseEntity, Column, Entity, JoinTable, ManyToMany, ManyToOne, JoinColumn, PrimaryGeneratedColumn, CreateDateColumn } from "typeorm";
import { Category } from "./category";
import { Tag } from "./tag";
import { Field, ObjectType } from "type-graphql";

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
    categories: Category;

    @ManyToMany(() => Tag, tag => tag.id)
    @JoinTable({
        name: "ads_tags",
        joinColumns: [{ name: "ad_id" }],
        inverseJoinColumns: [{ name: "tag_id" }]
    })
    tags: Tag[];
}
