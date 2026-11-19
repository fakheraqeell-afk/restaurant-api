import express from "express";
import { createRestaurant } from "../controllers/restaurantController.js";
import { getAllRestaurants } from "../controllers/restaurantController.js";
import { getRestaurant } from "../controllers/restaurantController.js";
import { updateRestaurant } from "../controllers/restaurantController.js";
import { deleteRestaurant } from "../controllers/restaurantController.js";
import { getMyRestaurants } from "../controllers/restaurantController.js";
import { getRestaurantMeals } from "../controllers/restaurantController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { validate } from "../middleware/validate.js"
import { createRestaurantSchema, updateRestaurantSchema } from "../validators/restaurantValidation.js";

const router = express.Router();

/**
 * @swagger
 * /restaurants:
 *   get:
 *     summary: Get all active restaurants
 *     tags: [Restaurants]
 *     responses:
 *       200:
 *         description: Restaurants retrieved successfully
 */


router.get("/", getAllRestaurants);



/**
 * @swagger
 * /restaurants:
 *   post:
 *     summary: Create a new restaurant
 *     tags: [Restaurants]
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
 *               - description
 *               - cuisine
 *               - address
 *               - contact
 *             properties:
 *               name:
 *                 type: string
 *                 example: Syrian Restaurant
 *               description:
 *                 type: string
 *                 example: A great Syrian restaurant
 *               cuisine:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: [Syrian, Mahashi]
 *               address:
 *                 type: object
 *                 example:
 *                   street: Main Street
 *                   city: Damascus
 *                   state: Damascus
 *                   zipCode: "10001"
 *                   country: Syria
 *               contact:
 *                 type: object
 *                 example:
 *                   phone: "0991234567"
 *                   email: restaurant@example.com
 *     responses:
 *       201:
 *         description: Restaurant created successfully
 *       401:
 *         description: Unauthorized
 */
router.post("/", authMiddleware(["admin","restaurant_owner"]), validate(createRestaurantSchema),createRestaurant);


/**
 * @swagger
 * /restaurants/{id}:
 *   get:
 *     summary: Get restaurant details
 *     tags: [Restaurants]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Restaurant found
 *       404:
 *         description: Restaurant not found
 */
router.get("/:id", getRestaurant);


/**
 * @swagger
 * /restaurants/{id}:
 *   put:
 *     summary: Update a restaurant
 *     tags: [Restaurants]
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
 *               cuisine:
 *                 type: array
 *                 items:
 *                   type: string
 *               isActive:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Restaurant updated successfully
 *       403:
 *         description: Forbidden
 */
router.put("/:id", authMiddleware(["admin", "restaurant_owner"]), validate(updateRestaurantSchema) ,updateRestaurant);

/**
 * @swagger
 * /restaurants/{id}:
 *   delete:
 *     summary: Delete a restaurant and its meals
 *     tags: [Restaurants]
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
 *         description: Restaurant and its meals deleted successfully
 *       403:
 *         description: Forbidden
 */
router.delete("/:id", authMiddleware(["admin", "restaurant_owner"]), deleteRestaurant)


/**
 * @swagger
 * /restaurants/owner/my-restaurants:
 *   get:
 *     summary: Get restaurants belonging to the logged-in owner
 *     tags: [Restaurants]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Owner restaurants retrieved successfully
 *       401:
 *         description: Unauthorized
 */
router.get("/owner/my-restaurants", authMiddleware(["admin","restaurant_owner"]), getMyRestaurants);

/**
 * @swagger
 * /restaurants/{id}/meals:
 *   get:
 *     summary: Get all meals of a restaurant
 *     tags: [Restaurants]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Restaurant meals retrieved successfully
 */
router.get("/:id/meals", getRestaurantMeals);

export default router;