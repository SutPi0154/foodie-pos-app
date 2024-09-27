import MultiSelect from "@/components/MultiSelect";
import { prisma } from "@/lib/prisma";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
} from "@mui/material";
import { deleteAddonCategory, updateAddonCategory } from "../actions";

interface Props {
  params: { id: string };
}
export default async function AddonCategoryUpdatePage({ params }: Props) {
  const { id } = params;

  const addonCategory = await prisma.addonCategory.findFirst({
    where: { id: Number(id) },
  });
  const menus = await prisma.menu.findMany();
  const menuIds = (
    await prisma.menusAddonCategories.findMany({
      where: { addonCategoryId: Number(id) },
    })
  ).map((item) => item.menuId) as number[];

  return (
    <>
      <Box
        component={"form"}
        action={deleteAddonCategory}
        sx={{ mb: 2, marginLeft: "24%" }}
      >
        <input type="hidden" name="addonCategoryId" value={id} />
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
        action={updateAddonCategory}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 3,
          width: "30%",
          alignItems: "center",
        }}
      >
        <TextField
          defaultValue={addonCategory?.name}
          sx={{ width: "80%" }}
          name="addonCategoryName"
          variant="outlined"
        />
        <MultiSelect title="menus" items={menus} menuIds={menuIds} />
        <FormControlLabel
          control={
            <Checkbox
              name="isRequired"
              defaultChecked={addonCategory?.isRequired}
            />
          }
          label="required"
        />
        <input value={id} name="addonCategoryId" type="hidden" />

        <Box>
          <Button
            variant="contained"
            type="submit"
            sx={{ width: "fit-content" }}
          >
            Update addon category
          </Button>
        </Box>
      </Box>
    </>
  );
}
