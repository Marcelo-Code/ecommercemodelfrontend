import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  createCategory,
  getCategories,
  getCategory,
  updateCategory,
} from "../../../../../services/api/categories";
import { LoadingContainer } from "../../../loading/LoadingContainer";
import { ErrorContainer } from "../../../error/ErrorContainer";
import {
  errorToastifyAlert,
  successToastifyAlert,
} from "../../../../../utils/alerts";
import { handleError, sanitizeName } from "../../../../../utils/helpers";
import { GeneralContext } from "../../../../../context/GeneralContext";
import { CreateEditCategories } from "./CreateEditCategories";

export const CreateEditCategoriesContainer = () => {
  const [formData, setFormData] = useState({});
  const [categories, setCategories] = useState([]);
  const [modifiedFlag, setModifiedFlag] = useState(false);
  const [isLoadingButton, setIsLoadingButton] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const formDataInitialState = {
    name: "",
  };

  const { handleGoBack } = useContext(GeneralContext);

  //Obtiene el id del producto para su edición
  const { categoryId } = useParams();

  const handleChange = (event) => {
    const { name, value } = event.target;

    const updatedFormData = { ...formData, [name]: sanitizeName(value) };

    setFormData(updatedFormData);
    if (!modifiedFlag) setModifiedFlag(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    //Validaciones de marcas
    const exist = categories.some(
      (category) => category.name === formData.name
    );

    if (exist) {
      errorToastifyAlert("Ya existe una categoría con ese nombre");
      return;
    }

    setIsLoadingButton(true);

    const request = categoryId ? updateCategory : createCategory;

    try {
      const response = await request(formData);

      if (response.status !== 200 && response.status !== 201)
        handleError(response);

      const action = categoryId ? "actualizada" : "creada";
      successToastifyAlert(`Categoría ${action} con éxito`);

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
      categoryId ? getCategory(categoryId) : Promise.resolve({ data: [null] }),
      getCategories(),
    ])
      .then(([categoryResponse, categoriesResponse]) => {
        //Validaciones de marcas
        if (categoriesResponse.status !== 200) {
          handleError(categoriesResponse);
        }

        if (categoryResponse.status !== 200 && categoryId) {
          handleError(categoryResponse);
        }
        if (categoryId) {
          setFormData(categoryResponse.data);
        } else {
          setFormData(formDataInitialState);
        }

        setCategories(categoriesResponse.data);
      })
      .catch((error) => {
        console.error("Error en la carga de datos:", error);
        setError(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [categoryId]);

  if (error) return <ErrorContainer error={error} />;
  if (isLoading) return <LoadingContainer />;

  const createEditProps = {
    handleGoBack,
    modifiedFlag,
    isLoadingButton,
    formData,
    handleChange,
    handleSubmit,
    categoryId,
  };
  return <CreateEditCategories {...createEditProps} />;
};
