import { AppDataSource } from "../config/data-source.js";
import { Restaurant } from "../models/Restaurant.js";
import { Meal } from "../models/Meal.js";
import { ObjectId } from "mongodb";
import { getObjectId } from "../utils/getObjectId.js";
import { catchAsync } from "../utils/catchAsync.js";
import { AppError } from "../utils/appError.js";

const mealRepo = AppDataSource.getMongoRepository(Meal);
const restaurantRepo = AppDataSource.getMongoRepository(Restaurant);

//Create a Meal
export const createMeal = catchAsync(async(req, res) => {
    const {
        name,
        restaurant,
        description,
        price,
        category,
        ingredients,
        calories,
        isVegetarian,
        isVegan,
        isGlutenFree,
        isSpicy,
        preparationTime,
        image
    } = req.body;

    const existingrestaurant = await restaurantRepo.findOneBy({_id: getObjectId(restaurant)});
    if(!existingrestaurant) throw new AppError("Restaurant not found", 404);

    if(req.user.role !== "admin" && existingrestaurant.owner.toString() !== req.user.userId) throw new AppError("You are not allowed to add meals to this restaurant", 403);
    
    const meal = mealRepo.create({
        name,
        restaurant: getObjectId(restaurant),
        description,
        price,
        category,
        ingredients,
        calories,
        isVegetarian: isVegetarian ?? false,
        isVegan: isVegan ?? false,
        isGlutenFree: isGlutenFree ?? false,
        isSpicy: isSpicy ?? false,
        preparationTime,
        isAvailable: true,
        image
    });

    await mealRepo.save(meal)
    
    res.status(201).json({
        success: true,
        message: "Meal created successfully",
        meal
    });

});

// Get all meals with filters
export const getAllMeals = catchAsync(async (req, res) => {
     const {
        category,
        restaurant,
        minPrice,
        maxPrice,
        isVegetarian,
        isVegan
    } = req.query;

    let meals = await mealRepo.find();

    if (category) meals = meals.filter(meal => meal.category === category);

    if (restaurant)  meals = meals.filter( meal => meal.restaurant.toString() === restaurant);

    if (minPrice)  meals = meals.filter(meal => meal.price >= Number(minPrice));

    if (maxPrice) meals = meals.filter(meal => meal.price <= Number(maxPrice));
    
    if (isVegetarian) meals = meals.filter(meal => meal.isVegetarian === (isVegetarian === "true"));

    if (isVegan)  meals = meals.filter(meal => meal.isVegan === (isVegan === "true"));
    
    res.status(200).json({
        success: true,
        results: meals.length,
        meals
    });
});

//Get a single meal by id
export const getMealByID = catchAsync(async(req, res) => {
    const mealId = getObjectId(req.params.id);
    if(!mealId) throw new AppError("Invalid meal ID", 400);

    const meal = await mealRepo.findOneBy({_id: mealId});
    if(!meal) throw new AppError("Meal not found", 404);

    res.status(200).json({
        success: true,
        meal
    });
});

// Put meal by ID
export const updateMeal = catchAsync(async(req, res) => {
    const mealId = getObjectId(req.params.id);
    if(!mealId) throw new AppError("Invalid meal ID", 400);

    const meal = await mealRepo.findOneBy({_id: mealId})
    if(!meal) throw new AppError("Meal not found", 404);

    const restaurant = await restaurantRepo.findOneBy({_id: meal.restaurant});
    if(!restaurant) throw new AppError("Restaurant not found", 404);

    if(req.user.role !== "admin" && restaurant.owner.toString() !== req.user.userId)
         throw new AppError("You are not allowed to update this meal", 403);

    const {
        name,
        description,
        price,
        category,
        ingredients,
        calories,
        isVegetarian,
        isVegan,
        isGlutenFree,
        isSpicy,
        preparationTime,
        isAvailable,
        image
    } = req.body;

    if (name) meal.name = name;
    if (description) meal.description = description;
    if (price) meal.price = price;
    if (category) meal.category = category;
    if (ingredients) meal.ingredients = ingredients;
    if (calories) meal.calories = calories;
    if (isVegetarian) meal.isVegetarian = isVegetarian;
    if (isVegan) meal.isVegan = isVegan;
    if (isGlutenFree) meal.isGlutenFree = isGlutenFree;
    if (isSpicy) meal.isSpicy = isSpicy;
    if (preparationTime) meal.preparationTime = preparationTime;
    if (isAvailable) meal.isAvailable = isAvailable;
    if (image) meal.image = image;

    await mealRepo.save(meal);

    res.status(200).json({
        success: true,
        message: "Meal updated successfully",
        meal
    });
    
}); 

// Delete meal by ID
export const deleteMeal = catchAsync(async(req, res) => {
    const mealId = getObjectId(req.params.id);
    if(!mealId) throw new AppError("Invalid meal ID", 400);

    const meal = mealRepo.findOneBy({_id: mealId});
    if(!meal) throw new AppError("Meal not found", 404);

    const restaurant = await restaurantRepo.findOneBy({_id: meal.restaurant});
    if (!restaurant) throw new AppError("Restaurant not found", 404);

    if(req.user.role !== "admin" && restaurant.owner.toString() !== req.user.userId)
        throw new AppError("You are not allowed to delete this meal", 403);
        
    await mealRepo.delete(meal);

    res.status(200).json({
        success: true,
        message: "Meal deletd successfully"
    })
    
    
});
