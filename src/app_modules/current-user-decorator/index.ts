import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

/**
 * Extract request.user property (which is written by passport).
 */
// tslint:disable-next-line:variable-name
export const CurrentUser = createParamDecorator((data, executionContext: ExecutionContext) => {
    const request = GqlExecutionContext.create(executionContext).getContext().req;
    return request?.user;
});
