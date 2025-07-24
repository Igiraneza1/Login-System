import { Response } from "express";

// Define a generic interface for typing the response format
interface IResponse<T> {
  status?: number;         // HTTP status code (optional, defaults to 200)
  success?: boolean;       // Indicates if the operation was successful
  message?: string;        // Custom message (e.g. "User created")
  data?: T;                // Optional payload data (any type T)
  res: Response;           // Express response object
}

// Export a generic function that formats and sends consistent responses
export const ResponseService = <T>({
  data,
  status = 200,
  message,
  success = true,
  res
}: IResponse<T>): Response<IResponse<T>> => {

  // If an internal server error occurred, override the message
  if (status === 500) {
    message = 'Internal server error';
  }

  // Common status codes you should use in your project:
  // 200 – OK
  // 201 – Created (for successful POST/PUT)
  // 400 – Bad Request (validation errors)
  // 401 – Unauthorized (not logged in)
  // 403 – Forbidden (no permission)
  // 404 – Not Found
  // 500 – Internal Server Error

  // Return a consistent JSON structure
  return res.status(status).json({
    data,
    message,
    success
  });
};
