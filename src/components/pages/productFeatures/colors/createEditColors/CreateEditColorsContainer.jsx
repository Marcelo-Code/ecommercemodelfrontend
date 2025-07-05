import { useContext, useEffect, useState } from "react";
import "../../../../../assets/css/generalStyles.css";
import { useParams } from "react-router-dom";

import { LoadingContainer } from "../../../loading/LoadingContainer";
import { ErrorContainer } from "../../../error/ErrorContainer";
import {
  errorToastifyAlert,
  successToastifyAlert,
} from "../../../../../utils/alerts";
import { handleError, sanitizeName } from "../../../../../utils/helpers";
import { GeneralContext } from "../../../../../context/GeneralContext";
import { CreateEditColors } from "./CreateEditColors";
import {
  createColor,
  getColor,
  getColors,
  updateColor,
} from "../../../../../services/api/colors";

export const CreateEditColorsContainer = () => {
  const [formData, setFormData] = useState({});
  const [colors, setColors] = useState([]);
  const [modifiedFlag, setModifiedFlag] = useState(false);
  const [isLoadingButton, setIsLoadingButton] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const formDataInitialState = {
    name: "",
  };

  const { handleGoBack } = useContext(GeneralContext);

  //Obtiene el id del producto para su edición
  const { colorId } = useParams();

  const handleChange = (event) => {
    const { name, value } = event.target;

    const updatedFormData = { ...formData, [name]: sanitizeName(value) };

    setFormData(updatedFormData);
    if (!modifiedFlag) setModifiedFlag(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const exist = colors.some((color) => color.name === formData.name);

    if (exist) {
      errorToastifyAlert("Ya existe una marca con ese nombre");
      return;
    }

    setIsLoadingButton(true);

    const request = colorId ? updateColor : createColor;

    try {
      const response = await request(formData);

      if (response.status !== 200 && response.status !== 201)
        handleError(response);

      const action = colorId ? "actualizado" : "creado";
      successToastifyAlert(`Color ${action} con éxito`);

      handleGoBack();

      setModifiedFlag(false);
    } catch (error) {
      errorToastifyAlert(error.message);
      setError(error);
    } finally {
      setIsLoadingButton(false);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    Promise.all([
      colorId ? getColor(colorId) : Promise.resolve({ data: [null] }),
      getColors(),
    ])
      .then(([colorResponse, colorsResponse]) => {
        //Validaciones de marcas
        if (colorsResponse.status !== 200) {
          handleError(colorsResponse);
        }
        if (colorResponse.status !== 200 && colorId) {
          handleError(colorResponse);
        }
        if (colorId) {
          setFormData(colorResponse.data);
        } else {
          setFormData(formDataInitialState);
        }
        setColors(colorsResponse.data);
      })
      .catch((error) => {
        console.error("Error en la carga de datos:", error);
        setError(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [colorId]);

  if (error) return <ErrorContainer error={error} />;
  if (isLoading) return <LoadingContainer />;

  const createEditColorsProps = {
    handleGoBack,
    modifiedFlag,
    isLoadingButton,
    formData,
    handleChange,
    handleSubmit,
    colorId,
  };
  return <CreateEditColors {...createEditColorsProps} />;
};
