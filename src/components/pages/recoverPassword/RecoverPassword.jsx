import { Container, TextField, Button, Box, Typography } from "@mui/material";
import "./recoverPassword.css";
import { Icons } from "../../../assets/Icons";
import { buttonColor, generalBackGroundColor } from "../../../utils/helpers";

export const RecoverPassword = ({
  handleGoBack,
  handleRecoverPassword,
  email,
  setEmail,
  error,
  successMessage,
}) => {
  return (
    <Container
      component="main"
      maxWidth="xs"
      className="recoverPasswordContainer"
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: generalBackGroundColor,
          borderRadius: "5px",
        }}
      >
        <Box
          component="form"
          noValidate
          sx={{ mt: 1 }}
          className="recoverPasswordForm"
        >
          <span className="loginTitle">Recuperar Contraseña</span>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            autoFocus
            sx={{
              backgroundColor: "white",
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": {
                  borderColor: generalBackGroundColor,
                },
              },
              "& .MuiInputLabel-root": {
                color: "gray", // color normal
                "&.Mui-focused": {
                  color: buttonColor, // color al enfocar
                },
              },
            }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="outlined"
            sx={{
              mt: 3,
              mb: 2,
              backgroundColor: "black",
              color: "white",
              border: "1px solid black",
              "&:active": {
                backgroundColor: generalBackGroundColor,
                color: "white",
                border: `1px solid ${generalBackGroundColor}`,
              },
            }}
            startIcon={<Icons.SendIcon />}
            onClick={handleRecoverPassword}
          >
            Enviar Link
          </Button>
          {error && (
            <Typography color="white" align="center">
              {error}
            </Typography>
          )}
          {successMessage && (
            <Typography color="white" align="center">
              {successMessage}
            </Typography>
          )}
          <Button
            fullWidth
            variant="outlined"
            sx={{
              border: "1px solid black",
              color: "black",
              backgroundColor: "white",
              "&:active": {
                backgroundColor: generalBackGroundColor,
                color: "white",
                border: `1px solid ${generalBackGroundColor}`,
              },
            }}
            onClick={handleGoBack}
          >
            Volver
          </Button>
        </Box>
      </Box>
    </Container>
  );
};
