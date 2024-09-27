import BookIcon from "@mui/icons-material/Book";
import CategoryIcon from "@mui/icons-material/Category";
import EggIcon from "@mui/icons-material/Egg";
import InterpreterModeIcon from "@mui/icons-material/InterpreterMode";
import LocalDiningIcon from "@mui/icons-material/LocalDining";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SettingsIcon from "@mui/icons-material/Settings";
import TableBarIcon from "@mui/icons-material/TableBar";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import Link from "next/link";
const Sidebar = () => {
  const sidebarItems = [
    {
      id: 1,
      label: "Orders",
      icon: <InterpreterModeIcon />,
      route: "/back-office",
    },
    {
      id: 2,
      label: "Menu Category",
      icon: <CategoryIcon />,
      route: "/back-office/menu-category",
    },

    {
      id: 3,
      label: "Menu",
      icon: <LocalDiningIcon />,
      route: "/back-office/menu",
    },
    {
      id: 4,
      label: "Addon Category",
      icon: <BookIcon />,
      route: "/back-office/addon-category",
    },
    {
      id: 5,
      label: "Addon",
      icon: <EggIcon />,
      route: "/back-office/addon",
    },
    {
      id: 6,
      label: "Table",
      icon: <TableBarIcon />,
      route: "/back-office/table",
    },
    {
      id: 7,
      label: "Location",
      icon: <LocationOnIcon />,
      route: "/back-office/location",
    },
    {
      id: 8,
      label: "Setting",
      icon: <SettingsIcon />,
      route: "/back-office/setting",
    },
  ];
  return (
    <Box sx={{ width: "350px", bgcolor: "#8da9c4", height: "92vh" }}>
      <List sx={{ pt: 0 }}>
        {sidebarItems.map((item) => {
          return (
            <Link
              style={{ textDecoration: "none" }}
              key={item.id}
              href={item.route}
            >
              <ListItem
                sx={{ ":hover": { bgcolor: "#eef4ed" } }}
                disablePadding
              >
                <ListItemButton>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.label} sx={{ color: "black" }} />
                </ListItemButton>
              </ListItem>
            </Link>
          );
        })}
      </List>
    </Box>
  );
};

export default Sidebar;
