import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import { theme } from "@rily/components";

// Use this block to switch full website background color based on conditons
let isArticleListingPage = false;
if (typeof window !== "undefined") {
  isArticleListingPage =
    window.location?.pathname === "/articles/" ||
    window.location?.pathname === "/articles" ||
    window.location?.pathname === "/articles/all/" ||
    window.location?.pathname === "/articles/all";
}

const backgroundColor = isArticleListingPage
  ? theme.colors.floralWhite
  : theme.colors.white;

export const GlobalStyle = createGlobalStyle`
    ${reset}

    html {
        background-color: ${backgroundColor};
    }

    @font-face {
        font-family: 'Tiempos Fine';
        src: url('https://res.cloudinary.com/heat-supply/raw/upload/v1616856213/fonts/tiempos_fine/tiempos-fine-web-regular_a2jt0i.eot');
        src: url('https://res.cloudinary.com/heat-supply/raw/upload/v1616856213/fonts/tiempos_fine/tiempos-fine-web-regular_a2jt0i.eot?#iefix') format('embedded-opentype'),
            url('https://res.cloudinary.com/heat-supply/raw/upload/v1616856213/fonts/tiempos_fine/tiempos-fine-web-regular_ymtebi.woff2') format('woff2'),
            url('https://res.cloudinary.com/heat-supply/raw/upload/v1616856213/fonts/tiempos_fine/tiempos-fine-web-regular_rfsmgw.woff') format('woff');
        font-weight: normal;
        font-style: normal;
        font-display: swap;
    }

    @font-face {
        font-family: 'Neue Haas Grotesk Display';
        src: url('https://res.cloudinary.com/heat-supply/raw/upload/v1616856597/fonts/neue_haas_grotesk/Linotype_-_NHaasGroteskTXPro-55Rg_zpzxcf.otf') format("opentype");
        font-weight: normal;
        font-style: normal;
        font-display: swap;
    }
`;
