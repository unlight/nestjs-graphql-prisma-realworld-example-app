import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { IncomingMessage } from 'http';

const requestFactories = new Map<string, (c: ExecutionContext) => unknown>([
    ['http', (executionContext) => executionContext.getArgByIndex(0)],
    ['graphql', (executionContext) => executionContext.getArgByIndex(2)?.req],
]);

// tslint:disable-next-line:variable-name
export const AuthorizationToken = createParamDecorator(
    (data, executionContext: ExecutionContext) => {
        let request: unknown;
        const type: string = executionContext.getType();
        const factory = requestFactories.get(type);
        if (factory) {
            request = factory(executionContext);
        }
        if (!(request instanceof IncomingMessage)) {
            throw new TypeError(`Cannot find IncomingMessage in context type ${type}`);
        }
        const authorization = request.headers.authorization;
        const [, token] = String(authorization).split(' ');
        return token;
    },
);
