"use client";

import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { AddonCategory, MenuCategory } from "@prisma/client";
import { useEffect, useState } from "react";

interface Props {
  title: string;
  items: MenuCategory[] | AddonCategory[];
  addonCategoryId?: number;
}
const SingleSelect = ({ title, items, addonCategoryId }: Props) => {
  const [selected, setSelected] = useState<number | null>(null);
  useEffect(() => {
    if (addonCategoryId) {
      setSelected(addonCategoryId);
    }
  }, [addonCategoryId]);
  return (
    <Box>
      <FormControl sx={{ width: 170 }}>
        <InputLabel> {title}</InputLabel>
        <Select
          name="addonCategoryId"
          value={selected}
          label={title}
          onChange={(e) => setSelected(Number(e.target.value))}
        >
          {items.map((item) => {
            return (
              <MenuItem key={item.id} value={item.id}>
                {item.name}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </Box>
  );
};

export default SingleSelect;
