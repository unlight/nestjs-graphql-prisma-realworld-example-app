import { DeepPartial, PlainObject } from 'simplytyped';

import { AppEnvironment as _AppEnvironment } from '../app.environment';
import { graphqlModuleFactory } from '../app.module';
import { PassportUserFields as _PassportUserFields } from '../auth';

export type Await<T> = T extends {
    then(onfulfilled?: (value: infer U) => unknown): unknown;
}
    ? U
    : T;

export type GraphQLContext = ReturnType<
    Await<ReturnType<typeof graphqlModuleFactory>>['context']
>;

declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace Express {
        /**
         * Same as PassportUserFields.
         */
        interface User {
            id: string;
            email: string;
        }
    }
}

export type AppEnvironment = typeof _AppEnvironment;
export type GraphqlFieldsParameter = DeepPartial<Record<string, PlainObject>>;
export type PassportUserFields = _PassportUserFields;
