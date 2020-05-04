import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100, nullable: false })
  first_name: string;

  @Column({ length: 100, nullable: false })
  last_name: string;

  @Column({ nullable: false })
  years: number;

  @Column({ nullable: false })
  created_on: Date;
}
