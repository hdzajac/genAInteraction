import React from 'react';
import { styled } from '@mui/system';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import ContentTemplate from './ContentTemplate';

const Container = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: black;
  color: white;
`;

const MainContent = styled('div')`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Footer = styled('footer')`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background-color: black;
`;

const Navigation = styled('nav')`
  flex-grow: 1;
`;

const NavigationList = styled('ul')`
  display: flex;
  justify-content: center;
  list-style: none;
  padding: 0;
  margin: 0;
`;

const NavigationItem = styled('li')`
  margin: 0 10px;
`;

const NavigationLink = ({ to, children }) => {
  return (
    <Link to={to}>
      {children}
    </Link>
  );
};


const AboutPage = () => {
  return (
    <MainContent>
    <ContentTemplate page="Hubert D. Zając">
      <Typography variant="h3">About Page</Typography>
      {/* Add your content for the About page */}
    </ContentTemplate>
    </MainContent>

  );
};


const ContactPage = () => {
  return (
    <MainContent>
      <Typography variant="h3">Contact Me Page</Typography>
      {/* Add your content for the Contact Me page */}
    </MainContent>
  );
};

const PageTemplate = ({ activePage }) => {
  const getPageContent = () => {
    switch (activePage) {
      case 'about':
        return <AboutPage />;
      case 'contact':
        return <ContactPage />;
      default:
        return <MainContent>{/* Add your default content here */}</MainContent>;
    }
  };

  return (
       <Container>
      <AppBar position="static">
        <Toolbar style={{backgroundColor:'black', border: '1px solid #FF00FF'}}>
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
      {getPageContent()}
      <Footer>
        hdz@di.ku.dk
      </Footer>
    </Container>
  );
};

export default PageTemplate;
