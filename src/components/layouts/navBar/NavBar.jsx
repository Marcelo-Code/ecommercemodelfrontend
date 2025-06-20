import { Badge, Box, IconButton, Tooltip, Typography } from "@mui/material";
import { Icons } from "../../../assets/Icons";
import "./navbar.css";
import { BurguerMenuContainer } from "../../common/burguerMenu/BurguerMenuContainer";
import { generalBackGroundColor } from "../../../utils/helpers";
import { Link } from "react-router-dom";
import { ShoppingBag, ShoppingCart } from "lucide-react";

export const NavBar = (navBarProps) => {
  const { totalProductsInCart, isLoggedIn, loggedUser, alerts } = navBarProps;
  const navBarIcon = {
    fontSize: "30px",
    color: "white",
  };

  const text =
    " ¡Promoción especial solo por hoy! — ¡20% OFF en toda la tienda! —";

  return (
    <div className="w-full bg-black">
      <div className="h-4"></div>
      <div className="relative w-full overflow-hidden text-white bg-generalBackGroundColor">
        <div className="flex animate-marquee whitespace-nowrap py-1 text-black">
          <span>{text}</span>
          <span>{text}</span>
          <span>{text}</span>
          <span>{text}</span>
          <span>{text}</span>
          <span>{text}</span>
          <span>{text}</span>
          <span>{text}</span>
        </div>
      </div>

      <Box className="navBarContainer" sx={{ backgroundColor: "black" }}>
        <BurguerMenuContainer />
        <Link style={{ textDecoration: "none" }} to="/">
          <Box className="titleLogoContainer">
            <Box className="titleLogo">
              <Box sx={{ fontSize: "30px" }}>NATIVO</Box>
              <Box sx={{ fontSize: "10px" }}>ALMACEN NATURAL</Box>
            </Box>
            <Box>
              <img src={"/images/leaf.png"} width={25} />
            </Box>
          </Box>
        </Link>

        {!isLoggedIn && (
          <Tooltip title="Carrito" placement="top-end" arrow>
            <Badge
              badgeContent={totalProductsInCart}
              showZero={true}
              sx={{
                marginTop: "7px",
                "& .MuiBadge-badge": {
                  backgroundColor: generalBackGroundColor,
                  color: "black",
                },
              }}
            >
              <Link to="/cart">
                <IconButton size="small">
                  {/* <Icons.ShoppingCartIcon sx={navBarIcon} /> */}
                  <ShoppingBag color="white" />
                </IconButton>
              </Link>
            </Badge>
          </Tooltip>
        )}

        {isLoggedIn && (
          <Tooltip title="Ordenes pendientes" placement="top-end" arrow>
            <Badge
              badgeContent={alerts}
              showZero={true}
              sx={{
                marginTop: "7px",
                "& .MuiBadge-badge": {
                  backgroundColor: "black",
                  color: "white",
                },
              }}
            >
              <Link to="/purchaseOrders">
                <IconButton size="small">
                  <Icons.NotificationsActiveIcon sx={navBarIcon} />
                </IconButton>
              </Link>
            </Badge>
          </Tooltip>
        )}

        {isLoggedIn && (
          <Box className="logged">{loggedUser ? loggedUser : "User"}</Box>
        )}
      </Box>
    </div>
  );
};
