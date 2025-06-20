import { Stack, Pagination as MuiPagination, Box } from "@mui/material";
import React from "react";
import { buttonColor, generalBackGroundColor } from "../../../utils/helpers";

export const CustomPagination = ({
  totalPages,
  page,
  handleChangePage,
  currentItems,
  children,
}) => {
  return (
    <Stack spacing={2}>
      {/* Paginador arriba */}
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          paddingTop: "10px",
          paddingBotton: "10px",
        }}
      >
        <MuiPagination
          count={totalPages}
          page={page}
          onChange={handleChangePage}
          variant="contained"
          color="primary"
          // siblingCount={1}
          boundaryCount={1}
          sx={{
            "& .MuiPaginationItem-root": {
              marginX: "1px", // ajustá este valor según el espaciado que querés
              color: "white", // color del número
            },
            "& .Mui-selected": {
              // color: generalBackGroundColor,
              // backgroundColor: "white",
              border: `1px solid white`,
              "&:hover": {
                backgroundColor: "#333",
              },
            },
          }}
        />
      </Box>

      {/* Renderizado de ítems de la página actual */}
      {children(currentItems)}

      {/* Paginador abajo */}
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          paddingTop: "10px",
          paddingBotton: "10px",
        }}
      >
        <MuiPagination
          count={totalPages}
          page={page}
          onChange={handleChangePage}
          variant="contained"
          color="secondary"
          sx={{
            "& .MuiPaginationItem-root": {
              marginX: "1px", // ajustá este valor según el espaciado que querés
              color: "white", // color del número
            },
            "& .Mui-selected": {
              // color: generalBackGroundColor,
              // backgroundColor: "white",
              border: `1px solid white`,
              "&:hover": {
                backgroundColor: "#333",
              },
            },
          }}
        />
      </Box>
    </Stack>
  );
};
