import { useContext, useEffect, useState } from "react";
import "../../../../assets/css/generalStyles.css";
import { useParams } from "react-router-dom";
import { CreateEditUser } from "./CreateEditUser";
import { LoadingContainer } from "../../loading/LoadingContainer";
import { ErrorContainer } from "../../error/ErrorContainer";

import {
  errorToastifyAlert,
  successToastifyAlert,
} from "../../../../utils/alerts";
import { GeneralContext } from "../../../../context/GeneralContext";
import {
  createUser,
  getUser,
  updateUser,
} from "../../../../services/api/users";
import { handleError } from "../../../../utils/helpers";

export const CreateEditUserContainer = () => {
  const [formData, setFormData] = useState({});
  const [modifiedFlag, setModifiedFlag] = useState(false);
  const [isLoadingButton, setIsLoadingButton] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const formDataInitialState = {
    name: "",
    last_name: "",
    email: "",
    active: true,
  };

  const { handleGoBack } = useContext(GeneralContext);

  const USER_STATUS = [
    {
      id: true,
      name: "Usuario activo",
    },
    {
      id: false,
      name: "Usuario inactivo",
    },
  ];

  //Obtiene el id del producto para su edición
  const { userId } = useParams();

  const handleChange = (event) => {
    const { name, value } = event.target;

    const updatedFormData = { ...formData, [name]: value };

    setFormData(updatedFormData);
    if (!modifiedFlag) setModifiedFlag(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoadingButton(true);

    const request = userId ? updateUser : createUser;

    try {
      const response = await request(formData);

      if (response.status !== 200 && response.status !== 201) {
        handleError(response);
      }

      const action = userId ? "actualizado" : "creado";
      successToastifyAlert(`Usuario ${action} con éxito`);
      handleGoBack();
    } catch (error) {
      const action = userId ? "actualizado" : "creado";
      errorToastifyAlert(`Usuario ${action} con éxito: `, error.message);
    } finally {
      setIsLoadingButton(false);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    Promise.all([userId ? getUser(userId) : Promise.resolve({ data: [null] })])
      .then(([userResponse]) => {
        //Validaciones de marcas
        if (userId && userResponse.status !== 200) {
          handleError(userResponse);
        }

        if (userId) {
          setFormData(userResponse.data[0]);
        } else {
          setFormData(formDataInitialState);
        }
      })
      .catch((error) => {
        console.error("Error en la carga de datos:", error);
        setError(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [userId]);

  if (error) return <ErrorContainer error={error} />;
  if (isLoading) return <LoadingContainer />;

  const createEditProductProps = {
    handleGoBack,
    modifiedFlag,
    isLoadingButton,
    handleChange,
    formData,
    handleSubmit,
    USER_STATUS,
    userId,
  };

  return <CreateEditUser {...createEditProductProps} />;
};
