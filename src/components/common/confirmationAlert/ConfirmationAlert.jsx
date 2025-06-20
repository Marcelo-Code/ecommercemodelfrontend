import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import "./confirmationAlert.css";
import { generalBackGroundColor } from "../../../utils/helpers";
import { Icons } from "../../../assets/Icons";

export const ConfirmationAlert = ({ open, onCancel, onConfirm, message }) => (
  <Dialog
    open={open}
    onCancel={onCancel}
    className="confirmationAlertPopup"
    PaperProps={{
      sx: {
        backgroundColor: `${generalBackGroundColor}`,
        borderRadius: 2,
        padding: 3,
      },
    }}
  >
    <DialogTitle sx={{ textAlign: "center", fontSize: "20px" }}>
      ¿Estás seguro?
    </DialogTitle>
    <DialogContent sx={{ textAlign: "center", fontSize: "15px" }}>
      {message}
    </DialogContent>
    <DialogActions sx={{ justifyContent: "center" }}>
      <Button
        startIcon={<Icons.CheckIcon />}
        variant="outlined"
        onClick={onConfirm}
        sx={{
          backgroundColor: "white",
          color: "black",
          border: "1px solid black",
          "&:active": {
            backgroundColor: generalBackGroundColor,
            color: "white",
            border: `1px solid ${generalBackGroundColor}`,
          },
        }}
      >
        confirmar
      </Button>
      <Button
        startIcon={<Icons.CloseIcon />}
        variant="uotlined"
        onClick={onCancel}
        sx={{
          backgroundColor: "black",
          color: "white",
          "&:active": {
            backgroundColor: generalBackGroundColor,
            color: "white",
          },
        }}
      >
        Cancelar
      </Button>
    </DialogActions>
  </Dialog>
);
