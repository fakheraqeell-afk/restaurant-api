import { EntitySchema } from "typeorm";

export const Restaurant = new EntitySchema({
  name: "restaurant",
  tableName: "restaurants",
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
    owner: {
      type: "ObjectId",
    },
    description: {
      type: "string",
      nullable: true,
    },

    cuisine: {
      type: "simple-json",
      nullable: true,
    },

    address: {
      type: "simple-json",
    },

    contact: {
      type: "simple-json",
      nullable: true,
    },

    openingHours: {
      type: "simple-json",
      nullable: true,
    },

    rating: {
      type: "double",
      default: 0,
    },

   isActive: {
    type: "boolean",
    default: true,
    },

    image: {
      type: "string",
      nullable: true,
    },
  },
});
