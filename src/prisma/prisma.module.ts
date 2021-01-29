import { DynamicModule, Global, Module } from '@nestjs/common';

import { PrismaRepository } from './prisma.repository';

@Global()
@Module({})
export class PrismaModule {
    static forRoot(): DynamicModule {
        return {
            module: PrismaModule,
            providers: [PrismaRepository],
            exports: [PrismaRepository],
        };
    }
}
