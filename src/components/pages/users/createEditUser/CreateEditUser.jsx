import {
  Box,
  CircularProgress,
  FormGroup,
  IconButton,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { Icons } from "../../../../assets/Icons";
import { OptionSelect } from "../../../common/optionSelect/OptionSelect";
import { FormButtonGroupContainer } from "../../../common/formButtonGroup/FormButtonGroupContainer";
import {
  buttonColor,
  deleteColor,
  generalBackGroundColor,
} from "../../../../utils/helpers";
import { BackButtonContainer } from "../../../common/backButton/BackButtonContainer";
import { currencyFormat } from "../../../common/currencyFormat/CurrencyFormatContainer";

import { Dialog, DialogContent } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export const CreateEditUser = (createEditProductProps) => {
  const {
    handleGoBack,
    modifiedFlag,
    isLoadingButton,
    handleChange,
    formData,
    handleSubmit,
    USER_STATUS,
    userId,
  } = createEditProductProps;

  const formButtonGroupContainerProps = {
    handleGoBack,
    modifiedFlag,
    isLoadingButton,
  };

  const elementStyle = {
    display: "flex",
    alignItems: "center",
    margin: "10px",
    gap: "10px",
    width: "90%",
  };

  return (
    <Box className="generalContainer">
      {/* Contenedor del formulario */}
      <Box className="generalTitle">
        {userId ? "Editar usuario" : "Crear usuario"}
      </Box>
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <Box
            sx={{
              width: "100%",
              maxWidth: "800px",
              mx: "auto",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "20px",
              marginBottom: "20px",
            }}
          >
            <Box sx={elementStyle}>
              <Icons.PersonIcon />
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 2, // espacio entre campos
                }}
              >
                <TextField
                  id="outlined-basic"
                  label="Nombre"
                  variant="outlined"
                  name="name"
                  onChange={handleChange}
                  required
                  value={formData.name}
                  fullWidth
                  sx={{ flex: { xs: "100%", sm: "48%" } }}
                  InputProps={{
                    sx: {
                      alignItems: "center",
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: `${generalBackGroundColor}`, // borde al enfocar
                      },
                    },
                  }}
                  InputLabelProps={{
                    shrink: true, // ← fuerza el label flotante
                    sx: {
                      color: "gray", // color normal
                      "&.Mui-focused": {
                        color: `${buttonColor}`, // color al enfocar
                      },
                    },
                  }}
                />
                <TextField
                  id="outlined-basic"
                  label="Apellido"
                  variant="outlined"
                  name="last_name"
                  onChange={handleChange}
                  required
                  value={formData.last_name}
                  fullWidth
                  sx={{ flex: { xs: "100%", sm: "48%" } }}
                  InputProps={{
                    sx: {
                      alignItems: "center",
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: `${generalBackGroundColor}`, // borde al enfocar
                      },
                    },
                  }}
                  InputLabelProps={{
                    shrink: true, // ← fuerza el label flotante
                    sx: {
                      color: "gray", // color normal
                      "&.Mui-focused": {
                        color: `${buttonColor}`, // color al enfocar
                      },
                    },
                  }}
                />
              </Box>
            </Box>
            <Box sx={elementStyle}>
              <Icons.AlternateEmailIcon />
              <TextField
                id="outlined-basic"
                label="email"
                type="email"
                variant="outlined"
                name="email"
                onChange={handleChange}
                required
                value={formData.email}
                fullWidth
                disabled={userId ? true : false}
                InputProps={{
                  sx: {
                    alignItems: "center",
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: `${generalBackGroundColor}`, // borde al enfocar
                    },
                  },
                }}
                InputLabelProps={{
                  shrink: true, // ← fuerza el label flotante
                  sx: {
                    color: "gray", // color normal
                    "&.Mui-focused": {
                      color: `${buttonColor}`, // color al enfocar
                    },
                  },
                }}
              />
            </Box>

            <Box sx={elementStyle}>
              <Icons.DescriptionIcon />
              <OptionSelect
                getOptionLabel={(option) => `${option.name}`}
                name="active"
                placeholder="Seleccionar estado"
                clients={USER_STATUS}
                value={formData.active}
                onChange={handleChange}
                label={"Estado"}
                required
              />
            </Box>

            <FormButtonGroupContainer {...formButtonGroupContainerProps} />
          </Box>
        </FormGroup>
      </form>
    </Box>
  );
};
