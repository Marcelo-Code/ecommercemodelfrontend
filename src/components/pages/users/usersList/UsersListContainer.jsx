import { useEffect, useState } from "react";
import { UsersList } from "./UsersList";
import { LoadingContainer } from "../../loading/LoadingContainer";
import { useNavigate } from "react-router-dom";
import { getUsers } from "../../../../services/api/users";
import { Icons } from "../../../../assets/Icons";
import { ErrorContainer } from "../../error/ErrorContainer";

export const UsersListContainer = () => {
  //hook para el array de pacientes
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);

  const [error, setError] = useState(null);

  //hook para el loading
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  //Función para restaurar un usuario
  const handleUpdateUser = (userId) => {
    navigate(`/updateUsers/updateUser/${userId}`);
  };

  //Obtener usuarios
  useEffect(() => {
    setIsLoading(true);
    getUsers()
      .then((response) => {
        setUsers(response.data);
        setFilteredUsers(response.data);
      })
      .catch((error) => setError(error))
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  if (error) return <ErrorContainer error={error} />;
  if (isLoading) return <LoadingContainer />;

  const generalBarContainerProps = {
    enableSearchFilterBar: false,
    buttonText: "Usuario",
    buttonIcon: <Icons.AddIcon />,
    initialActiveBar: "editionBar",
    to: "/users/createUser",
    records: users,
    setFilteredRecords: setFilteredUsers,
  };

  const usersListProps = {
    users,
    handleUpdateUser,
    ...generalBarContainerProps,
  };

  return <UsersList {...usersListProps} />;
};
