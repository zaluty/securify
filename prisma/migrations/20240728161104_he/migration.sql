/*
  Warnings:

  - Added the required column `apiProvider` to the `ApiKey` table without a default value. This is not possible if the table is not empty.
  - Added the required column `baseUrl` to the `ApiKey` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ApiKey" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "originalKey" TEXT NOT NULL,
    "generatedKey" TEXT NOT NULL,
    "apiProvider" TEXT NOT NULL,
    "baseUrl" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_ApiKey" ("createdAt", "generatedKey", "id", "originalKey") SELECT "createdAt", "generatedKey", "id", "originalKey" FROM "ApiKey";
DROP TABLE "ApiKey";
ALTER TABLE "new_ApiKey" RENAME TO "ApiKey";
CREATE UNIQUE INDEX "ApiKey_generatedKey_key" ON "ApiKey"("generatedKey");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
