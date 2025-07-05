import { useContext, useEffect, useState } from "react";
import "../../../../assets/css/generalStyles.css";
import { useParams } from "react-router-dom";

import { LoadingContainer } from "../../loading/LoadingContainer";
import { ErrorContainer } from "../../error/ErrorContainer";
import {
  errorToastifyAlert,
  successToastifyAlert,
} from "../../../../utils/alerts";
import { handleError, sanitizeName } from "../../../../utils/helpers";
import { GeneralContext } from "../../../../context/GeneralContext";
import { CreateEditBrand } from "./CreateEditBrands";
import {
  createBrand,
  getBrand,
  getBrands,
  updateBrand,
} from "../../../../services/api/brands";

export const CreateEditBrandsContainer = () => {
  const [formData, setFormData] = useState({});
  const [brands, setBrands] = useState([]);
  const [modifiedFlag, setModifiedFlag] = useState(false);
  const [isLoadingButton, setIsLoadingButton] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const formDataInitialState = {
    name: "",
  };

  const { handleGoBack } = useContext(GeneralContext);

  //Obtiene el id del producto para su edición
  const { brandId } = useParams();

  const handleChange = (event) => {
    const { name, value } = event.target;

    const updatedFormData = { ...formData, [name]: sanitizeName(value) };

    setFormData(updatedFormData);
    if (!modifiedFlag) setModifiedFlag(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const exist = brands.some((brand) => brand.name === formData.name);

    if (exist) {
      errorToastifyAlert("Ya existe una marca con ese nombre");
      return;
    }

    setIsLoadingButton(true);

    const request = brandId ? updateBrand : createBrand;

    try {
      const response = await request(formData);

      if (response.status !== 200 && response.status !== 201)
        handleError(response);

      const action = brandId ? "actualizada" : "creada";
      successToastifyAlert(`Marca ${action} con éxito`);

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
      brandId ? getBrand(brandId) : Promise.resolve({ data: [null] }),
      getBrands(),
    ])
      .then(([brandResponse, brandsResponse]) => {
        //Validaciones de marcas
        if (brandsResponse.status !== 200) {
          handleError(brandsResponse);
        }
        if (brandResponse.status !== 200 && brandId) {
          handleError(brandResponse);
        }
        if (brandId) {
          setFormData(brandResponse.data);
        } else {
          setFormData(formDataInitialState);
        }
        setBrands(brandsResponse.data);
      })
      .catch((error) => {
        console.error("Error en la carga de datos:", error);
        setError(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [brandId]);

  if (error) return <ErrorContainer error={error} />;
  if (isLoading) return <LoadingContainer />;

  const createEditBrandProps = {
    handleGoBack,
    modifiedFlag,
    isLoadingButton,
    formData,
    handleChange,
    handleSubmit,
    brandId,
  };
  return <CreateEditBrand {...createEditBrandProps} />;
};
