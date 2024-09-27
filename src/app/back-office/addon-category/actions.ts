"use server";

import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function getAddonCategories() {
  return await prisma.addonCategory.findMany();
}

export async function updateAddonCategory(formData: FormData) {
  const id = Number(formData.get("addonCategoryId"));
  const name = formData.get("addonCategoryName") as string;
  const isRequired = Boolean(formData.get("isRequired") as string);
  console.log(isRequired);

  const menuIds =
    (formData.get("selected") as string).trim() === ""
      ? []
      : ((formData.get("selected") as string)
          .split(",")
          .map((menuId) => Number(menuId)) as number[]);
  const oldMenuIds = (
    await prisma.menuAddonCategories.findMany({
      where: { addonCategoryId: id },
    })
  ).map((item) => item.menuId);
  const isSame =
    menuIds.length === oldMenuIds.length &&
    menuIds.every((item) => oldMenuIds.includes(item));

  const data = menuIds.map((item) => ({ addonCategoryId: id, menuId: item }));
  if (!isSame) {
    await prisma.menuAddonCategories.deleteMany({
      where: { addonCategoryId: id },
    });
    await prisma.menuAddonCategories.createMany({ data });
  }
  await prisma.addonCategory.update({
    data: { name, isRequired },
    where: { id },
  });
  return redirect("/back-office/addon-category");
}

export async function createNewAddonCategory(formData: FormData) {
  const newAddonCategoryName = formData.get("addonCategoryName") as string;
  const isRequired = Boolean(formData.get("isRequired") as string);

  const menuIds =
    (formData.get("selected") as string).trim() === ""
      ? []
      : ((formData.get("selected") as string)
          .split(",")
          .map((menuId) => Number(menuId)) as number[]);

  if (newAddonCategoryName && menuIds) {
    const addonCategory = await prisma.addonCategory.create({
      data: { name: newAddonCategoryName, isRequired },
    });
    const data = menuIds.map((item) => ({
      addonCategoryId: addonCategory.id,
      menuId: item,
    }));
    await prisma.menuAddonCategories.createMany({ data });
    redirect("/back-office/addon-category");
  }
}

export async function deleteAddonCategory(formData: FormData) {
  const id = Number(formData.get("addonCategoryId"));
  await prisma.menuAddonCategories.deleteMany({
    where: { addonCategoryId: id },
  });
  await prisma.addonCategory.delete({ where: { id } });
  return redirect("/back-office/addon-category");
}
