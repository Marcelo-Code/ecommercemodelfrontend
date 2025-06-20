import { Box } from "@mui/material";
import "../../../assets/css/generalStyles.css";
import { Icons } from "../../../assets/Icons";

export const ContactUs = (contactUsProps) => {
  const { data } = contactUsProps;

  return (
    <Box className="generalContainer">
      <Box className="generalTitle">Contactanos</Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "15px",
          gap: "8px",
        }}
      >
        <Icons.QueryBuilderIcon /> {data.business_hours}
      </Box>
      {/* <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          marginTop: "15px",
          verticalAlign: "middle",
          gap: "8px",
        }}
      >
        <Icons.AlternateEmailIcon />
        <a href={`mailto:aquinativo@gmail.com`}>aquinativo@gmail.com</a>
      </Box> */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "15px",
          gap: "8px",
        }}
      >
        <Icons.WhatsAppIcon />
        <a
          href={`https://wa.me/${data.phone_number}?text=${data.whatsapp_presentation}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          {data.phone_number}
        </a>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "15px",
          verticalAlign: "middle",
          gap: "8px",
        }}
      >
        <Icons.LocationCityIcon />
        Necochea 304, San Nicolás de los Arroyos
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          marginTop: "15px",
        }}
      >
        <Box sx={{ boxShadow: "0px 0px 20px black" }}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3016.391146077913!2d-60.211245999999996!3d-33.33918299999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95b7678751dfde6b%3A0xe4c36c5b99ada3ce!2sNecochea%20304%2C%20B2900%20San%20Nicol%C3%A1s%20de%20Los%20Arroyos%2C%20Provincia%20de%20Buenos%20Aires!5e1!3m2!1ses-419!2sar!4v1747064798793!5m2!1ses-419!2sar"
            width="300"
            height="300"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </Box>
      </Box>
    </Box>
  );
};
