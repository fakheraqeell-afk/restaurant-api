// utils/getObjectId.js
import { ObjectId } from "mongodb";
import { AppError } from "./appError.js";

/**
 * Safely converts a string ID to MongoDB ObjectId.
 * Throws 400 AppError if invalid.
 * @param {string} idStr
 * @returns {ObjectId}
 */
export const getObjectId = (idStr) => {
    try {
        return new ObjectId(idStr);
    } catch {
        throw new AppError("Invalid task ID format", 400);
    }
};
