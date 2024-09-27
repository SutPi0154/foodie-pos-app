"use client";

import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
} from "@mui/material";
import { MenuCategory } from "@prisma/client";
import { useEffect, useState } from "react";
import { getMenuCategories } from "../../menu-category/actions";
import { createMenu } from "../actions";

const NewMenu = () => {
  const [menuCategories, setMenuCategories] = useState<MenuCategory[]>([]);
  const handleGetMenuCategories = async () => {
    const menuCategories = await getMenuCategories();
    setMenuCategories(menuCategories);
  };
  useEffect(() => {
    handleGetMenuCategories();
  }, []);

  return (
    <>
      <Box
        component={"form"}
        action={createMenu}
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
        {/* <MultiSelect
          // name="multiSelect"
          title="Menu Category"
          selected={selected}
          setSelected={setSelected}
          items={menuCategories}
        /> */}
        <Box
          sx={{
            display: "flex",
            my: 2,
            borderRadius: 1,
            border: "1px solid lightgrey",
            p: 2,
          }}
        >
          {menuCategories.map((menuCategory) => {
            return (
              <FormControlLabel
                key={menuCategory.id}
                control={
                  <Checkbox name={"menuCategories"} value={menuCategory.id} />
                }
                label={menuCategory.name}
              ></FormControlLabel>
            );
          })}
        </Box>
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

export default NewMenu;
