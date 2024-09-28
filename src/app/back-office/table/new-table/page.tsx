"use server";

import { GetCompanyId } from "@/lib/actions";
import { prisma } from "@/lib/prisma";
import { Box, Button, TextField } from "@mui/material";
import { createTable } from "../actions";

const NewTablePage = async () => {
  const companyId = await GetCompanyId();
  const locationId = (
    await prisma.location.findMany({ where: { companyId } })
  ).find((item) => item.id)?.id;
  console.log(locationId, "!!!!!!!!!!!!!!!!!!!!!!!!!");
  return (
    <>
      <Box
        component={"form"}
        action={createTable}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 3,
          width: "30%",
          alignItems: "center",
        }}
      >
        <input type="hidden" name="locationId" value={locationId} />
        <TextField
          sx={{ width: "80%" }}
          label="name"
          name="name"
          variant="outlined"
        />

        <Button type="submit" variant="contained" sx={{ width: "fit-content" }}>
          Create
        </Button>
      </Box>
    </>
  );
};

export default NewTablePage;
