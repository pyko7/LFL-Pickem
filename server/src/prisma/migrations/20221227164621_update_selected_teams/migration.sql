/*
  Warnings:

  - You are about to drop the column `userId` on the `game` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `game` DROP FOREIGN KEY `Game_userId_fkey`;

-- AlterTable
ALTER TABLE `game` DROP COLUMN `userId`;

-- CreateTable
CREATE TABLE `SelectedTeam` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `teamId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `SelectedTeam` ADD CONSTRAINT `SelectedTeam_id_fkey` FOREIGN KEY (`id`) REFERENCES `Day`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SelectedTeam` ADD CONSTRAINT `SelectedTeam_teamId_fkey` FOREIGN KEY (`teamId`) REFERENCES `Team`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
