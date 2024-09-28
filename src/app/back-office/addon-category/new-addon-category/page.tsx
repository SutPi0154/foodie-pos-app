import MultiSelect from "@/components/MultiSelect";
import { getCompanyMenu } from "@/lib/actions";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
} from "@mui/material";
import { createNewAddonCategory } from "../actions";

const NewAddonCategoryPage = async () => {
  const menus = await getCompanyMenu();
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

export default NewAddonCategoryPage;
