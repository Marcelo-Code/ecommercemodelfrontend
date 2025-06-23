import {
  Box,
  Paper,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import "../../../../assets/css/generalStyles.css";
import { useContext, useEffect, useRef, useState } from "react";
import { GeneralContext } from "../../../../context/GeneralContext";
import { useNavigate, useParams } from "react-router-dom";
import { html2pdf } from "html2pdf.js";
import {
  buttonColor,
  dateFormat,
  generalBackGroundColor,
} from "../../../../utils/helpers";
import { currencyFormat } from "../../../common/currencyFormat/CurrencyFormatContainer";
import { getPurchaseOrderByPaymentId } from "../../../../services/api/purchaseOrders";
import { LoadingContainer } from "../../loading/LoadingContainer";

export const DownloadPurchaseOrderContainer = () => {
  const { createdPurchaseOrder, clearCart, preferenceId } =
    useContext(GeneralContext);

  const [isLoading, setIsLoading] = useState(false);
  const [purchaseOrder, setPurchaseOrder] = useState({});

  const { paymentId } = useParams();

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
        filename: `Nativo_orden_de_compra_${purchaseOrder.id}.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
      })
      .from(element)
      .save();
    handleNavigate();
    clearCart();
  };

  useEffect(() => {
    getPurchaseOrderByPaymentId(preferenceId)
      .then((response) => {
        setPurchaseOrder(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <LoadingContainer />;
  }

  return (
    <>
      <Box className="generalContainer">
        <Box className="generalTitle">¡Gracias por tu compra!</Box>
        <Box className="generalSubTitle">
          En breve nos contactaremos para coordinar tu entrega y el modo de pago
        </Box>
        <Box ref={formRef}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mb: 2,
              mt: 3,
              pb: 2,
              alignItems: "center",
              gap: 2,
              fontSize: "20px",
              borderBottom: "1px solid black",
            }}
          >
            <Box>
              <img src="/images/logo2.png" width={60} alt="logo" />
            </Box>
            <Box>Orden de compra nro: {purchaseOrder.order.id}</Box>
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
                      {currencyFormat(createdPurchaseOrder.totalPrice)}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          marginTop: 4,
          flexWrap: "wrap",
          gap: 3,
        }}
      >
        {/* <Button
              sx={{
                width: "100%",
                maxWidth: "340px",
                border: "1px solid black",
                color: "white",
                backgroundColor: buttonColor,
                "&:active": {
                  backgroundColor: generalBackGroundColor,
                  color: "white",
                  border: `1px solid white`,
                },
              }}
              component="a"
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              variant="outlined"
              size="small"
              startIcon={<Icons.WhatsAppIcon />}
            >
              Enviar por Whatsapp
            </Button> */}
        <Button
          sx={{
            width: "100%",
            maxWidth: "340px",
            border: "1px solid black",
            color: "white",
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
    </>
  );
};
