import { useEffect, useState } from "react";
import { LoadingContainer } from "../../../loading/LoadingContainer";
import { handleError } from "../../../../../utils/helpers";
import { ErrorContainer } from "../../../error/ErrorContainer";
import {
  deleteProductVariant,
  getProductsVariants,
  getProductVariantsByProductId,
} from "../../../../../services/api/products";
import { ProductVariantsList } from "./ProductVariantsList";
import { Icons } from "../../../../../assets/Icons";
import { useNavigate } from "react-router-dom";
import { useConfirm } from "../../../../../context/ConfirmContext";
import {
  errorToastifyAlert,
  successToastifyAlert,
} from "../../../../../utils/alerts";

export const ProductVariantsListContainer = ({ productId }) => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [updateList, setUpdateList] = useState(false);
  const navigate = useNavigate();

  const confirm = useConfirm();

  const handleUpdateProductVariant = (productVariantId) => {
    navigate(
      `/updateProductsVariants/updateProductVariant/${productId}/${productVariantId}`
    );
  };

  const handleDeleteProductVariant = async (productVariantId) => {
    const isConfirmed = await confirm(`¿Eliminar la variante?`);

    if (!isConfirmed) return;

    deleteProductVariant(productVariantId)
      .then((response) => {
        if (response.status !== 200) throw response.error;
        successToastifyAlert("Producto eliminado");
        setUpdateList(!updateList);
      })
      .catch((error) => {
        errorToastifyAlert("Error al eliminar producto", error);
      });
  };

  useEffect(() => {
    setIsLoading(true);

    Promise.all([getProductVariantsByProductId(productId)])
      .then(([productsResponse]) => {
        //Captura erores en caso de que existan
        if (productsResponse.status !== 200) handleError(productsResponse);

        setProducts(productsResponse.data);
        setFilteredProducts(productsResponse.data);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [updateList]);

  if (error) return <ErrorContainer error={error} />;
  if (isLoading) return <LoadingContainer />;

  const generalBarContainerProps = {
    enableSearchFilterBar: false,
    buttonText: "Variante",
    buttonIcon: <Icons.AddIcon />,
    initialActiveBar: "editionBar",
    to: `/updateProductsVariants/createProductVariant/${productId}`,
    records: products,
    setFilteredRecords: setFilteredProducts,
  };

  const productVariantsListProps = {
    products,
    filteredProducts,
    setFilteredProducts,
    handleUpdateProductVariant,
    handleDeleteProductVariant,
    generalBarContainerProps,
  };

  return <ProductVariantsList {...productVariantsListProps} />;
};
