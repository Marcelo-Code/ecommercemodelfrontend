import { Box } from "@mui/material";
import "../../../../../assets/css/generalStyles.css";
import { CustomTabsContainer } from "../../../../common/customsTabs/CustomTabsContainer";

export const Tabs = ({ tabs }) => {
  return (
    <Box className="generalContainer">
      <CustomTabsContainer tabs={tabs} />
    </Box>
  );
};
