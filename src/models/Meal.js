import { EntitySchema } from "typeorm";

export const Meal = new EntitySchema({
  name: "meal",
  tableName: "meali",
  columns: {
    _id: {
      primary: true,
      type: "objectId",
      generated: true,
      objectId: true,
    },
    name: {
      type: "string",
    },
    restaurant: {
      type: "objectId",
    },
    description: {
      type: "string",
    },
    price: {
      type: "double",
    },
    category: {
      type: "string",
      enum: ["appetizer", "main course", "dessert", "beverage", "side dish"],
    },
    ingredients: {
      type: "simple-json",
      nullable: true,
    },

    calories: {
      type: "int",
      nullable: true,
    },

    isVegetarian: {
      type: "boolean",
      default: false,
    },

    isVegan: {
      type: "boolean",
      default: false,
    },

    isGlutenFree: {
      type: "boolean",
      default: false,
    },

    isSpicy: {
      type: "boolean",
      default: false,
    },

    preparationTime: {
      type: "int",
    },

    isAvailable: {
      type: "boolean",
      default: true,
    },

    image: {
      type: "string",
      nullable: true,
    },
  },
});
