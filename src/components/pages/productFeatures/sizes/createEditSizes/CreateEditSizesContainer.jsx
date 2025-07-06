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
import { CreateEditSizes } from "./CreateEditSizes";
import {
  createSize,
  getSize,
  getSizes,
  updateSize,
} from "../../../../../services/api/sizes";

export const CreateEditSizesContainer = () => {
  const [formData, setFormData] = useState({});
  const [sizes, setSizes] = useState([]);
  const [modifiedFlag, setModifiedFlag] = useState(false);
  const [isLoadingButton, setIsLoadingButton] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const formDataInitialState = {
    name: "",
  };

  const { handleGoBack } = useContext(GeneralContext);

  //Obtiene el id para su edición
  const { sizeId } = useParams();

  const handleChange = (event) => {
    const { name, value } = event.target;

    const updatedFormData = { ...formData, [name]: value };

    setFormData(updatedFormData);
    if (!modifiedFlag) setModifiedFlag(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedFormData = { ...formData, name: sanitizeName(formData.name) };

    const exist = sizes.some((size) => size.name === updatedFormData.name);

    if (exist && !sizeId) {
      errorToastifyAlert("Ya existe un talle con ese nombre");
      return;
    }

    const request = sizeId ? updateSize : createSize;

    setIsLoadingButton(true);

    try {
      const response = await request(updatedFormData);

      if (response.status !== 200 && response.status !== 201)
        handleError(response);

      const action = sizeId ? "actualizado" : "creado";
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
      sizeId ? getSize(sizeId) : Promise.resolve({ data: [null] }),
      getSizes(),
    ])
      .then(([sizeResponse, sizesResponse]) => {
        //Validaciones de marcas
        if (sizesResponse.status !== 200) {
          handleError(sizesResponse);
        }
        if (sizeResponse.status !== 200 && sizeId) {
          handleError(sizeResponse);
        }
        if (sizeId) {
          setFormData(sizeResponse.data);
        } else {
          setFormData(formDataInitialState);
        }
        setSizes(sizesResponse.data);
      })
      .catch((error) => {
        console.error("Error en la carga de datos:", error);
        setError(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [sizeId]);

  if (error) return <ErrorContainer error={error} />;
  if (isLoading) return <LoadingContainer />;

  const createEditSizesProps = {
    handleGoBack,
    modifiedFlag,
    isLoadingButton,
    formData,
    handleChange,
    handleSubmit,
    sizeId,
  };
  return <CreateEditSizes {...createEditSizesProps} />;
};
