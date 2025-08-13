import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { handleError } from "../../../../../utils/helpers";
import { getColors } from "../../../../../services/api/colors";
import { getSizes } from "../../../../../services/api/sizes";
import { LoadingContainer } from "../../../loading/LoadingContainer";
import { ErrorContainer } from "../../../error/ErrorContainer";
import {
  createProduct,
  createProductVariant,
  getProduct,
  getProductVariant,
  getProductVariantsByProductId,
  updateProductVariant,
} from "../../../../../services/api/products";
import {
  errorToastifyAlert,
  successToastifyAlert,
} from "../../../../../utils/alerts";
import { GeneralContext } from "../../../../../context/GeneralContext";
import { CreateEditProductsVariants } from "./CreateEditProductsVariants";

export const CreateEditProductsVariantsContainer = () => {
  const { handleGoBack } = useContext(GeneralContext);
  const { productId, productVariantId = null } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingButton, setIsLoadingButton] = useState(false);
  const [error, setError] = useState(null);
  const [colors, setColors] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [product, setProduct] = useState({});
  const [formData, setFormData] = useState({});
  const [modifiedFlag, setModifiedFlag] = useState(false);

  const formDataInitialState = {
    product_id: productId,
    color_id: null,
    size_id: null,
    stock: 0,
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    const updatedFormData = {
      ...formData,
      [name]: value,
    };
    setFormData(updatedFormData);
    if (!modifiedFlag) setModifiedFlag(true);
    console.log(updatedFormData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const responseProductVariants = await getProductVariantsByProductId(
        productId
      );
      const exists = responseProductVariants.data.some(
        (variant) =>
          variant.color_id === formData.color_id &&
          variant.size_id === formData.size_id &&
          variant.id !== productVariantId // para permitir update del mismo registro
      );

      if (exists) {
        errorToastifyAlert("Ya existe esa variante");
        return;
      }

      setIsLoadingButton(true);

      const request = productVariantId
        ? updateProductVariant
        : createProductVariant;

      const response = await request(formData);

      if (response.status !== 200 && response.status !== 201) {
        const errorMessage =
          typeof response.error === "string"
            ? response.error
            : JSON.stringify(response.error);
        throw new Error(
          `${response?.message ?? "Error sin mensaje"}: ${
            errorMessage ?? "Detalles no disponibles"
          }`
        );
      }

      const action = productId ? "actualizado" : "creado";
      successToastifyAlert(`Producto ${action} con éxito`);
      setModifiedFlag(false);

      setModifiedFlag(false);
      handleGoBack();
    } catch (error) {
      setError(error);
    } finally {
      setIsLoadingButton(false);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    Promise.all([
      getColors(),
      getSizes(),
      getProduct(productId),
      productVariantId
        ? getProductVariant(productVariantId)
        : Promise.resolve({ data: [null] }),
    ])
      .then(
        ([
          colorsResponse,
          sizesResponse,
          productResponse,
          productVariantResponse,
        ]) => {
          //Captura erores en caso de que existan
          if (colorsResponse.status !== 200) handleError(colorsResponse);
          if (sizesResponse.status !== 200) handleError(sizesResponse);
          if (productResponse.status !== 200) handleError(productResponse);
          if (productVariantId && productVariantResponse.status !== 200)
            handleError(productVariantResponse);

          setColors(colorsResponse.data);
          setSizes(sizesResponse.data);
          setProduct(productResponse.data);

          if (productVariantId) {
            setFormData(productVariantResponse.data);
          } else {
            setFormData(formDataInitialState);
          }
        }
      )
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  if (isLoading) return <LoadingContainer />;
  if (error) return <ErrorContainer error={error} />;

  const createEditProductsVariantsProps = {
    productId,
    colors,
    sizes,
    isLoadingButton,
    handleChange,
    handleGoBack,
    modifiedFlag,
    handleSubmit,
    formData,
  };

  return <CreateEditProductsVariants {...createEditProductsVariantsProps} />;
};
