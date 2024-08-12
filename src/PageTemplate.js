import React from 'react';
import { styled } from '@mui/system';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { Link } from 'react-router-dom';
import ContentTemplate from './ContentTemplate';
import HomePageContent from './Pages/HomePageContent';
import AboutPageContent from './Pages/AboutPageContent';
import ContactPageContent from './Pages/ContactPageContent';

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

const HomePage = () => {
  return(
    <MainContent>
      <ContentTemplate page="Welcome Home">
        <HomePageContent/>
      </ContentTemplate>
    </MainContent>
  )
}


const AboutPage = () => {
  return (
    <MainContent>
    <ContentTemplate page="About">
      <AboutPageContent />
    </ContentTemplate>
    </MainContent>

  );
};


const ContactPage = () => {
  return (
    <MainContent>
      <ContentTemplate page="Contact">
        <ContactPageContent />
      </ContentTemplate>
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
        return <HomePage />;
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
