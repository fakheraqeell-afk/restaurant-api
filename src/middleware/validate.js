import { AppError } from "../utils/appError.js";
export const validate = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body, { abortEarly: false });
        if (error) {
            return next(
                new AppError(
                    "Validation error",
                    400,
                    error.details.map((d) => d.message)
                )
            );
        }
        next();
    };
};
