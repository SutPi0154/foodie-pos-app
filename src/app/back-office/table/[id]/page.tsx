import { prisma } from "@/lib/prisma";
import { Box, Button, TextField } from "@mui/material";
import { deleteTable, updateTable } from "../actions";

interface Props {
  params: { id: string };
}
const TableUpdatePage = async ({ params }: Props) => {
  const { id } = params;
  const table = await prisma.table.findFirst({ where: { id: Number(id) } });

  return (
    <>
      <Box
        sx={{ display: "flex", my: 2, marginLeft: 42 }}
        component={"form"}
        action={deleteTable}
      >
        <input type="hidden" value={id} name="tableId" />

        <Button variant="contained" type="submit" color="error">
          Delete
        </Button>
      </Box>
      <Box
        component={"form"}
        action={updateTable}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 3,
          width: "30%",
          alignItems: "center",
        }}
      >
        <input type="hidden" value={id} name="tableId" />
        <TextField
          defaultValue={table?.name}
          name="name"
          sx={{ width: "80%" }}
          variant="outlined"
        />

        <Button variant="contained" type="submit" sx={{ width: "fit-content" }}>
          Update Table
        </Button>
      </Box>
    </>
  );
};

export default TableUpdatePage;
