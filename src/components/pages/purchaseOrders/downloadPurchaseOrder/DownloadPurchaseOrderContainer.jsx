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
  Typography,
} from "@mui/material";
import "../../../../assets/css/generalStyles.css";
import { useContext, useEffect, useRef, useState } from "react";
import { GeneralContext } from "../../../../context/GeneralContext";
import { useLocation, useNavigate } from "react-router-dom";
import html2pdf from "html2pdf.js";
import {
  buttonColor,
  dateFormat,
  generalBackGroundColor,
} from "../../../../utils/helpers";
import { currencyFormat } from "../../../common/currencyFormat/CurrencyFormatContainer";
import { getPurchaseOrderByPaymentId } from "../../../../services/api/purchaseOrders";
import { LoadingContainer } from "../../loading/LoadingContainer";
import { Icons } from "../../../../assets/Icons";
import { getReceipt } from "../../../../services/api/mercadoPago";

export const DownloadPurchaseOrderContainer = () => {
  const { clearCart } = useContext(GeneralContext);

  const [isLoading, setIsLoading] = useState(false);
  const [purchaseOrder, setPurchaseOrder] = useState(null);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const paymentId = queryParams.get("payment_id");
  const status = queryParams.get("status");

  const navigate = useNavigate();

  const formRef = useRef();

  const handleNavigate = () => {
    navigate("/");
  };
  const downloadPDF = () => {
    const element = formRef.current;
    html2pdf()
      .set({
        margin: 1,
        filename: `Nativo_orden_de_compra_${purchaseOrder.order.id}.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
      })
      .from(element)
      .save();
    handleNavigate();
    clearCart();
  };
  2;
  useEffect(() => {
    setIsLoading(true);

    Promise.all([getPurchaseOrderByPaymentId(paymentId), getReceipt(paymentId)])
      .then(([purchaseOrderResponse, receiptResponse]) => {
        setPurchaseOrder(purchaseOrderResponse.data);
        console.log(receiptResponse);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  if (isLoading || !purchaseOrder) {
    return <LoadingContainer />;
  }

  const totalPrice = purchaseOrder.purchaseItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <>
      <Box className="generalContainer">
        <Box className="generalTitle">¡Gracias por tu compra!</Box>
        <Box className="generalSubTitle">
          En breve nos contactaremos para coordinar la entrega
        </Box>
        <Box ref={formRef}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderBottom: "1px solid black",
              fontSize: "15px",
              gap: 3,
              pb: 2,
              mb: 2,
              mt: 2,
            }}
          >
            <Box>
              <img src="/images/logo2.png" width={60} alt="logo" />
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Box>
                <b>Orden de compra nro: </b>
                {purchaseOrder.order.id}
              </Box>
              <Box>
                <b>Operación nro: </b>
                {paymentId}
              </Box>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: 3,
              mb: 2,
              flexWrap: "wrap",
            }}
          >
            <Typography>
              <b>Fecha: </b> {dateFormat(purchaseOrder.order.date)}
            </Typography>
            <Typography>
              <b>Comprador: </b> {purchaseOrder.order.buyer_name}{" "}
              {purchaseOrder.order.buyer_last_name}
            </Typography>
            <Typography>
              <b>Teléfono: </b> {purchaseOrder.order.buyer_phone_number}
            </Typography>
            <Typography>
              <b>Dirección: </b> {purchaseOrder.order.buyer_address}
            </Typography>
            <Typography>
              <b>Email: </b> {purchaseOrder.order.buyer_email}
            </Typography>
          </Box>

          <Box
            sx={{
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
                  {purchaseOrder.purchaseItems.map((item) => (
                    <TableRow
                      key={item.id}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
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
                      style={{
                        fontWeight: "bold",
                      }}
                    >
                      Total
                    </TableCell>
                    <TableCell
                      align="right"
                      style={{
                        fontWeight: "bold",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {currencyFormat(totalPrice)}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Box>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            mt: 3,
            mb: 3,
            flexWrap: "wrap",
          }}
        >
          <Button
            sx={{
              width: "100%",
              maxWidth: "340px",
              border: "1px solid black",
              color: "white",
              borderRadius: "15px",
              backgroundColor: buttonColor,
              "&:active": {
                backgroundColor: generalBackGroundColor,
                color: "white",
                border: `1px solid white`,
              },
            }}
            onClick={() => downloadPDF()}
            variant="outlined"
            size="small"
            startIcon={<Icons.DownloadIcon />}
          >
            Descargar orden de compra
          </Button>
        </Box>
      </Box>
    </>
  );
};
