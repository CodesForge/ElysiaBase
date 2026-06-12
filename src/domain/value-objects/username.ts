// ============================================
// USERNAME VALUE OBJECT
// ============================================

import { ValidationError } from '#/shared/errors';

export class Username {
    // Regular expression: allows alphanumeric characters and underscores only (no spaces or special chars)
    private static readonly _USERNAME_PATTERN: RegExp = /^[a-zA-Z0-9_]+$/;

    // Minimum username length
    private static readonly _MIN_LEN: number = 3;
    
    // Maximum username length
    private static readonly _MAX_LEN: number = 20;

    // The actual username value (validated)
    public readonly value: string;

    /**
     * Private constructor – use Username.create() factory method instead.
     * @param value - Already validated username
     */
    private constructor(value: string) {
        this.value = value;
    }

    /**
     * Factory method that creates a validated Username instance.
     * Validates: non-empty, trimmed, length constraints, character whitelist.
     * 
     * @param value - Raw username string to validate
     * @returns Username value object
     * @throws {ValidationError} If validation fails
     */
    public static create(value: string): Username {
        // Check for empty username
        if (!value) {
            throw new ValidationError("Username cannot be empty");
        }

        // Trim whitespace from both ends
        const trimmed = value.trim();

        // Validate length constraints
        if (trimmed.length < this._MIN_LEN || trimmed.length > this._MAX_LEN) {
            throw new ValidationError(`Username must be between ${this._MIN_LEN} and ${this._MAX_LEN} characters`);
        }

        // Validate character whitelist (alphanumeric + underscore)
        if (!this._USERNAME_PATTERN.test(trimmed)) {
            throw new ValidationError("Username can only contain alphanumeric characters and underscores");
        }

        // All validations passed – create the value object
        return new Username(trimmed);
    }
}