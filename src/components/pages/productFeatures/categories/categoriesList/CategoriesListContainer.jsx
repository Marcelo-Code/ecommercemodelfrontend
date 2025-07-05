import { useEffect, useState } from "react";
import { CategoriesList } from "./CategoriesList";
import { getCategories } from "../../../../services/api/categories";
import { getBrands } from "../../../../services/api/brands";
import { handleError } from "../../../../utils/helpers";
import { LoadingContainer } from "../../loading/LoadingContainer";
import { Icons } from "../../../../assets/Icons";
import { useNavigate } from "react-router-dom";
import { ErrorContainer } from "../../error/ErrorContainer";

export const CategoriesListContainer = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleUpdateCategory = (categoryId) => {
    navigate(`/updateCategories/updateCategory/${categoryId}`);
  };

  useEffect(() => {
    setIsLoading(true);
    Promise.all([getCategories(), getBrands()])
      .then(([categoriesResponse]) => {
        if (categoriesResponse.status !== 200) {
          handleError(categoriesResponse);
        }

        const categories = categoriesResponse.data;
        setCategories(categories);
        setFilteredCategories(categories);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => setIsLoading(false));
  }, []);

  if (error) return <ErrorContainer error={error} />;
  if (isLoading) return <LoadingContainer />;

  const generalBarContainerProps = {
    enableSearchFilterBar: false,
    buttonText: "Categoría",
    buttonIcon: <Icons.AddIcon />,
    initialActiveBar: "editionBar",
    to: "/updateCategories/createCategory",
    records: categories,
    setFilteredRecords: setFilteredCategories,
  };

  const categoriesProps = {
    categories,
    handleUpdateCategory,
    ...generalBarContainerProps,
  };

  return <CategoriesList {...categoriesProps} />;
};
