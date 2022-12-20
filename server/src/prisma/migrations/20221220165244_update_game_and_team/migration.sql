/*
  Warnings:

  - You are about to drop the column `gameId` on the `team` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `team` DROP FOREIGN KEY `Team_gameId_fkey`;

-- AlterTable
ALTER TABLE `game` ADD COLUMN `firstTeamId` INTEGER NULL,
    ADD COLUMN `secondTeamId` INTEGER NULL;

-- AlterTable
ALTER TABLE `team` DROP COLUMN `gameId`;

-- AddForeignKey
ALTER TABLE `Game` ADD CONSTRAINT `Game_firstTeamId_fkey` FOREIGN KEY (`firstTeamId`) REFERENCES `Team`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Game` ADD CONSTRAINT `Game_secondTeamId_fkey` FOREIGN KEY (`secondTeamId`) REFERENCES `Team`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
