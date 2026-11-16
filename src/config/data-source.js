import {DataSource } from 'typeorm';
import { User } from '../models/user.js';
import { Restaurant } from '../models/Restaurant.js';
import { Meal } from '../models/Meal.js';



export const AppDataSource = new DataSource(
    {
        type: 'mongodb',
        host: 'localhost',
        port: 27017,
        database: 'restaurantdb',
        authSource: 'admin',
        synchronize: true,
        logging: false,
        entities: [User,Restaurant, Meal]
    }
)