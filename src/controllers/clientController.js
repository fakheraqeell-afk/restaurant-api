import { AppDataSource } from "../config/data-source.js";
import { Meal } from "../models/Meal.js";
import { Restaurant } from "../models/Restaurant.js";
import { catchAsync } from "../utils/catchAsync.js";
import { AppError } from "../utils/appError.js";
import { getObjectId } from "../utils/getObjectId.js";

const mealRepo = AppDataSource.getMongoRepository(Meal);
const restaurantRepo = AppDataSource.getMongoRepository(Restaurant);

export const getClientMeals = catchAsync(async (req, res) => {
    const {
        category,
        restaurant,
        minPrice,
        maxPrice,
        isVegetarian,
        isVegan,
        isGlutenFree,
        isSpicy,
        search
    } = req.query;
    const meals = await mealRepo.find();
    const restaurants = await restaurantRepo.find();

    let availableMeals = meals.filter(meal => {
        const restaurant = restaurants.find(restaurant =>
            restaurant._id.toString() === meal.restaurant.toString()
        );

        return meal.isAvailable && restaurant && restaurant.isActive;
    });

    if (category) availableMeals = availableMeals.filter( meal => meal.category === category );

    if (restaurant) availableMeals = availableMeals.filter( meal => meal.restaurant.toString() === restaurant);

    if (minPrice)  availableMeals = availableMeals.filter( meal => meal.price >= Number(minPrice) );

    if (maxPrice) availableMeals = availableMeals.filter( meal => meal.price <= Number(maxPrice));
    
    if (search) availableMeals = availableMeals.filter( meal => meal.name.toLowerCase().includes(search.toLowerCase()));

    if (isVegetarian) availableMeals = availableMeals.filter( meal => meal.isVegetarian === (isVegetarian ==="true"));

    if (isVegan) availableMeals = availableMeals.filter( meal => meal.isVegan === (isVegan === "true"));


    if (isGlutenFree) availableMeals = availableMeals.filter(meal => meal.isGlutenFree === (isGlutenFree === "true"));


    if (isSpicy) availableMeals = availableMeals.filter( meal => meal.isSpicy === (isSpicy === "true"));


    res.status(200).json({
        success: true,
        results: availableMeals.length,
        meals: availableMeals
    });
});

export const getClientRestaurants = catchAsync(async (req, res) => {
    const { cuisine, search, rating, city } = req.query;
    let restaurants = await restaurantRepo.find({where: { isActive: true }});

    if (cuisine) restaurants = restaurants.filter( restaurant => restaurant.cuisine?.includes(cuisine) );
    

    if (search) restaurants = restaurants.filter(restaurant => restaurant.name.toLowerCase().includes(search.toLowerCase()));
    

    if (rating) restaurants = restaurants.filter( restaurant => restaurant.rating >= Number(rating));

    if(city) restaurants = restaurants.filter(restaurant => restaurant.address.city.toLowerCase() === city.toLowerCase())
    

    res.status(200).json({
        success: true,
        results: restaurants.length,
        restaurants: restaurants
    });
});


// GET restaurant by ID
export const getRestaurantById = catchAsync(async(req, res) => {
    const restaurantId = getObjectId(req.params.id);
    if(!restaurantId) throw new AppError("Invalid restaurant ID", 400);

    const restaurant = await restaurantRepo.findOneBy({
        _id: restaurantId
    });

    if(!restaurant) throw new AppError("Restaurant not found", 404);

    const meals = await mealRepo.find();

    const restaurantMeals = meals.filter(meal =>
        meal.restaurant.toString() === restaurant._id.toString() 
    );

    res.status(200).json({
        success: true,
        restaurant: ({ name: restaurant.name, description: restaurant.description, owner: restaurant.owner }),
        results: meals.length,
        meals: restaurantMeals
    });
    
});

export const getMealCategories = catchAsync(async (req, res) => {
    const meals = await mealRepo.find();

    const categories = [];

    meals.forEach(meal => {
        if (!categories.includes(meal.category)) {
            categories.push(meal.category);
        }
    });

    res.status(200).json({
        success: true,
        results: categories.length,
        categories
    });
});