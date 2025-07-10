import { useEffect, useState } from "react";
import { LoadingContainer } from "../../../loading/LoadingContainer";
import { handleError } from "../../../../../utils/helpers";
import { ErrorContainer } from "../../../error/ErrorContainer";
import { getProductsVariants } from "../../../../../services/api/products";
import { Prod } from "@tensorflow/tfjs";
import { ProductVariantsList } from "./ProductVariantsList";
import { Icons } from "../../../../../assets/Icons";
import { useNavigate } from "react-router-dom";

export const ProductVariantsListContainer = ({ productId }) => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const navigate = useNavigate();

  const handleUpdate = (productVariantId) => {
    navigate(
      `/updateProductsVariants/updateProductVariant/${productId}/${productVariantId}`
    );
  };

  useEffect(() => {
    setIsLoading(true);

    Promise.all([getProductsVariants()])
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
  }, []);

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
    handleUpdate,
    generalBarContainerProps,
  };

  return <ProductVariantsList {...productVariantsListProps} />;
};
