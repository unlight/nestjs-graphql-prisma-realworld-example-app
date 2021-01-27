import { Injectable, Logger } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { UserRepository } from './user.repository';

/**
 * Service to manage users.
 */
@Injectable()
export class UserService {
    private readonly logger = new Logger(UserService.name);

    constructor(private readonly repository: UserRepository) {}

    async update(where: Prisma.UserWhereUniqueInput, data: Prisma.UserUpdateInput) {
        return this.repository.update({ data, where });
    }

    async findOne(where: Prisma.UserWhereUniqueInput) {
        return this.repository.findUnique({ where });
    }

    async findByCredentials(data: { email: string; password: string }) {
        let user = await this.repository.findUnique({
            where: { email: data.email },
        });
        if (!(user && user.password === data.password)) {
            // eslint-disable-next-line unicorn/no-null
            user = null;
        }
        return user;
    }

    async findOneRandom() {
        return this.repository.randomUser();
    }

    async findMany(args: Prisma.UserFindManyArgs) {
        return this.repository.findMany(args);
    }

    async findUnique(args: Prisma.UserFindUniqueArgs) {
        return this.repository.findUnique(args);
    }

    async create(data: Prisma.UserCreateInput) {
        return this.repository.create({ data });
    }

    async isFollowing(userId: string, byUserId: string) {
        const result = await this.repository
            .findUnique({
                where: { userId },
            })
            .followers({
                select: { userId: true },
                where: { userId: byUserId },
                take: 1,
            });
        return result.length > 0;
    }

    /**
     * Add or remove follower for user matching to `where` conditions.
     */
    async follow(
        where: Prisma.UserWhereUniqueInput,
        follower: Prisma.UserWhereUniqueInput,
        value: boolean,
    ) {
        const followersOperation = value
            ? { connect: follower }
            : { disconnect: follower };
        return this.repository.update({
            where,
            data: {
                followers: followersOperation,
            },
        });
    }
}
