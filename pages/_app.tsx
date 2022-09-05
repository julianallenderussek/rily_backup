import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/layout";
import { GTMProvider } from "@elgorditosalsero/react-gtm-hook";
import { ThemeProvider } from "styled-components";
import { theme } from "@rily/components";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <GTMProvider state={{ id: "GTM-52T9PL3" }}>
      <ThemeProvider theme={theme}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </GTMProvider>
  );
}

export default MyApp;
