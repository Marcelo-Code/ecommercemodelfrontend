import { useEffect, useState } from "react";
import { handleError } from "../../../../../utils/helpers";
import { LoadingContainer } from "../../../loading/LoadingContainer";
import { Icons } from "../../../../../assets/Icons";
import { SizesList } from "./SizesList";
import { useNavigate } from "react-router-dom";
import { ErrorContainer } from "../../../error/ErrorContainer";
import { getSizes } from "../../../../../services/api/sizes";

export const SizesListContainer = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [sizes, setSizes] = useState([]);
  const [filteredSizes, setFilteredSizes] = useState([]);

  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleUpdateSize = (sizeId) => {
    navigate(`/updateSizes/updateSize/${sizeId}`);
  };

  useEffect(() => {
    setIsLoading(true);
    Promise.all([getSizes()])
      .then(([sizesResponse]) => {
        if (sizesResponse.status !== 200) {
          handleError(sizesResponse);
        }

        const sizesResponseData = sizesResponse.data;
        setSizes(sizesResponseData);
        setFilteredSizes(sizesResponseData);
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
    buttonText: "Talle",
    buttonIcon: <Icons.AddIcon />,
    initialActiveBar: "editionBar",
    to: "/updateSizes/createSize",
    records: sizes,
    setFilteredRecords: setFilteredSizes,
  };

  const sizesListProps = {
    sizes,
    handleUpdateSize,
    ...generalBarContainerProps,
  };

  return <SizesList {...sizesListProps} />;
};
