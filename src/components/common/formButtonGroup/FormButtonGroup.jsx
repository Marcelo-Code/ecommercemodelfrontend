import { Box, Button } from "@mui/material";
import { Icons } from "../../../assets/Icons";
import { buttonColor, generalBackGroundColor } from "../../../utils/helpers";

export const FormButtonGroup = (formButtonGroupProps) => {
  const {
    modifiedFlag = true,
    isLoadingButton,
    handleGoBack,
  } = formButtonGroupProps;

  return (
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
          aria-label="guardar producto"
          type="submit"
          loading={isLoadingButton}
          startIcon={<Icons.SaveIcon />}
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
          disabled={!modifiedFlag}
        >
          Guardar
        </Button>
      </Box>
      <Box sx={{ width: "100%", maxWidth: "350px" }}>
        <Button
          aria-label="volver atras"
          onClick={() => handleGoBack(modifiedFlag)}
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
  );
};
