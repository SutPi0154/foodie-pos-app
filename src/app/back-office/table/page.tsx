import ItemCard from "@/components/ItemCard";
import { getCompanyTable } from "@/lib/actions";
import TableBarIcon from "@mui/icons-material/TableBar";
import { Box, Button } from "@mui/material";
import Link from "next/link";

const TablePage = async () => {
  const tables = await getCompanyTable();
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "start",
        }}
      >
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
          {tables.map((table) => {
            return (
              <ItemCard
                key={table.id}
                href={`/back-office/table/${table.id}`}
                icon={<TableBarIcon fontSize="large" />}
                title={table.name}
                isAvailable
              />
            );
          })}
        </Box>
        <Link href={`table/new-table`}>
          <Button variant="contained">Create</Button>
        </Link>
      </Box>
    </>
  );
};

export default TablePage;
