import { useContext } from "react";
import { BackButton } from "./BackButton";
import { GeneralContext } from "../../../context/GeneralContext";

export const BackButtonContainer = (backButtonContainerProps) => {
  const { handleGoBack } = useContext(GeneralContext);
  const { modifiedFlag = false } = backButtonContainerProps;
  const backButtonProps = { handleGoBack, modifiedFlag };
  return <BackButton {...backButtonProps} />;
};
