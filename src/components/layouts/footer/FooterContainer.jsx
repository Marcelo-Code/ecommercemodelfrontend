import { useEffect, useState } from "react";
import { getData } from "../../../services/api/data";
import { handleError } from "../../../utils/helpers";
import { Footer } from "./Footer";

export const FooterContainer = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    getData()
      .then((response) => {
        if (response.status !== 200) {
          handleError(response);
        }
        const dataResponseData = response.data;
        setData(dataResponseData);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const footerProps = { data, isLoading };

  return <Footer {...footerProps} />;
};
