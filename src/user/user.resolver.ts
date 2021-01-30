import { UserWhereUniqueInput } from '@generated/user/user-where-unique.input';
import { UnauthorizedException, UseGuards } from '@nestjs/common';
import {
    Args,
    Context,
    Info,
    Mutation,
    Parent,
    Query,
    ResolveField,
    Resolver,
} from '@nestjs/graphql';
import { PrismaSelect } from '@paljs/plugins';
import { Prisma } from '@prisma/client';
import { CurrentUser } from 'app_modules/current-user-decorator';
import {
    GraphqlAuthGuard,
    OptionalGraphqlAuthGuard,
} from 'app_modules/nestjs-passport-graphql-auth-guard';
import assert from 'assert';
import DataLoader from 'dataloader';
import { GraphQLResolveInfo } from 'graphql';

import { AuthService } from '../auth/auth.service';
import { SessionService } from '../auth/session.service';
import { GraphQLContext, PassportUserFields } from '../types';
import { User } from './models/user.model';
import { UserCreateInput } from './models/user-create.input';
import { UserLoginInput } from './models/user-login.input';
import { UserUpdateInput } from './models/user-update.input';
import { UserService } from './user.service';

/**
 * Resolves user object type.
 */
@Resolver(() => User)
export class UserResolver {
    constructor(
        private readonly userService: UserService,
        private readonly authService: AuthService,
        private readonly sessionService: SessionService,
    ) {}

    /**
     * Query for self profile.
     */
    @Query(() => User)
    @UseGuards(GraphqlAuthGuard)
    async me(@CurrentUser() user: PassportUserFields) {
        return this.userService.findOne({ userId: user.id });
    }

    /**
     * Query for single user.
     */
    @Query(() => User)
    @UseGuards(OptionalGraphqlAuthGuard)
    async user(
        @Args('where') where: UserWhereUniqueInput,
        @Info() info: GraphQLResolveInfo,
    ) {
        const select = new PrismaSelect(info, {
            defaultFields: {
                // This fix issue with missing user.userId
                User: { userId: true },
            },
        }).value;
        return this.userService.findUnique({
            ...select,
            where,
            rejectOnNotFound: true,
        });
    }

    @Mutation(() => User)
    async createUser(
        @Args('data') data: UserCreateInput,
        @Context() context: GraphQLContext,
    ) {
        const user = await this.userService.create(data);
        ({ accessToken: context.token } = await this.authService.session(user));
        return user;
    }

    @Mutation(() => User)
    @UseGuards(GraphqlAuthGuard)
    async updateUser(
        @Args('data') data: UserUpdateInput,
        @CurrentUser() user: PassportUserFields,
    ) {
        return this.userService.update(
            { userId: user.id },
            data as Prisma.UserUpdateInput,
        );
    }

    @Mutation(() => User)
    async loginUser(
        @Args('data') data: UserLoginInput,
        @Context() context: GraphQLContext,
    ) {
        const user = await this.userService.findByCredentials(data);
        if (!user) {
            throw new UnauthorizedException();
        }
        ({ accessToken: context.token } = await this.authService.session(user));
        return user;
    }

    @Mutation(() => User)
    @UseGuards(GraphqlAuthGuard)
    async follow(
        @CurrentUser() currentUser: PassportUserFields,
        @Args('where') where: UserWhereUniqueInput,
        @Args('value') value: boolean,
    ) {
        await this.userService.findUnique({
            where,
            select: { userId: true },
            rejectOnNotFound: true,
        });

        const follower = { userId: currentUser.id };
        return this.userService.follow(where, follower, value);
    }

    @ResolveField(() => String, { nullable: true })
    async token(@Parent() _: User, @Context() context: GraphQLContext) {
        return context.token;
    }

    private readonly followDataLoader = new DataLoader(
        async (userIds: string[]) => {
            const followSessionUser = await this.userService.findMany({
                select: {
                    userId: true,
                },
                where: {
                    userId: { in: userIds },
                    followers: {
                        some: { userId: this.sessionService.currentUserId() },
                    },
                },
            });
            return userIds.map(userId =>
                followSessionUser.some(x => x.userId === userId),
            );
        },
        { cache: false },
    );

    /**
     * Check if current user is follow some user.
     */
    @ResolveField(() => Boolean)
    async isFollowing(
        @Parent() user: User,
        @CurrentUser() currentUser?: PassportUserFields,
    ): Promise<boolean> {
        if (!currentUser) {
            return false;
        }
        assert(user.userId);
        return this.followDataLoader.load(user.userId);
    }
}
