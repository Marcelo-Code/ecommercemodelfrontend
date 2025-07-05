import { Box, Button } from "@mui/material";
import "../../../../../assets/css/generalStyles.css";
import "./colorsList.css";
import { BackButtonContainer } from "../../../../common/backButton/BackButtonContainer";
import { generalBackGroundColor } from "../../../../../utils/helpers";
import { GeneralBarContainer } from "../../../../layouts/generalBar/GeneralBarContainer";
import { PaginationContainer } from "../../../../common/pagination/PaginationContainer";

export const ColorsList = (colorsListProps) => {
  const { colors, handleUpdateColor, ...generalBarContainerProps } =
    colorsListProps;

  return (
    <Box className="generalContainer">
      <Box className="generalTitle">Colores</Box>
      <GeneralBarContainer {...generalBarContainerProps} />
      <Box className="generalSubTitle">{colors.length} colores encontrados</Box>
      <PaginationContainer items={colors} itemsPerPage={15}>
        {(recordsToShow) => (
          <Box className="generalList" sx={{ marginBottom: "20px" }}>
            {recordsToShow.map((brand) => {
              return (
                <Button
                  onClick={() => handleUpdateColor(brand.id)}
                  className="colorsCard"
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
