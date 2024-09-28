"use server";

import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function getMenu(id: number) {
  const menu = await prisma.menu.findFirst({ where: { id } });
  if (!menu) return redirect("/back-office/menu");
  return menu;
}

export async function createMenu(formData: FormData) {
  const name = formData.get("name") as string;
  const price = Number(formData.get("price"));
  const isAvailable =
    (formData.get("isAvailable") as string) === "on" ? true : false;
  const menuCategories = formData
    .getAll("menuCategories")
    .map((menuCategoryId) => Number(menuCategoryId));
  const menu = await prisma.menu.create({ data: { name, price, isAvailable } });
  const data = menuCategories.map((menuCategoryId) => ({
    menuId: menu.id,
    menuCategoryId: menuCategoryId,
  }));
  await prisma.menuCategoriesMenus.createMany({ data });
  return redirect("/back-office/menu");
}

export async function updateMenu(formData: FormData) {
  const id = Number(formData.get("menuId"));
  const name = formData.get("name") as string;
  const price = Number(formData.get("price"));
  const isAvailable = formData.get("isAvailable") === "on" ? true : false;
  const selected =
    (formData.get("selected") as string).trim() === ""
      ? []
      : ((formData.get("selected") as string)
          .split(",")
          .map((menuCategoryId) => Number(menuCategoryId)) as number[]);

  const oldMenuCategoryMenus = await prisma.menuCategoriesMenus.findMany({
    where: { menuId: id },
  });
  const oldMenuCategoryIds = oldMenuCategoryMenus.map(
    (item) => item.menuCategoryId
  );
  const data = selected.map((item) => ({ menuId: id, menuCategoryId: item }));
  const isSame =
    oldMenuCategoryIds.length === selected.length &&
    oldMenuCategoryIds.every((item) => selected.includes(item));

  if (!isSame) {
    await prisma.menuCategoriesMenus.deleteMany({ where: { menuId: id } });
    await prisma.menuCategoriesMenus.createMany({ data });
  }
  await prisma.menu.update({
    where: { id },
    data: { name, price, isAvailable },
  });
  return redirect(`/back-office/menu/${id}`);
}

export async function deleteMenu(formData: FormData) {
  const id = Number(formData.get("menuId"));
  await prisma.menuCategoriesMenus.deleteMany({ where: { menuId: id } });
  await prisma.menusAddonCategories.deleteMany({ where: { menuId: id } });
  await prisma.menu.delete({ where: { id } });
  return redirect("/back-office/menu");
}
