/*
  Warnings:

  - The primary key for the `products` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `stock` on the `products` table. All the data in the column will be lost.
  - Added the required column `stockQuantity` to the `products` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `products` DROP PRIMARY KEY,
    DROP COLUMN `stock`,
    ADD COLUMN `stockQuantity` INTEGER NOT NULL,
    MODIFY `id` CHAR(40) NOT NULL,
    ADD PRIMARY KEY (`id`);
