import { Module } from '@nestjs/common';
import { PrismaModule } from 'app_modules/prisma';

import { TagModule } from '../tag/tag.module';
import { UserModule } from '../user/user.module';
import { ArticleRepository } from './article.repository';
import { ArticleResolver } from './article.resolver';
import { ArticleService } from './article.service';
import { ArticleSelectService } from './article-select.service';
import { SlugService } from './slug/slug.service';

@Module({
    imports: [PrismaModule, TagModule, UserModule],
    providers: [
        ArticleResolver,
        ArticleService,
        SlugService,
        ArticleSelectService,
        ArticleRepository,
    ],
    exports: [ArticleService],
})
export class ArticleModule {}
