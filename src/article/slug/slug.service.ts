import { Injectable } from '@nestjs/common';
import slugify from '@sindresorhus/slugify';
import { randomBytes } from 'crypto';

/**
 * Service for generate slug for article.
 */
@Injectable()
export class SlugService {
    /**
     * Generate slug.
     */
    slugify(string: string) {
        return slugify(string);
    }

    /**
     * Generate slug for article.
     * Tries several times until get unique.
     */
    async generate(
        string: string,
        isUnique: (string: string) => Promise<boolean>,
        attempt = 1,
    ) {
        let slug = this.slugify(string);
        if (attempt === 1 && (await isUnique(slug))) {
            return slug;
        }
        if (await isUnique(`${slug}-${String(attempt)}`)) {
            return `${slug}-${String(attempt)}`;
        }
        if (attempt > 3) {
            const [suffix] = Number.parseInt(
                randomBytes(attempt).toString('hex'),
                16,
            ).toString(36);
            slug = `${slug}-${suffix}`;
            if (await isUnique(slug)) {
                return slug;
            }
        }
        return this.generate(string, isUnique, attempt + 1);
    }
}
