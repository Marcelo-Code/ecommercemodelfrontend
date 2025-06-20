import { Box } from "@mui/material";
import "../../../assets/css/generalStyles.css";

export const Error = (errorProps) => {
  const { error } = errorProps;
  return (
    <div className="generalContainer">
      <Box
        sx={{
          width: "100%",
          marginTop: "30px",
          textAlign: "center",
          fontSize: "20px",
        }}
      >
        {error.message}
      </Box>
    </div>
  );
};
