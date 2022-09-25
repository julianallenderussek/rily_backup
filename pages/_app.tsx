import type { AppProps } from "next/app";
import Layout from "../components/layout";
import { GTMProvider } from "@elgorditosalsero/react-gtm-hook";
import { ThemeProvider } from "styled-components";
import { theme } from "@rily/components";
import { Fragment } from "react";
import { GlobalStyle } from "../styles/globaStyles";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Fragment>
      <GlobalStyle />
      <GTMProvider state={{ id: "GTM-52T9PL3" }}>
        <ThemeProvider theme={theme}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ThemeProvider>
      </GTMProvider>
    </Fragment>
  );
}

export default MyApp;
