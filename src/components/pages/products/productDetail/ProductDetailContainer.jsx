import { useParams } from "react-router-dom";
import { ProductDetail } from "./ProductDetail";
import { getProduct } from "../../../../services/api/products";
import { useContext, useEffect, useState } from "react";
import { handleError } from "../../../../utils/helpers";
import { LoadingContainer } from "../../loading/LoadingContainer";
import { GeneralContext } from "../../../../context/GeneralContext";
import { successToastifyAlert } from "../../../../utils/alerts";
import { ErrorContainer } from "../../error/ErrorContainer";

export const ProductDetailContainer = () => {
  const { productId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [product, setProduct] = useState(null);

  // Obtiene funciones del contexto GeneralContext
  const { cart, setCart, existingProductInCart } = useContext(GeneralContext);

  const [counter, setCounter] = useState(1);

  const addProductToCart = (product, counter) => {
    const quantity = counter;
    const exists = existingProductInCart(product);

    //Verifica si el producto seleccionado se encuentra en el carrito
    const updatedCart = exists
      ? cart.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity + quantity,
              }
            : item
        )
      : [
          ...cart,
          {
            id: product.id,
            quantity,
            description: product.description,
            brand: product.brand,
            category: product.category,
            price: product.price,
          },
        ];

    //Actualiza el carrito
    setCart(updatedCart);
    successToastifyAlert("Agregado al carrito");

    //Reinicia el contador del producto a 1
    setCounter(1);
  };

  const addProduct = () => {
    setCounter(counter + 1);
  };

  const removeProduct = () => {
    if (counter === 1) return;
    setCounter(counter - 1);
  };

  useEffect(() => {
    setIsLoading(true);
    Promise.all([getProduct(productId)])
      .then(([productDetailResponse]) => {
        if (productDetailResponse.status !== 200) {
          handleError(productDetailResponse);
        }
        const productDetailResponseData = productDetailResponse.data;
        setProduct(productDetailResponseData);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [productId]);

  if (error) return <ErrorContainer error={error} />;
  if (isLoading) return <LoadingContainer />;

  const productDetailProps = {
    product,
    addProduct,
    removeProduct,
    counter,
    addProductToCart,
  };

  return <ProductDetail {...productDetailProps} />;
};
