"use client";

import {
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
} from "@mui/material";
import { Menu, MenuCategory } from "@prisma/client";
import { useEffect, useState } from "react";

interface Props {
  title: string;
  items: MenuCategory[] | Menu[];
  menuCategoryIds?: number[];
  menuIds?: number[];
}

const MultiSelect = ({ title, items, menuCategoryIds, menuIds }: Props) => {
  const [selected, setSelected] = useState<number[]>([]);

  useEffect(() => {
    if (menuCategoryIds) setSelected(menuCategoryIds);
    if (menuIds) setSelected(menuIds);
  }, [menuCategoryIds, menuIds]);
  console.log(menuIds);
  return (
    <FormControl sx={{ width: 190 }}>
      <InputLabel>{title}</InputLabel>
      <Select
        name="selected"
        value={selected}
        multiple
        input={<OutlinedInput label={title} />}
        onChange={(e) => {
          const selected = e.target.value as number[];
          setSelected(selected);
        }}
        renderValue={() => {
          return selected
            .map((itemId) => items.find((item) => item.id === itemId))
            .map((item) => item?.name)
            .join(", ");
        }}
      >
        {items.map((item) => {
          return (
            <MenuItem key={item.id} value={item.id}>
              <Checkbox checked={selected.includes(item.id)} />
              <ListItemText>{item.name}</ListItemText>
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};

export default MultiSelect;
