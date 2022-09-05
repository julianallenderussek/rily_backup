import React, { useState } from "react";
import styled, { css } from "styled-components";
import Link from "next/link";
import { Logo } from "@rily/components";

const FooterContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.yellow};
  width: 100%;
  padding: 10px 0px; // need top and bottom padding to fill container
`;

// TODO: move this to the LOGO component in comp lib when we build out footer
const LogoContainer = styled.a`
  width: 166px;
  margin: 10px 0px;
`;

const FooterContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 20px;
  width: calc(100% - 40px);
  @media (min-width: 768px) {
    margin: 30px 50px 30px 50px;
    align-items: flex-start;
    width: 60%;
  }
`;

const LinkContainer = styled.div`
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  font-size: 14px;
  @media (min-width: 768px) {
    display: flex;
  }
`;

const LinkCol = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const baseLinkStyles = css`
  color: ${({ theme }) => theme.colors.black};
  font-family: ${({ theme }) => theme.fonts.neueHaasGrotesk};
  margin-bottom: 20px;
  text-decoration: none;
  :hover {
    text-decoration: underline;
  }
`;

const LinkItem = styled(Link)`
  ${baseLinkStyles}
`;

const ExternalLinkItem = styled.div`
  ${baseLinkStyles}
  a {
    text-decoration: none;
    color: ${({ theme }) => theme.colors.black};
  }
`;

const SubscribeContainer = styled.div`
  display: flex;
  flex-direction: column;
  font-family: ${({ theme }) => theme.fonts.neueHaasGrotesk};
`;

const SubscribeTitle = styled.span`
  margin-bottom: 10px;
`;

const SubscribeForm = styled.form`
  align-items: center;
  display: flex;
`;

const SubscribeInput = styled.input`
  height: 37px;
  width: 150px;
  left: 0px;
  top: 0px;
  border-radius: 0px;
  border: none;
  padding-left: 15px;
  ::placeholder {
    font-family: ${({ theme }) => theme.fonts.neueHaasGrotesk};
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 16px;
    letter-spacing: 0.03em;
    text-align: left;
    color: ${({ theme }) => theme.colors.black};
  }
  @media (min-width: 768px) {
    width: 205px;
  }
`;

const SubscribeButton = styled.button`
  height: 37px;
  width: 103px;
  left: 0px;
  top: 0px;
  border-radius: 0px;
  background: ${({ theme }) => theme.colors.green};
  border: none;
  margin-left: 10px;
  color: ${({ theme }) => theme.colors.white};
`;

const SubscribeTOS = styled.p`
  max-width: 318px;
  font-family: ${({ theme }) => theme.fonts.neueHaasGrotesk};
  font-size: 10px;
  font-style: normal;
  font-weight: 500;
  line-height: 11px;
  letter-spacing: 0.03em;
  text-align: left;
  margin-top: 16px;
  @media (min-width: 768px) {
    max-width: 318px;
  }
`;

const Flex = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 100%;
  margin-bottom: 20px;
`;

const InternalLinkCol = () => (
  <LinkCol>
    <LinkItem href="/">Recipes</LinkItem>
    <LinkItem href="/about_us">About Us</LinkItem>
    <LinkItem href="/terms">Terms</LinkItem>
    <LinkItem href="/privacy">privacy</LinkItem>
  </LinkCol>
);

const ExternalLinkCol = () => (
  <LinkCol>
    <ExternalLinkItem>
      <LinkItem href="https://www.instagram.com/rily.good/" target="_blank">
        Instagram
      </LinkItem>
    </ExternalLinkItem>
    <ExternalLinkItem>
      <LinkItem
        href="https://www.youtube.com/channel/UCsJ1wOrHzLCJZ5jtoqP1yZA/featured"
        target="_blank"
      >
        Youtube
      </LinkItem>
    </ExternalLinkItem>
    <ExternalLinkItem>
      <LinkItem href="https://www.facebook.com/rily.co" target="_blank">
        Facebook
      </LinkItem>
    </ExternalLinkItem>
  </LinkCol>
);

const Footer = () => {
  const [email, setEmail] = useState("");
  const [isSubmitSuccessful, setIsSubmitSuccessful] = useState<boolean>();

  const handleEmailSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      const headers = new Headers();
      headers.set("Content-Type", "application/json");
      const request = new Request("/api/store-email", {
        method: "POST",
        headers,
        body: JSON.stringify({ email }),
      });
      const response = await fetch("/api/store-email", request);
      if (response.ok) {
        return;
      }
      // send GA here and handle error state
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <FooterContainer>
      <FooterContent>
        <LogoContainer href="/">
          <Logo color="white" />
        </LogoContainer>
        <LinkContainer>
          <Flex>
            <InternalLinkCol />
            <ExternalLinkCol />
          </Flex>
          <SubscribeContainer>
            <SubscribeTitle>Subscribe for updates</SubscribeTitle>
            <SubscribeForm>
              <SubscribeInput
                placeholder={"Email Address"}
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              ></SubscribeInput>
              <SubscribeButton
                onClick={handleEmailSubmit}
                disabled={isSubmitSuccessful}
              >
                {isSubmitSuccessful ? "Success" : "Submit"}
              </SubscribeButton>
            </SubscribeForm>
            <SubscribeTOS>
              {
                'By clicking "submit", you’re consenting to our email newsletter with cooking content and information on products. You may withdraw your consent at any time.'
              }
            </SubscribeTOS>
          </SubscribeContainer>
        </LinkContainer>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;
