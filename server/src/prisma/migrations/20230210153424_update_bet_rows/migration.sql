/*
  Warnings:

  - You are about to drop the column `gameDate` on the `bet` table. All the data in the column will be lost.
  - Added the required column `dayId` to the `Bet` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `bet` DROP FOREIGN KEY `Bet_gameId_gameDate_fkey`;

-- AlterTable
ALTER TABLE `bet` DROP COLUMN `gameDate`,
    ADD COLUMN `dayId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Bet` ADD CONSTRAINT `Bet_gameId_fkey` FOREIGN KEY (`gameId`) REFERENCES `Game`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Bet` ADD CONSTRAINT `Bet_dayId_fkey` FOREIGN KEY (`dayId`) REFERENCES `Day`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
