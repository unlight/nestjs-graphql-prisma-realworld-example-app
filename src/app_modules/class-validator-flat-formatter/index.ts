import { ValidationError } from './validation-error';

/**
 * Slightly refactored ValidationError.toString()
 * https://github.com/typestack/class-validator/blob/master/src/validation/ValidationError.ts
 */
export function classValidatorFlatFormatter(
    errors: ValidationError[] | ValidationError,
    parentPath = '',
) {
    if (!Array.isArray(errors)) {
        errors = [errors];
    }
    let result = '';
    if (errors.length > 0) {
        result = errors.map(err => formatError(err, parentPath)).join(',\n');
        if (result) {
            result += '.';
        }
    }
    return result;
}

function formatError(error: ValidationError, parentPath: string) {
    if (!isValidationError(error) || !error.constraints) {
        return '';
    }
    return Object.keys(error.constraints)
        .map(constraintName => {
            const property = propertyPath(parentPath, error.property);
            const constraintMessage = error.constraints![constraintName];
            let result = `${property}: ${constraintMessage} (${constraintName})`;
            if (error.children && error.children.length > 0) {
                result += `,\n${error.children
                    .map(err => formatError(err, property))
                    .join(',\n')}`;
            }
            return result;
        })
        .join(',\n');
}

function propertyPath(parent: string, name: string) {
    if (Number.isInteger(+name)) {
        name = `[${name}]`;
    }
    let result = name;
    if (parent) {
        result = `${parent}.${name}`;
    }
    return result;
}

export function isValidationError(
    error?: Partial<ValidationError>,
): error is ValidationError {
    return Boolean(error && error.constraints && error.property);
}
