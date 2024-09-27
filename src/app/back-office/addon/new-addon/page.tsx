"use server";

import SingleSelect from "@/components/SingleSelect";
import { prisma } from "@/lib/prisma";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
} from "@mui/material";
import { createAddon } from "../actions";

const NewAddon = async () => {
  const addonCategories = await prisma.addonCategory.findMany();
  return (
    <>
      <Box
        component={"form"}
        action={createAddon}
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
          label="name"
          name="name"
          variant="outlined"
        />
        <TextField
          sx={{ width: "80%" }}
          name="price"
          label="price"
          variant="outlined"
        />
        <SingleSelect title="addon category" items={addonCategories} />
        <FormControlLabel
          control={<Checkbox name="isAvailable" defaultChecked />}
          label="Available"
        />

        <Button type="submit" variant="contained" sx={{ width: "fit-content" }}>
          Create
        </Button>
      </Box>
    </>
  );
};

export default NewAddon;
