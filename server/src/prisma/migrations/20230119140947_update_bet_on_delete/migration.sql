-- DropForeignKey
ALTER TABLE `bet` DROP FOREIGN KEY `Bet_userId_fkey`;

-- AddForeignKey
ALTER TABLE `Bet` ADD CONSTRAINT `Bet_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
