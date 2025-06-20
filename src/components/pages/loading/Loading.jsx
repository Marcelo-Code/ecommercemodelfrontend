import { Box } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";
import "../../../assets/css/generalStyles.css";
import { generalBackGroundColor } from "../../../utils/helpers";

export const Loading = () => {
  return (
    <div className="generalContainer">
      <Box sx={{ width: "100%", marginTop: "30px" }}>
        <LinearProgress
          sx={{
            backgroundColor: `${generalBackGroundColor}`,
            "& .MuiLinearProgress-bar": {
              backgroundColor: "black",
            },
          }}
        />
      </Box>{" "}
    </div>
  );
};
