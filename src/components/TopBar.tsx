"use client";
import { Button } from "@mui/material";
import { signOut } from "next-auth/react";

const TopBar = () => {
  return (
    <div
      style={{
        height: "80px",
        backgroundColor: "#13315c",
        display: "flex",
        color: "#eef4ed",
        justifyContent: "space-between",
        padding: "0 50px",
        alignItems: "center",
      }}
    >
      <h4>Foodie-pos</h4>
      <div>
        <Button
          variant="outlined"
          onClick={() => {
            signOut();
          }}
        >
          Log out
        </Button>
      </div>
    </div>
  );
};

export default TopBar;
