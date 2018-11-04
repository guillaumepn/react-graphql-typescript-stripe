import {Entity, PrimaryGeneratedColumn, Column, BaseEntity} from "typeorm";

@Entity()
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column("text")
    email: string;

    @Column("text")
    password: string;

    @Column("text", {nullable: true})
    stripeId: string | null;

    @Column("text", {default: "free-trial"})
    type: string;

    @Column("text", {nullable: true})
    ccLast4: string | null;

}