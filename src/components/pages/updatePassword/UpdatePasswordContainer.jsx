import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UpdatePassword } from "./UpdatePassword";
import { updatePassword } from "../../../services/api/log";
import {
  errorToastifyAlert,
  successToastifyAlert,
} from "../../../utils/alerts";

export const UpdatePasswordContainer = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const [isLoadingButton, setIsLoadingButton] = useState(false);

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    setIsLoadingButton(true);

    if (newPassword !== confirmPassword) {
      errorToastifyAlert("Las contraseñas no coinciden");
      return;
    }

    updatePassword(newPassword)
      .then((response) => {
        if (response.status !== 200) throw new Error(response.message);
        successToastifyAlert(response.message);
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      })
      .catch((error) => {
        errorToastifyAlert(error.message);
      })
      .finally(() => setIsLoadingButton(false));
  };

  const updatePasswordProps = {
    newPassword,
    setNewPassword,
    confirmPassword,
    setConfirmPassword,
    handleUpdatePassword,
    isLoadingButton,
  };

  return <UpdatePassword {...updatePasswordProps} />;
};
