/*
  Warnings:

  - You are about to drop the `day` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `game` DROP FOREIGN KEY `Game_dayId_fkey`;

-- DropTable
DROP TABLE `day`;
