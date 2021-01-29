import { Injectable } from '@nestjs/common';

import { PrismaRepository } from '../prisma/prisma.repository';

/**
 * Service for manage tags.
 */
@Injectable()
export class TagService {
    findMany = this.prisma.tag.findMany;

    constructor(private readonly prisma: PrismaRepository) {}

    /**
     * Create tags (if not exists) from array of strings.
     */
    async createTags(tags: string[]) {
        const upsertOperations = tags.map(name => {
            return this.prisma.tag.upsert({
                where: { name },
                create: { name },
                update: {},
            });
        });
        return Promise.all(upsertOperations);
    }
}
