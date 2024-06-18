import React from "react";
import { Container, CssBaseline, ThemeProvider } from "@mui/material";
import AppBarComponent from "./components/AppBar";
import DataTable from "./components/DataTable";
import Theme from "./Theme";

const App: React.FC = () => {
  return (
    <ThemeProvider theme={Theme}>
      <CssBaseline />
      <AppBarComponent />
      <Container sx={{ marginTop: 4 }}>
        <DataTable />
      </Container>
    </ThemeProvider>
  );
};

export default App;
