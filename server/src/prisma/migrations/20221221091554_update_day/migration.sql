-- DropForeignKey
ALTER TABLE `game` DROP FOREIGN KEY `Game_dayId_fkey`;

-- AddForeignKey
ALTER TABLE `Game` ADD CONSTRAINT `Game_dayId_fkey` FOREIGN KEY (`dayId`) REFERENCES `Day`(`id`) ON DELETE NO ACTION ON UPDATE CASCADE;
