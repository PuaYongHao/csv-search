import { SnackbarProvider } from "notistack";
import "./App.css";
import HomePage from "./pages/HomePage";
import ProcessingSnackbarComponent from "./components/ProcessingSnackbar";
import { Container } from "@mui/material";

function App() {
  return (
    <>
      <SnackbarProvider
        autoHideDuration={3000}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        maxSnack={5}
        preventDuplicate
        Components={{
          processing: ProcessingSnackbarComponent,
        }}
      />
      <Container
        component="main"
        fixed
        disableGutters
        sx={{ height: "100%", maxWidth: "unset !important" }}
      >
        <HomePage />
      </Container>
    </>
  );
}

export default App;
