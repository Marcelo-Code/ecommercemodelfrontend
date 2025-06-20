import { useContext, useEffect, useState } from "react";
import { LoadingContainer } from "../components/pages/loading/LoadingContainer";
import { DeniedAccessContainer } from "../components/pages/deniedAccess/DeniedAccessContainer";
import { GeneralContext } from "../context/GeneralContext";
import { checkAuth } from "../services/api/log";

export const ProtectedUserRoute = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { isLoggedIn, setIsLoggedIn, setLoggedUser } =
    useContext(GeneralContext);

  //Verificar si el usuario esta logueado
  useEffect(() => {
    setIsLoading(true);
    checkAuth(setIsLoggedIn, setLoggedUser).finally(() => setIsLoading(false));
  }, [setIsLoggedIn, setLoggedUser]);

  if (isLoading) return <LoadingContainer />;

  return isLoggedIn ? children : <DeniedAccessContainer />;
};
