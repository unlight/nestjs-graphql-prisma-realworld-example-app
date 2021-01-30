import { Injectable } from '@nestjs/common';

import { PrismaRepository } from '../prisma/prisma.repository';

/**
 * Repository to work with database.
 */
@Injectable()
export class ArticleRepository {
    update = this.prisma.article.update;
    findUnique = this.prisma.article.findUnique;
    findMany = this.prisma.article.findMany;
    create = this.prisma.article.create;
    count = this.prisma.article.count;
    delete = this.prisma.article.delete;

    constructor(private readonly prisma: PrismaRepository) {}
}
