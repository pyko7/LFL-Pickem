-- DropForeignKey
ALTER TABLE `game` DROP FOREIGN KEY `Game_firstTeamId_fkey`;

-- DropForeignKey
ALTER TABLE `game` DROP FOREIGN KEY `Game_secondTeamId_fkey`;

-- AddForeignKey
ALTER TABLE `Game` ADD CONSTRAINT `Game_firstTeamId_fkey` FOREIGN KEY (`firstTeamId`) REFERENCES `Team`(`id`) ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Game` ADD CONSTRAINT `Game_secondTeamId_fkey` FOREIGN KEY (`secondTeamId`) REFERENCES `Team`(`id`) ON DELETE SET NULL ON UPDATE NO ACTION;
