/* eslint-disable max-lines */
import { Inject, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { GraphQLClient } from 'graphql-request';

import { articleFields, commentFields, userFields } from './fragments';
import { CreateArticleDto } from './models/create-article.dto';
import { CreateArticleCommentDto } from './models/create-article-comment.dto';
import { CreateUserDto } from './models/create-user.dto';
import { LoginUserDto } from './models/login-user.dto';
import { UpdateUserDto } from './models/update-user.dto';

/**
 * Service for sending graphql requests to graphql endpoint
 * and return to api controller.
 */
@Injectable()
export class ApiService {
    constructor(
        @Inject('GraphQLClient') private readonly graphqlClient: GraphQLClient,
    ) {}

    /**
     * Send mutation query to create user.
     */
    async createUser(createUser: CreateUserDto) {
        const createUserData = {
            name: createUser.username,
            email: createUser.email,
            password: createUser.password,
        };
        const query = /* GraphQL */ `
            mutation createUser($createUserData: UserCreateInput!) {
                user: createUser(data: $createUserData) {
                    ...userFields
                    token
                }
            }
            ${userFields}
        `;
        return this.graphqlClient.request(query, { createUserData });
    }

    /**
     * Send mutation query for login.
     */
    async loginUser(loginUser: LoginUserDto) {
        const loginUserData = {
            email: loginUser.email,
            password: loginUser.password,
        };
        const query = /* GraphQL */ `
            mutation loginUser($data: UserLoginInput!) {
                user: loginUser(data: $data) {
                    ...userFields
                    token
                }
            }
            ${userFields}
        `;
        return this.graphqlClient.request(query, { data: loginUserData });
    }

    /**
     * Get current user, authentication required.
     */
    async getCurrentUser(token: string) {
        const query = /* GraphQL */ `
            query {
                user: me {
                    ...userFields
                    token
                }
            }
            ${userFields}
        `;
        return this.graphqlClient
            .setHeader('Authorization', `Bearer ${token}`)
            .request(query);
    }

    /**
     * Get current user, authentication required.
     */
    async updateUser({ token, user }: { token: string; user: UpdateUserDto }) {
        const query = /* GraphQL */ `
            mutation updateUser($data: UserUpdateInput!) {
                user: updateUser(data: $data) {
                    ...userFields
                    token
                }
            }
            ${userFields}
        `;
        return this.graphqlClient
            .setHeader('Authorization', `Bearer ${token}`)
            .request(query, { data: user });
    }

    /**
     * Get current user.
     * Authorization optional, if yes `following` property should be checked.
     */
    async getProfile({ token, name }: { token: string; name: string }) {
        const query = /* GraphQL */ `
            query user($input: UserWhereUniqueInput!) {
                profile: user(where: $input) {
                    ...userFields
                    following: isFollowing
                }
            }
            ${userFields}
        `;
        return this.graphqlClient
            .setHeader('Authorization', `Bearer ${token}`)
            .request(query, {
                input: { name },
            });
    }

    /**
     * Create article.
     * Authentication required.
     */
    async createArticle({
        token,
        createArticleDto,
    }: {
        token: string;
        createArticleDto: CreateArticleDto;
    }) {
        const query = /* GraphQL */ `
            mutation createArticle($input: ArticleCreateInput!) {
                article: createArticle(input: $input) {
                    ...articleFields
                }
            }
            ${articleFields}
        `;
        const input = {
            body: createArticleDto.body,
            description: createArticleDto.description,
            title: createArticleDto.title,
            tags: createArticleDto.tagList,
        };
        return this.graphqlClient
            .setHeader('Authorization', `Bearer ${token}`)
            .request(query, { input });
    }

    /**
     * Get all articles with optional filters.
     */
    async getArticles(
        options: Partial<{
            token: string;
            tag: string;
            author: string;
            /**
             * Favorited by user
             */
            favorited: string;
            offset: number;
            limit: number;
        }>,
    ) {
        const where: Prisma.ArticleWhereInput = {};
        if (options.tag) {
            where.tags = { some: { name: { equals: options.tag } } };
        }
        if (options.author) {
            where.author = { name: { equals: options.author } };
        }
        if (options.favorited) {
            where.favoritedBy = {
                some: { name: { equals: options.favorited } },
            };
        }
        let skip: number | undefined;
        if (options.offset && options.offset > 0) {
            skip = options.offset;
        }
        let take: number | undefined;
        if (options.limit) {
            take = options.limit;
        }

        const query = /* GraphQL */ `
            query articles($where: ArticleWhereInput!) {
                articles: articles(where: $where, orderBy: { articleId: desc }) {
                    ...articleFields
                }
                articlesCount: countArticles(where: $where)
            }
            ${articleFields}
        `;
        return this.graphqlClient
            .setHeader('Authorization', `Bearer ${options.token}`)
            .request(query, { where, skip, take });
    }

    /**
     * Follow or unfollow user.
     */
    async followUser({
        token,
        username,
        value,
    }: {
        token: string;
        username: string;
        value: boolean;
    }) {
        const query = /* GraphQL */ `
            mutation follow($where: UserWhereUniqueInput!, $value: Boolean!) {
                profile: follow(where: $where, value: $value) {
                    ...userFields
                    following: isFollowing
                }
            }
            ${userFields}
        `;
        return this.graphqlClient
            .setHeader('Authorization', `Bearer ${token}`)
            .request(query, {
                where: { name: username },
                value: value,
            });
    }

    /**
     * Get article by slug.
     */
    async getArticle({ token, slug }: { token: string; slug: string }) {
        this.graphqlClient.setHeader('Authorization', `Bearer ${token}`);
        return this.graphqlClient.request(
            /* GraphQL */ `
                query article($where: ArticleWhereUniqueInput!) {
                    article(where: $where) {
                        ...articleFields
                    }
                }
                ${articleFields}
            `,
            { where: { slug } },
        );
    }

    /**
     * Feed articles.
     * Authentication required.
     */
    async feedArticles({
        token,
        offset = 0,
        limit = 20,
    }: {
        token: string;
        offset?: number;
        limit?: number;
    }) {
        this.graphqlClient.setHeader('Authorization', `Bearer ${token}`);
        return this.graphqlClient.request(
            /* GraphQL */ `
                query feed($limit: Int = 20, $offset: Int = 0) {
                    articles: feed(limit: $limit, offset: $offset) {
                        ...articleFields
                    }
                    articlesCount: countArticles(feed: true)
                }
                ${articleFields}
            `,
            { offset, limit },
        );
    }

    async updateArticle({
        token,
        slug,
        data,
    }: {
        token: string;
        slug: string;
        data: Record<string, unknown>;
    }) {
        this.graphqlClient.setHeader('Authorization', `Bearer ${token}`);
        return this.graphqlClient.request(
            /* GraphQL */ `
                mutation updateArticle(
                    $where: ArticleWhereUniqueInput!
                    $data: ArticleUpdateInput!
                ) {
                    article: updateArticle(where: $where, data: $data) {
                        ...articleFields
                    }
                }
                ${articleFields}
            `,
            { where: { slug }, data },
        );
    }

    async deleteArticle({ token, slug }) {
        this.graphqlClient.setHeader('Authorization', `Bearer ${token}`);
        return this.graphqlClient.request(
            /* GraphQL */ `
                mutation deleteArticle($where: ArticleWhereUniqueInput!) {
                    deleteArticle(where: $where) {
                        id
                    }
                }
            `,
            { where: { slug } },
        );
    }

    async createArticleComment(args: {
        token: string;
        slug: string;
        comment: CreateArticleCommentDto;
    }) {
        this.graphqlClient.setHeader('Authorization', `Bearer ${args.token}`);
        return this.graphqlClient.request(
            /* GraphQL */ `
                mutation createComment(
                    $data: CreateCommentInput!
                    $where: ArticleWhereUniqueInput!
                ) {
                    comment: createComment(data: $data, where: $where) {
                        ...commentFields
                    }
                }
                ${commentFields}
            `,
            { data: args.comment, where: { slug: args.slug } },
        );
    }

    async articleComments(args: { token: string; slug: string }) {
        this.graphqlClient.setHeader('Authorization', `Bearer ${args.token}`);
        return this.graphqlClient.request(
            /* GraphQL */ `
                query articleComments($where: ArticleWhereUniqueInput!) {
                    comments: articleComments(where: $where) {
                        ...commentFields
                    }
                }
                ${commentFields}
            `,
            { where: { slug: args.slug } },
        );
    }

    async deleteComment(args: { token: string; id: string }) {
        this.graphqlClient.setHeader('Authorization', `Bearer ${args.token}`);
        return this.graphqlClient.request(
            /* GraphQL */ `
                mutation deleteComment($where: CommentWhereUniqueInput!) {
                    deleteComment(where: $where) {
                        id
                    }
                }
            `,
            { where: { id: args.id } },
        );
    }

    /**
     * Favorite (value: true) or unfavorite (value: false) article.
     */
    async favoriteArticle(args: { token: string; slug: string; value: boolean }) {
        this.graphqlClient.setHeader('Authorization', `Bearer ${args.token}`);
        return this.graphqlClient.request(
            /* GraphQL */ `
                mutation favoriteArticle(
                    $where: ArticleWhereUniqueInput!
                    $value: Boolean!
                ) {
                    article: favoriteArticle(where: $where, value: $value) {
                        ...articleFields
                    }
                }
                ${articleFields}
            `,
            { where: { slug: args.slug }, value: args.value },
        );
    }

    /**
     * Returns a list of tags.
     */
    async getTags() {
        const response = await this.graphqlClient.request(/* GraphQL */ `
            query {
                tags {
                    name
                }
            }
        `);
        response.tags = response.tags.map(tag => tag.name);
        return response;
    }
}
