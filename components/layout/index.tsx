import React, { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { NavigationBar } from "@rily/components";
import Footer from "./Footer";
import { LogoProps } from "@rily/components/lib/src/components/atoms/Logo/Logo";
import { NavigationBarProps } from "@rily/components/lib/src/components/organisms/NavigationBar/NavigationBar";

interface Props {
  children: ReactNode;
}

const Layout: React.FC<Props> = ({ children }) => {
  const [color, setColor] = useState<LogoProps["color"]>("yellow");
  const [shouldOverlay, setShouldOverlay] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const [navLinks, setNavLinks] = useState<NavigationBarProps["links"]>(
    [
      { url: "/", content: "Recipes" },
      { url: "/articles", content: "Articles" },
      { url: "/about_us", content: "About Us" },
    ].filter((a) => a)
  );
  const location = useRouter();

  // Control Navigation styling per route
  // TODO: clean up this logic
  useEffect(() => {
    const isHomePage = location.pathname === "/";
    const isRecipePage = location.pathname.includes("recipes");
    const isAuthorPage = location.pathname.includes("author");
    const isAboutUsPage = location.pathname.includes("about_us");

    if (isHomePage) {
      setColor("white");
      setShouldOverlay(true);
      setIsDark(false);
    } else if (isAuthorPage || isAboutUsPage) {
      setColor("yellow");
      setShouldOverlay(true);
      setIsDark(true);
    } else if (isRecipePage) {
      setColor("yellow");
      setShouldOverlay(false);
      setIsDark(true);
    } else {
      setColor("yellow");
      setShouldOverlay(false);
      setIsDark(true);
    }

    // const underlinedLinks = navLinks
    //   .map(link => ({
    //     ...link,
    //     underlined:
    //       (isHomePage && link.content === "Recipes") ||
    //       (isArticlePage && link.content === "Articles") ||
    //       (isAboutUsPage && link.content === "About Us"),
    //   }))
    //   .filter(a => a)

    // setNavLinks(underlinedLinks)
  }, [location]);

  return (
    <>
      <NavigationBar
        overlay={shouldOverlay}
        logoLink="/"
        links={navLinks}
        color={color}
        dark={isDark}
      />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
