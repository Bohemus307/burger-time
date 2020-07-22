import React from 'react';
import classes from './burger.css'
import BurgerIngredient from './BurgerIngredient/BurgerIngredient'

const Burger = ((props) => {
  //creates an array of ingredients from object of key value pairs and value creates multiples 
  let transformedIngredients = Object.keys(props.ingredients)
    .map((igKey) => {
      return [...Array(props.ingredients[igKey])].map((_, i) => {
        return <BurgerIngredient key={igKey + i} type={igKey} />;
      }) 
    })
    .reduce((arr, el) => {
      return arr.concat(el)
    }, []);
  // check for lack of ingredients
  if (transformedIngredients.length === 0) {
    transformedIngredients = <p>Please Start Adding Ingredients</p>
  }
  
  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top" />
      {transformedIngredients}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
})

export default Burger;