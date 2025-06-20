import { Box, Button } from "@mui/material";
import "../../../../assets/css/generalStyles.css";
import { generalBackGroundColor } from "../../../../utils/helpers";
import { currencyFormat } from "../../../common/currencyFormat/CurrencyFormatContainer";
import { BackButtonContainer } from "../../../common/backButton/BackButtonContainer";
import {
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableHead,
  Paper,
} from "@mui/material";

export const PurchaseOrdersItemsList = (purchaseOrdersItemsListProps) => {
  const { items, order } = purchaseOrdersItemsListProps;

  return (
    <Box className="generalContainer">
      <Box className="generalTitle">Detalles orden de compra {order.id}</Box>
      <Box
        sx={{
          margin: "10px",
          display: "flex",
          justifyContent: "center",
          gap: "10px",
          flexWrap: "wrap",
        }}
      >
        <b>Comprador: </b> {order.buyer_name} {order.buyer_last_name}
        <b>Dirección: </b> {order.buyer_address}
        <b>Telefono: </b> {order.buyer_phone}
        <b>Email: </b> {order.buyer_email}
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
                {items.map((item) => (
                  <TableRow
                    key={item.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {item.products.description}
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
                    {currencyFormat(order.total_price)}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
        <BackButtonContainer />
      </Box>
    </Box>
  );
};
