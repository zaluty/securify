/*
  Warnings:

  - You are about to drop the `ApiKey` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "ApiKey";

-- CreateTable
CREATE TABLE "input" (
    "id" TEXT NOT NULL,
    "originalKey" TEXT NOT NULL,
    "apiKeyName" TEXT NOT NULL,
    "generatedKey" TEXT NOT NULL,
    "apiProvider" TEXT NOT NULL,
    "baseUrl" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "input_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "securefyApiKey" (
    "securifyApiKey" TEXT NOT NULL,

    CONSTRAINT "securefyApiKey_pkey" PRIMARY KEY ("securifyApiKey")
);

-- CreateIndex
CREATE UNIQUE INDEX "input_generatedKey_key" ON "input"("generatedKey");
