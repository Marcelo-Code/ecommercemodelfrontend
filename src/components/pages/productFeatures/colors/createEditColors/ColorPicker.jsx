import { ChromePicker } from "react-color";
import { Popover, Button, Box } from "@mui/material";
import { useState } from "react";

export default function ColorPicker({ handleColorChange, formData }) {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <>
      <Button
        variant="contained"
        sx={{
          backgroundColor: formData.code,
          height: 36,
          width: 36,
          minWidth: 0,
          padding: 0,
          borderRadius: "50%",
          border: "1px solid black",
        }}
        onClick={handleClick}
      />
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        PaperProps={{
          sx: {
            width: "100%",
            maxWidth: "600px",
            minWidth: "300px",
            p: 2,
          },
        }}
      >
        <ChromePicker
          styles={{
            default: {
              picker: {
                width: "100%",
                fontFamily: "roboto",
              },
              alpha: {
                display: "none",
              },
            },
          }}
          color={formData.code}
          onChange={(color) => {
            handleColorChange(color);
          }}
        />
      </Popover>
    </>
  );
}
