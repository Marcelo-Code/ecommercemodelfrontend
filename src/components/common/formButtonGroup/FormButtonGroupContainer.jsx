import React, { useContext } from "react";
import { FormButtonGroup } from "./FormButtonGroup";
import { GeneralContext } from "../../../context/GeneralContext";

export const FormButtonGroupContainer = (formButtonGroupContainerProps) => {
  const { handleGoBack } = useContext(GeneralContext);
  const formButtonGroupProps = {
    ...formButtonGroupContainerProps,
    handleGoBack,
  };
  return <FormButtonGroup {...formButtonGroupProps} />;
};
