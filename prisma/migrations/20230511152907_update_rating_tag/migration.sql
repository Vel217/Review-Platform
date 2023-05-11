/*
  Warnings:

  - You are about to drop the column `reviewId` on the `Rating` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[title]` on the table `Tag` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `filmId` to the `Rating` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Rating` DROP FOREIGN KEY `Rating_reviewId_fkey`;

-- AlterTable
ALTER TABLE `Rating` DROP COLUMN `reviewId`,
    ADD COLUMN `filmId` INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Tag_title_key` ON `Tag`(`title`);

-- AddForeignKey
ALTER TABLE `Rating` ADD CONSTRAINT `Rating_filmId_fkey` FOREIGN KEY (`filmId`) REFERENCES `Film`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
