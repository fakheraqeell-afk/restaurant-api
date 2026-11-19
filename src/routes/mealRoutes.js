import express from "express";
import { createMeal, getAllMeals, getMealByID, updateMeal, deleteMeal } from "../controllers/mealController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { validate } from "../middleware/validate.js";
import { createMealSchema, updateMealSchema } from "../validators/mealValidation.js";

const router = express.Router();

/**
 * @swagger
 * /meals:
 *   get:
 *     summary: Get all meals with optional filters
 *     tags: [Meals]
 *     parameters:
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *       - in: query
 *         name: restaurant
 *         schema:
 *           type: string
 *       - in: query
 *         name: minPrice
 *         schema:
 *           type: number
 *       - in: query
 *         name: maxPrice
 *         schema:
 *           type: number
 *       - in: query
 *         name: isVegetarian
 *         schema:
 *           type: boolean
 *       - in: query
 *         name: isVegan
 *         schema:
 *           type: boolean
 *     responses:
 *       200:
 *         description: Meals retrieved successfully
 */
router.get("/", getAllMeals);


/**
 * @swagger
 * /meals:
 *   post:
 *     summary: Create a new meal
 *     tags: [Meals]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - restaurant
 *               - description
 *               - price
 *               - category
 *               - ingredients
 *               - preparationTime
 *             properties:
 *               name:
 *                 type: string
 *                 example: Burger
 *               restaurant:
 *                 type: string
 *                 example: 64f123456789abcdef123456
 *               description:
 *                 type: string
 *                 example: A delicious beef burger
 *               price:
 *                 type: number
 *                 example: 10
 *               category:
 *                 type: string
 *                 enum: [appetizer, main course]
 *               ingredients:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: [Beef, Bread, Cheese]
 *               preparationTime:
 *                 type: number
 *                 example: 15
 *               isVegetarian:
 *                 type: boolean
 *                 example: false
 *               isVegan:
 *                 type: boolean
 *                 example: false
 *               isGlutenFree:
 *                 type: boolean
 *                 example: false
 *               isSpicy:
 *                 type: boolean
 *                 example: false
 *     responses:
 *       201:
 *         description: Meal created successfully
 *       403:
 *         description: Forbidden
 */
router.post("/", authMiddleware(["admin", "restaurant_owner"]), validate(createMealSchema) ,createMeal);


/**
 * @swagger
 * /meals/{id}:
 *   get:
 *     summary: Get meal details
 *     tags: [Meals]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Meal found
 *       404:
 *         description: Meal not found
 */
router.get("/:id", getMealByID);

/**
 * @swagger
 * /meals/{id}:
 *   put:
 *     summary: Update a meal
 *     tags: [Meals]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               category:
 *                 type: string
 *               isAvailable:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Meal updated successfully
 *       403:
 *         description: Forbidden
 */
router.put("/:id", authMiddleware(["admin", "restaurant_owner"]), validate(updateMealSchema) ,updateMeal);


/**
 * @swagger
 * /meals/{id}:
 *   delete:
 *     summary: Delete a meal
 *     tags: [Meals]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Meal deleted successfully
 *       403:
 *         description: Forbidden
 */
router.delete("/:id", authMiddleware(["admin", "restaurant_owner"]), deleteMeal);


export default router;