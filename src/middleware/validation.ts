import { NextFunction, Request, Response } from "express";
import { ObjectSchema } from "joi";
import { ZodSchema, ZodError } from "zod";
import { ResponseService } from "../utils/response";


interface ValidateOption<T> {
  type: "body" | "headers" | "params";
  schema: ObjectSchema<T> | ZodSchema;
  refType: "joi" | "zod"; 
}


export const ValidationMiddleware = <T>({ type, schema, refType }: ValidateOption<T>) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      const dataToValidate = req[type]; 

      if (refType === "joi") {
        
        const { error } = (schema as ObjectSchema<T>).validate(dataToValidate, { abortEarly: false });

        if (error) {
          return ResponseService({
            res,
            data: error.details,
            message: "Validation Error (Joi)",
            status: 400,
            success: false,
          });
        }

      } else if (refType === "zod") {
    
        const result = (schema as ZodSchema).safeParse(dataToValidate);

        if (!result.success) {
          const zodError = result.error as ZodError;
          return ResponseService({
            res,
            data: zodError.errors,
            message: "Validation Error (Zod)",
            status: 400,
            success: false,
          });
        }

      } else {
        
        return ResponseService({
          res,
          message: "Unsupported validation schema type",
          status: 500,
          success: false,
        });
      }

      // ✅ Validation passed → continue to next middleware/controller
      next();

    } catch (error) {
      return ResponseService({
        res,
        data: error,
        message: "Validation failed due to server error",
        status: 500,
        success: false,
      });
    }
  };
