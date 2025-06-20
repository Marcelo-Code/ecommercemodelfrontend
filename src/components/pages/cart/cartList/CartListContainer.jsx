import { useContext } from "react";
import { GeneralContext } from "../../../../context/GeneralContext";
import { CartList } from "./CartList";
import { useNavigate } from "react-router-dom";

export const CartListContainer = () => {
  const {
    cart,
    removeProduct,
    addProduct,
    removeProductFromCart,
    handleGoBack,
  } = useContext(GeneralContext);

  const navigate = useNavigate();

  //Calculo del precio total
  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handleContinue = () => {
    navigate("/checkout");
  };

  const cartListProps = {
    cart,
    removeProduct,
    addProduct,
    totalPrice,
    removeProductFromCart,
    handleContinue,
    handleGoBack,
  };

  return <CartList {...cartListProps} />;
};
