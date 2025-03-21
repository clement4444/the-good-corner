import { BaseEntity, Column, Entity, JoinTable, ManyToMany, ManyToOne, JoinColumn, PrimaryGeneratedColumn } from "typeorm";
import { Category } from "./category";
import { Tag } from "./tag";

@Entity()
export class Ad extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    owner: string;

    @Column()
    price: number;

    @Column()
    picture: string;

    @Column()
    location: string;

    @Column()
    createdAt: Date;

    @ManyToOne(() => Category, category => category.id)
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
