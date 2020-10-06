import React from 'react';

import classes from './navigationitems.css';
import NavigationItem from './NavigationItem/NavigationItem';

const NavigationItems = (props) => (
  <ul className={classes.NavigationItems}>
    <NavigationItem link="/">Burger Builder</NavigationItem>
    <NavigationItem link="/orders">Orders</NavigationItem>
  </ul>
);

export default NavigationItems;