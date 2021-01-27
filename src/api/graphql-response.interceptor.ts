import {
    CallHandler,
    ExecutionContext,
    Injectable,
    Logger,
    NestInterceptor,
    UnprocessableEntityException,
} from '@nestjs/common';
import {
    classValidatorFlatFormatter,
    isValidationError,
} from 'app_modules/class-validator-flat-formatter';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

/**
 * Intercept error and flat errors.
 */
@Injectable()
export class GraphQLResponseInterceptor implements NestInterceptor {
    private readonly logger: Logger = new Logger('GraphQLResponseInterceptor');

    intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
        return next.handle().pipe(
            catchError(err => {
                const validationErrors = err.response?.errors?.[0]?.message?.message;
                if (
                    isValidationError(validationErrors) ||
                    (Array.isArray(validationErrors) &&
                        validationErrors.length > 0 &&
                        validationErrors.some(error => isValidationError(error)))
                ) {
                    const message = classValidatorFlatFormatter(validationErrors);
                    return throwError(new UnprocessableEntityException(message));
                }
                return throwError(err);
            }),
        );
    }
}
