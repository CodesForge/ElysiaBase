// ============================================
// CUSTOM APPLICATION ERRORS
// ============================================

/**
 * Abstract base class for all application-level errors.
 * Provides standardized error structure and HTTP response formatting.
 * 
 * All custom errors should extend this class and define their own statusCode.
 */
export abstract class AppError extends Error {
    /** HTTP status code for this error (must be implemented by subclasses) */
    abstract readonly statusCode: number;

    /**
     * Creates a new AppError instance.
     * @param message - Human-readable error description
     */
    constructor(message: string) {
        super(message);
        this.name = this.constructor.name || "AppError";
    }

    /**
     * Converts this error into an HTTP Response object.
     * @returns Response with standardized JSON error payload
     */
    public toResponse(): Response {
        return Response.json(
            {
                status: this.statusCode,
                success: false,
                message: this.message,
            },
            {
                status: this.statusCode,
            }
        );
    }
}

/**
 * Error thrown when input data fails validation rules.
 * HTTP status code: 422 (Unprocessable Entity)
 * 
 * @example
 * throw new ValidationError("Email must contain @ symbol");
 */
export class ValidationError extends AppError {
    readonly statusCode = 422;
    
    constructor(message: string) {
        super(message);
    }
}

// Optional: Add more specific errors as needed

/**
 * Error thrown when a requested resource is not found.
 * HTTP status code: 404 (Not Found)
 */
export class NotFoundError extends AppError {
    readonly statusCode = 404;
    
    constructor(message: string = "Resource not found") {
        super(message);
    }
}

/**
 * Error thrown when user is not authenticated.
 * HTTP status code: 401 (Unauthorized)
 */
export class UnauthorizedError extends AppError {
    readonly statusCode = 401;
    
    constructor(message: string = "Unauthorized") {
        super(message);
    }
}

/**
 * Error thrown when user lacks permission to perform an action.
 * HTTP status code: 403 (Forbidden)
 */
export class ForbiddenError extends AppError {
    readonly statusCode = 403;
    
    constructor(message: string = "Forbidden") {
        super(message);
    }
}

/**
 * Error thrown when a resource already exists (e.g., duplicate email/username).
 * HTTP status code: 409 (Conflict)
 */
export class ConflictError extends AppError {
    readonly statusCode = 409;
    
    constructor(message: string) {
        super(message);
    }
}