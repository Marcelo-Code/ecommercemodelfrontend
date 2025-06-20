import { useContext, useEffect, useState } from "react";
import { Settings } from "./Settings";
import { getTotalStorageAndDbSize } from "../../../services/api/generalFunctions";
import { LoadingContainer } from "../loading/LoadingContainer";
import { ErrorContainer } from "../error/ErrorContainer";
import { updatePassword } from "../../../services/api/log";
import {
  errorToastifyAlert,
  successToastifyAlert,
} from "../../../utils/alerts";
import { GeneralContext } from "../../../context/GeneralContext";
import { getLoggedInUserData } from "../../../services/api/users";
import { getData, updateData } from "../../../services/api/data";
import { handleError } from "../../../utils/helpers";
import { Error } from "../error/Error";

export const SettingsContainer = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [data, setData] = useState({});
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingButton, setIsLoadingButton] = useState(false);
  const [isLoadingDataButton, setIsLoadingDataButton] = useState(false);
  const [totalSize, setTotalSize] = useState({});
  const [loggedUserData, setLoggedUserData] = useState({});
  const [modifiedFlag, setModifiedFlag] = useState(false);

  const { handleGoBack } = useContext(GeneralContext);

  const handleDataSubmit = (e) => {
    e.preventDefault();

    setIsLoadingDataButton(true);

    updateData(data)
      .then((dataResponse) => {
        if (dataResponse.status !== 200) handleError(dataResponse);
        successToastifyAlert("Datos actualizados");
      })
      .catch((error) => {
        errorToastifyAlert("Error al actualizar los datos ", error);
      })
      .finally(() => {
        setIsLoadingDataButton(false);
        setModifiedFlag(false);
      });
  };

  const handleDataChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    if (!modifiedFlag) setModifiedFlag(true);
  };

  //Función para actualizar la contraseña
  const handleUpdatePassword = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      errorToastifyAlert("Las contraseñas no coinciden");
      return;
    }

    setIsLoadingButton(true);
    updatePassword(newPassword)
      .then((response) => {
        if (response.status !== 200) throw new Error(response.message);
        successToastifyAlert("Contraseña actualizada");
      })
      .catch((error) => {
        errorToastifyAlert("Error al actualizar la contraseña ", error);
      })
      .finally(() => {
        setIsLoadingButton(false);
        setNewPassword("");
        setConfirmPassword("");
      });
  };

  //Función para obtener el tamaño total
  useEffect(() => {
    setIsLoading(true);
    Promise.all([getTotalStorageAndDbSize(), getLoggedInUserData(), getData()])
      .then(([totalSizeResponse, userResponse, dataResponse]) => {
        const totalSizeData = totalSizeResponse.data;
        const userResponseData = userResponse.data;
        const dataResponseData = dataResponse.data;

        if (totalSizeResponse.status !== 200) handleError(totalSizeResponse);
        if (userResponse.status !== 200) handleError(userResponse);
        if (dataResponse.status !== 200) handleError(dataResponse);

        setTotalSize(totalSizeData);
        setLoggedUserData(userResponseData);
        setData(dataResponseData);
      })
      .catch((error) => {
        console.log(error);
        setError(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  if (error) return <ErrorContainer error={error} />;
  if (isLoading) return <LoadingContainer />;

  const settingsProps = {
    totalSize,
    newPassword,
    setNewPassword,
    confirmPassword,
    setConfirmPassword,
    handleUpdatePassword,
    isLoadingButton,
    handleGoBack,
    loggedUserData,
    data,
    handleDataChange,
    handleDataSubmit,
    isLoadingDataButton,
    modifiedFlag,
  };

  return <Settings {...settingsProps} />;
};
