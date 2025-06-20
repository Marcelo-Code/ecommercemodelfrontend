import { useEffect, useState } from "react";
import { ContactUs } from "./ContactUs";
import { getData } from "../../../services/api/data";
import { handleError } from "../../../utils/helpers";
import { LoadingContainer } from "../loading/LoadingContainer";
import { ErrorContainer } from "../error/ErrorContainer";

export const ContactUsContainer = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState({});

  useEffect(() => {
    setIsLoading(true);
    Promise.all([getData()])
      .then(([dataResponse]) => {
        if (dataResponse.status !== 200) {
          handleError(dataResponse);
        }

        const dataResponseData = dataResponse.data;
        setData(dataResponseData);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => setIsLoading(false));
  }, []);

  if (error) return <ErrorContainer error={error} />;
  if (isLoading) return <LoadingContainer />;

  const contactUsProps = { data };

  return <ContactUs {...contactUsProps} />;
};
