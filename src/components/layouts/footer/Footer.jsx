import { Box, CircularProgress, IconButton } from "@mui/material";
import { generalBackGroundColor } from "../../../utils/helpers";
import "./footer.css";
import { Icons } from "../../../assets/Icons";
export const Footer = (footerProps) => {
  const { data, isLoading } = footerProps;
  return (
    <Box
      className="footerContainer"
      sx={{ backgroundColor: generalBackGroundColor }}
    >
      <Box
        sx={{
          width: "50px",
          height: "50px",
          backgroundColor: "#25D366",
          position: "fixed",
          bottom: "50px",
          right: "50px",
          borderRadius: "50%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 2,
        }}
      >
        {isLoading ? (
          <CircularProgress sx={{ color: "white" }} />
        ) : (
          <IconButton>
            <a
              href={`https://wa.me/${data.phone_number}?text=${data.whatsapp_presentation}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icons.WhatsAppIcon
                sx={{ color: "white", fontSize: "1.5em", marginTop: "5px" }}
              />
            </a>
          </IconButton>
        )}
      </Box>

      <Box className="footerTitle">NATIVO</Box>

      <Box className="footerSocialMedia">
        Seguinos en nuestras redes
        <a
          href={`https://www.instagram.com/${data.instagram}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <IconButton>
            <Icons.InstagramIcon sx={{ color: "black", fontSize: "1.5em" }} />
          </IconButton>
        </a>
      </Box>
    </Box>
  );
};
