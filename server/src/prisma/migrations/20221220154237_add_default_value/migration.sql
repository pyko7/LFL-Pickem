/*
  Warnings:

  - Made the column `dayId` on table `game` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX `Game_dayId_fkey` ON `game`;

-- AlterTable
ALTER TABLE `game` MODIFY `dayId` INTEGER NOT NULL;
