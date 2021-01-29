import { Query, Resolver } from '@nestjs/graphql';

import { Tag } from './tag.model';
import { TagService } from './tag.service';

/**
 * Resolves tag object type.
 */
@Resolver()
export class TagResolver {
    constructor(private readonly tagService: TagService) {}

    @Query(() => [Tag])
    async tags() {
        return this.tagService.findMany();
    }
}
