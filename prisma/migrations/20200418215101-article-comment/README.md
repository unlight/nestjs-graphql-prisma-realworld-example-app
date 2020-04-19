# Migration `20200418215101-article-comment`

This migration has been generated by roman at 4/18/2020, 9:51:01 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE "quaint"."Comment" ADD COLUMN "articleId" TEXT   ;
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200414232857-following..20200418215101-article-comment
--- datamodel.dml
+++ datamodel.dml
@@ -2,9 +2,9 @@
 // learn more about it in the docs: https://pris.ly/d/prisma-schema
 datasource db {
     provider = "sqlite"
-    url = "***"
+    url = env("DATABASE_URL")
 }
 generator client {
     provider = "prisma-client-js"
@@ -45,8 +45,9 @@
     favoritesCount  Int  @default(0)
     author    User  @relation(name: "ArticleAuthor", fields: [authorId], references: [id])
     authorId  String
     favoritedBy  User[]  @relation(name: "FavoritedArticles", references: [id])
+    comments  Comment[]
 }
 model Comment {
     id  String  @id  @default(cuid())
```

