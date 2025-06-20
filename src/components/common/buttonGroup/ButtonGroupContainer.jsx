import { ButtonGroup } from "./ButtonGroup";

export const ButtonGroupContainer = (buttonGroupContainerProps) => {
  const buttonGroupProps = { ...buttonGroupContainerProps };
  return <ButtonGroup {...buttonGroupProps} />;
};
