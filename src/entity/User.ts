import { Entity, Column, BaseEntity, PrimaryGeneratedColumn } from "typeorm";
import { Redis } from "ioredis";
import uuid = require("uuid/v4");
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
    const id = uuid();
    redis.set(id, this.id, "ex", 60 * 60 * 24);

    return `${url}/confirm/${id}`;
  }
}
