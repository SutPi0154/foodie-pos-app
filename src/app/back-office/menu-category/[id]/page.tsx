import { prisma } from "@/lib/prisma";
import { Box, Button, TextField } from "@mui/material";
import { deleteMenuCategory, updateMenuCategory } from "../actions";

interface Props {
  params: { id: string };
}
export default async function MenuCategoryUpdatePage({ params }: Props) {
  const { id } = params;

  const menuCategory = await prisma.menuCategory.findFirst({
    where: { id: Number(id) },
  });
  const menus = await prisma.menu.findMany();

  return (
    <>
      <Box
        component={"form"}
        action={deleteMenuCategory}
        sx={{ mb: 2, marginLeft: "24%" }}
      >
        <input type="hidden" name="menuCategoryId" value={id} />
        <Button
          variant="contained"
          color="error"
          type="submit"
          sx={{ color: "error" }}
        >
          delete
        </Button>
      </Box>
      <Box
        component={"form"}
        action={updateMenuCategory}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 3,
          width: "30%",
          alignItems: "center",
        }}
      >
        <TextField
          defaultValue={menuCategory?.name}
          sx={{ width: "80%" }}
          name="menuCategoryName"
          variant="outlined"
        />
        <input value={id} name="menuCategoryId" type="hidden" />

        <Box>
          <Button
            variant="contained"
            type="submit"
            sx={{ width: "fit-content" }}
          >
            Update Menu
          </Button>
        </Box>
      </Box>
    </>
  );
}
