/*
  Warnings:

  - You are about to drop the column `splitId` on the `game` table. All the data in the column will be lost.
  - You are about to drop the `split` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `game` DROP FOREIGN KEY `Game_splitId_fkey`;

-- AlterTable
ALTER TABLE `game` DROP COLUMN `splitId`,
    ADD COLUMN `dayId` INTEGER NULL;

-- DropTable
DROP TABLE `split`;

-- CreateTable
CREATE TABLE `Day` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `gameId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Game` ADD CONSTRAINT `Game_dayId_fkey` FOREIGN KEY (`dayId`) REFERENCES `Day`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
