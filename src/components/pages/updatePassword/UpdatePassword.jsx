import { Container, TextField, Button, Box, Typography } from "@mui/material";
import "./updatePassword.css";
import { Icons } from "../../../assets/Icons";
import { buttonColor, generalBackGroundColor } from "../../../utils/helpers";
export const UpdatePassword = (updatePasswordProps) => {
  const {
    newPassword,
    setNewPassword,
    confirmPassword,
    setConfirmPassword,
    handleUpdatePassword,
    isLoadingButton,
  } = updatePasswordProps;
  return (
    <Container
      component="main"
      maxWidth="xs"
      className="updatePasswordContainer"
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box
          component="form"
          noValidate
          sx={{ mt: 1, backgroundColor: generalBackGroundColor }}
          className="updatePasswordForm"
        >
          <span className="updatePasswordTitle">Actualizar Contraseña</span>
          <TextField
            margin="normal"
            required
            fullWidth
            id="newPassword"
            label="Nueva Contraseña"
            name="newPassword"
            type="password"
            autoComplete="new-password"
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
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="confirmPassword"
            label="Confirmar Contraseña"
            type="password"
            id="confirmPassword"
            autoComplete="confirm-password"
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
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <Button
            type="submit"
            fullWidth
            variant="outlined"
            sx={{
              mt: 3,
              mb: 2,
              backgroundColor: buttonColor,
              color: "white",
              "&:active": {
                backgroundColor: generalBackGroundColor,
                color: "white",
                border: `1px solid ${generalBackGroundColor}`,
              },
            }}
            onClick={handleUpdatePassword}
            startIcon={<Icons.KeyIcon />}
            loading={isLoadingButton}
          >
            Actualizar
          </Button>
        </Box>
      </Box>
    </Container>
  );
};
