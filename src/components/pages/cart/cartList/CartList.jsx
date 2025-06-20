import React from "react";
import {
  buttonColor,
  generalBackGroundColor,
  hoverButtonColor,
} from "../../../../utils/helpers";
import { currencyFormat } from "../../../common/currencyFormat/CurrencyFormatContainer";
import {
  Box,
  Button,
  ButtonGroup,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
} from "@mui/material";
import { Icons } from "../../../../assets/Icons";
import { BackButtonContainer } from "../../../common/backButton/BackButtonContainer";
import { ButtonGroupContainer } from "../../../common/buttonGroup/ButtonGroupContainer";

export const CartList = (cartListProps) => {
  const {
    cart,
    removeProduct,
    addProduct,
    totalPrice,
    removeProductFromCart,
    handleContinue,
    handleGoBack,
  } = cartListProps;
  const addRemoveButtonStyle = {
    width: 28,
    height: 28,
    color: "white",
    backgroundColor: buttonColor,
    "&:active": {
      backgroundColor: generalBackGroundColor + " !important",
    },
  };

  const buttonGroupContainerProps = {
    handleContinue,
    handleGoBack,
  };

  if (cart.length === 0)
    return (
      <Box className="generalContainer">
        <Box className="generalSubTitle">No hay productos en el carrito</Box>
        <Box sx={{ display: "flex", justifyContent: "center", mt: 5, mb: 5 }}>
          <img src={"/images/emptyCart.svg"} width={150} alt="empty cart" />
        </Box>
        <BackButtonContainer />
      </Box>
    );
  return (
    <Box className="generalContainer">
      <Box className="generalSubTitle">
        Revisá tu compra, presioná el botón continuar para completar los datos
        de tu pedido:{" "}
      </Box>
      <Box className="generalList">
        <Box
          style={{
            overflowX: "auto",
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <TableContainer sx={{ width: "auto" }} component={Paper}>
            <Table sx={{ width: "auto" }} aria-label="simple table">
              <TableHead>
                <TableRow
                  style={{
                    backgroundColor: generalBackGroundColor,
                  }}
                >
                  <TableCell
                    align="center"
                    style={{ minWidth: "200px", whiteSpace: "nowrap" }}
                  >
                    Producto
                  </TableCell>
                  <TableCell align="center" style={{ whiteSpace: "nowrap" }}>
                    Cantidad
                  </TableCell>
                  <TableCell align="center" style={{ whiteSpace: "nowrap" }}>
                    Precio
                  </TableCell>
                  <TableCell align="center" style={{ whiteSpace: "nowrap" }}>
                    Subtotal
                  </TableCell>
                  <TableCell align="center" style={{ whiteSpace: "nowrap" }}>
                    Subtotal
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cart.map((item) => (
                  <TableRow
                    key={item.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {item.description}
                    </TableCell>
                    <TableCell align="center">
                      <Box
                        sx={{
                          border: "1px solid black",
                          padding: "4px",
                          borderRadius: "20px",
                          width: "100px",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          backgroundColor: "rgba(255, 255, 255, 0.5)",
                        }}
                      >
                        <IconButton
                          aria-label="remove product"
                          onClick={() => removeProduct(item)}
                          sx={addRemoveButtonStyle}
                        >
                          <Icons.RemoveIcon sx={{ fontSize: "20px" }} />
                        </IconButton>
                        <Box>{item.quantity}</Box>
                        <IconButton
                          aria-label="add product"
                          onClick={() => addProduct(item)}
                          sx={addRemoveButtonStyle}
                        >
                          <Icons.AddIcon sx={{ fontSize: "20px" }} />
                        </IconButton>
                      </Box>
                    </TableCell>
                    <TableCell align="right" style={{ whiteSpace: "nowrap" }}>
                      {currencyFormat(item.price)}
                    </TableCell>
                    <TableCell align="right" style={{ whiteSpace: "nowrap" }}>
                      {currencyFormat(item.price * item.quantity)}
                    </TableCell>
                    <TableCell align="right" style={{ whiteSpace: "nowrap" }}>
                      <IconButton
                        aria-label="add product"
                        onClick={() => removeProductFromCart(item)}
                      >
                        <Icons.DeleteIcon
                          color="error"
                          sx={{ fontSize: "30px" }}
                        />
                      </IconButton>{" "}
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell
                    colSpan={3}
                    align="right"
                    style={{ fontWeight: "bold" }}
                  >
                    Total
                  </TableCell>
                  <TableCell
                    align="right"
                    style={{ whiteSpace: "nowrap", fontWeight: "bold" }}
                  >
                    {currencyFormat(totalPrice)}
                  </TableCell>
                  <TableCell
                    align="right"
                    style={{ whiteSpace: "nowrap", fontWeight: "bold" }}
                  ></TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
        <ButtonGroupContainer {...buttonGroupContainerProps} />
      </Box>
    </Box>
  );
};
