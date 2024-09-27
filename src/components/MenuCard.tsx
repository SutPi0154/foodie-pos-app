"use client";
import {
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Chip,
  Typography,
} from "@mui/material";
import { Menu } from "@prisma/client";
import Link from "next/link";

interface Prop {
  menu: Menu;
}
const MenuCard = ({ menu }: Prop) => {
  const { id, name, price, isAvailable } = menu;

  if (menu)
    return (
      <Link href={`/back-office/menu/${id}`} style={{ textDecoration: "none" }}>
        <Card sx={{ width: 300, height: 400, overflow: "hidden" }}>
          <div style={{ width: "100%", overflow: "hidden" }}>
            <CardMedia
              component="img"
              image="https://www.shutterstock.com/image-vector/set-menu-catering-restaurant-spoon-260nw-2436966699.jpg"
              alt={name}
              sx={{
                height: "250px",
                width: "100%",
                objectFit: "contain",
                transition: "transform 0.3s ease-in-out",
                "&:hover": { transform: "scale(1.05)" },
                display: "flex",
                justifyContent: "center",
              }}
            />
          </div>
          <CardHeader
            sx={{
              padding: "16px",
              ".MuiTypography-root": {
                fontSize: "1.125rem",
                fontWeight: 600,
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              },
            }}
          />
          <CardContent sx={{ paddingLeft: "22px", paddingTop: "0" }}>
            <Typography gutterBottom variant="h5" component="div">
              {name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              ${price?.toFixed(2)}
            </Typography>
            <Chip
              label={isAvailable ? "Available" : "Sold Out"}
              color={isAvailable ? "primary" : "secondary"}
              size="small"
              style={{ marginTop: "8px" }}
            />
          </CardContent>
        </Card>
      </Link>
    );
};

export default MenuCard;
