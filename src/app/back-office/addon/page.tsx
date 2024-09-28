import ItemCard from "@/components/ItemCard";
import { getCompanyAddonCategory } from "@/lib/actions";
import { prisma } from "@/lib/prisma";
import EggIcon from "@mui/icons-material/Egg";
import { Box, Button } from "@mui/material";
import Link from "next/link";

const AddonPage = async () => {
  const addonCategoryIds = (await getCompanyAddonCategory()).map(
    (item) => item.id
  );
  const addons = await prisma.addon.findMany({
    where: { addonCategoryId: { in: addonCategoryIds } },
  });

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
          {addons.map((addon) => {
            return (
              <ItemCard
                key={addon.id}
                href={`/back-office/addon/${addon.id}`}
                icon={<EggIcon fontSize="large" />}
                title={addon.name}
                isAvailable
              />
            );
          })}
        </Box>
        <Link href={`addon/new-addon`}>
          <Button variant="contained">Create</Button>
        </Link>
      </Box>
    </>
  );
};

export default AddonPage;
