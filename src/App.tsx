import { Suspense } from "react";
import { useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { ThemeProvider as MuiTheme } from "@mui/material/styles";
import Loading from "./components/Loading";
import { AppState } from "./redux/store";
import { lightTheme, darkTheme } from "./theme/theme";
import RootRoutes from "./routes/RootRoutes";
import { ToastContainer } from "react-toastify";
import Header from "./components/common/Header";
import { GlobalStyle } from "./components/GlobalStyles";
import "react-toastify/dist/ReactToastify.css";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe("pk_test_kvaWWuoOUKU8FfTgtn5U2LVC00If7nyUo0");

function App() {
  const { theme } = useSelector((state: AppState) => state);
  return (
    <Suspense fallback={<Loading />}>
      <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
        <MuiTheme theme={theme === "light" ? lightTheme : darkTheme}>
          <Elements stripe={stripePromise}>
            <GlobalStyle />
            <Header />

            <Routes>


              {RootRoutes.routes.map((route, Index) => (
                <Route
                  path={route.path}
                  element={route.component}
                  key={Index}
                />
              ))}
            </Routes>
            <ToastContainer autoClose={3000} />
          </Elements>
        </MuiTheme>
      </ThemeProvider>
    </Suspense>
  );
}

export default App;
