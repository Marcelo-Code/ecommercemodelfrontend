import { GeneralBarContainer } from "../../../layouts/generalBar/GeneralBarContainer";
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
import "../../../../assets/css/generalStyles.css";
import { Icons } from "../../../../assets/Icons";
import { currencyFormat } from "../../../common/currencyFormat/CurrencyFormatContainer";
import { PaginationContainer } from "../../../common/pagination/PaginationContainer";
import { generalBackGroundColor } from "../../../../utils/helpers";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";

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

export const ProductsListUpdateMode = ({
  products,
  handleUpdateProduct,
  ...generalBarContainerProps
}) => {
  return (
    <Box className="generalContainer">
      <Typography variant="h5" className="generalTitle">
        Edición de productos
      </Typography>

      <GeneralBarContainer {...generalBarContainerProps} />

      <Typography variant="subtitle1" className="generalSubTitle">
        {`${products.length} productos disponibles`}
      </Typography>

      <PaginationContainer items={products} itemsPerPage={10}>
        {(recordsToShow) => (
          <Box className="generalList" sx={{ alignItems: "stretch" }}>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell align="center">Edición</StyledTableCell>
                    <StyledTableCell align="center">Estado</StyledTableCell>
                    <StyledTableCell align="center">Imagen</StyledTableCell>
                    <StyledTableCell align="center" sx={{ minWidth: 200 }}>
                      Descripción
                    </StyledTableCell>
                    <StyledTableCell align="center" sx={{ minWidth: 200 }}>
                      Oferta
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      Precio anterior
                    </StyledTableCell>
                    <StyledTableCell align="center">Precio</StyledTableCell>
                    <StyledTableCell align="center">Código </StyledTableCell>
                    <StyledTableCell align="center">Marca </StyledTableCell>
                    <StyledTableCell align="center">Categorías</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {recordsToShow.map((product) => (
                    <StyledTableRow key={product.id}>
                      <StyledTableCell component="th" scope="row">
                        <Tooltip title="Editar producto">
                          <IconButton
                            color="primary"
                            onClick={() => handleUpdateProduct(product.id)}
                          >
                            <Icons.EditIcon
                              sx={{ fontSize: "30px", color: "gray" }}
                            />
                          </IconButton>
                        </Tooltip>
                      </StyledTableCell>
                      <StyledTableCell
                        component="th"
                        scope="row"
                        align="center"
                      >
                        {product.active ? (
                          <Chip
                            label="ACTIVO"
                            size="small"
                            sx={{
                              fontSize: "0.75rem",
                              backgroundColor: "white",
                              border: "1px solid black",
                            }}
                          />
                        ) : (
                          <Chip
                            label="INACTIVO"
                            color="error"
                            size="small"
                            sx={{ fontSize: "0.75rem" }}
                          />
                        )}
                      </StyledTableCell>
                      <StyledTableCell
                        align="center"
                        component="th"
                        scope="row"
                      >
                        <img
                          src={
                            product.image1
                              ? `${product.image1}?t=${Date.now()}`
                              : "/images/logo2.png"
                          }
                          alt={product.description || "Producto"}
                          style={{ width: "70px", height: "auto" }}
                        />
                      </StyledTableCell>
                      <StyledTableCell component="th" scope="row">
                        {product.description}
                      </StyledTableCell>
                      <StyledTableCell component="th" scope="row">
                        {product.special_offer}
                      </StyledTableCell>
                      <StyledTableCell
                        align="right"
                        sx={{ textWrap: "nowrap" }}
                      >
                        {currencyFormat(product.previous_price)}
                      </StyledTableCell>
                      <StyledTableCell
                        align="right"
                        sx={{ textWrap: "nowrap" }}
                      >
                        {currencyFormat(product.price)}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {product.id}
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {product.brands.name}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {product.products_categories.map((category) => (
                          <Chip
                            key={category.categories.name}
                            label={category.categories.name}
                            size="small"
                            sx={{
                              margin: "2px",
                              backgroundColor: generalBackGroundColor,
                            }}
                          />
                        ))}
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        )}
      </PaginationContainer>
    </Box>
  );
};
