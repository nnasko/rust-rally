-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "emailVerified" DATETIME,
    "phone" TEXT NOT NULL,
    "image" TEXT,
    "discord" TEXT,
    "steam" TEXT,
    "languages" TEXT,
    "region" TEXT,
    "age" TEXT
);
INSERT INTO "new_User" ("age", "discord", "email", "emailVerified", "id", "image", "languages", "name", "password", "phone", "region", "steam") SELECT "age", "discord", "email", "emailVerified", "id", "image", "languages", "name", "password", "phone", "region", "steam" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
