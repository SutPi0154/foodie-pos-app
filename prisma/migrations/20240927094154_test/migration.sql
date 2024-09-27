/*
  Warnings:

  - You are about to drop the `MenuAddonCategories` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `MenuCategoryMenus` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "MenuAddonCategories" DROP CONSTRAINT "MenuAddonCategories_addonCategoryId_fkey";

-- DropForeignKey
ALTER TABLE "MenuAddonCategories" DROP CONSTRAINT "MenuAddonCategories_menuId_fkey";

-- DropForeignKey
ALTER TABLE "MenuCategoryMenus" DROP CONSTRAINT "MenuCategoryMenus_menuCategoryId_fkey";

-- DropForeignKey
ALTER TABLE "MenuCategoryMenus" DROP CONSTRAINT "MenuCategoryMenus_menuId_fkey";

-- DropTable
DROP TABLE "MenuAddonCategories";

-- DropTable
DROP TABLE "MenuCategoryMenus";

-- CreateTable
CREATE TABLE "MenuCategoriesMenus" (
    "id" SERIAL NOT NULL,
    "menuCategoryId" INTEGER NOT NULL,
    "menuId" INTEGER NOT NULL,
    "isArchived" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MenuCategoriesMenus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MenusAddonCategories" (
    "id" SERIAL NOT NULL,
    "menuId" INTEGER NOT NULL,
    "addonCategoryId" INTEGER NOT NULL,
    "isArchived" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MenusAddonCategories_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "MenuCategoriesMenus" ADD CONSTRAINT "MenuCategoriesMenus_menuCategoryId_fkey" FOREIGN KEY ("menuCategoryId") REFERENCES "MenuCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MenuCategoriesMenus" ADD CONSTRAINT "MenuCategoriesMenus_menuId_fkey" FOREIGN KEY ("menuId") REFERENCES "Menu"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MenusAddonCategories" ADD CONSTRAINT "MenusAddonCategories_addonCategoryId_fkey" FOREIGN KEY ("addonCategoryId") REFERENCES "AddonCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MenusAddonCategories" ADD CONSTRAINT "MenusAddonCategories_menuId_fkey" FOREIGN KEY ("menuId") REFERENCES "Menu"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
