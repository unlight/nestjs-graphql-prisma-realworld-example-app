import { Test, TestingModule } from '@nestjs/testing';
import { createSpyObj } from 'jest-createspyobj';

import { PrismaRepository } from '../prisma/prisma.repository';
import { DummyRepository } from '../prisma/testing';
import { TagService } from '../tag/tag.service';
import { ArticleService } from './article.service';
import { SlugService } from './slug/slug.service';

describe('ArticleService', () => {
    let service: ArticleService;
    let prismaRepository: jest.Mocked<PrismaRepository>;
    let testingModule: TestingModule;

    beforeEach(async () => {
        prismaRepository = createSpyObj(PrismaRepository);
        (prismaRepository as any).article = createSpyObj(DummyRepository);
        (prismaRepository as any).tag = createSpyObj(DummyRepository);
        testingModule = await Test.createTestingModule({
            providers: [
                {
                    provide: PrismaRepository,
                    useValue: prismaRepository,
                },
                ArticleService,
                SlugService,
                TagService,
            ],
        }).compile();

        service = testingModule.get(ArticleService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('findMany', async () => {
        await service.findMany({ where: { articleId: { equals: 'a' } } });
        expect(prismaRepository.article.findMany).toHaveBeenCalledWith(
            expect.objectContaining({
                where: {
                    articleId: {
                        equals: 'a',
                    },
                },
            }),
        );
    });
});
