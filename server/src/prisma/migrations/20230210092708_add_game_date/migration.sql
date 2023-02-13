/*
  Warnings:

  - A unique constraint covering the columns `[id,date]` on the table `Game` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `gameDate` to the `Bet` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `bet` DROP FOREIGN KEY `Bet_gameId_fkey`;

-- AlterTable
ALTER TABLE `bet` ADD COLUMN `gameDate` DATETIME(3) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Game_id_date_key` ON `Game`(`id`, `date`);

-- AddForeignKey
ALTER TABLE `Bet` ADD CONSTRAINT `Bet_gameId_gameDate_fkey` FOREIGN KEY (`gameId`, `gameDate`) REFERENCES `Game`(`id`, `date`) ON DELETE RESTRICT ON UPDATE CASCADE;
