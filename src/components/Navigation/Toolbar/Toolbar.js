import React from 'react';

import Logo from '../../Logo/Logo';
import classes from './toolbar.css';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';

const Toolbar = (props) => (
  <header className={classes.Toolbar}>
   <DrawerToggle clicked={props.drawerToggleClicked} />
    <Logo height="80%" />
    <nav className={classes.DesktopOnly}>
      <NavigationItems />
    </nav>
  </header>
);

export default Toolbar;