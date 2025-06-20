import { useContext, useEffect, useMemo, useState } from "react";
import { Icons } from "../../../../assets/Icons";
import { GeneralContext } from "../../../../context/GeneralContext";
import { getProducts } from "../../../../services/api/products";
import { LoadingContainer } from "../../loading/LoadingContainer";
import { getUniqueSortedOptions, handleError } from "../../../../utils/helpers";
import { ErrorContainer } from "../../error/ErrorContainer";
import { ProductsListUpdateMode } from "./ProductsListUpdateMode";
import { useConfirm } from "../../../../context/ConfirmContext";
import { successToastifyAlert } from "../../../../utils/alerts";
import { useNavigate } from "react-router-dom";

export const ProductsListUpdateModeContainer = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState([]);

  // Obtiene funciones del contexto GeneralContext
  const { addProduct, removeProduct, addProductToCart } =
    useContext(GeneralContext);

  const confirm = useConfirm();

  const navigate = useNavigate();

  const handleDeleteProduct = async (product) => {
    const isConfirmed = await confirm(
      `¿Querés eliminar el producto "${product.description}"?`
    );

    if (isConfirmed) {
      successToastifyAlert("Producto eliminado");
    }
  };

  const handleUpdateProduct = (productId) => {
    navigate(`/updateProducts/updateProduct/${productId}`);
  };

  useEffect(() => {
    setIsLoading(true);
    Promise.all([getProducts()])
      .then(([productsResponse]) => {
        //Captura erores en caso de que existan
        if (productsResponse.status !== 200) handleError(productsResponse);
        //Agrega el contador de cada producto
        const productsResponseData = productsResponse.data;
        const counteredProducts = productsResponseData.map((product) => ({
          ...product,
          counter: 1,
        }));

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
    () =>
      getUniqueSortedOptions(products, "brands.name", {
        value: "all",
        label: "Todas las marcas",
      }),
    [products]
  );

  //Array de opciones de filtros por categoria
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

  const STATUS_OPTIONS_3 = [
    { value: true, label: "Productos activos" },
    { value: false, label: "Productos inactivos" },
  ];

  if (error) return <ErrorContainer error={error} />;
  if (isLoading) return <LoadingContainer />;

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
    {
      name: "active",
      label: "Estado",
      options: STATUS_OPTIONS_3,
      placeholder: "Seleccioná un estado",
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
    to: "/updateProducts/createProduct",
  };

  const productsListProps = {
    ...generalBarContainerProps,
    products: filteredProducts,
    setProducts: setFilteredProducts,
    addProduct,
    removeProduct,
    addProductToCart,
    handleDeleteProduct,
    handleUpdateProduct,
  };

  return <ProductsListUpdateMode {...productsListProps} />;
};
