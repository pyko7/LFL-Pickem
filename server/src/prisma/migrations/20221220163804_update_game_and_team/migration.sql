/*
  Warnings:

  - You are about to drop the column `firstTeamId` on the `game` table. All the data in the column will be lost.
  - You are about to drop the column `secondTeamId` on the `game` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `game` DROP FOREIGN KEY `Game_firstTeamId_fkey`;

-- DropForeignKey
ALTER TABLE `game` DROP FOREIGN KEY `Game_secondTeamId_fkey`;

-- AlterTable
ALTER TABLE `game` DROP COLUMN `firstTeamId`,
    DROP COLUMN `secondTeamId`;

-- AlterTable
ALTER TABLE `team` ADD COLUMN `gameId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Team` ADD CONSTRAINT `Team_gameId_fkey` FOREIGN KEY (`gameId`) REFERENCES `Game`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
