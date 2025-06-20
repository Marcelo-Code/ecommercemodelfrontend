import { Box, Button, Card, CircularProgress } from "@mui/material";
import "../../../../assets/css/generalStyles.css";
import "./purchaseOrderList.css";
import { GeneralBarContainer } from "../../../layouts/generalBar/GeneralBarContainer";
import { Icons } from "../../../../assets/Icons";
import { currencyFormat } from "../../../common/currencyFormat/CurrencyFormatContainer";
import { dateFormat, generalBackGroundColor } from "../../../../utils/helpers";
import { Link } from "react-router-dom";
import { PaginationContainer } from "../../../common/pagination/PaginationContainer";
import { SwitchEditionMode } from "../../../common/switchEditionMode/SwitchEditionMode";

export const PurchaseOrderList = (purchaseOrdersListProps) => {
  const {
    filteredOrders,
    handleChangeStatus,
    statusIsLoading,
    ...generalBarContainerProps
  } = purchaseOrdersListProps;

  const iconStyle = { fontSize: "25px", verticalAlign: "middle" };

  return (
    <Box className="generalContainer">
      <Box className="generalTitle">Lista de ordenes de compra</Box>
      <GeneralBarContainer {...generalBarContainerProps} />
      <Box className="generalSubTitle">
        {filteredOrders.length} registros encontrados
      </Box>
      <PaginationContainer items={filteredOrders} itemsPerPage={10}>
        {(recordsToShow) => (
          <Box className="generalList">
            {recordsToShow.map((record) => (
              <Card sx={{ minWidth: 275, height: 350 }} key={record.id}>
                <Box
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    gap: 1,
                    justifyContent: "center",
                  }}
                >
                  <Box
                    className="itemStyle"
                    sx={{
                      borderBottom: "1px solid black",
                    }}
                  >
                    {statusIsLoading === record.id ? (
                      <CircularProgress
                        size={38}
                        sx={{
                          marginRight: "35px",
                          color: generalBackGroundColor,
                        }}
                      />
                    ) : (
                      <SwitchEditionMode
                        id={record.id}
                        onChange={() => handleChangeStatus(record.id)}
                        checked={record.status === "finalizado"}
                        sx={{ marginRight: "15px" }}
                      />
                    )}
                    <b>{record.status.toUpperCase()}</b>
                  </Box>
                  <Box className="itemStyle">
                    <Icons.ShoppingCartIcon sx={iconStyle} />
                    <b>Número: </b> {record.id}
                  </Box>
                  <Box className="itemStyle">
                    <Icons.PersonIcon sx={iconStyle} />
                    <b>Comprador: </b> {record.buyer_name}{" "}
                    {record.buyer_last_name}
                  </Box>
                  <Box className="itemStyle">
                    <Icons.WhatsAppIcon sx={iconStyle} />
                    <b>Teléfono: </b>
                    <a
                      href={`https://wa.me/${record.buyer_phone_number}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {record.buyer_phone_number}
                    </a>
                  </Box>
                  <Box className="itemStyle">
                    <Icons.AlternateEmailIcon sx={iconStyle} />
                    <b>Email: </b>
                    <a href={`mailto:${record.buyer_email}`}>
                      {record.buyer_email}
                    </a>
                  </Box>
                  <Box className="itemStyle">
                    <Icons.CalendarMonthIcon sx={iconStyle} />
                    <b>Fecha: </b> {dateFormat(record.date)}
                  </Box>
                  <Box className="itemStyle">
                    <Icons.MonetizationOnIcon sx={iconStyle} />
                    <b>Total: </b>{" "}
                    <Box sx={{ marginBottom: "5px" }}>
                      {currencyFormat(record.total_price)}
                    </Box>
                  </Box>
                  <Button
                    variant="outlined"
                    size="small"
                    component={Link}
                    to={`/purchaseOrders/details/${record.id}`}
                    sx={{
                      border: "1px solid black",
                      marginTop: "30px",
                      width: "100%",
                      color: "black",
                      backgroundColor: "white",

                      "&:active": {
                        backgroundColor: generalBackGroundColor,
                        color: "white",
                        border: `1px solid white`,
                      },
                    }}
                  >
                    Ver detalles
                  </Button>
                </Box>
              </Card>
            ))}
          </Box>
        )}
      </PaginationContainer>
    </Box>
  );
};
