import {
  Box,
  Card,
  CardActions,
  CardContent,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import "../../../../assets/css/generalStyles.css";
import "./usersList.css";
import { Icons } from "../../../../assets/Icons";
import { BackButtonContainer } from "../../../../components/common/backButton/BackButtonContainer";
import { GeneralBarContainer } from "../../../../components/layouts/generalBar/GeneralBarContainer";
import { normalizeName } from "../../../../utils/helpers";

export const UsersList = (usersListProps) => {
  const { users, handleUpdateUser, ...generalBarContainerProps } =
    usersListProps;

  const iconStyle = {
    color: "black",
    fontSize: "40px",
    margin: "10px",
  };

  return (
    <Box className="generalContainer">
      <Box className="generalTitle">Usuarios</Box>

      <GeneralBarContainer {...generalBarContainerProps} />

      <Box className="generalSubTitle">
        {`${users.length} registros obtenidos`}
      </Box>
      <Box className="generalList">
        {users.map((user) => {
          return (
            <Card
              key={user.id}
              sx={{
                width: 275,
                height: "auto",
              }}
              className="userCard"
            >
              <CardActions className="userCardActions">
                <Tooltip title="Editar usuario" placement="top-end" arrow>
                  <IconButton
                    onClick={() => {
                      handleUpdateUser(user.id);
                    }}
                  >
                    <Icons.EditIcon sx={{ fontSize: "30px", color: "gray" }} />
                  </IconButton>
                </Tooltip>
              </CardActions>
              <CardContent sx={{ textAlign: "center" }}>
                <Icons.AssignmentIndIcon sx={iconStyle} />
                <Typography gutterBottom variant="h6">
                  {normalizeName(user.name)} {normalizeName(user.last_name)}
                </Typography>
                <Typography gutterBottom variant="body1">
                  {user.email}
                </Typography>
                <Typography gutterBottom variant="body1">
                  {user.auth_user_id}
                </Typography>
                <Typography gutterBottom variant="h6">
                  {user.active ? "Usuario activo" : "Usuario inactivo"}
                </Typography>
              </CardContent>
            </Card>
          );
        })}
        <BackButtonContainer />
      </Box>
    </Box>
  );
};
