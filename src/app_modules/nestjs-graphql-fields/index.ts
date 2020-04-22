import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import graphqlFields from 'graphql-fields';

export const graphqlFieldsImpl = (data: unknown, executionContext: ExecutionContext) => {
    const type: unknown = executionContext.getType();
    if (type !== 'graphql') {
        throw new TypeError(
            `GraphqlFields decorator cannot be used in non graphql context ${type}`,
        );
    }
    const info = GqlExecutionContext.create(executionContext).getInfo();
    return graphqlFields(info);
};

// tslint:disable-next-line:variable-name
export const GraphqlFields = createParamDecorator(graphqlFieldsImpl);
