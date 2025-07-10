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

export const ProductVariantsList = (productVariantsListProps) => {
  const { products, handleUpdate, generalBarContainerProps } =
    productVariantsListProps;

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
              <IconButton onClick={() => handleUpdate(params.row.id)}>
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
    <Box className="generalContainer">
      {/* <Box className="generalList" sx={{ alignItems: "stretch" }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="center">Edición</StyledTableCell>
                <StyledTableCell align="center">Color</StyledTableCell>
                <StyledTableCell align="center"></StyledTableCell>
                <StyledTableCell align="center">Talle</StyledTableCell>
                <StyledTableCell align="center">Stock</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((product) => (
                <StyledTableRow key={product.id}>
                  <StyledTableCell component="th" scope="row">
                    <Tooltip title="Editar producto">
                      <IconButton
                        color="primary"
                        //   onClick={() => handleUpdateProduct(product.id)}
                      >
                        <Icons.EditIcon
                          sx={{ fontSize: "30px", color: "gray" }}
                        />
                      </IconButton>
                    </Tooltip>
                  </StyledTableCell>
                  <StyledTableCell component="th" scope="row" align="center">
                    {product.colors.name}
                  </StyledTableCell>
                  <StyledTableCell component="th" scope="row" align="center">
                    <Box
                      sx={{
                        width: "30px",
                        height: "30px",
                        borderRadius: "50%",
                        backgroundColor: product.colors.code,
                      }}
                    />
                  </StyledTableCell>
                  <StyledTableCell align="center" component="th" scope="row">
                    {product.sizes.name}
                  </StyledTableCell>
                  <StyledTableCell component="th" scope="row">
                    {product.stock}
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box> */}
      <GeneralBarContainer {...generalBarContainerProps} />
      <Box className="generalSubTitle">{products.length} variantes</Box>

      <Paper
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
      </Paper>
    </Box>
  );
};
