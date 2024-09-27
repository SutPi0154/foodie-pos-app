/*
  Warnings:

  - You are about to drop the `MenuAddonCategory` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `MenuCategoryMenu` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "MenuAddonCategory" DROP CONSTRAINT "MenuAddonCategory_addonCategoryId_fkey";

-- DropForeignKey
ALTER TABLE "MenuAddonCategory" DROP CONSTRAINT "MenuAddonCategory_menuId_fkey";

-- DropForeignKey
ALTER TABLE "MenuCategoryMenu" DROP CONSTRAINT "MenuCategoryMenu_menuCategoryId_fkey";

-- DropForeignKey
ALTER TABLE "MenuCategoryMenu" DROP CONSTRAINT "MenuCategoryMenu_menuId_fkey";

-- DropTable
DROP TABLE "MenuAddonCategory";

-- DropTable
DROP TABLE "MenuCategoryMenu";

-- CreateTable
CREATE TABLE "MenuCategoryMenus" (
    "id" SERIAL NOT NULL,
    "menuCategoryId" INTEGER NOT NULL,
    "menuId" INTEGER NOT NULL,
    "isArchived" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MenuCategoryMenus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MenuAddonCategories" (
    "id" SERIAL NOT NULL,
    "menuId" INTEGER NOT NULL,
    "addonCategoryId" INTEGER NOT NULL,
    "isArchived" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MenuAddonCategories_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "MenuCategoryMenus" ADD CONSTRAINT "MenuCategoryMenus_menuCategoryId_fkey" FOREIGN KEY ("menuCategoryId") REFERENCES "MenuCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MenuCategoryMenus" ADD CONSTRAINT "MenuCategoryMenus_menuId_fkey" FOREIGN KEY ("menuId") REFERENCES "Menu"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MenuAddonCategories" ADD CONSTRAINT "MenuAddonCategories_addonCategoryId_fkey" FOREIGN KEY ("addonCategoryId") REFERENCES "AddonCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MenuAddonCategories" ADD CONSTRAINT "MenuAddonCategories_menuId_fkey" FOREIGN KEY ("menuId") REFERENCES "Menu"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
