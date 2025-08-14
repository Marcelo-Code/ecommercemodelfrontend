import { useContext, useEffect, useMemo, useState } from "react";
import { Icons } from "../../../../assets/Icons";
import { ProductsList } from "./ProductsList";
import { GeneralContext } from "../../../../context/GeneralContext";
import {
  getActiveProducts,
  getProductsVariants,
} from "../../../../services/api/products";
import { LoadingContainer } from "../../loading/LoadingContainer";
import { getUniqueSortedOptions, handleError } from "../../../../utils/helpers";
import { ErrorContainer } from "../../error/ErrorContainer";
import ProductsPage from "./product-List";

export const ProductsListContainer = () => {
  const [products, setProducts] = useState([]);
  const [productsVariants, setProductsVariants] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState([]);

  // Obtiene funciones del contexto GeneralContext
  const { addProduct, removeProduct, addProductToCart } =
    useContext(GeneralContext);

  useEffect(() => {
    setIsLoading(true);

    Promise.all([getActiveProducts(), getProductsVariants()])
      .then(([productsResponse, productsVariantsResponse]) => {
        //Captura erores en caso de que existan
        if (productsResponse.status !== 200) handleError(productsResponse);
        if (productsVariantsResponse.status !== 200) {
          handleError(productsVariantsResponse);
        }

        //Agrega el contador de cada producto
        const productsResponseData = productsResponse.data;
        const counteredProducts = productsResponseData.map((product) => ({
          ...product,
          counter: 1,
        }));

        setProductsVariants(productsVariantsResponse.data);
        setProducts(counteredProducts);
        setFilteredProducts(counteredProducts);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  //Array de opciones de filtros por marca
  const STATUS_OPTIONS_1 = useMemo(
    () => getUniqueSortedOptions(products, "brands.name"),
    [products]
  );

  //Array de opciones de filtros por categoria
  const STATUS_OPTIONS_2 = useMemo(() => {
    const categoryNames = new Set();

    products.forEach((product) => {
      product.products_categories?.forEach((pc) => {
        const name = pc.categories?.name;
        if (name) categoryNames.add(name);
      });
    });

    return Array.from(categoryNames)
      .sort()
      .map((name) => ({ value: name, label: name }));
  }, [products]);

  if (error) return <ErrorContainer error={error} />;
  if (isLoading) return <LoadingContainer />;

  console.log(productsVariants);

  //Array de opciones de ordenamiento
  const SORT_OPTIONS = [
    { value: "none", label: "Sin ordenar", name: "" },
    {
      value: "alphabetical-asc-description",
      label: "Descripción (A-Z)",
      name: "description",
    },
    {
      value: "alphabetical-desc-description",
      label: "Descripción (Z-A)",
      name: "description",
    },
    {
      value: "alphabetical-asc-brand",
      label: "Marca (A-Z)",
      name: "brands.name",
    },
    {
      value: "alphabetical-desc-brand",
      label: "Marca (Z-A)",
      name: "brands.name",
    },
    {
      value: "numerical-asc-price",
      label: "Menor precio",
      name: "price.value",
    },
    {
      value: "numerical-desc-price",
      label: "Mayor precio",
      name: "price.value",
    },
  ];

  const FILTER_OPTIONS = [
    {
      name: "brands.name",
      label: "Marca",
      options: STATUS_OPTIONS_1,
      placeholder: "Seleccioná una marca",
    },
    {
      name: "products_categories.categories.name",
      label: "Categoría",
      options: STATUS_OPTIONS_2,
      placeholder: "Seleccioná una categoría",
    },
  ];
  //Array de campos a buscar
  const FIELDS_TO_SEARCH = [
    (r) => r.description,
    (r) => r.brands.name,
    (r) =>
      r.products_categories?.map((pc) => pc.categories?.name ?? "").join(" ") ??
      "",
  ];

  const generalBarContainerProps = {
    enableSearchFilterBar: true,
    buttonText: "Producto",
    buttonIcon: <Icons.AddIcon />,
    setFilteredRecords: setFilteredProducts,
    records: products,
    SORT_OPTIONS,
    FILTER_OPTIONS,
    FIELDS_TO_SEARCH,
    enableEditionBar: false,
  };

  const productsListProps = {
    ...generalBarContainerProps,
    productsVariants,
    filteredProducts,
    setFilteredProducts,
    addProduct,
    removeProduct,
    addProductToCart,
  };

  // return <ProductsList {...productsListProps} />;

  return <ProductsPage {...productsListProps} />;
};
