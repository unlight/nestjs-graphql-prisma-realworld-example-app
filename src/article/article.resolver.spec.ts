import { ConflictException, Logger } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { createSpyObj } from 'jest-createspyobj';

import { createUser } from '../user/testing';
import { UserService } from '../user/user.service';
import { ArticleResolver } from './article.resolver';
import { ArticleService } from './article.service';
import { ArticleSelectService } from './article-select.service';
import { Article } from './models/article.model';
import { createArticle } from './testing';

describe('ArticleResolver', () => {
    let resolver: ArticleResolver;
    let service: jest.Mocked<ArticleService>;

    beforeEach(async () => {
        service = createSpyObj(ArticleService);
        service.findUnique = jest.fn();
        service.favorite = jest.fn();
        service.isFavorited = jest.fn();

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ArticleResolver,
                {
                    provide: ArticleService,
                    useValue: service,
                },
                {
                    provide: Logger,
                    useValue: createSpyObj(Logger),
                },
                {
                    provide: UserService,
                    useValue: createSpyObj(UserService),
                },
                {
                    provide: ArticleSelectService,
                    useValue: createSpyObj(ArticleSelectService),
                },
            ],
        }).compile();

        resolver = module.get(ArticleResolver);
        service = module.get(ArticleService);
    });

    it('should be defined', () => {
        expect(resolver).toBeDefined();
    });

    it('favorite article second time should fail', async () => {
        service.findUnique.mockResolvedValue(
            createArticle({
                favoritedBy: [createUser({ userId: '2' })],
            }),
        );
        service.favorite.mockResolvedValue(
            createArticle({
                favoritesCount: 1,
                favoritedBy: [createUser({ userId: '2' })],
            }),
        );

        await expect(async () => {
            await resolver.favoriteArticle(
                { articleId: '1' },
                true,
                {},
                { id: '2', email: '@2' },
            );
        }).rejects.toThrow(ConflictException);

        const result = await resolver.favoriteArticle(
            { articleId: '1' },
            false,
            {},
            { id: '2', email: '@2' },
        );
        expect(result).toEqual(expect.objectContaining({ favoritesCount: 1 }));
    });

    it('favorited resolve property should return true for favoritedBy property', async () => {
        const article = createArticle({
            favoritedBy: [createUser({ userId: 'user1', email: '@1' })],
        });
        expect(
            await resolver.favorited(article as Article, {
                id: 'user1',
                email: '@1',
            }),
        ).toBe(true);
    });

    it('favorited resolve property should return false', async () => {
        let article = createArticle({
            favoritedBy: [createUser({ userId: 'foo1' })],
        });
        expect(
            await resolver.favorited(article as Article, {
                id: 'user1',
                email: '@1',
            }),
        ).toBe(false);

        article = createArticle({ favoritedBy: [] });
        expect(
            await resolver.favorited(article as Article, {
                id: 'user1',
                email: '@1',
            }),
        ).toBe(false);
        expect(
            await resolver.favorited(article as Article, {
                id: 'user2',
                email: '@2',
            }),
        ).toBe(false);
    });
});
