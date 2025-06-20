import {
  Container,
  TextField,
  Button,
  Box,
  Typography,
  CircularProgress,
} from "@mui/material";
import "./login.css";
import { Link } from "react-router-dom";
import { Icons } from "../../../assets/Icons";
import { buttonColor, generalBackGroundColor } from "../../../utils/helpers";

export const Login = ({
  handleLogin,
  email,
  setEmail,
  password,
  setPassword,
  handleGoBack,
  isLoadingButton,
}) => {
  return (
    <Container component="main" maxWidth="xs" className="loginContainer">
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
          className="loginForm"
        >
          <Box
            sx={{
              fontFamily: "roboto",
              color: "black",
              fontSize: "20px",
              textAlign: "center",
            }}
          >
            Login
          </Box>
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
            onChange={(e) => setEmail(e.target.value.toLowerCase())}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Contraseña"
            type="password"
            id="password"
            autoComplete="current-password"
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
              border: "1px solid black",
              "&:active": {
                backgroundColor: generalBackGroundColor,
                border: `1px solid ${generalBackGroundColor}`,
              },
            }}
            startIcon={<Icons.LoginIcon />}
            onClick={handleLogin}
            loading={isLoadingButton}
            loadingIndicator={
              <CircularProgress size={16} sx={{ color: "white" }} />
            }
          >
            LogIn
          </Button>
          <Button
            fullWidth
            variant="outlined"
            sx={{
              mb: 2,
              backgroundColor: "white",
              color: "black",
              border: "1px solid black",
              "&:active": {
                backgroundColor: generalBackGroundColor,
                border: `1px solid ${generalBackGroundColor}`,
                color: "white",
              },
            }}
            onClick={() => handleGoBack()}
          >
            Volver
          </Button>

          <Box
            sx={{ width: "100%", display: "flex", justifyContent: "center" }}
          >
            <Typography>
              <Link
                to={"/recoverPassword"}
                style={{ color: "white", justifySelf: "center" }}
              >
                Olvidé mi contraseña
              </Link>
            </Typography>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
