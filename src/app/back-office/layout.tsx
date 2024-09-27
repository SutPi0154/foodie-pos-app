import Sidebar from "@/components/Sidebar";
import TopBar from "@/components/TopBar";
import { Box } from "@mui/material";
import { ReactNode } from "react";

interface Prop {
  children: ReactNode;
}
const BackOfficeLayout = ({ children }: Prop) => {
  return (
    <div>
      <TopBar />
      <Box sx={{ display: "flex" }}>
        <Sidebar />
        <Box sx={{ p: 2, width: "100%" }}>{children}</Box>
      </Box>
    </div>
  );
};

export default BackOfficeLayout;
