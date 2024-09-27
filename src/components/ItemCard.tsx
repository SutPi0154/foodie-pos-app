import { Paper, Typography } from "@mui/material";
import Link from "next/link";
import { ReactNode } from "react";

interface Props {
  title: string;
  href: string;
  icon: ReactNode;
  subtitle?: string;
  isAvailable?: boolean;
}
const ItemCard = ({ subtitle, href, isAvailable, icon, title }: Props) => {
  return (
    <Link href={href}>
      <Paper
        elevation={2}
        sx={{
          width: 170,
          height: 170,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          gap: 2,
          p: 2,
          "&:hover": { transform: "scale(1.02)" },
          transform: "transform ).3s, box-shadow 0.3s",
          opacity: isAvailable ? 1 : 0.4,
          boxShadow: 6,
        }}
      >
        {icon}
        <Typography sx={{ fontWeight: "500", mt: 1 }}>{title}</Typography>
        {subtitle && <Typography sx={{ fontSize: 14 }}>{subtitle}</Typography>}
      </Paper>
    </Link>
  );
};

export default ItemCard;
