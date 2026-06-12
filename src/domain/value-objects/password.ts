// ============================================
// PASSWORD VALUE OBJECT
// ============================================

import { ValidationError } from "#/shared/errors";

export class Password {
    // Regular expression to check if password contains at least one digit
    private static readonly _HAS_NUMBER: RegExp = /\d/;
    
    // Regular expression to check if password contains at least one uppercase letter
    private static readonly _HAS_UPPERCASE: RegExp = /[A-Z]/;

    // Minimum allowed password length
    private static readonly _MIN_LEN: number = 8;
    
    // Maximum allowed password length
    private static readonly _MAX_LEN: number = 30;
    
    // The actual password value (raw string)
    public readonly value: string;

    /**
     * Private constructor – use Password.create() factory method instead.
     * This ensures the password is always validated before instantiation.
     */
    private constructor(value: string) {
        this.value = value;
    }

    /**
     * Factory method that creates a validated Password instance.
     * Validates: non-empty, length constraints, complexity requirements.
     * 
     * @param value - Raw password string to validate
     * @returns Password value object
     * @throws {ValidationError} If validation fails
     */
    public static create(value: string): Password {
        // Check for empty password
        if (!value) {
            throw new ValidationError("Password cannot be empty");
        }

        // Validate length constraints
        if (value.length < this._MIN_LEN || value.length > this._MAX_LEN) {
            throw new ValidationError(`Password must be between ${this._MIN_LEN} and ${this._MAX_LEN} characters`);
        }

        // Check for at least one digit
        if (!this._HAS_NUMBER.test(value)) {
            throw new ValidationError(
                "Password must contain at least one number",
            )
        }

        // Check for at least one uppercase letter
        if (!this._HAS_UPPERCASE.test(value)) {
            throw new ValidationError(
                "Password must contain at least one uppercase letter",
            )
        }

        // All validations passed – create the value object
        return new Password(value);
    }
}