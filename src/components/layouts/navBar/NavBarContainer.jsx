import { useContext, useEffect, useState } from "react";
import { NavBar } from "./NavBar";
import { GeneralContext } from "../../../context/GeneralContext";
import { getData } from "../../../services/api/data";

export const NavBarContainer = () => {
  const { cart, isLoggedIn, loggedUser, alerts } = useContext(GeneralContext);

  const [text, setText] = useState("");

  const totalProductsInCart = cart.reduce(
    (acc, item) => acc + item.quantity,
    0
  );

  useEffect(() => {
    getData().then((response) => {
      setText(response.data.marquee_message);
    });
  }, []);

  const navBarProps = {
    text,
    totalProductsInCart,
    isLoggedIn,
    loggedUser,
    alerts,
  };

  return <NavBar {...navBarProps} />;
};
