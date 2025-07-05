import { useEffect, useState } from "react";
import { handleError } from "../../../../../utils/helpers";
import { LoadingContainer } from "../../../loading/LoadingContainer";
import { Icons } from "../../../../../assets/Icons";
import { ColorsList } from "./ColorsList";
import { useNavigate } from "react-router-dom";
import { ErrorContainer } from "../../../error/ErrorContainer";
import { getColors } from "../../../../../services/api/colors";

export const ColorsListContainer = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [colors, setColors] = useState([]);
  const [filteredColors, setFilteredColors] = useState([]);

  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleUpdateColor = (colorId) => {
    navigate(`/updateColors/updateColor/${colorId}`);
  };

  useEffect(() => {
    setIsLoading(true);
    Promise.all([getColors()])
      .then(([colorsResponse]) => {
        if (colorsResponse.status !== 200) {
          handleError(colorsResponse);
        }

        const colorsResponseData = colorsResponse.data;
        setColors(colorsResponseData);
        setFilteredColors(colorsResponseData);
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
    buttonText: "Color",
    buttonIcon: <Icons.AddIcon />,
    initialActiveBar: "editionBar",
    to: "/updateColors/createColor",
    records: colors,
    setFilteredRecords: setFilteredColors,
  };

  const brandsListProps = {
    colors,
    handleUpdateColor,
    ...generalBarContainerProps,
  };

  return <ColorsList {...brandsListProps} />;
};
