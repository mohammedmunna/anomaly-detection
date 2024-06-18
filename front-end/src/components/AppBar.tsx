import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  marginBottom: "2rem",
}));

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  justifyContent: "space-between",
}));

// renders an AppBar with the title
const AppBarComponent: React.FC = () => {
  return (
    <StyledAppBar position="static">
      <StyledToolbar>
        <Typography variant="h6" component="div">
          Innovative Company
        </Typography>
      </StyledToolbar>
    </StyledAppBar>
  );
};

export default AppBarComponent;
