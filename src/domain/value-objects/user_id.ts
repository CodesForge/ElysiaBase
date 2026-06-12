// ============================================
// USER ID VALUE OBJECT (BRANDED TYPE)
// ============================================

export class UserID {
    /**
     * Branded primitive type – ensures runtime UUID cannot be confused with other strings.
     * The `__brand` symbol makes this type unique and prevents accidental assignments.
     */
    readonly value!: string & { readonly __brand: unique symbol };

    /**
     * Private constructor – use UserID.next() instead.
     * @param value - UUID string (should always be valid)
     */
    private constructor(value: string) {
        this.value = value as any;
    }

    /**
     * Generates a new unique UserID using cryptographically secure random UUID.
     * @returns New UserID instance
     */
    public static next(): UserID {
        return new UserID(crypto.randomUUID());
    }
}