import {
    BaseEntity,
    Column, Entity,
    PrimaryGeneratedColumn
} from "typeorm";

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

    @Column()
    categoryId: number;
}
