"use server";

import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function createTable(formData: FormData) {
  const name = formData.get("name") as string;
  const locationId = Number(formData.get("locationId"));
  await prisma.table.create({
    data: { name, locationId },
  });
  return redirect("/back-office/table");
}

export async function updateTable(formData: FormData) {
  const id = Number(formData.get("tableId"));
  const name = formData.get("name") as string;
  await prisma.table.update({ where: { id }, data: { name } });
  return redirect(`/back-office/table`);
}

export async function deleteTable(formData: FormData) {
  const id = Number(formData.get("tableId"));
  await prisma.table.delete({ where: { id } });
  return redirect("/back-office/table");
}
