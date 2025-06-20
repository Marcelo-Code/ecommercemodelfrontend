import { Box } from "@mui/material";
import "../../../assets/css/generalStyles.css";
import { Icons } from "../../../assets/Icons";
import { BackButtonContainer } from "../../common/backButton/BackButtonContainer";

export const DeniedAccess = () => {
  return (
    <Box className="generalContainer">
      <Box sx={{ textAlign: "center", marginTop: "100px" }}>
        <Icons.FrontHandIcon sx={{ fontSize: "100px" }} />
      </Box>
      <Box sx={{ textAlign: "center", fontSize: "30px", marginTop: "50px" }}>
        Acceso denegado
      </Box>
      <BackButtonContainer />
    </Box>
  );
};
