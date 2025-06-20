import { Wallet } from "@mercadopago/sdk-react";
import { useLocation, useParams } from "react-router-dom";
import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import "../../../../assets/css/generalStyles.css";
import { currencyFormat } from "../../../common/currencyFormat/CurrencyFormatContainer";
import { generalBackGroundColor } from "../../../../utils/helpers";
import { BackButtonContainer } from "../../../common/backButton/BackButtonContainer";
import { useContext } from "react";
import { GeneralContext } from "../../../../context/GeneralContext";

export const FinalizePurchaseContainer = () => {
  const { preferenceId } = useParams();

  const { handleGoBack } = useContext(GeneralContext);

  const location = useLocation();
  const { cart, formData } = location.state || {};

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <Box className="generalContainer">
      <Box className="generalTitle">Controlá los datos de tu compra</Box>
      <Box
        sx={{
          margin: "10px",
          display: "flex",
          justifyContent: "center",
          gap: "10px",
          flexWrap: "wrap",
        }}
      >
        <b>Comprador: </b> {formData.buyer_name} {formData.buyer_last_name}
        <b>Dirección: </b> {formData.buyer_address}
        <b>Telefono: </b> {formData.buyer_phone}
        <b>Email: </b> {formData.buyer_email}
      </Box>
      <Box
        sx={{
          margin: "10px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
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
                    <TableCell align="center">{item.quantity}</TableCell>
                    <TableCell align="right" style={{ whiteSpace: "nowrap" }}>
                      {currencyFormat(item.price)}
                    </TableCell>
                    <TableCell align="right" style={{ whiteSpace: "nowrap" }}>
                      {currencyFormat(item.price * item.quantity)}
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
                    style={{ fontWeight: "bold", whiteSpace: "nowrap" }}
                  >
                    {currencyFormat(totalPrice)}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 2,
            margin: "10px",
            width: "100%",
          }}
        >
          <Box sx={{ width: "100%", maxWidth: "350px", marginTop: "20px" }}>
            <Wallet initialization={{ preferenceId }} />
          </Box>
          <Box sx={{ width: "100%", maxWidth: "350px" }}>
            <Button
              aria-label="volver atras"
              onClick={() => handleGoBack()}
              size="small"
              fullWidth
              sx={{
                color: "black",
                backgroundColor: "white",
                border: "1px solid black",
                "&:active": {
                  backgroundColor: generalBackGroundColor,
                  color: "white",
                  border: `1px solid white`,
                },
              }}
            >
              Volver
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
