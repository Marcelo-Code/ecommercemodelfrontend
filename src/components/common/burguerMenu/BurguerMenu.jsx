import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Icons } from "../../../assets/Icons";
import "./burguerMenu.css";
import { IconButton, Link, Tooltip } from "@mui/material";
import { generalBackGroundColor } from "../../../utils/helpers";

export const BurguerMenu = (burguerMenuProps) => {
  const { toggleDrawer, options, open, handleLogout, isLoggedIn } =
    burguerMenuProps;
  return (
    <Box>
      <Tooltip title="Menú" placement="top-end" arrow>
        <IconButton onClick={toggleDrawer(true)}>
          <Icons.MenuIcon sx={{ color: "white" }} />
        </IconButton>
      </Tooltip>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        <Box
          sx={{
            width: 250,
            height: "100%",
            backgroundColor: generalBackGroundColor,
          }}
          role="presentation"
        >
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "flex-end",
              px: 2,
              pt: 2,
            }}
          >
            <Tooltip title="Cerrar" placement="top-end" arrow>
              <IconButton onClick={toggleDrawer(false)}>
                <Icons.CloseIcon sx={{ color: "white" }} />
              </IconButton>
            </Tooltip>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between", // centra verticalmente
              alignItems: "start", // opcional: centra horizontalmente también
              height: "90%",
              overflow: "hidden",
            }}
          >
            <List>
              {options.map(({ icon, option, link }) => (
                <ListItem key={option} sx={{ width: "250px", padding: 0 }}>
                  <ListItemButton
                    component={Link}
                    to={link}
                    sx={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        color: "white",
                        minWidth: 40,
                      }}
                    >
                      {icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={option}
                      primaryTypographyProps={{
                        color: "black",
                        fontFamily: "Arial, Helvetica, sans-serif",
                        fontSize: "1.2rem",
                      }}
                      onClick={toggleDrawer(false)}
                    />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>

            {/* Logout */}
            {isLoggedIn && (
              <ListItem sx={{ width: "250px", padding: 0 }}>
                <ListItemButton
                  onClick={handleLogout}
                  sx={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    color: "white",
                  }}
                >
                  <ListItemIcon sx={{ color: "white", minWidth: 40 }}>
                    <Icons.LogoutIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="Logout"
                    primaryTypographyProps={{
                      color: "black",
                      fontSize: "1.2rem",
                    }}
                  />
                </ListItemButton>
              </ListItem>
            )}
          </Box>
        </Box>
      </Drawer>
    </Box>
  );
};
