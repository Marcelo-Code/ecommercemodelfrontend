import {
  Box,
  IconButton,
  Tooltip,
  Typography,
  Chip,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  styled,
  TableBody,
} from "@mui/material";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { DataGrid } from "@mui/x-data-grid";

import "../../../../../assets/css/generalStyles.css";
import { Icons } from "../../../../../assets/Icons";
import { generalBackGroundColor } from "../../../../../utils/helpers";
import { GeneralBarContainer } from "../../../../layouts/generalBar/GeneralBarContainer";
import { BackButtonContainer } from "../../../../common/backButton/BackButtonContainer";

export const ProductVariantsList = (productVariantsListProps) => {
  const {
    products,
    handleUpdateProductVariant,
    handleDeleteProductVariant,
    generalBarContainerProps,
  } = productVariantsListProps;

  const StyledTableCell = styled(TableCell)(() => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: generalBackGroundColor,
      color: "black",
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 15,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    {
      field: "edition",
      headerName: "Edición",
      width: 130,
      sortable: false,
      renderCell: (params) => {
        return (
          <Box>
            <Tooltip title="Eliminar" placement="top-end" arrow>
              <IconButton>
                <Icons.DeleteIcon sx={{ fontSize: "30px", color: "red" }} />
              </IconButton>
            </Tooltip>
            <Tooltip title="Editar" placement="top-end" arrow>
              <IconButton
                onClick={() => handleUpdateProductVariant(params.row.id)}
              >
                <Icons.EditIcon sx={{ fontSize: "30px", color: "gray" }} />
              </IconButton>
            </Tooltip>
          </Box>
        );
      },
    },
    {
      field: "color",
      headerName: "Color",
      width: 150,
      valueGetter: (value, row) => row.colors.name || "",
      renderCell: (params) => {
        return (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              height: "100%",
            }}
          >
            <Icons.CircleIcon
              sx={{ fontSize: "30px", color: `${params.row.colors.code}` }}
            />
            <Typography>{params.row.colors.name}</Typography>
          </Box>
        );
      },
    },
    {
      field: "size",
      headerName: "Talle",
      width: 80,
      type: "number",
      valueGetter: (value, row) => row.sizes.name || "",
    },
    { field: "stock", headerName: "Stock", width: 90 },
  ];

  const paginationModel = { page: 0, pageSize: 5 };

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        pb: 2,
        pt: 2,
      }}
    >
      <Box className="generalTitle">Variantes</Box>

      <GeneralBarContainer {...generalBarContainerProps} />

      <Box className="generalSubTitle">{products.length} variantes</Box>

      <TableContainer
        component={Paper}
        sx={{
          // width: "fit-content",
          width: "90%",
          maxWidth: "800px",
          overflowX: "auto",
          mt: 2,
          mb: 2,
        }}
      >
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">Edición</StyledTableCell>
              <StyledTableCell align="center">Color</StyledTableCell>
              <StyledTableCell align="center">Talle</StyledTableCell>
              <StyledTableCell align="center">Stock</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <StyledTableRow key={product.id}>
                <StyledTableCell align="center">
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 1,
                    }}
                  >
                    <Tooltip title="Editar" placement="top-end" arrow>
                      <IconButton
                        onClick={() => handleUpdateProductVariant(product.id)}
                      >
                        <Icons.EditIcon
                          sx={{ fontSize: "30px", color: "gray" }}
                        />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Eliminar" placement="top-end" arrow>
                      <IconButton>
                        <Icons.DeleteIcon
                          sx={{ fontSize: "30px", color: "red" }}
                          onClick={() => handleDeleteProductVariant(product.id)}
                        />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </StyledTableCell>
                <StyledTableCell
                  align="left"
                  sx={{
                    p: 2,
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Icons.CircleIcon
                      sx={{
                        fontSize: 20,
                        color: product?.colors?.code,
                      }}
                    />

                    {product?.colors?.name}
                  </Box>
                </StyledTableCell>

                <StyledTableCell align="center" sx={{ p: 1 }}>
                  {product?.sizes?.name}
                </StyledTableCell>
                <StyledTableCell align="center" sx={{ p: 1 }}>
                  {product?.stock}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* <Paper
        sx={{
          height: "auto",
          width: "fit-content",
          overflow: "auto",
          margin: "auto",
          backgroundColor: "#e0e0e0",
          marginTop: "20px",
        }}
      >
        <DataGrid
          rows={products}
          columns={columns}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[5, 10]}
          // sx={{
          //   border: 0,
          //   textAlign: "center",
          //   "& .MuiDataGrid-columnHeaders": {
          //     backgroundColor: "#e0e0e0",
          //   },
          //   "& .MuiDataGrid-columnHeader": {
          //     justifyContent: "center", // Centra horizontalmente el contenido
          //   },
          //   "& .MuiDataGrid-columnHeaderTitle": {
          //     textAlign: "center", // Centra el texto
          //     width: "100%", // Hace que el texto use todo el espacio
          //   },
          // }}
        />
      </Paper> */}
      <BackButtonContainer />
    </Box>
  );
};
