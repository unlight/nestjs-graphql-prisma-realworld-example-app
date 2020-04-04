# Migration `20200404175246-initial`

This migration has been generated by roman at 4/4/2020, 5:52:46 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TABLE "quaint"."User" (
    "bio" TEXT   ,
    "email" TEXT NOT NULL  ,
    "id" TEXT NOT NULL  ,
    "image" TEXT   ,
    "name" TEXT NOT NULL  ,
    "password" TEXT NOT NULL  ,
    PRIMARY KEY ("id")
) 

CREATE TABLE "quaint"."Tag" (
    "id" TEXT NOT NULL  ,
    "name" TEXT NOT NULL  ,
    PRIMARY KEY ("id")
) 

CREATE TABLE "quaint"."Article" (
    "authorId" TEXT NOT NULL  ,
    "body" TEXT NOT NULL  ,
    "createdAt" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP ,
    "description" TEXT NOT NULL  ,
    "favoritesCount" INTEGER NOT NULL DEFAULT 0 ,
    "id" TEXT NOT NULL  ,
    "slug" TEXT NOT NULL  ,
    "title" TEXT NOT NULL  ,
    "updatedAt" DATE NOT NULL  ,
    PRIMARY KEY ("id"),FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE
) 

CREATE TABLE "quaint"."Comment" (
    "authorId" TEXT NOT NULL  ,
    "body" TEXT NOT NULL  ,
    "createdAt" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP ,
    "id" TEXT NOT NULL  ,
    "updatedAt" DATE NOT NULL  ,
    PRIMARY KEY ("id"),FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE
) 

CREATE TABLE "quaint"."_UserFollows" (
    "A" TEXT NOT NULL  ,
    "B" TEXT NOT NULL  ,FOREIGN KEY ("A") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE,
FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE
) 

CREATE TABLE "quaint"."_FavoritedArticles" (
    "A" TEXT NOT NULL  ,
    "B" TEXT NOT NULL  ,FOREIGN KEY ("A") REFERENCES "Article"("id") ON DELETE CASCADE ON UPDATE CASCADE,
FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE
) 

CREATE TABLE "quaint"."_ArticleToTag" (
    "A" TEXT NOT NULL  ,
    "B" TEXT NOT NULL  ,FOREIGN KEY ("A") REFERENCES "Article"("id") ON DELETE CASCADE ON UPDATE CASCADE,
FOREIGN KEY ("B") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE
) 

CREATE UNIQUE INDEX "quaint"."User.email" ON "User"("email")

CREATE UNIQUE INDEX "quaint"."Tag.name" ON "Tag"("name")

CREATE UNIQUE INDEX "quaint"."Article.slug" ON "Article"("slug")

CREATE UNIQUE INDEX "quaint"."_UserFollows_AB_unique" ON "_UserFollows"("A","B")

CREATE  INDEX "quaint"."_UserFollows_B_index" ON "_UserFollows"("B")

CREATE UNIQUE INDEX "quaint"."_FavoritedArticles_AB_unique" ON "_FavoritedArticles"("A","B")

CREATE  INDEX "quaint"."_FavoritedArticles_B_index" ON "_FavoritedArticles"("B")

CREATE UNIQUE INDEX "quaint"."_ArticleToTag_AB_unique" ON "_ArticleToTag"("A","B")

CREATE  INDEX "quaint"."_ArticleToTag_B_index" ON "_ArticleToTag"("B")
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration ..20200404175246-initial
--- datamodel.dml
+++ datamodel.dml
@@ -1,0 +1,58 @@
+// This is Prisma schema file,
+// learn more about it in the docs: https://pris.ly/d/prisma-schema
+
+datasource db {
+    provider = "sqlite"
+    url = env("DATABASE_URL")
+}
+
+generator client {
+    provider = "prisma-client-js"
+}
+
+generator typegraphql {
+    provider = "node_modules/typegraphql-prisma/generator.js"
+    output = "../@generated/type-graphql"
+}
+
+model User {
+    id  String  @id  @default(cuid())
+    email  String  @unique
+    name  String
+    password  String
+    bio  String?
+    image  String?
+    followedBy  User[]   @relation("UserFollows", references: [id])
+    following   User[]   @relation("UserFollows", references: [id])
+    favoriteArticles  Article[]  @relation(name: "FavoritedArticles", references: [id])
+}
+
+model Tag {
+    id  String  @id  @default(cuid())
+    name  String  @unique
+    articles  Article[]
+}
+
+model Article {
+    id  String  @id  @default(cuid())
+    slug  String  @unique
+    title  String
+    description  String
+    body  String
+    tags  Tag[]
+    createdAt  DateTime  @default(now())
+    updatedAt  DateTime  @updatedAt
+    favoritesCount  Int  @default(0)
+    author    User  @relation(name: "ArticleAuthor", fields: [authorId], references: [id])
+    authorId  String
+    favoritedBy  User[]  @relation(name: "FavoritedArticles", references: [id])
+}
+
+model Comment {
+    id  String  @id  @default(cuid())
+    createdAt  DateTime  @default(now())
+    updatedAt  DateTime  @updatedAt
+    body  String
+    author    User  @relation(fields: [authorId], references: [id])
+    authorId  String
+}
```

