-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Wishlist" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "customerId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Wishlist" ("createdAt", "customerId", "id", "productId") SELECT "createdAt", "customerId", "id", "productId" FROM "Wishlist";
DROP TABLE "Wishlist";
ALTER TABLE "new_Wishlist" RENAME TO "Wishlist";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
