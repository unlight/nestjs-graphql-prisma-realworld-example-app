import { Article } from '@prisma/client';
import fetch from 'node-fetch';
import waitOn from 'wait-on';

/**
 * Full end to end black box tests, with real server runnning
 */

// https://github.com/gothinkster/realworld/tree/master/api
const apiBaseUrl = 'http://localhost:3000/api';
const request = (args: {
    path: string;
    body?: unknown;
    token?: string;
    method: string;
    json?: boolean;
}) => {
    let response: Promise<any> = fetch(`${apiBaseUrl}${args.path}`, {
        method: args.method,
        body: JSON.stringify(args.body),
        headers: {
            'Content-Type': 'application/json',
            authorization: args.token ? `Token ${args.token}` : '',
        },
    });
    if (args.json) {
        response = response
            .then(r => r.json())
            .then(json => {
                if (json.statusCode && json.statusCode > 299) {
                    throw json;
                }
                return json;
            });
    }
    return response;
};

beforeAll(async () => {
    await waitOn({
        resources: [apiBaseUrl],
    });
}, 15_000);

test('server ready', async () => {
    const result = await fetch(`${apiBaseUrl}`).then(r => r.statusText);
    expect(result).toBe('OK');
});

const authToken = (() => {
    let token: string;
    return async () => {
        if (token === undefined) {
            const credentials = { email: 'root@conduit.com', password: '123' };
            const response = await request({
                method: 'POST',
                path: '/users/login',
                body: { user: credentials },
                json: true,
            });
            token = response.user.token;
        }
        return token;
    };
})();

describe('User login', () => {
    it('POST /users/login', async () => {
        const token = await authToken();
        expect(token).toBeTruthy();
    });
});

describe('Current User', () => {
    it('GET /user', async () => {
        const token = await authToken();
        const response = await request({
            method: 'GET',
            path: '/user',
            token,
            json: true,
        });
        expect(response).toEqual({
            user: expect.objectContaining({
                username: 'root',
                email: 'root@conduit.com',
            }),
        });
    });
});

describe('Registration POST /api/users', () => {
    it('invalid values empty', async () => {
        const response = await request({
            method: 'POST',
            path: '/users',
            body: { user: { email: '', username: '', password: '' } },
            json: false,
        });
        const data = await response.json();
        expect(data).toBeTruthy();
        expect(response.status).toBeGreaterThanOrEqual(400);
    });

    it('valid request', async () => {
        const randomName = `r${Math.random().toString(36).slice(-5)}`;
        const userData = {
            email: `${randomName}@toastable.net`,
            username: randomName,
            password: '123',
        };
        const response = await request({
            method: 'POST',
            path: '/users',
            body: { user: userData },
        });
        expect(response.statusText).toBe('Created');
        expect(await response.json()).toEqual({
            user: expect.objectContaining({
                email: expect.stringContaining('@toastable.net'),
                username: randomName,
                bio: null,
                image: null,
                token: expect.any(String),
            }),
        });
    });
});

describe('Get user profile by name', () => {
    it('root', async () => {
        const response = await request({
            method: 'GET',
            path: '/profiles/root',
            json: true,
        });
        expect(response.profile.username).toEqual('root');
    });
});

describe('List Articles', () => {
    it('GET /api/articles', async () => {
        const response = await request({
            method: 'GET',
            path: '/articles',
            json: true,
        });
        expect(response.articles).toBeTruthy();
    });

    it('Articles Favorited by Username', async () => {
        const response = await request({
            method: 'GET',
            path: '/articles?favorited=jane',
            json: true,
        });
        expect(response.articles).toBeTruthy();
    });
});

describe('Create Article', () => {
    it('Authenticated POST /api/articles', async () => {
        const token = await authToken();
        const body = {
            article: {
                title: 'How to train your dragon',
                description: 'Ever wonder how?',
                body: 'You have to believe',
                tagList: ['reactjs', 'angularjs', 'dragons'],
            },
        };

        const response = await request({
            method: 'POST',
            path: '/articles',
            body,
            token,
            json: true,
        });

        expect(response.article).toBeTruthy();
    });
});

describe('Articles favoriting', () => {
    let article: Article;

    beforeAll(async () => {
        ({ article } = await request({
            method: 'GET',
            path: '/articles/overnew',
            json: true,
        }));
    });

    it('Favorite unfavorite', async () => {
        let response = await request({
            method: 'POST',
            path: `/articles/${article.slug}/favorite`,
            token: await authToken(),
            json: true,
        });
        expect(response.article.favoritesCount).toBe(article.favoritesCount + 1);
        expect(response.article.favorited).toBe(true);

        response = await request({
            method: 'DELETE',
            path: `/articles/${article.slug}/favorite`,
            token: await authToken(),
            json: true,
        });
        expect(response.article.favoritesCount).toBe(article.favoritesCount);
        expect(response.article.favorited).toBe(false);
    });

    it.todo('favorite second time should not increment count');
});
