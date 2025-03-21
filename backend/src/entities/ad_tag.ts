import {
    BaseEntity,
    Column, Entity,
    PrimaryGeneratedColumn
} from "typeorm";

@Entity()
export class Ad_tag extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    adId: number;

    @Column()
    tagId: number;
}
