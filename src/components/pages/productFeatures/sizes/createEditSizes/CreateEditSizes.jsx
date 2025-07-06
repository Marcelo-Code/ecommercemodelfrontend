import { Box, FormGroup, TextField } from "@mui/material";
import { FormButtonGroupContainer } from "../../../../common/formButtonGroup/FormButtonGroupContainer";
import {
  buttonColor,
  generalBackGroundColor,
} from "../../../../../utils/helpers";
import { Icons } from "../../../../../assets/Icons";

export const CreateEditSizes = (createEditSizesProps) => {
  const {
    handleGoBack,
    modifiedFlag,
    isLoadingButton,
    formData,
    handleChange,
    handleSubmit,
    sizeId,
  } = createEditSizesProps;

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
      <Box className="generalTitle">
        {sizeId ? "Editar talle" : "Crear nuevo talle"}
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
              <Icons.DescriptionIcon />
              <TextField
                id="outlined-basic"
                label="Nombre"
                variant="outlined"
                name="name"
                onChange={handleChange}
                required
                value={formData.name}
                fullWidth
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
            <FormButtonGroupContainer {...formButtonGroupContainerProps} />
          </Box>
        </FormGroup>
      </form>
    </Box>
  );
};
