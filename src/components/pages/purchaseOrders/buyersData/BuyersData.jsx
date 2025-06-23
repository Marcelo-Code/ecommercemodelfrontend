import {
  Box,
  Button,
  FormGroup,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import "../../../../assets/css/generalStyles.css";
import {
  buttonColor,
  dateFormat,
  generalBackGroundColor,
} from "../../../../utils/helpers";
import { currencyFormat } from "../../../common/currencyFormat/CurrencyFormatContainer";
import { Icons } from "../../../../assets/Icons";

export const BuyersData = (buyerDataProps) => {
  const {
    formData,
    handleChange,
    handleSubmit,
    handleGoBack,
    createdPurchaseOrder,
    downloadPDF,
    formRef,
  } = buyerDataProps;

  const buttonGroupContainerProps = {
    handleSubmit,
    handleGoBack,
  };

  const inputStyles = {
    "& label": {
      top: "-5px",
      color: "gray",
    },
    "& label.Mui-focused": {
      color: buttonColor,
    },
    "& .MuiOutlinedInput-root": {
      height: 43,
      alignItems: "center",
      "& fieldset": {
        borderColor: "gray",
      },
      "&:hover fieldset": {
        borderColor: "black",
      },
      "&.Mui-focused fieldset": {
        borderColor: generalBackGroundColor,
      },
    },
  };

  return (
    <Box className="generalContainer">
      {Object.keys(createdPurchaseOrder).length === 0 && (
        <>
          <Box className="generalSubTitle">
            Dejanos tus datos para completar tu compra
          </Box>
          <form onSubmit={handleSubmit}>
            <FormGroup>
              <Box
                sx={{
                  width: "100%",
                  maxWidth: "800px",
                  mx: "auto",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: 2,
                  mt: 3,
                  mb: 3,
                }}
              >
                <Box
                  sx={{
                    flex: { xs: "1 1 100%", sm: "1 1 45%" },
                    minWidth: "250px",
                    maxWidth: "350px",
                  }}
                >
                  <TextField
                    label="Nombre"
                    variant="outlined"
                    name="buyer_name"
                    onChange={handleChange}
                    required
                    value={formData.buyer_name}
                    fullWidth
                    sx={inputStyles}
                  />
                </Box>

                <Box
                  sx={{
                    flex: { xs: "1 1 100%", sm: "1 1 45%" },
                    minWidth: "250px",
                    maxWidth: "350px",
                  }}
                >
                  <TextField
                    label="Apellido"
                    variant="outlined"
                    name="buyer_last_name"
                    onChange={handleChange}
                    required
                    value={formData.buyer_last_name}
                    fullWidth
                    sx={inputStyles}
                  />
                </Box>

                <Box
                  sx={{
                    flex: { xs: "1 1 100%", sm: "1 1 45%" },
                    minWidth: "250px",
                    maxWidth: "350px",
                  }}
                >
                  <TextField
                    label="Dirección"
                    variant="outlined"
                    name="buyer_address"
                    onChange={handleChange}
                    required
                    value={formData.buyer_address}
                    fullWidth
                    sx={inputStyles}
                  />
                </Box>

                <Box
                  sx={{
                    flex: { xs: "1 1 100%", sm: "1 1 45%" },
                    minWidth: "250px",
                    maxWidth: "350px",
                  }}
                >
                  <TextField
                    label="Teléfono"
                    variant="outlined"
                    name="buyer_phone_number"
                    onChange={handleChange}
                    required
                    value={formData.buyer_phone_number}
                    fullWidth
                    sx={inputStyles}
                  />
                </Box>
                <Box
                  sx={{
                    flex: { xs: "1 1 100%", sm: "1 1 45%" },
                    minWidth: "250px",
                    maxWidth: "350px",
                  }}
                >
                  <TextField
                    type="email"
                    label="email"
                    variant="outlined"
                    name="buyer_email"
                    onChange={handleChange}
                    required
                    value={formData.buyer_email}
                    fullWidth
                    sx={inputStyles}
                  />
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    flexWrap: "wrap",
                    gap: 2,
                    margin: "10px",
                    width: "100%",
                  }}
                >
                  <Box sx={{ width: "100%", maxWidth: "350px" }}>
                    <Button
                      aria-label="continuar compra"
                      type="submit"
                      // loading={isLoadingButton}
                      // startIcon={<Icons.SaveIcon />}
                      fullWidth
                      size="small"
                      variant="outlined"
                      sx={{
                        backgroundColor: `${buttonColor}`,
                        color: "white",
                        "&:active": {
                          backgroundColor: generalBackGroundColor,
                          color: "white",
                          border: `1px solid white`,
                        },
                        "&.Mui-disabled": {
                          backgroundColor: " #d6d6d6",
                          border: `1px solid  #d6d6d6`,
                          color: "#a1a1a1",
                        },
                      }}
                    >
                      Continuar
                    </Button>
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
            </FormGroup>
          </form>
        </>
      )}
    </Box>
  );
};
