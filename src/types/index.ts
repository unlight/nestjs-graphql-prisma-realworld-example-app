import { graphqlModuleFactory } from '../app.module';

export type Await<T> = T extends {
    then(onfulfilled?: (value: infer U) => unknown): unknown;
}
    ? U
    : T;

export type GraphQLContext = ReturnType<
    Await<ReturnType<typeof graphqlModuleFactory>>['context']
>;

declare global {
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
