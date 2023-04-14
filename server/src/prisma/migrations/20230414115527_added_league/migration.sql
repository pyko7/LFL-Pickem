/*
  Warnings:

  - You are about to drop the column `color` on the `team` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `team` DROP COLUMN `color`,
    ADD COLUMN `leagueId` INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE `League` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `League_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Team` ADD CONSTRAINT `Team_leagueId_fkey` FOREIGN KEY (`leagueId`) REFERENCES `League`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
