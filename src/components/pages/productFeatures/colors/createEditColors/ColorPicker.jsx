import { ChromePicker } from "react-color";
import { Popover, Button, Box } from "@mui/material";
import { useEffect, useState } from "react";

export default function ColorPicker() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [color, setColor] = useState("#FFFFFF");

  useEffect(() => {
    console.log(color);
  }, [color]);

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
          backgroundColor: color,
          height: 36,
          width: 36,
          minWidth: 0,
          padding: 0,
          borderRadius: "50%",
          border: "1px solid black",
        }}
        onClick={handleClick}
      ></Button>
      <Popover open={open} anchorEl={anchorEl} onClose={handleClose}>
        <ChromePicker color={color} onChange={(c) => setColor(c.hex)} />
      </Popover>
    </>
  );
}
