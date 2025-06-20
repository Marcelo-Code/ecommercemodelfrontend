import { Box, Button } from "@mui/material";
import { buttonColor, generalBackGroundColor } from "../../../utils/helpers";

export const ButtonGroup = (buttonGroupProps) => {
  const { handleContinue, handleGoBack } = buttonGroupProps;
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
          onClick={() => handleContinue()}
          fullWidth
          type="submit"
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
  );
};
