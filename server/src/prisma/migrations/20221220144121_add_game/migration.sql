-- CreateTable
CREATE TABLE `Game` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `date` DATETIME(3) NOT NULL,
    `firstTeamId` INTEGER NOT NULL,
    `secondTeamId` INTEGER NOT NULL,
    `winner` INTEGER NOT NULL,

    UNIQUE INDEX `Game_firstTeamId_key`(`firstTeamId`),
    UNIQUE INDEX `Game_secondTeamId_key`(`secondTeamId`),
    UNIQUE INDEX `Game_winner_key`(`winner`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Game` ADD CONSTRAINT `Game_firstTeamId_fkey` FOREIGN KEY (`firstTeamId`) REFERENCES `Team`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Game` ADD CONSTRAINT `Game_secondTeamId_fkey` FOREIGN KEY (`secondTeamId`) REFERENCES `Team`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
