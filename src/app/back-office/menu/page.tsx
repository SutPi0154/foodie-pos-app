"use server";

import MenuCard from "@/components/MenuCard";
import { prisma } from "@/lib/prisma";
import { Box, Button } from "@mui/material";
import Link from "next/link";

const MenusPage = async () => {
  const menus = await prisma.menu.findMany();

  return (
    <>
      <Box
        sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}
      >
        <Box sx={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
          {menus.map((item) => (
            <MenuCard menu={item} key={item.id} />
          ))}
        </Box>
        <Link href={"/back-office/menu/new-menu"}>
          <Button variant="contained">create</Button>
        </Link>
      </Box>
    </>
  );
};

export default MenusPage;
