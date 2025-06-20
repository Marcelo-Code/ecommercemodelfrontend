import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Login } from "./Login";
import { GeneralContext } from "../../../context/GeneralContext";
import { checkAuth, login } from "../../../services/api/log";
import { errorToastifyAlert } from "../../../utils/alerts";
import { handleError } from "../../../utils/helpers";

export const LoginContainer = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [isLoadingButton, setIsLoadingButton] = useState(false);
  const { setIsLoggedIn, setLoggedUser, handleGoBack } =
    useContext(GeneralContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoadingButton(true);

    try {
      const response = await login(email, password);

      if (response.status === 200) {
        // Espera a que checkAuth termine y controle si el usuario está activo
        await checkAuth(setIsLoggedIn, setLoggedUser);
        navigate("/updateProducts");
      } else {
        handleError(response);
      }
    } catch (error) {
      // Si el usuario está inactivo, checkAuth va a lanzar error y cae acá
      errorToastifyAlert(error.message || "Error en el login");
    } finally {
      setIsLoadingButton(false);
    }
  };

  const loginProps = {
    handleLogin,
    email,
    setEmail,
    password,
    setPassword,
    handleGoBack,
    isLoadingButton,
  };

  return <Login {...loginProps} />;
};
