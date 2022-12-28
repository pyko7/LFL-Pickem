/*
  Warnings:

  - You are about to drop the `selectedteam` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `selectedteam` DROP FOREIGN KEY `SelectedTeam_id_fkey`;

-- DropForeignKey
ALTER TABLE `selectedteam` DROP FOREIGN KEY `SelectedTeam_teamId_fkey`;

-- AlterTable
ALTER TABLE `game` ADD COLUMN `userId` VARCHAR(191) NULL;

-- DropTable
DROP TABLE `selectedteam`;

-- AddForeignKey
ALTER TABLE `Game` ADD CONSTRAINT `Game_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
