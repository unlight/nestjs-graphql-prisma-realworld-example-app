import { Test, TestingModule } from '@nestjs/testing';
import { setGlobalMockMethod, toMockedInstance } from 'to-mock';

import { PrismaRepository } from '../prisma/prisma.repository';
import { PrismaService } from '../prisma/prisma.service';
import { TagService } from '../tag/tag.service';
import { ArticleService } from './article.service';
import { SlugService } from './slug/slug.service';

setGlobalMockMethod(jest.fn);

describe('ArticleService', () => {
    let service: ArticleService;
    let repository: jest.Mocked<PrismaService['article']>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                {
                    provide: PrismaService,
                    useValue: {
                        article: toMockedInstance(PrismaRepository),
                        tag: toMockedInstance(PrismaRepository),
                    },
                },
                ArticleService,
                SlugService,
                TagService,
            ],
        }).compile();

        service = module.get(ArticleService);
        repository = module.get(PrismaService).article as typeof repository;
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('findMany', async () => {
        expect(repository.findMany).toBeDefined();
        await service.findMany({ where: { id: { equals: 'a' } } });
        expect(repository.findMany).toHaveBeenCalledWith(
            expect.objectContaining({
                where: {
                    id: {
                        equals: 'a',
                    },
                },
            }),
        );
    });
});
