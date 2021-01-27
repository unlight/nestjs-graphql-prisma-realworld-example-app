import 'dotenv-flow/config';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('Seeding...');
    await prisma.$connect();

    await prisma.tag.deleteMany({});
    await prisma.article.deleteMany({});
    await prisma.comment.deleteMany({});
    await prisma.user.deleteMany({});

    // Users
    await prisma.user.create({
        data: {
            name: 'root',
            email: 'root@conduit.com',
            password: '123',
        },
    });

    await prisma.user.create({
        data: {
            name: 'bob',
            email: 'bob@conduit.com',
            password: '123',
        },
    });

    await prisma.user.create({
        data: {
            name: 'alice',
            email: 'alice@conduit.com',
            password: '123',
        },
    });

    // Followers
    await prisma.user.update({
        where: { name: 'root' },
        data: {
            followers: {
                connect: [{ name: 'alice' }, { name: 'bob' }],
            },
        },
    });

    await prisma.user.update({
        where: { name: 'alice' },
        data: {
            followers: {
                connect: [{ name: 'bob' }],
            },
        },
    });

    await prisma.user.update({
        where: { name: 'bob' },
        data: {
            followers: {
                connect: [{ name: 'alice' }],
            },
        },
    });

    // Articles with comments and tags
    await prisma.article.create({
        data: {
            author: { connect: { name: 'root' } },
            title: 'Browsick',
            slug: 'browsick',
            body:
                'Planchet muscicide gegger binodous overdistantness annullation enquicken',
            description: 'Siphonophora precommend confiture',
            comments: {
                create: [
                    {
                        author: { connect: { name: 'root' } },
                        body: 'My first article :)',
                    },
                    {
                        author: { connect: { name: 'bob' } },
                        body: 'Bob is here, second comment!',
                    },
                    {
                        author: { connect: { name: 'alice' } },
                        body: "This is alice's comment.",
                    },
                ],
            },
            tags: {
                create: [
                    { name: 'angular' },
                    { name: 'nestjs' },
                    { name: 'work' },
                    { name: 'covid19' },
                    { name: 'prisma' },
                    { name: 'realword' },
                ],
            },
            favoritesCount: 3,
            favoritedBy: {
                connect: [{ name: 'root' }, { name: 'bob' }, { name: 'alice' }],
            },
        },
    });

    await prisma.article.create({
        data: {
            author: { connect: { name: 'root' } },
            title: 'Overnew',
            slug: 'overnew',
            body:
                'Photostereograph esophagostenosis histopathology convallariaceous',
            description: 'Homogonously postclassical cellar',
            comments: {
                create: [
                    {
                        author: { connect: { name: 'root' } },
                        body: '1. endoplastron',
                    },
                    {
                        author: { connect: { name: 'bob' } },
                        body: '2. rogatory',
                    },
                    {
                        author: { connect: { name: 'alice' } },
                        body: '3. aridity',
                    },
                ],
            },
            tags: {
                create: [
                    { name: 'interrogator' },
                    { name: 'understream' },
                    { name: 'vinculum' },
                ],
                connect: [{ name: 'angular' }, { name: 'nestjs' }],
            },
            favoritesCount: 2,
            favoritedBy: { connect: [{ name: 'bob' }, { name: 'alice' }] },
        },
    });

    await prisma.article.create({
        data: {
            author: { connect: { name: 'alice' } },
            title: 'How to train your dragon',
            slug: 'how-to-train-your-dragon',
            body:
                'Fermentative poignantly northest psammosarcoma Antu hydrosomatous hemipteran bronchotyphoid',
            description: 'Polymeride noblewoman hasher presentisttulip',
            comments: {
                create: [
                    {
                        author: { connect: { name: 'bob' } },
                        body: '4. heptastylar',
                    },
                ],
            },
        },
    });
}

main()
    .catch((e) => console.error(e))
    .finally(async () => {
        await prisma.$disconnect();
    });
