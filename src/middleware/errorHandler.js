import { AppError } from "../utils/appError.js";

export const errorHandler = (err, req, res, next) => {
    console.error(err);

    if (err instanceof AppError) {
        return res.status(err.status).json({
            success: false,
            message: err.message,
            ...(err.details ? { errors: err.details } : {}),
        });
    }

    res.status(500).json({
        success: false,
        message: "Internal Server Error",
    });
};
