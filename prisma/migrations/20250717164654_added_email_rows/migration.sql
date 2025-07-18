/*
  Warnings:

  - Added the required column `recipientEmail` to the `Email` table without a default value. This is not possible if the table is not empty.
  - Added the required column `recipientName` to the `Email` table without a default value. This is not possible if the table is not empty.
  - Added the required column `senderEmail` to the `Email` table without a default value. This is not possible if the table is not empty.
  - Added the required column `senderName` to the `Email` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Email" ADD COLUMN     "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "isArchived" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isDeleted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isDraft" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isRead" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isSent" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isStarred" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "recipientEmail" TEXT NOT NULL,
ADD COLUMN     "recipientName" TEXT NOT NULL,
ADD COLUMN     "senderEmail" TEXT NOT NULL,
ADD COLUMN     "senderName" TEXT NOT NULL;
