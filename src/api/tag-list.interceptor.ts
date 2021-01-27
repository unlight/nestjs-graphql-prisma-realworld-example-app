import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
} from '@nestjs/common';
import { map } from 'rxjs/operators';

/**
 * Remap field value tags {name} to taglist [string].
 */
@Injectable()
export class TagListInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler) {
        return next.handle().pipe(
            map(data => {
                if ('articles' in data) {
                    data.articles = data.articles.map(a => toArticleDto(a));
                } else if ('article' in data) {
                    data.article = toArticleDto(data.article);
                }
                return data;
            }),
        );
    }
}

function toArticleDto(article: { tags: { name: string }[] }) {
    const { tags, ...temporaryArticle } = article;
    return {
        ...temporaryArticle,
        tagList: tags.map(tag => tag.name),
    };
}
