import Swal from "sweetalert2";
import { generalBackGroundColor } from "./helpers";
import "./alerts.css";

export const successToastifyAlert = (message) => {
  Swal.fire({
    toast: true,
    position: "top-end",
    icon: "success",
    html: `<span style="font-weight: normal; font-family: "roboto"; font-size: 15px">${message}</span>`, // 👈 esto reemplaza el título en negrita
    showCloseButton: true,
    showConfirmButton: false,
    timer: 4000, // duración total del toast
    timerProgressBar: false,
    background: generalBackGroundColor,
    color: "black",
    customClass: {
      popup: "custom-toast",
      icon: "custom-icon", // Clase para el ícono
    },

    didOpen: (toast) => {
      const icon = toast.querySelector(".swal2-icon.swal2-success");
      if (icon) {
        icon.style.color = "white"; // Color del ícono
      }
      const closeButton = toast.querySelector(".swal2-close");
      if (closeButton) {
        closeButton.style.color = "white"; // Ícono de cierre blanco
      }

      toast.style.transition = "opacity 1s ease";
      toast.style.opacity = "1";
    },

    willClose: (toast) => {
      // No se usa directamente 'willClose', sino que se maneja el timeout para la animación de salida
    },
  });

  // Se usa setTimeout para iniciar la animación de salida antes de que termine el tiempo
  setTimeout(() => {
    const toast = document.querySelector(".swal2-toast"); // Obtener el toast activo
    if (toast) {
      // Inicia la animación de opacidad de salida antes de que termine el timer
      toast.style.transition = "opacity 1s ease"; // Asegura que la animación se vea
      toast.style.opacity = "0"; // Comienza la animación de salida
    }
  }, 3500); // La animación comienza 500ms antes de que termine el timer
  // Ajustar el ancho del toast
  const customToast = document.querySelector(".custom-toast");
  if (customToast) {
    customToast.style.width = "320px"; // Ajusta el valor del ancho aquí
  }
};

export const errorToastifyAlert = (message) => {
  Swal.fire({
    toast: true,
    position: "top-end",
    icon: "error",
    html: `<span style="font-weight: normal; font-size: 15px">${message}</span>`,
    showCloseButton: true,
    showConfirmButton: false,
    timer: 4000,
    timerProgressBar: false,
    background: "red",
    color: "white",
    customClass: {
      popup: "custom-toast",
      icon: "custom-icon",
    },

    didOpen: (toast) => {
      const icon = toast.querySelector(".swal2-icon.swal2-success");
      if (icon) {
        icon.style.color = "white";
      }
      const closeButton = toast.querySelector(".swal2-close");
      if (closeButton) {
        closeButton.style.color = "white"; // Ícono de cierre blanco
      }

      toast.style.transition = "opacity 1s ease";
      toast.style.opacity = "1";
    },

    willClose: (toast) => {},
  });
  setTimeout(() => {
    const toast = document.querySelector(".swal2-toast"); // Obtener el toast activo
    if (toast) {
      toast.style.transition = "opacity 1s ease";
      toast.style.opacity = "0";
    }
  }, 3500);
  // Ajustar el ancho del toast
  const customToast = document.querySelector(".custom-toast");
  if (customToast) {
    customToast.style.width = "320px"; // Ajusta el valor del ancho aquí
  }
};

export const confirmationAlert = async (message) => {
  const result = await Swal.fire({
    title: `${message}`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "red",
    cancelButtonColor: "black",
    confirmButtonText: "Confirmar",
    cancelButtonText: "Cancelar",
    background: `${generalBackGroundColor}`,
    backdrop: false,
    color: "black",
    customClass: {
      title: "alertTitle",
      popup: "confirmationAlertPopup",
    },
  });
  return result.isConfirmed;
};
