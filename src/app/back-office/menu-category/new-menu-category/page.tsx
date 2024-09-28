import { Box, Button, TextField } from "@mui/material";
import { createNewMenuCategory } from "../actions";

const NewMenuCategoryPage = () => {
  return (
    <>
      <Box
        component={"form"}
        action={createNewMenuCategory}
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
          name="menuCategoryName"
          label="name"
          variant="outlined"
        />

        <Button variant="contained" type="submit" sx={{ width: "fit-content" }}>
          Create
        </Button>
      </Box>
    </>
  );
};

export default NewMenuCategoryPage;
