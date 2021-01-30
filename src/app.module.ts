import { Global, Logger, Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { EnvironmentModule } from '@nestjs-steroids/environment';
import {
    ApolloErrorConverter,
    extendMapItem,
    mapItemBases,
} from 'apollo-error-converter';
import { Request } from 'express';

import { ApiModule } from './api/api.module';
import { AppEnvironment } from './app.environment';
import { ArticleModule } from './article/article.module';
import { CommentModule } from './comment/comment.module';
import { PrismaModule } from './prisma/prisma.module';
import { TagModule } from './tag/tag.module';
import { UserModule } from './user/user.module';

export async function graphqlModuleFactory(logger: Logger) {
    return {
        tracing: false,
        sortSchema: true,
        autoSchemaFile: '~schema.gql',
        context: (data: any) => {
            return {
                token: undefined as string | undefined,
                req: data.req as Request,
            };
        },
        formatError: new ApolloErrorConverter({
            logger: (err: any) => {
                logger.error(err);
            },
            errorMap: [
                {
                    NotFoundError: {
                        name: 'ENTITY_NOT_FOUND',
                        message: 'Entity Not Found',
                        logger: true,
                    },
                    BadRequestException: extendMapItem(mapItemBases.InvalidFields, {
                        logger: true,
                        data: (err: any) => {
                            return err?.response;
                        },
                    }),
                },
            ],
        }),
    };
}

@Global()
@Module({
    imports: [
        UserModule,
        ApiModule,
        PrismaModule.forRoot(),
        TagModule,
        EnvironmentModule.forRoot({
            isGlobal: true,
            loadEnvFile: true,
            useClass: AppEnvironment,
        }),
        GraphQLModule.forRootAsync({
            inject: [Logger],
            useFactory: graphqlModuleFactory,
        }),
        ArticleModule,
        CommentModule,
    ],
    providers: [Logger],
    exports: [Logger],
})
export class AppModule {}
