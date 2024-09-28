"use server";

import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function createAddon(formData: FormData) {
  const name = formData.get("name") as string;
  const price = Number(formData.get("price"));
  const isAvailable =
    (formData.get("isAvailable") as string) === "on" ? true : false;
  const addonCategoryId = Number(formData.get("addonCategoryId"));
  await prisma.addon.create({
    data: { name, price, isAvailable, addonCategoryId },
  });
  return redirect("/back-office/addon");
}

export async function updateAddon(formData: FormData) {
  const id = Number(formData.get("addonId"));
  const name = formData.get("name") as string;
  const price = Number(formData.get("price"));
  const isAvailable = formData.get("isAvailable") === "on" ? true : false;
  const addonCategoryId = Number(formData.get("addonCategoryId"));
  await prisma.addon.update({
    where: { id },
    data: { name, isAvailable, price, addonCategoryId },
  });
  return redirect(`/back-office/addon`);
}

export async function deleteAddon(formData: FormData) {
  const id = Number(formData.get("addonId"));
  await prisma.addon.delete({ where: { id } });
  return redirect("/back-office/addon");
}
