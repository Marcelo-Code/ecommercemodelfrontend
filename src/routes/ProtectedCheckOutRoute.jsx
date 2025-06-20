import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { GeneralContext } from "../context/GeneralContext";

export const ProtectedCheckOutRoute = ({ children }) => {
  const { cart } = useContext(GeneralContext);

  const totalProductsInCart = cart.reduce(
    (acc, item) => acc + item.quantity,
    0
  );

  if (totalProductsInCart === 0) {
    return <Navigate to="/products" />;
  }

  return children;
};
