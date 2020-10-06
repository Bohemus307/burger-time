import React from 'react';

import classes from './order.css';

const order = (props) => (
  <div className={classes.order}>
    <p>Ingredients: Salad (1)</p>
    <p>Price: <strong>USD 5.44</strong></p>
  </div>
);

export default order;