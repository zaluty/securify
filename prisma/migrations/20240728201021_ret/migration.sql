-- CreateTable
CREATE TABLE "ApiKey" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "originalKey" TEXT NOT NULL,
    "generatedKey" TEXT NOT NULL,
    "apiProvider" TEXT NOT NULL,
    "baseUrl" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "ApiKey_generatedKey_key" ON "ApiKey"("generatedKey");
