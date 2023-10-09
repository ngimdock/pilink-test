/*
  Warnings:

  - Added the required column `updatedAt` to the `forums` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `universities` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "forums" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "universities" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "StudentOnForum" (
    "memberAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "forumId" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,

    CONSTRAINT "StudentOnForum_pkey" PRIMARY KEY ("forumId","studentId")
);

-- AddForeignKey
ALTER TABLE "StudentOnForum" ADD CONSTRAINT "StudentOnForum_forumId_fkey" FOREIGN KEY ("forumId") REFERENCES "forums"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentOnForum" ADD CONSTRAINT "StudentOnForum_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "students"("id") ON DELETE SET DEFAULT ON UPDATE CASCADE;
