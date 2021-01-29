import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';

import { PrismaRepository } from '../prisma/prisma.repository';

/**
 * Repository to work with database.
 */
@Injectable()
export class UserRepository {
    update = this.prisma.user.update;
    findUnique = this.prisma.user.findUnique;
    findMany = this.prisma.user.findMany;
    create = this.prisma.user.create;
    count = this.prisma.user.count;

    constructor(private readonly prisma: PrismaRepository) {}

    async randomUser() {
        const [result] = await this.prisma.$queryRaw<User[]>(
            /* SQL */ `SELECT * FROM "User" ORDER BY random() LIMIT 1`,
        );
        return result;
    }
}
