import { GeneralBarContainer } from "../../../layouts/generalBar/GeneralBarContainer";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardMedia,
  IconButton,
  Typography,
  Chip,
} from "@mui/material";
import "../../../../assets/css/generalStyles.css";
import { Icons } from "../../../../assets/Icons";
import { generalBackGroundColor } from "../../../../utils/helpers";
import "./productsList.css";
import { currencyFormat } from "../../../common/currencyFormat/CurrencyFormatContainer";
import { PaginationContainer } from "../../../common/pagination/PaginationContainer";
import { useState } from "react";
import { CardActionContainer } from "./CardActionContainer";

export const ProductsList = (productsListProps) => {
  const {
    filteredProducts,
    setFilteredProducts,
    addProduct,
    removeProduct,
    addProductToCart,
    ...generalBarContainerProps
  } = productsListProps;

  const [activeCardId, setActiveCardId] = useState(null);
  return (
    <Box className="generalContainer">
      <GeneralBarContainer {...generalBarContainerProps} />
      <Box className="generalSubTitle">{`${filteredProducts.length} productos disponibles`}</Box>
      <PaginationContainer items={filteredProducts} itemsPerPage={10}>
        {(recordsToShow) => (
          <Box className="generalList" sx={{ alignItems: "stretch" }}>
            {recordsToShow.map((product) => (
              <Card
                sx={{
                  boxShadow: "0px 0px 10px black",
                }}
                className="card"
                key={product.id}
              >
                <Box
                  className="cardImage"
                  sx={{
                    width: "100%",
                    height: "auto",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    margin: "auto",
                  }}
                >
                  <CardMedia
                    component="img"
                    image={
                      product.image
                        ? `${product.image}?t=${Date.now()}`
                        : "/images/logo2.png"
                    }
                    alt="producto"
                    sx={{
                      width: product.image ? "100%" : "80%",
                      maxHeight: "100%",
                      objectFit: "cover",
                      display: "block",
                      backgroundColor: "white",
                    }}
                  />
                </Box>
                {/* <Box className="categoryBox">
                  {product.products_categories.map((category) => (
                    <Chip
                      key={category.categories.name}
                      label={category.categories.name}
                      size="small"
                      sx={{
                        backgroundColor: generalBackGroundColor,
                        color: "black",
                        fontSize: "10px",
                        padding: "0px",
                      }}
                    />
                  ))}
                </Box> */}
                {/* <Box className="cardTitle">{product.brands.name}</Box> */}
                {product.special_offer?.trim() && (
                  <Box className="specialOffer">
                    <Chip
                      sx={{
                        textAlign: "center",
                        marginTop: "15px",
                        backgroundColor: generalBackGroundColor,
                        // maxWidth: "200px",
                        fontSize: "15px",
                        padding: "8px",
                        whiteSpace: "normal",
                        overflowWrap: "break-word",
                        wordBreak: "break-word",
                        height: "auto", // 👈 MUY IMPORTANTE
                        display: "flex", // 👈 Para que el label se expanda
                      }}
                      label={
                        <Box
                          sx={{
                            whiteSpace: "normal",
                            overflowWrap: "break-word",
                            wordBreak: "break-word",
                          }}
                        >
                          {product.special_offer}
                        </Box>
                      }
                    />
                  </Box>
                )}
                <Box className="cardText">
                  <Typography
                    variant="subtitle2"
                    component="div"
                    sx={{
                      textAlign: "justify",
                      paddingLeft: "10px",
                      paddingRight: "10px",
                    }}
                  >
                    {product.description}
                  </Typography>

                  {/* {product.special_offer && product.previous_price && (
                    <Typography
                      variant="h6"
                      component="div"
                      sx={{ textAlign: "center" }}
                    >
                      {currencyFormat(product.previous_price, true)}
                    </Typography>
                  )} */}
                  <Typography
                    variant="h6"
                    component="div"
                    sx={{
                      textAlign: "center",
                      marginBottom: "15px",
                    }}
                  >
                    {currencyFormat(product.price)}
                  </Typography>
                </Box>

                <CardActionContainer
                  product={product}
                  filteredProducts={filteredProducts}
                  setFilteredProducts={setFilteredProducts}
                  activeCardId={activeCardId}
                  setActiveCardId={setActiveCardId}
                  addProductToCart={addProductToCart}
                  addProduct={addProduct}
                  removeProduct={removeProduct}
                />
              </Card>
            ))}
          </Box>
        )}
      </PaginationContainer>
    </Box>
  );
};
