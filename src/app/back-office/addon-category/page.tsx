import ItemCard from "@/components/ItemCard";
import { getCompanyAddonCategory } from "@/lib/actions";
import ClassIcon from "@mui/icons-material/Class";
import { Box, Button } from "@mui/material";
import Link from "next/link";

const AddonCategoryPage = async () => {
  const addonCategories = await getCompanyAddonCategory();

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
          {addonCategories.map((addonCategory) => {
            return (
              <ItemCard
                key={addonCategory.id}
                href={`/back-office/addon-category/${addonCategory.id}`}
                icon={<ClassIcon fontSize="large" />}
                title={addonCategory.name}
                isAvailable
              />
            );
          })}
        </Box>
        <Link href={`addon-category/new-addon-category`}>
          <Button variant="contained">Create</Button>
        </Link>
      </Box>
    </>
  );
};

export default AddonCategoryPage;
