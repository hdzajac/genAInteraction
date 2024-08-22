import React from "react";
import { styled } from "@mui/system";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { Link } from "react-router-dom";
import HomePageContent from "./Pages/HomePageContent";
import AboutPageContent from "./Pages/AboutPageContent";
import ContactPageContent from "./Pages/ContactPageContent";
import { Grid } from "@mui/material";

const Footer = styled("footer")`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background-color: black;
`;

const Navigation = styled("nav")`
  flex-grow: 1;
`;

const NavigationList = styled("ul")`
  display: flex;
  justify-content: center;
  list-style: none;
  padding: 0;
  margin: 0;
`;

const NavigationItem = styled("li")`
  margin: 0 10px;
`;

const NavigationLink = ({ to, children }) => {
  return <Link to={to}>{children}</Link>;
};

const PageTemplate = ({ activePage }) => {
  const getPageContent = () => {
    switch (activePage) {
      case "about":
        return <AboutPageContent />;
      case "contact":
        return <ContactPageContent />;
      default:
        return <HomePageContent />;
    }
  };

  return (
    <Grid
      container
      direction="column"
      justifyContent="space-between"
      alignItems="stretch"
      minHeight="100vh"
      spacing={0}
    >
      <AppBar position="static">
        <Toolbar
          style={{ backgroundColor: "black", border: "1px solid #FF00FF" }}
        >
          <Navigation>
            <NavigationList>
              <NavigationItem>
                <NavigationLink to="/">Home</NavigationLink>
              </NavigationItem>
              <NavigationItem>
                <NavigationLink to="/about"> About</NavigationLink>
              </NavigationItem>
              <NavigationItem>
                <NavigationLink to="/contact">Contact Me</NavigationLink>
              </NavigationItem>
            </NavigationList>
          </Navigation>
        </Toolbar>
      </AppBar>
      <Grid item flexGrow={1}>
        {getPageContent()}
      </Grid>
      <Grid item>
        <Footer>hdz@di.ku.dk</Footer>
      </Grid>
    </Grid>
  );
};

export default PageTemplate;
