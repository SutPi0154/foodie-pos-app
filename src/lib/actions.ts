"use server";

import { getServerSession, User } from "next-auth";
import { prisma } from "./prisma";

export async function getUser(email: string) {
  return await prisma.user.findFirst({ where: { email: email } });
}
export async function createDefaultData(nextUser: User) {
  const { name, email } = nextUser;
  const company = await prisma.company.create({
    data: { name: "Default Company" },
  });
  await prisma.user.create({
    data: { name: String(name), email: String(email), companyId: company.id },
  });
  const menuCategory = await prisma.menuCategory.create({
    data: { name: "Default Menu Category", companyId: company.id },
  });
  const menu = await prisma.menu.create({ data: { name: "default menu" } });

  const menuCategoriesMenus = await prisma.menuCategoriesMenus.create({
    data: { menuCategoryId: menuCategory.id, menuId: menu.id },
  });
  const location = await prisma.location.create({
    data: { name: "Default Location", companyId: company.id },
  });
  const addonCategory = await prisma.addonCategory.create({
    data: {
      name: "Default Addon Category",
    },
  });
  const menusAddonCategories = await prisma.menusAddonCategories.create({
    data: { menuId: menu.id, addonCategoryId: addonCategory.id },
  });
  const addonNames = [" Default Addon 1", "Default Addon 2", "Default Addon 3"];

  const data = addonNames.map((addonName) => ({
    name: addonName,
    addonCategoryId: addonCategory.id,
  }));
  await prisma.addon.createMany({ data });
  await prisma.table.create({
    data: { name: " Default Table", locationId: location.id },
  });
  //   const menuCategory =
}

export async function GetCompanyId() {
  const session = await getServerSession();
  const user = await prisma.user.findFirst({
    where: { email: session?.user?.email as string },
  });
  const company = await prisma.company.findFirst({
    where: {
      id: user?.companyId,
    },
  });
  return company?.id;
}
export async function getCompanyMenuCategory() {
  const companyId = await GetCompanyId();
  return await prisma.menuCategory.findMany({
    where: { companyId },
  });
}
export async function getCompanyMenu() {
  const companyId = await GetCompanyId();
  const menuCategories = await prisma.menuCategory.findMany({
    where: { companyId },
  });
  const menuCategoryIds = menuCategories.map((menuCategory) => menuCategory.id);
  const menuIds = (
    await prisma.menuCategoriesMenus.findMany({
      where: { menuCategoryId: { in: menuCategoryIds } },
    })
  ).map((item) => item.menuId);
  return await prisma.menu.findMany({
    where: { id: { in: menuIds } },
  });
}
export async function getCompanyAddonCategory() {
  const menuCategories = await getCompanyMenuCategory();
  const menuCategoryIds = menuCategories.map((menuCategory) => menuCategory.id);
  const menuIds = (
    await prisma.menuCategoriesMenus.findMany({
      where: { menuCategoryId: { in: menuCategoryIds } },
    })
  ).map((item) => item.menuId);
  const addonCategoryIds = (
    await prisma.menusAddonCategories.findMany({
      where: { menuId: { in: menuIds } },
    })
  ).map((item) => item.addonCategoryId);
  return await prisma.addonCategory.findMany({
    where: { id: { in: addonCategoryIds } },
  });
}

export async function getCompanyTable() {
  const companyId = await GetCompanyId();
  const locationId = (
    await prisma.location.findMany({ where: { companyId } })
  ).map((item) => item.id);

  return await prisma.table.findMany({
    where: { locationId: { in: locationId } },
  });
}
