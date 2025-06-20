import {
  Box,
  IconButton,
  InputAdornment,
  TextField,
  Tooltip,
  Drawer,
  Typography,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";

import { useState } from "react";
import { Icons } from "../../../../../assets/Icons";
import "../../generalBar.css";
import { generalBackGroundColor } from "../../../../../utils/helpers";
import { FilterSelect } from "./filterSelect/FilterSelectContainer";

export const SearchFilterBar = ({
  activeBar,
  setActiveBar,
  handleSearchChange,
  searchQuery,
  sortOption,
  handleSortChange,
  SORT_OPTIONS,
  FILTER_CONFIGS,
  handleFilterChange,
  enableEditionBar,
}) => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <Box
        className={`searchBar ${
          activeBar === "searchBar" ? "showedSearchBar" : "hiddenSearchBar"
        }`}
        sx={{ backgroundColor: "black", p: 2, m: 0 }}
      >
        <TextField
          placeholder="Buscar..."
          value={searchQuery}
          onChange={handleSearchChange}
          variant="outlined"
          size="small"
          sx={{
            maxWidth: "250px",
            width: "50%",
            borderColor: "white",

            "& .MuiInputBase-root": {
              height: 35,
              borderRadius: 20,
              backgroundColor: "black",
              color: "white",
            },
            "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "white",
            },

            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "white", // borde blanco siempre
            },
            "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
              {
                borderColor: "white",
                color: "white",
              },
            "& .MuiInputBase-input::placeholder": {
              borderColor: "white",
              color: "white",
            },
            "& .MuiSvgIcon-root": {
              color: "white", // ícono de búsqueda
              borderColor: "white",
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Icons.SearchIcon fontSize="small" />
              </InputAdornment>
            ),
          }}
        />

        <Tooltip title="Filtros" placement="top-end" arrow>
          <IconButton
            sx={{ color: "white" }}
            onClick={() => setDrawerOpen(true)}
            size="small"
          >
            <Icons.FilterListIcon />
          </IconButton>
        </Tooltip>

        {enableEditionBar && (
          <Tooltip title="Barra edición" placement="top-end" arrow>
            <IconButton
              sx={{ color: "white" }}
              onClick={() => setActiveBar("editionBar")}
              size="small"
            >
              <Icons.EditIcon />
            </IconButton>
          </Tooltip>
        )}
      </Box>

      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        sx={{
          "& .MuiDrawer-paper": {
            backgroundColor: generalBackGroundColor,
            color: "white",
          },
        }}
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "flex-start",
            px: 2,
            pt: 2,
          }}
        >
          <Tooltip title="Cerrar" placement="top-start" arrow>
            <IconButton onClick={() => setDrawerOpen(false)}>
              <Icons.CloseIcon sx={{ color: "white" }} />
            </IconButton>
          </Tooltip>
        </Box>

        <Box sx={{ width: 300, p: 1 }}>
          {FILTER_CONFIGS.length > 0 && (
            <Typography
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 1,
                color: "black",
                margin: "10px 0",
              }}
            >
              <Icons.FilterListIcon fontSize="small" /> Filtrar por
            </Typography>
          )}

          {FILTER_CONFIGS.map((config) => (
            <FilterSelect
              key={config.name}
              label={config.label}
              name={config.name}
              value={config.value}
              onChange={handleFilterChange}
              options={config.options}
              placeholder={config.placeholder}
              sx={{ borderRadius: 20 }}
            />
          ))}
          <FormControl fullWidth>
            <Typography
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 1,
                color: "black",
                margin: "10px 0",
              }}
            >
              <Icons.SortIcon fontSize="small" /> Ordenar por
            </Typography>

            <RadioGroup
              sx={{ ml: 4 }}
              value={sortOption}
              onChange={handleSortChange}
            >
              {SORT_OPTIONS.map((option) => (
                <FormControlLabel
                  key={option.value}
                  value={option.value}
                  sx={{ color: "black" }}
                  control={
                    <Radio
                      sx={{
                        color: "black",
                        "&.Mui-checked": {
                          color: "white",
                        },
                      }}
                    />
                  }
                  label={option.label}
                />
              ))}
            </RadioGroup>
          </FormControl>
        </Box>
      </Drawer>
    </>
  );
};
