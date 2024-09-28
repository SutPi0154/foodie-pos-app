import SingleSelect from "@/components/SingleSelect";
import { getCompanyAddonCategory } from "@/lib/actions";
import { prisma } from "@/lib/prisma";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
} from "@mui/material";
import { deleteAddon, updateAddon } from "../actions";

interface Props {
  params: { id: string };
}
const AddonUpdatePage = async ({ params }: Props) => {
  const { id } = params;
  const addon = await prisma.addon.findFirst({ where: { id: Number(id) } });
  const addonCategoryId = addon?.addonCategoryId;
  const addonCategories = await getCompanyAddonCategory();
  return (
    <>
      <Box
        sx={{ display: "flex", my: 2, marginLeft: 42 }}
        component={"form"}
        action={deleteAddon}
      >
        <input type="hidden" value={id} name="addonId" />

        <Button variant="contained" type="submit" color="error">
          Delete
        </Button>
      </Box>
      <Box
        component={"form"}
        action={updateAddon}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 3,
          width: "30%",
          alignItems: "center",
        }}
      >
        <input type="hidden" value={id} name="addonId" />
        <TextField
          defaultValue={addon?.name}
          name="name"
          sx={{ width: "80%" }}
          variant="outlined"
        />
        <TextField
          defaultValue={addon?.price}
          sx={{ width: "80%" }}
          name="price"
          variant="outlined"
        />
        <SingleSelect
          addonCategoryId={addonCategoryId}
          title="addon Category"
          items={addonCategories}
        />
        <FormControlLabel
          name="isAvailable"
          control={<Checkbox defaultChecked={addon?.isAvailable} />}
          label={"is Available"}
        />

        <Button variant="contained" type="submit" sx={{ width: "fit-content" }}>
          Update Addon
        </Button>
      </Box>
    </>
  );
};

export default AddonUpdatePage;
