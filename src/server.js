import dotenv from 'dotenv';
import { AppDataSource } from './config/data-source.js';
import app from './app.js';

dotenv.config();

const PORT = process.env.PORT || 3000;

AppDataSource.initialize().then(() => {
    // run application
    console.log("Connected to mongodb");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))

}).catch(err => console.error(' DB connection error ', err))