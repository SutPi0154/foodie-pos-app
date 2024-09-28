import ItemCard from "@/components/ItemCard";
import { GetCompanyId } from "@/lib/actions";
import { prisma } from "@/lib/prisma";
import CategoryIcon from "@mui/icons-material/Category";
import { Box, Button } from "@mui/material";
import Link from "next/link";

const MenuCategoryPage = async () => {
  const menuCategories = await prisma.menuCategory.findMany({
    where: { companyId: await GetCompanyId() },
  });

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "start",
        }}
      >
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
          {menuCategories.map((menuCategory) => {
            return (
              <ItemCard
                key={menuCategory.id}
                href={`/back-office/menu-category/${menuCategory.id}`}
                icon={<CategoryIcon fontSize="large" />}
                title={menuCategory.name}
                isAvailable
              />
            );
          })}
        </Box>
        <Link href={`menu-category/new-menu-category`}>
          <Button variant="contained">Create</Button>
        </Link>
      </Box>
    </>
  );
};

export default MenuCategoryPage;
