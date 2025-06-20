import {
  buttonColor,
  generalBackGroundColor,
  hoverButtonColor,
} from "../../../../utils/helpers";
import "./productsList.css";
import { Icons } from "../../../../assets/Icons";
import { Box, Button, IconButton } from "@mui/material";

export const CardActionContainer = (cardActionsProps) => {
  const {
    product,
    filteredProducts,
    setFilteredProducts,
    activeCardId,
    setActiveCardId,
    addProductToCart,
    addProduct,
    removeProduct,
  } = cardActionsProps;

  const addRemoveButtonStyle = {
    width: 28,
    height: 28,
    color: "white",
    backgroundColor: buttonColor,
    "&:active": {
      backgroundColor: generalBackGroundColor + " !important",
    },
    "&:hover": {
      backgroundColor: buttonColor,
    },
  };

  const isActive = activeCardId === product.id;

  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Box
        className={`cardActionButton ${isActive ? "translate" : ""} `}
        sx={{ textAlign: "center" }}
      >
        <IconButton
          sx={{
            border: "2px solid black",
            backgroundColor: `black`,
            color: "white",
          }}
          onClick={() => setActiveCardId(isActive ? null : product.id)}
        >
          <Icons.LocalMallIcon sx={{ fontSize: "25px" }} />
        </IconButton>
      </Box>
      <Box className={`cardActions ${isActive ? "visible" : ""} `}>
        <Box
          sx={{
            width: "250px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              border: "1px solid black",
              padding: "4px",
              borderRadius: "20px",
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              backgroundColor: "white",
              mt: 1,
            }}
          >
            <IconButton
              aria-label="remove product"
              onClick={() => removeProduct(product, setFilteredProducts)}
              sx={addRemoveButtonStyle}
            >
              <Icons.RemoveIcon sx={{ fontSize: "20px" }} />
            </IconButton>
            <Box>{product.counter}</Box>
            <IconButton
              aria-label="add product"
              onClick={() => addProduct(product, setFilteredProducts)}
              sx={addRemoveButtonStyle}
            >
              <Icons.AddIcon sx={{ fontSize: "20px" }} />
            </IconButton>
          </Box>

          <Button
            onClick={() =>
              addProductToCart(product, filteredProducts, setFilteredProducts)
            }
            startIcon={<Icons.AddShoppingCartIcon />}
            size="small"
            sx={{
              borderRadius: "20px",
              height: "38px",
              width: "100%",
              mt: 1,
              backgroundColor: buttonColor,
              color: "white",
              "&:active": {
                backgroundColor: hoverButtonColor,
              },
            }}
          >
            Agregar
          </Button>

          <Button
            variant="outlined"
            size="small"
            sx={{
              borderRadius: "20px",
              height: "38px",
              width: "100%",
              mt: 1,
              color: "black",
              border: "1px solid black",
              backgroundColor: "white",
              "&:active": {
                backgroundColor: hoverButtonColor,
                color: "white",
                border: `1px solid ${hoverButtonColor}`,
              },
            }}
          >
            Detalles
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
