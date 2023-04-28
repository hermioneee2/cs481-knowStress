import { theme } from "./styles/Theme";
import { ThemeProvider } from "styled-components";
import { Layout } from "antd";
import { Route, Routes, BrowserRouter } from "react-router-dom";

import Header from "./components/Header";
import MyStressPattern from "./routes/MyStressPattern";
import MeAndOthers from "./routes/MeAndOthers";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Layout>
          <Header />
          <Routes>
            <Route exact path="/" element={<MyStressPattern />} />
            <Route path="/meAndOthers" element={<MeAndOthers />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
