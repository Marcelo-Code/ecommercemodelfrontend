import React from "react";
import {
  buttonColor,
  generalBackGroundColor,
} from "../../../../../utils/helpers";
import { Box, FormGroup, TextField } from "@mui/material";
import { FormButtonGroupContainer } from "../../../../common/formButtonGroup/FormButtonGroupContainer";
import { Icons } from "../../../../../assets/Icons";
import { OptionSelect } from "../../../../common/optionSelect/OptionSelect";
import "../../../../../assets/css/generalStyles.css";

export const CreateEditProductsVariants = (createEditProductsVariantsProps) => {
  const {
    productId,
    colors,
    sizes,
    isLoadingButton,
    handleChange,
    handleGoBack,
    modifiedFlag,
    handleSubmit,
    formData,
  } = createEditProductsVariantsProps;

  const elementStyle = {
    display: "flex",
    alignItems: "center",
    margin: "10px",
    gap: "10px",
    width: "90%",
  };

  const formButtonGroupContainerProps = {
    handleGoBack,
    modifiedFlag,
    isLoadingButton,
  };

  return (
    <Box className="generalContainer">
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
              <Icons.CircleIcon />
              <OptionSelect
                getOptionLabel={(option) => `${option.name}`}
                name="color_id"
                placeholder="Seleccionar color"
                clients={colors}
                value={formData.color_id}
                onChange={handleChange}
                label={"Color"}
              />
            </Box>
            <Box sx={elementStyle}>
              <Icons.DescriptionIcon />
              <OptionSelect
                getOptionLabel={(option) => `${option.name}`}
                name="size_id"
                placeholder="Seleccionar talle"
                clients={sizes}
                value={formData.size_id}
                onChange={handleChange}
                label={"Talle"}
              />
            </Box>
            <Box sx={elementStyle}>
              <Icons.InventoryIcon />
              <TextField
                type="number"
                id="outlined-basic"
                label="Stock"
                variant="outlined"
                name="stock"
                onChange={handleChange}
                required
                value={formData.stock}
                fullWidth
                InputLabelProps={{
                  shrink: true, // ← fuerza el label flotante
                }}
                sx={{
                  "& label": {
                    top: "-5px",
                    color: "gray", // color normal
                  },
                  "& label.Mui-focused": {
                    color: `${buttonColor}`, // color al enfocar
                  },
                  "& .MuiOutlinedInput-root": {
                    height: 43,
                    alignItems: "center",
                    "& fieldset": {
                      borderColor: "gray", // borde normal
                    },
                    "&:hover fieldset": {
                      borderColor: "black", // hover
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: `${generalBackGroundColor}`, // borde al enfocar
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
