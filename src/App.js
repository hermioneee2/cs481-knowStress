import React, { useEffect } from "react";
import { theme } from "./styles/Theme";
import { ThemeProvider } from "styled-components";
import { Layout } from "antd";
import { Route, Routes, BrowserRouter, useNavigate } from "react-router-dom";

import Header from "./components/Header";
import MyStressPattern from "./routes/MyStressPattern";
import MeAndOthers from "./routes/MeAndOthers";

function App() {
  const RedirectComponent = () => {
    const navigate = useNavigate();

    useEffect(() => {
      navigate("/cs481-knowStress", { replace: true });
    }, [navigate]);

    return null;
  };

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Layout>
          <Header />
          <Routes>
            <Route path="/" element={<RedirectComponent />} />
            <Route path="/cs481-knowStress" element={<MyStressPattern />} />
            <Route
              path="/cs481-knowStress/meAndOthers"
              element={<MeAndOthers />}
            />
          </Routes>
        </Layout>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
