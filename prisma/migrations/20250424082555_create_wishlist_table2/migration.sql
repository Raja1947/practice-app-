/*
  Warnings:

  - The primary key for the `Wishlist` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Made the column `customerId` on table `Wishlist` required. This step will fail if there are existing NULL values in that column.
  - Made the column `productId` on table `Wishlist` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Wishlist" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "customerId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Wishlist" ("createdAt", "customerId", "id", "productId") SELECT "createdAt", "customerId", "id", "productId" FROM "Wishlist";
DROP TABLE "Wishlist";
ALTER TABLE "new_Wishlist" RENAME TO "Wishlist";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
