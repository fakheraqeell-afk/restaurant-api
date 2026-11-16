import { EntitySchema } from "typeorm";

export const User = new EntitySchema({
  name: "user",
  tableName: "users",
  columns: {
    _id: {
      primary: true,
      type: "ObjectId",
      generated: true,
      objectId: true,
    },
    name: {
      type: "string",
      unique: true,
    },
    email: {
      type: "string",
    },
    password: {
      type: "string",
    },
    role: {
      type: "string",
      enum: ["admin", "restaurant-owner", "client"],
      default: "client",
    },
    phone: {
      type: "string",
      nullable: true,
    },
    address: {
      type: "string",
      nullable: true,
    },
    createdAt: {
      type: "date",
      createDate: true,
    },
  },
});
