"use server";

import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function getMenuCategories() {
  return await prisma.menuCategory.findMany();
}

export async function updateMenuCategory(formData: FormData) {
  const id = Number(formData.get("menuCategoryId"));
  const name = formData.get("menuCategoryName") as string;
  await prisma.menuCategory.update({ data: { name }, where: { id } });
  return redirect("/back-office/menu-category");
}

export async function createNewMenuCategory(formData: FormData) {
  const newMenuCategoryName = formData.get("menuCategoryName") as string;
  if (newMenuCategoryName) {
    await prisma.menuCategory.create({ data: { name: newMenuCategoryName } });
    redirect("/back-office/menu-category");
  }
}

export async function deleteMenuCategory(formData: FormData) {
  const id = Number(formData.get("menuCategoryId"));
  await prisma.menuCategory.delete({ where: { id } });
  await prisma.menuCategoriesMenus.deleteMany({
    where: { menuCategoryId: id },
  });
  return redirect("/back-office/menu-category");
}
