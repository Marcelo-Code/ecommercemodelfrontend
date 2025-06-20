import { Box, Button } from "@mui/material";
import "./backButton.css";
import { hoverButtonColor } from "../../../utils/helpers";

export const BackButton = (BackButtonProps) => {
  const { handleGoBack, modifiedFlag } = BackButtonProps;
  return (
    <Box className="backButtonContainer">
      <Button
        size="small"
        onClick={() => handleGoBack(modifiedFlag)}
        sx={{
          color: "black",
          backgroundColor: "white",
          border: "1px solid black",
          maxWidth: "500px",
          minWidth: "250px",
          width: "100%",
          "&:active": {
            backgroundColor: hoverButtonColor,
            color: "white",
            border: `1px solid white`,
          },
        }}
      >
        Volver
      </Button>
    </Box>
  );
};
