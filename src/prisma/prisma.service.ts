import { Injectable, Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { createPrismaQueryEventHandler } from 'prisma-query-log';

import { AppEnvironment } from '../app.environment';

/**
 * Prisma client as nest service.
 */
@Injectable()
export class PrismaService
    extends PrismaClient
    implements OnModuleInit, OnModuleDestroy {
    private readonly logger = new Logger();

    constructor(private readonly environment: AppEnvironment) {
        super({
            errorFormat: 'minimal',
            log:
                environment.nodeEnvironment === 'development'
                    ? [
                          {
                              level: 'query',
                              emit: 'event',
                          },
                      ]
                    : undefined,
        });

        if (this.environment.nodeEnvironment === 'development') {
            this.$on(
                // @ts-ignore
                'query',
                createPrismaQueryEventHandler({
                    logger: query => {
                        this.logger.verbose(query, 'SQL');
                    },
                    format: false,
                    colorQuery: '\u001B[96m',
                    colorParameter: '\u001B[90m',
                }),
            );
        }
    }

    async onModuleInit() {
        await this.$connect();
    }

    async onModuleDestroy() {
        await this.$disconnect();
    }
}
