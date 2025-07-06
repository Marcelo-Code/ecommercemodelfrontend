import { Box, Button } from "@mui/material";
import "../../../../../assets/css/generalStyles.css";
import "./sizesList.css";
import { BackButtonContainer } from "../../../../common/backButton/BackButtonContainer";
import { generalBackGroundColor } from "../../../../../utils/helpers";
import { GeneralBarContainer } from "../../../../layouts/generalBar/GeneralBarContainer";
import { PaginationContainer } from "../../../../common/pagination/PaginationContainer";
import { Icons } from "../../../../../assets/Icons";

export const SizesList = (sizesListProps) => {
  const { sizes, handleUpdateSize, ...generalBarContainerProps } =
    sizesListProps;

  return (
    <Box className="generalContainer">
      <Box className="generalTitle">Colores</Box>
      <GeneralBarContainer {...generalBarContainerProps} />
      <Box className="generalSubTitle">{sizes.length} colores encontrados</Box>
      <PaginationContainer items={sizes} itemsPerPage={15}>
        {(recordsToShow) => (
          <Box className="generalList" sx={{ marginBottom: "20px" }}>
            {recordsToShow.map((size) => {
              return (
                <Button
                  onClick={() => handleUpdateSize(size.id)}
                  className="sizesCard"
                  key={size.id}
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
                  {size.name}
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
