import { Box, Button } from "@mui/material";
import "../../../../../assets/css/generalStyles.css";
import "./brandsList.css";
import { BackButtonContainer } from "../../../../common/backButton/BackButtonContainer";
import { generalBackGroundColor } from "../../../../../utils/helpers";
import { GeneralBarContainer } from "../../../../layouts/generalBar/GeneralBarContainer";
import { PaginationContainer } from "../../../../common/pagination/PaginationContainer";

export const BrandsList = (brandsListProps) => {
  const { brands, handleUpdateBrand, ...generalBarContainerProps } =
    brandsListProps;

  return (
    <Box className="generalContainer">
      <Box className="generalTitle">Marcas</Box>
      <GeneralBarContainer {...generalBarContainerProps} />
      <Box className="generalSubTitle">{brands.length} marcas encontradas</Box>
      <PaginationContainer items={brands} itemsPerPage={15}>
        {(recordsToShow) => (
          <Box className="generalList" sx={{ marginBottom: "20px" }}>
            {recordsToShow.map((brand) => {
              return (
                <Button
                  onClick={() => handleUpdateBrand(brand.id)}
                  className="brandsCard"
                  key={brand.id}
                  variant="outlined"
                  sx={{
                    textTransform: "none",
                    color: "black",
                    border: "1px solid black",
                    backgroundColor: "white",
                    borderRadius: "45px",
                    "&:active": {
                      backgroundColor: generalBackGroundColor,
                      color: "white",
                      border: `1px solid ${generalBackGroundColor}`,
                    },
                  }}
                >
                  {brand.name}
                </Button>
              );
            })}
          </Box>
        )}
      </PaginationContainer>
      <BackButtonContainer />
    </Box>
  );
};
