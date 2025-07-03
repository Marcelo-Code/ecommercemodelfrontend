import { TextField, Autocomplete } from "@mui/material";
import { buttonColor, generalBackGroundColor } from "../../../utils/helpers";

// Componente Select con Autocomplete y búsqueda
export const OptionSelect = ({
  clients,
  getOptionLabel,
  name,
  value,
  onChange,
  label,
  placeholder,
  disabled = false,
  required = false,
  error = false,
  helperText,
  fullWidth = true,
}) => {
  return (
    <Autocomplete
      name={name}
      options={clients}
      getOptionLabel={getOptionLabel}
      value={clients.find((client) => client.id === value) || null}
      onChange={(_, newValue) => {
        onChange({
          target: { name, value: newValue ? newValue.id : "" },
        });
      }}
      disabled={disabled}
      fullWidth={fullWidth}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          placeholder={placeholder}
          required={required}
          error={error}
          helperText={helperText}
          sx={{
            "& .MuiOutlinedInput-root": {
              height: "40px",
              borderRadius: "20px", // bordes redondeados
              backgroundColor: "white",
              "& fieldset": {
                borderColor: "black", // borde normal
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
      )}
    />
  );
};
