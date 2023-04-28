import { theme } from "./styles/Theme";
import { ThemeProvider } from "styled-components";
import Header from "./components/Header";
import BgColor from "./components/BgColor";
import { Layout } from "antd";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Layout>
        <Header />
        <BgColor />
      </Layout>
    </ThemeProvider>
  );
}

export default App;
