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
    code: "#ffffff",
  };

  const { handleGoBack } = useContext(GeneralContext);

  //Obtiene el id del producto para su edición
  const { colorId } = useParams();

  const handleColorChange = (colorResult) => {
    const hex = colorResult.hex;
    setFormData({ ...formData, code: hex });

    if (!modifiedFlag) setModifiedFlag(true);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    const updatedFormData = { ...formData, [name]: value };

    setFormData(updatedFormData);
    if (!modifiedFlag) setModifiedFlag(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedFormData = { ...formData, name: sanitizeName(formData.name) };

    const exist = colors.some((color) => color.name === updatedFormData.name);

    if (exist && !colorId) {
      errorToastifyAlert("Ya existe un color con ese nombre");
      return;
    }

    const request = colorId ? updateColor : createColor;

    setIsLoadingButton(true);

    try {
      const response = await request(updatedFormData);

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
    handleColorChange,
    handleSubmit,
    colorId,
  };
  return <CreateEditColors {...createEditColorsProps} />;
};
