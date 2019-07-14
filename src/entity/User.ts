import { Entity, Column, BaseEntity, PrimaryGeneratedColumn } from "typeorm";
import { Redis } from "ioredis";
import { createEmailConfirmationLink } from "../utils/create-email-confirmation-link";
@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("varchar", { length: 255 })
  email: string;

  @Column("text")
  password: string;

  @Column("boolean", { default: false })
  confirmed: boolean;

  createConfirmationLink(url: string, redis: Redis) {
    return createEmailConfirmationLink(url, this.id, redis);
  }
}
