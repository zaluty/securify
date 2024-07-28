-- CreateTable
CREATE TABLE "ApiKey" (
    "id" TEXT NOT NULL,
    "originalKey" TEXT NOT NULL,
    "generatedKey" TEXT NOT NULL,
    "apiProvider" TEXT NOT NULL,
    "baseUrl" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ApiKey_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ApiKey_generatedKey_key" ON "ApiKey"("generatedKey");
