import express from "express";
import { getClientMeals, getClientRestaurants, getRestaurantById, getMealCategories } from "../controllers/clientController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();
router.use(authMiddleware(["client"]));

/**
 * @swagger
 * /client/meals:
 *   get:
 *     summary: Get available meals with filters
 *     tags: [Client]
 *     security:
 *       - bearerAuth: []
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
 *       - in: query
 *         name: isGlutenFree
 *         schema:
 *           type: boolean
 *       - in: query
 *         name: isSpicy
 *         schema:
 *           type: boolean
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Available meals retrieved successfully
 *       401:
 *         description: Unauthorized
 */
router.get("/meals", getClientMeals);

/**
 * @swagger
 * /client/restaurants:
 *   get:
 *     summary: Get active restaurants
 *     tags: [Client]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: cuisine
 *         schema:
 *           type: string
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *       - in: query
 *         name: rating
 *         schema:
 *           type: number
 *       - in: query
 *         name: city
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Restaurants retrieved successfully
 */
router.get("/restaurants", getClientRestaurants);


/**
 * @swagger
 * /client/restaurants/{id}:
 *   get:
 *     summary: Get restaurant details and its available meals
 *     tags: [Client]
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
 *         description: Restaurant and meals retrieved successfully
 *       404:
 *         description: Restaurant not found
 */
router.get("/restaurants/:id", getRestaurantById);


/**
 * @swagger
 * /client/categories:
 *   get:
 *     summary: Get available meal categories
 *     tags: [Client]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Categories retrieved successfully
 */
router.get("/categories", getMealCategories);

export default router;