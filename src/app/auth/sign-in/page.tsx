"use client";

import { Box, Button } from "@mui/material";
import { signIn } from "next-auth/react";

const AuthClient = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "90Vh",
      }}
    >
      <Button
        variant="contained"
        onClick={() => {
          signIn("google", { callbackUrl: "/back-office" });
        }}
      >
        sign in with google
      </Button>
    </Box>
  );
};

export default AuthClient;
