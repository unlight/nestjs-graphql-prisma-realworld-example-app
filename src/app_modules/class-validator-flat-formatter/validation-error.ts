/**
 * Validation error description.
 * @see https://github.com/typestack/class-validator
 *
 * @publicApi
 */
export interface ValidationError {
    /**
     * Object that was validated.
     */
    target?: Record<string, any>; // tslint:disable-line:no-any
    /**
     * Object's property that hasn't passed validation.
     */
    property: string;
    /**
     * Value that hasn't passed validation.
     */
    value?: any; // tslint:disable-line:no-any
    /**
     * Constraints that failed validation with error messages.
     */
    constraints?: {
        [type: string]: string;
    };
    /**
     * Contains all nested validation errors of the property.
     */
    children?: ValidationError[];
}
