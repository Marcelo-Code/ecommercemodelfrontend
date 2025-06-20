import { useEffect, useState } from "react";
import { getBrands } from "../../../../services/api/brands";
import { handleError } from "../../../../utils/helpers";
import { LoadingContainer } from "../../loading/LoadingContainer";
import { Icons } from "../../../../assets/Icons";
import { BrandsList } from "./BrandsList";
import { useNavigate } from "react-router-dom";
import { ErrorContainer } from "../../error/ErrorContainer";

export const BrandsListContainer = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [brands, setBrands] = useState([]);
  const [filteredBrands, setFilteredBrands] = useState([]);

  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleUpdateBrand = (brandId) => {
    navigate(`/updateBrands/updateBrand/${brandId}`);
  };

  useEffect(() => {
    setIsLoading(true);
    Promise.all([getBrands()])
      .then(([brandsResponse]) => {
        if (brandsResponse.status !== 200) {
          handleError(brandsResponse);
        }

        const brandsResponseData = brandsResponse.data;
        setBrands(brandsResponseData);
        setFilteredBrands(brandsResponseData);
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
    buttonText: "Marca",
    buttonIcon: <Icons.AddIcon />,
    initialActiveBar: "editionBar",
    to: "/updateBrands/createBrand",
    records: brands,
    setFilteredRecords: setFilteredBrands,
  };

  const brandsListProps = {
    brands,
    handleUpdateBrand,
    ...generalBarContainerProps,
  };

  return <BrandsList {...brandsListProps} />;
};
