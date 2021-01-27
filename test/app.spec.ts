import request from 'supertest';
import { inspect } from 'util';

import { createApp } from '../src/main';
import { Await } from '../src/types';

const d = (o: any) =>
    console.log(inspect(o, { colors: true, depth: null, compact: true }));

describe('app', () => {
    let app: Await<ReturnType<typeof createApp>>;
    let server: any;
    beforeAll(async () => {
        app = await createApp({ logger: false });
        server = app.getHttpServer();
        await app.init();
    });

    afterAll(async () => {
        await app.close();
    });

    it('smoke', async () => {
        const result = await request(server)
            .get('/api')
            .expect(200)
            .then(response => response.body);
        expect(result).toBeTruthy();
    });

    it('login', async () => {
        const query = /* GraphQL */ `
            mutation {
                loginUser(data: { email: "alice@conduit.com", password: "123" }) {
                    token
                }
            }
        `;
        const result = await request(server)
            .post('/graphql')
            .send({ query })
            .expect(200)
            .then(response => response.body.data);
        expect(result).toEqual(
            expect.objectContaining({
                loginUser: {
                    token: expect.any(String),
                },
            }),
        );
    });

    describe('user', () => {
        it('is following', async () => {
            const token = await request(server)
                .post('/graphql')
                .send({
                    query: /* GraphQL */ `
                        mutation {
                            loginUser(
                                data: { email: "alice@conduit.com", password: "123" }
                            ) {
                                token
                            }
                        }
                    `,
                })
                .expect(200)
                .then(response => response.body.data.loginUser.token);

            const result = await request(server)
                .post('/graphql')
                .auth(token, { type: 'bearer' })
                .send({
                    query: /* GraphQL */ `
                        query {
                            user(where: { name: "bob" }) {
                                name
                                following {
                                    name
                                    isFollowing
                                }
                                followers {
                                    name
                                    isFollowing
                                }
                                isFollowing
                            }
                        }
                    `,
                })
                .expect(200)
                .then(response => response.body.data.user);
            expect(result.following).toEqual([
                { name: 'root', isFollowing: true },
                { name: 'alice', isFollowing: false },
            ]);
            expect(result.isFollowing).toBe(true);
        });

        describe('create user', () => {
            it('bad request', async () => {
                const result = await request(server)
                    .post('/graphql')
                    .send({
                        query: /* GraphQL */ `
                            mutation {
                                createUser(
                                    data: { name: "x", email: "", password: "123" }
                                ) {
                                    userId
                                }
                            }
                        `,
                    })
                    .then(response => response.body);
                expect(result.data).toBeNull();
                expect(result.errors[0]).toEqual(
                    expect.objectContaining({
                        message: 'Invalid Field Values',
                        extensions: expect.objectContaining({
                            data: expect.objectContaining({
                                statusCode: 400,
                                error: 'Bad Request',
                            }),
                        }),
                    }),
                );
            });
        });
    });
});
