import {
  Autocomplete,
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

export const CreateEditProduct = (createEditProductProps) => {
  const {
    handleGoBack,
    modifiedFlag,
    isLoadingButton,
    brands,
    categories,
    handleChange,
    formData,
    handleSubmit,
    createdProduct,
    fileInputRef,
    handleFileChange,
    handleUploadImage,
    handleDeleteImage,
    isLoadingImage,
    productId,
    PRODUCT_STATUS,
    categoryArrayError,
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

  const [openImageDialog, setOpenImageDialog] = useState(false);

  return (
    <Box className="generalContainer">
      {/* Contenedor del formulario */}
      {(!createdProduct || productId) && (
        <>
          <Box className="generalTitle">
            {productId ? "Editar producto" : "Crear nuevo producto"}
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
                    label="Descripción"
                    variant="outlined"
                    name="description"
                    onChange={handleChange}
                    required
                    value={formData.description}
                    multiline
                    rows={3}
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
                <Box sx={elementStyle}>
                  <Icons.LocalOfferIcon />
                  <TextField
                    id="outlined-basic"
                    label="Oferta"
                    variant="outlined"
                    name="special_offer"
                    onChange={handleChange}
                    value={formData.special_offer}
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
                <Box sx={elementStyle}>
                  <Icons.MonetizationOnIcon />
                  <TextField
                    type="number"
                    id="outlined-basic"
                    label="Precio anterior"
                    variant="outlined"
                    name="previous_price"
                    onChange={handleChange}
                    value={formData.previous_price}
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
                <Box sx={elementStyle}>
                  <Icons.MonetizationOnIcon />
                  <TextField
                    type="number"
                    id="outlined-basic"
                    label="Precio"
                    variant="outlined"
                    name="price"
                    onChange={handleChange}
                    required
                    value={formData.price}
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
                <Box sx={elementStyle}>
                  <Icons.DescriptionIcon />
                  <OptionSelect
                    getOptionLabel={(option) => `${option.name}`}
                    name="brand_id"
                    placeholder="Seleccionar marca"
                    clients={brands}
                    value={formData.brand_id}
                    onChange={handleChange}
                    label={"Marca"}
                    required
                  />
                </Box>
                <Box sx={elementStyle}>
                  <Icons.DescriptionIcon />
                  <Autocomplete
                    multiple
                    fullWidth
                    options={categories}
                    getOptionLabel={(option) => option.name}
                    value={formData.categoriesArray}
                    onChange={(event, newValue) =>
                      handleChange({
                        target: {
                          name: "categoriesArray",
                          value: newValue,
                        },
                      })
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Categoría"
                        placeholder=""
                        error={categoryArrayError}
                        helperText={
                          categoryArrayError
                            ? "Debe seleccionar al menos una categoría"
                            : ""
                        }
                      />
                    )}
                    sx={{
                      backgroundColor: "white",
                      "& .MuiOutlinedInput-root": {
                        minHeight: "40px", // Altura mínima
                        padding: "2px !important",

                        "& fieldset": {
                          borderColor: "gray", // borde normal
                        },
                        "&:hover fieldset": {
                          borderColor: "black", // al pasar mouse
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: `${generalBackGroundColor}`, // al enfocar
                        },
                      },
                      "& label": {
                        top: "-5px",
                        color: "gray", // color normal
                      },
                      "& label.Mui-focused": {
                        color: `${buttonColor}`, // color al enfocar
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
                    clients={PRODUCT_STATUS}
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
        </>
      )}
      {/* Contenedor de imagenes */}
      {(createdProduct || productId) && formData && (
        <>
          <Box className="generalTitle">Carga de imagenes</Box>
          {!productId && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "10px",
                flexWrap: "wrap",
                marginTop: "10px",
              }}
            >
              <Typography>
                <b>Descripción: </b>
                {formData.description}
              </Typography>
              <Typography sx={{ paddingBottom: "5px" }}>
                <b>Precio: </b>
                {currencyFormat(formData.price)}
              </Typography>
            </Box>
          )}

          <Box
            sx={{
              mt: 2,
              width: "100%",
              mx: "auto",
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                width: "300px",
                height: "300px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                border: `3px solid ${generalBackGroundColor}`,
                borderRadius: "5px",
                backgroundColor: "rgba(0,0,0,0.1)",
              }}
            >
              {isLoadingImage && (
                <CircularProgress sx={{ color: generalBackGroundColor }} />
              )}
              {!formData.image && !isLoadingImage && (
                <Box sx={{ fontSize: "20px" }}>Sin imagen</Box>
              )}
              {formData.image && !isLoadingImage && (
                // Muestra la imagen actualizada, siempre llamando a una URL distinta
                // para evitar que se cargue la almacenada en el caché del navegador
                <img
                  src={`${formData?.image}?t=${Date.now()}`}
                  alt="Producto"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                    cursor: "pointer",
                  }}
                  onClick={() => setOpenImageDialog(true)}
                />
              )}
            </Box>
            <Dialog
              open={openImageDialog}
              onClose={() => setOpenImageDialog(false)}
              maxWidth="md"
              fullWidth
              sx={{ maxHeight: "90vh" }}
            >
              <DialogContent
                sx={{
                  position: "relative",
                  backgroundColor: "black",
                  p: 2,
                }}
              >
                <IconButton
                  onClick={() => setOpenImageDialog(false)}
                  sx={{
                    position: "absolute",
                    top: 8,
                    right: 8,
                    color: "white",
                  }}
                >
                  <CloseIcon />
                </IconButton>
                <img
                  src={`${formData.image}?t=${Date.now()}`}
                  alt="Producto ampliado"
                  style={{
                    width: "100%",
                    height: "auto",
                    objectFit: "contain",
                  }}
                />
              </DialogContent>
            </Dialog>

            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                gap: "10px",
              }}
            >
              {/* Llama a la función de carga de archivos */}
              <Tooltip title="Eliminar imagen" placement="top-end" arrow>
                <IconButton onClick={() => handleDeleteImage("image")}>
                  <Icons.DeleteIcon
                    sx={{ fontSize: "30px", color: deleteColor }}
                  />
                </IconButton>
              </Tooltip>
              <Tooltip title="Subir imagen" placement="top-end" arrow>
                <IconButton onClick={() => handleUploadImage("image")}>
                  <Icons.UploadIcon sx={{ fontSize: "30px", color: "gray" }} />
                </IconButton>
              </Tooltip>
            </Box>

            {/* Abre el selector de archivos */}
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleFileChange}
              //Se reseta el input a null para forzar el cambio y poder disparar el evento onChange
              //de manera tal pueda permitir subir el mismo archivo nuevamente en caso de que sea necesario
              onClick={(e) => (e.target.value = null)}
            />

            <BackButtonContainer />
          </Box>
        </>
      )}
    </Box>
  );
};
