import {
  Box,
  Button,
  CircularProgress,
  FormGroup,
  TextField,
} from "@mui/material";
import "../../../assets/css/generalStyles.css";
import "./settings.css";
import { DonutChart } from "../../common/donutChart/DonutChart";
import { Icons } from "../../../assets/Icons";
import {
  buttonColor,
  generalBackGroundColor,
  normalizeName,
} from "../../../utils/helpers";
import { FormButtonGroupContainer } from "../../common/formButtonGroup/FormButtonGroupContainer";
export const Settings = (settingsProps) => {
  const {
    totalSize,
    newPassword,
    setNewPassword,
    confirmPassword,
    setConfirmPassword,
    handleUpdatePassword,
    isLoadingButton,
    handleGoBack,
    loggedUserData,
    data,
    handleDataChange,
    handleDataSubmit,
    isLoadingDataButton,
    modifiedFlag,
  } = settingsProps;

  const formButtonGroupContainerProps = {
    handleGoBack,
    modifiedFlag,
    isLoadingButton: isLoadingDataButton,
  };

  return (
    <Box className="generalContainer">
      <Box className="generalTitle">Ajustes</Box>
      <Box className="generalSubTitle" sx={{ marginTop: "10px" }}>
        Espacio utilizado en Supabase
      </Box>
      <Box className="chartContainer" sx={{ height: "auto" }}>
        <DonutChart
          usedSize={totalSize.database_size_mb}
          totalSize={500}
          nameChart={"Base de Datos"}
        />
        <DonutChart
          usedSize={totalSize.storage_size_mb}
          totalSize={1000}
          nameChart={"Storage"}
        />
      </Box>
      <Box className="generalSubTitle" sx={{ marginTop: "10px" }}>
        Actualizar contraseña
      </Box>
      <Box className="generalSubTitle" sx={{ marginTop: "10px" }}>
        <b>Usuario logueado: </b>{" "}
        {normalizeName(loggedUserData ? loggedUserData.name : "User name")}{" "}
        {normalizeName(
          loggedUserData ? loggedUserData.last_name : "User last name"
        )}
      </Box>
      <Box className="generalSubTitle">
        <b>Email: </b> {loggedUserData ? loggedUserData.email : "User email"}
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <Box width={300}>
          <TextField
            margin="normal"
            required
            id="newPassword"
            label="Nueva Contraseña"
            name="newPassword"
            type="password"
            autoComplete="new-password"
            autoFocus
            sx={{
              backgroundColor: "white",
              width: "300px",
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
              width: "300px",
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
            variant="outlined"
            size="small"
            sx={{
              marginTop: "10px",
              width: "300px",
              color: "white",
              backgroundColor: buttonColor,
              "&:active": {
                backgroundColor: generalBackGroundColor,
                color: "white",
                border: `1px solid white`,
              },
            }}
            onClick={handleUpdatePassword}
            startIcon={<Icons.KeyIcon />}
            loading={isLoadingButton}
            loadingIndicator={
              <CircularProgress size={16} sx={{ color: "white" }} />
            }
          >
            Actualizar
          </Button>
          <Button
            fullWidth
            variant="outlined"
            size="small"
            onClick={handleGoBack}
            sx={{
              backgroundColor: "white",
              color: "black",
              border: "1px solid black",
              marginTop: "10px",
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
        <Box className="generalSubTitle" sx={{ marginTop: "10px" }}>
          Actualizar datos
        </Box>
        <form onSubmit={(e) => handleDataSubmit(e)}>
          <FormGroup>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <TextField
                margin="normal"
                required
                id="phoneNumber"
                label="Número de celular"
                name="phone_number"
                type="text"
                autoFocus
                sx={{
                  backgroundColor: "white",
                  width: "300px",
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
                value={data.phone_number}
                onChange={(e) => handleDataChange(e)}
              />
              <TextField
                margin="normal"
                required
                id="marquee_message"
                label="Texto marquesina"
                name="marquee_message"
                type="text"
                autoFocus
                sx={{
                  backgroundColor: "white",
                  width: "300px",
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
                value={data.marquee_message}
                onChange={(e) => handleDataChange(e)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="business_hours"
                label="Horarios de atencion"
                type="text"
                multiline
                rows={3}
                id="business_hours"
                sx={{
                  backgroundColor: "white",
                  width: "300px",
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
                value={data.business_hours}
                onChange={(e) => handleDataChange(e)}
              />
              <TextField
                margin="normal"
                fullWidth
                name="whatsapp_presentation"
                label="Texto de presentación de whatsapp"
                type="text"
                multiline
                rows={3}
                id="whatsapp_presentation"
                sx={{
                  backgroundColor: "white",
                  width: "300px",
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
                value={data.whatsapp_presentation}
                onChange={(e) => handleDataChange(e)}
              />
              <TextField
                margin="normal"
                fullWidth
                name="instagram"
                label="Instagram"
                type="text"
                id="instagram"
                sx={{
                  backgroundColor: "white",
                  width: "300px",
                  "& .MuiOutlinedInput-root": {
                    "&.Mui-focused fieldset": {
                      borderColor: generalBackGroundColor,
                    },
                  },
                  "& .MuiInputLabel-root": {
                    color: "gray",
                    "&.Mui-focused": {
                      color: buttonColor,
                    },
                  },
                }}
                value={data.instagram}
                onChange={(e) => handleDataChange(e)}
              />
              <TextField
                margin="normal"
                fullWidth
                name="facebook"
                label="facebook"
                type="text"
                id="facebook"
                sx={{
                  backgroundColor: "white",
                  width: "300px",
                  "& .MuiOutlinedInput-root": {
                    "&.Mui-focused fieldset": {
                      borderColor: generalBackGroundColor,
                    },
                  },
                  "& .MuiInputLabel-root": {
                    color: "gray",
                    "&.Mui-focused": {
                      color: buttonColor,
                    },
                  },
                }}
                value={data.facebook}
                onChange={(e) => handleDataChange(e)}
              />
              <TextField
                margin="normal"
                fullWidth
                name="tik_tok"
                label="tik_tok"
                type="text"
                id="tik_tok"
                sx={{
                  backgroundColor: "white",
                  width: "300px",
                  "& .MuiOutlinedInput-root": {
                    "&.Mui-focused fieldset": {
                      borderColor: generalBackGroundColor,
                    },
                  },
                  "& .MuiInputLabel-root": {
                    color: "gray",
                    "&.Mui-focused": {
                      color: buttonColor,
                    },
                  },
                }}
                value={data.tik_tok}
                onChange={(e) => handleDataChange(e)}
              />
              <TextField
                margin="normal"
                fullWidth
                name="linkedin"
                label="linkedIn"
                type="text"
                id="linkedin"
                sx={{
                  backgroundColor: "white",
                  width: "300px",
                  "& .MuiOutlinedInput-root": {
                    "&.Mui-focused fieldset": {
                      borderColor: generalBackGroundColor,
                    },
                  },
                  "& .MuiInputLabel-root": {
                    color: "gray",
                    "&.Mui-focused": {
                      color: buttonColor,
                    },
                  },
                }}
                value={data.linkedin}
                onChange={(e) => handleDataChange(e)}
              />
              <TextField
                margin="normal"
                fullWidth
                name="x"
                label="X"
                type="text"
                id="x"
                sx={{
                  backgroundColor: "white",
                  width: "300px",
                  "& .MuiOutlinedInput-root": {
                    "&.Mui-focused fieldset": {
                      borderColor: generalBackGroundColor,
                    },
                  },
                  "& .MuiInputLabel-root": {
                    color: "gray",
                    "&.Mui-focused": {
                      color: buttonColor,
                    },
                  },
                }}
                value={data.x}
                onChange={(e) => handleDataChange(e)}
              />
              <TextField
                margin="normal"
                fullWidth
                name="youtube"
                label="youtube"
                type="text"
                id="youtube"
                sx={{
                  backgroundColor: "white",
                  width: "300px",
                  "& .MuiOutlinedInput-root": {
                    "&.Mui-focused fieldset": {
                      borderColor: generalBackGroundColor,
                    },
                  },
                  "& .MuiInputLabel-root": {
                    color: "gray",
                    "&.Mui-focused": {
                      color: buttonColor,
                    },
                  },
                }}
                value={data.youtube}
                onChange={(e) => handleDataChange(e)}
              />
              <FormButtonGroupContainer {...formButtonGroupContainerProps} />
            </Box>
          </FormGroup>
        </form>
      </Box>
    </Box>
  );
};
