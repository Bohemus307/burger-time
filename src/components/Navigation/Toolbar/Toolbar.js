import React from 'react';

import Logo from '../../Logo/Logo'
import classes from './toolbar.css';
import NavigationItems from '../NavigationItems/NavigationItems'

const Toolbar = (props) => (
  <header className={classes.Toolbar}>
    <div >MeNU</div>
    <Logo height="80%" />
    <nav>
      <NavigationItems />
    </nav>
  </header>
);

export default Toolbar;