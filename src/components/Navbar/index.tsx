import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import ReactGA from 'react-ga';

import GithubCorner from '../GithubCorner/index.tsx';

import DarkModeButton from '../Layout/DarkModeButton';
import useDarkMode from 'use-dark-mode';
import { createTheme, ThemeProvider } from '@mui/material';
import NavItem from './NavItem';
import { gotoPage } from '../../api/url';
import './index.scss';
import { config } from '../../../data';

const { navbarList = [] } = config;

const NavbarClass = ['navbar', 'navbar-expand-md', 'sticky-top', 'custom-navbar'];

const Navbar = () => {
  const darkMode = useDarkMode(false);

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: darkMode.value ? 'dark' : 'light',
        },
      }),
    [darkMode.value],
  );

  return (
    <nav id="m-navbar" className={`${NavbarClass.join(' ')} navbar-night`}>
      <div className="container">
        <button
          type="button"
          className="navbar-brand btn btn-default"
          onClick={() => {
            ReactGA.event({
              category: 'User',
              action: 'Click navbar logo',
            });
            gotoPage('/');
          }}
        >
          <span className="brand-logo">Kun</span>
          &apos;s Blog
        </button>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
        >
          <FontAwesomeIcon icon={faBars} />
        </button>
        <GithubCorner url="https://github.com/Kun8018/gatsby-starter-icarus-blog" />
        <div className="collapse navbar-collapse flex-row-reverse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-2">
            {navbarList.map(item => (
              <NavItem url={item.href} name={item.title} list={item.list} key={item.href} />
            ))}
          </ul>
          <ThemeProvider theme={theme}>
            <DarkModeButton />
          </ThemeProvider>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
