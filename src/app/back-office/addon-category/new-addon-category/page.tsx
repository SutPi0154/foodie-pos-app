import MultiSelect from "@/components/MultiSelect";
import { prisma } from "@/lib/prisma";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
} from "@mui/material";
import { createNewAddonCategory } from "../actions";

const NewAddonCategory = async () => {
  const menus = await prisma.menu.findMany();
  return (
    <>
      <Box
        component={"form"}
        action={createNewAddonCategory}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 3,
          width: "30%",
          alignItems: "center",
        }}
      >
        <TextField
          sx={{ width: "80%" }}
          name="addonCategoryName"
          label="name"
          variant="outlined"
        />

        <MultiSelect title="menus" items={menus} />
        <Box>
          <FormControlLabel
            control={<Checkbox name="isRequired" defaultChecked />}
            label="required"
          />
        </Box>

        <Button variant="contained" type="submit" sx={{ width: "fit-content" }}>
          Create
        </Button>
      </Box>
    </>
  );
};

export default NewAddonCategory;
