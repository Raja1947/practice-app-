/*
  Warnings:

  - You are about to alter the column `customerId` on the `Wishlist` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - You are about to alter the column `productId` on the `Wishlist` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - Made the column `customerId` on table `Wishlist` required. This step will fail if there are existing NULL values in that column.
  - Made the column `productId` on table `Wishlist` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Wishlist" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "customerId" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Wishlist" ("createdAt", "customerId", "id", "productId") SELECT "createdAt", "customerId", "id", "productId" FROM "Wishlist";
DROP TABLE "Wishlist";
ALTER TABLE "new_Wishlist" RENAME TO "Wishlist";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
