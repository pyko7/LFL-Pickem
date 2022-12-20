-- AlterTable
ALTER TABLE `game` ADD COLUMN `splitId` INTEGER NULL;

-- CreateTable
CREATE TABLE `Split` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `gameId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Game` ADD CONSTRAINT `Game_splitId_fkey` FOREIGN KEY (`splitId`) REFERENCES `Split`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
