-- DropForeignKey
ALTER TABLE `team` DROP FOREIGN KEY `Team_leagueId_fkey`;

-- AddForeignKey
ALTER TABLE `Team` ADD CONSTRAINT `Team_leagueId_fkey` FOREIGN KEY (`leagueId`) REFERENCES `League`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
