import { useEffect, useState } from "react";
import { getBrands } from "../../../../../services/api/brands";
import { handleError } from "../../../../../utils/helpers";
import { LoadingContainer } from "../../../loading/LoadingContainer";
import { Icons } from "../../../../../assets/Icons";
import { BrandsList } from "./BrandsList";
import { useNavigate } from "react-router-dom";
import { ErrorContainer } from "../../../error/ErrorContainer";
import { getColors } from "../../../../../services/api/colors";
import { getCategories } from "../../../../../services/api/categories";
import { getSizes } from "../../../../../services/api/sizes";
import { Tabs } from "./Tabs";
import { ColorsList } from "../../colors/colorsList/ColorsList";
import { SizesList } from "../../sizes/sizesList/SizesList";
import { CategoriesList } from "../../categories/categoriesList/CategoriesList";

export const BrandsListContainer = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [brands, setBrands] = useState([]);
  const [colors, setColors] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [categories, setCategories] = useState([]);

  const [filteredBrands, setFilteredBrands] = useState([]);
  const [filteredColors, setFilteredColors] = useState([]);
  const [filteredSizes, setFilteredSizes] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);

  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleUpdateBrand = (brandId) => {
    navigate(`/updateBrands/updateBrand/${brandId}`);
  };

  const handleUpdateColor = (colorId) => {
    navigate(`/updateColors/updateColor/${colorId}`);
  };

  const handleUpdateSize = (sizeId) => {
    navigate(`/updateSizes/updateSize/${sizeId}`);
  };

  const handleUpdateCategory = (categoryId) => {
    navigate(`/updateCategories/updateCategory/${categoryId}`);
  };

  useEffect(() => {
    setIsLoading(true);
    console.log("brands");
    Promise.all([getBrands(), getColors(), getSizes(), getCategories()])
      .then(
        ([
          brandsResponse,
          colorsResponse,
          sizesResponse,
          categoriesResponse,
        ]) => {
          if (brandsResponse.status !== 200) {
            handleError(brandsResponse);
          }

          if (colorsResponse.status !== 200) {
            handleError(colorsResponse);
          }

          if (sizesResponse.status !== 200) {
            handleError(sizesResponse);
          }

          if (categoriesResponse.status !== 200) {
            handleError(categoriesResponse);
          }

          const brandsResponseData = brandsResponse.data;
          const colorsResponseData = colorsResponse.data;
          const sizesResponseData = sizesResponse.data;
          const categoriesResponseData = categoriesResponse.data;

          setBrands(brandsResponseData);
          setColors(colorsResponseData);
          setSizes(sizesResponseData);
          setCategories(categoriesResponseData);

          setFilteredBrands(brandsResponseData);
          setFilteredColors(colorsResponseData);
          setFilteredSizes(sizesResponseData);
          setFilteredCategories(categoriesResponseData);
        }
      )
      .catch((error) => {
        setError(error);
      })
      .finally(() => setIsLoading(false));
  }, []);

  if (error) return <ErrorContainer error={error} />;
  if (isLoading) return <LoadingContainer />;

  const generalBarBrandsContainerProps = {
    enableSearchFilterBar: false,
    buttonText: "Marca",
    buttonIcon: <Icons.AddIcon />,
    initialActiveBar: "editionBar",
    to: "/updateBrands/createBrand",
    records: brands,
    setFilteredRecords: setFilteredBrands,
  };
  const generalBarColorsContainerProps = {
    enableSearchFilterBar: false,
    buttonText: "Color",
    buttonIcon: <Icons.AddIcon />,
    initialActiveBar: "editionBar",
    to: "/updateColors/createColor",
    records: colors,
    setFilteredRecords: setFilteredColors,
  };
  const generalBarSizesContainerProps = {
    enableSearchFilterBar: false,
    buttonText: "Talle",
    buttonIcon: <Icons.AddIcon />,
    initialActiveBar: "editionBar",
    to: "/updateSizes/createSize",
    records: sizes,
    setFilteredRecords: setFilteredSizes,
  };
  const generalBarCategoriesContainerProps = {
    enableSearchFilterBar: false,
    buttonText: "Categoria",
    buttonIcon: <Icons.AddIcon />,
    initialActiveBar: "editionBar",
    to: "/updateCategories/createCategory",
    records: categories,
    setFilteredRecords: setFilteredCategories,
  };

  const brandsListProps = {
    brands,
    handleUpdateBrand,
    ...generalBarBrandsContainerProps,
  };

  const colorsListProps = {
    colors,
    handleUpdateColor,
    ...generalBarColorsContainerProps,
  };

  const sizesListProps = {
    sizes,
    handleUpdateSize,
    ...generalBarSizesContainerProps,
  };

  const categoriesListProps = {
    categories,
    handleUpdateCategory,
    ...generalBarCategoriesContainerProps,
  };

  //Lista de pestañas para el tab
  const tabs = [
    {
      label: "Categorías",
      content: <CategoriesList {...categoriesListProps} />,
    },
    {
      label: "Colores",
      content: <ColorsList {...colorsListProps} />,
    },
    {
      label: "Marcas",
      content: <BrandsList {...brandsListProps} />,
    },
    {
      label: "Talles",
      content: <SizesList {...sizesListProps} />,
    },
  ];

  return <Tabs tabs={tabs} />;
};
