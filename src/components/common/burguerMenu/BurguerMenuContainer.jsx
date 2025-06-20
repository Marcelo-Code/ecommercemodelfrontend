import { useContext, useEffect, useState } from "react";
import { BurguerMenu } from "./BurguerMenu";
import { adminOptions, userOptions } from "./optionsMenu";
import { GeneralContext } from "../../../context/GeneralContext";
import { logout } from "../../../services/api/log";
import { useConfirm } from "../../../context/ConfirmContext";
import { errorToastifyAlert } from "../../../utils/alerts";

export const BurguerMenuContainer = () => {
  const { setIsLoggedIn, isLoggedIn, setLoggedUser } =
    useContext(GeneralContext);
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const confirm = useConfirm();
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const handleLogout = async () => {
    const isConfirmed = await confirm("¿Seguro que quieres cerrar sesión?");

    if (!isConfirmed) return;

    logout()
      .then((response) => {
        if (response.status === 200) {
          setIsLoggedIn(false);
          setLoggedUser("");
          window.location.href = "/";
        }
      })
      .catch((error) => {
        errorToastifyAlert("Error al cerrar sesión: ", error);
      });
  };

  useEffect(() => {
    if (isLoggedIn) {
      setOptions(adminOptions);
    } else {
      setOptions(userOptions);
    }
  }, [isLoggedIn]);

  const burguerMenuProps = {
    toggleDrawer,
    options,
    open,
    handleLogout,
    isLoggedIn,
  };

  return <BurguerMenu {...burguerMenuProps} />;
};
