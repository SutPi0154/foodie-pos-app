import MultiSelect from "@/components/MultiSelect";
import { prisma } from "@/lib/prisma";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
} from "@mui/material";
import { MenuCategoriesMenus } from "@prisma/client";
import { deleteMenu, getMenu, updateMenu } from "../actions";

interface Props {
  params: { id: string };
}
const MenuUpdatePage = async ({ params }: Props) => {
  const { id } = params;
  const menu = await getMenu(Number(id));
  const menuCategories = await prisma.menuCategory.findMany();
  const menuCategoryIds = (
    (await prisma.menuCategoriesMenus.findMany({
      where: { menuId: Number(id) },
    })) as MenuCategoriesMenus[]
  ).map((item) => item.menuCategoryId);

  return (
    <>
      <Box
        sx={{ display: "flex", my: 2, marginLeft: 42 }}
        component={"form"}
        action={deleteMenu}
      >
        <input type="hidden" value={id} name="menuId" />

        <Button variant="contained" type="submit" color="error">
          Delete
        </Button>
      </Box>
      <Box
        component={"form"}
        action={updateMenu}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 3,
          width: "30%",
          alignItems: "center",
        }}
      >
        <input type="hidden" value={id} name="menuId" />
        <TextField
          defaultValue={menu?.name}
          name="name"
          sx={{ width: "80%" }}
          variant="outlined"
        />
        <TextField
          defaultValue={menu?.price}
          sx={{ width: "80%" }}
          name="price"
          variant="outlined"
        />
        <MultiSelect
          menuCategoryIds={menuCategoryIds}
          title="Menu Category"
          items={menuCategories}
        />
        <FormControlLabel
          name="isAvailable"
          control={<Checkbox defaultChecked={menu?.isAvailable} />}
          label={"is Available"}
        />

        <Button variant="contained" type="submit" sx={{ width: "fit-content" }}>
          Update Menu
        </Button>
      </Box>
    </>
  );
};

export default MenuUpdatePage;
