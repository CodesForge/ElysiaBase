/**
 * @fileoverview Custom application errors and validation layer.
 * Provides standardized HTTP exceptions that self-serialize into clean JSON responses.
 */

// ============================================
// CORE APPLICATION ERRORS
// ============================================
export {
    ValidationError,
    NotFoundError,
    UnauthorizedError,
    ForbiddenError,
    ConflictError
} from './errors';