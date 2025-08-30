import { Box, Button, Card, IconButton } from "@mui/material";
import "../../../../assets/css/generalStyles.css";
import "./productDetail.css";
import { BackButtonContainer } from "../../../common/backButton/BackButtonContainer";
import {
  buttonColor,
  generalBackGroundColor,
  hoverButtonColor,
} from "../../../../utils/helpers";
import { Icons } from "../../../../assets/Icons";
import { currencyFormat } from "../../../common/currencyFormat/CurrencyFormatContainer";

export const ProductDetail = ({
  product,
  addProduct,
  removeProduct,
  counter,
  addProductToCart,
}) => {
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

  return (
    <Box className="generalContainer">
      <Box className="generalTitle">Nuestras ofertas</Box>
      <Box
        sx={{
          width: "100%",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            padding: "20px",
            backgroundColor: generalBackGroundColor,
            textAlign: "center",
            width: "80%",
            maxWidth: "600px",
            margin: "auto",
            color: "white",
            marginTop: "50px",
            fontSize: "20px",
            borderRadius: "50px",
            textShadow: "0px 0px 5px black",
            boxShadow: "0px 0px 10px black",
            fontWeight: "bold",
          }}
        >
          {product.special_offer.toUpperCase()}
        </Box>
      </Box>
      <Box sx={{ marginTop: "10px" }} className="productCardContainer">
        <Box className="productCard">
          <Box className="productCardImage">
            <img
              src={product?.image ?? "/images/foodImage.jpg"}
              alt={product?.name ?? "Nombre producto"}
            />
          </Box>
          <Box className="productCardInfo">
            <Box>
              <ul style={{ textAlign: "center", lineHeight: "20px" }}>
                <li>{product.description}</li>
                <li style={{ fontSize: "20px", fontWeight: "bold" }}>
                  {currencyFormat(product.price)}
                </li>
              </ul>
            </Box>
          </Box>
          <Box className="productCardActions">
            <Box className="productActionsContent">
              <Box className="productCounter">
                <IconButton
                  sx={addRemoveButtonStyle}
                  aria-label="remove product"
                  onClick={() => removeProduct()}
                >
                  <Icons.RemoveIcon sx={{ fontSize: "20px" }} />
                </IconButton>
                <Box>{counter}</Box>
                <IconButton
                  sx={addRemoveButtonStyle}
                  aria-label="add product"
                  onClick={() => addProduct()}
                >
                  <Icons.AddIcon sx={{ fontSize: "20px" }} />
                </IconButton>
              </Box>
              <Button
                aria-label="add to cart"
                startIcon={<Icons.AddShoppingCartIcon />}
                size="small"
                fullWidth
                onClick={() => addProductToCart(product, counter)}
                sx={{
                  marginTop: 2,
                  width: "100%",
                  backgroundColor: buttonColor,
                  color: "white",
                  "&:hover": {
                    backgroundColor: hoverButtonColor,
                  },
                }}
              >
                Agregar
              </Button>
            </Box>
          </Box>
          <Box className="productCardBackAction">
            <BackButtonContainer />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
