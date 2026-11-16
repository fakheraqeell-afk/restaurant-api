import { AppDataSource } from "../config/data-source.js";
import { Restaurant } from "../models/Restaurant.js";
import { ObjectId } from "mongodb";
import { getObjectId } from "../utils/getObjectId.js";
import { AppError } from "../utils/appError.js";
import { catchAsync } from "../utils/catchAsync.js";
import { Meal } from "../models/Meal.js";

const restaurantRepo = AppDataSource.getMongoRepository(Restaurant);
const mealRepo = AppDataSource.getMongoRepository(Meal)

//Create restaurant
export const createRestaurant = catchAsync(async(req, res) => {
    const {name, description, cuisine, address, contact, openingHours, image} = req.body
    const existing = await restaurantRepo.findOneBy({ name });
    if(existing) throw new AppError("Restaurant name already exists",  409);

    const restaurant = restaurantRepo.create({
        name,
        owner: new ObjectId(req.user.userId),
        description,
        cuisine,
        address,
        contact,
        openingHours,
        image,
        rating: 0,
        isActive: true
    });

   await restaurantRepo.save(restaurant);

    res.status(201).json({
        success: true,
        message: "Restaurant created successfully",
        restaurant
    });
    
});

//Get active restaurants
export const getAllRestaurants = catchAsync(async (req, res) => {
    const restaurants = await restaurantRepo.find({ where: {
            isActive: true
        }});

    res.status(200).json({
        success: true,
        results: restaurants.length,
        restaurants
    });
});

// get restaurant by Id
export const getRestaurant = catchAsync(async(req, res) => {
    const restaurantId = getObjectId(req.params.id);
    if(!restaurantId) throw new AppError("Invalid restaurant ID", 400);

    const restaurant = await restaurantRepo.findOneBy({
        _id: restaurantId,
        isActive: true
    });
    if(!restaurant) throw new AppError("Restaurant not found", 404);

    res.status(200).json({
        success: true,
        restaurant
    });
    
});

//Update restaurant by id
export const updateRestaurant = catchAsync(async(req, res) => {
    const restaurantId = getObjectId(req.params.id);
    if(!restaurantId) throw new AppError("Invalid restaurant ID", 400);
    
    const restaurant = await restaurantRepo.findOneBy({_id: restaurantId})
    if(!restaurant) throw new AppError("Restaurant not found", 404);

    if(req.user.role !== "admin" && restaurant.owner.toString() !== req.user.userId) throw new AppError("You are not allowed to update this restaurant", 403);

    const {
        name,
        description,
        cuisine,
        address,
        contact,
        openingHours,
        image,
        isActive
    } = req.body;

    if (name) restaurant.name = name;
    if (description) restaurant.description = description;
    if (cuisine) restaurant.cuisine = cuisine;
    if (address) restaurant.address = address;
    if (contact) restaurant.contact = contact;
    if (openingHours) restaurant.openingHours = openingHours;
    if (image) restaurant.image = image;
    if (isActive) restaurant.isActive = isActive; 

    await restaurantRepo.save(restaurant);

    res.status(200).json({
        success: true,
        message: "Restaurant updated successfully",
        restaurant
    }); 
    
});

 //Delete Restaurant
    export const deleteRestaurant = catchAsync(async(req, res) => {
        const restaurantId = getObjectId(req.params.id);
        if(!restaurantId) throw new AppError("Invalid restaurant ID", 400);
        
       const restaurant = await restaurantRepo.findOneBy({_id: restaurantId});
       if(!restaurant) throw new AppError("Restaurant not found", 404);

       //Check ownership
       if(req.user.role !== "admin" && restaurant.owner.toString() !== req.user.userId) throw new AppError("You are not allowed to delete this restaurant",403);

       const meals = mealRepo.find({
        where: {
            restaurant: restaurantId
        }
       });
       if(meals > 0 ){
        await mealRepo.remove(meals)
       }

       await restaurant.remove(restaurant);

       res.status(200).json({sucess: true, message: "Restaurant deleted successfully"});
    });


    export const getMyRestaurants = catchAsync(async (req, res) => {
    const restaurants = await restaurantRepo.find({
        where: {
            owner: getObjectId(req.user.userId)
        }
    });

    res.status(200).json({
        success: true,
        results: restaurants.length,
        restaurants
    });
});




export const getRestaurantMeals = catchAsync(async (req, res) => {
    const restaurantId = getObjectId(req.params.id) ;
    if(!restaurantId) throw new AppError("Invalid restaurant ID", 400);

    const restaurant = await restaurantRepo.findOneBy({
        _id: restaurantId,
        isActive: true
    });

    if (!restaurant) throw new AppError("Restaurant not found", 404);
    
    const meals = await mealRepo.find({
        where: {
            restaurant: restaurantId
        }
    });

    res.status(200).json({
        success: true,
        results: meals.length,
        meals
    });
});