-- CreateTable
CREATE TABLE "Prompt" (
    "id" SERIAL NOT NULL,
    "prompt" TEXT NOT NULL,
    "response" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Prompt_pkey" PRIMARY KEY ("id")
);
