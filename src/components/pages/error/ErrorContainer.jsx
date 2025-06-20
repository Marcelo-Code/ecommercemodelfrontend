import { Error } from "./Error";

export const ErrorContainer = (errorContainerProps) => {
  const errorProps = { ...errorContainerProps };

  return <Error {...errorProps} />;
};
