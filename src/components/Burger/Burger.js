import React from "react";
import classes from "./Burger.module.css";
import BurgerIngredients from "./BurgerIngredients/BurgerIngredients";
const burger = (props) => {

  let transformedIngredients = Object.keys(props.ingredients)
  .map(igkeys=>{
      return [...Array(props.ingredients[igkeys])]
      .map((_,i)=>{
          return <BurgerIngredients key={igkeys + i} type={igkeys}/>
      })
  })
  .reduce((arr,ele)=> arr.concat(ele),[])
  if(transformedIngredients.length === 0){
      transformedIngredients = <p>Please enter some ingredients</p>
  }
// console.log(transformedIngredients)
//   const TransformedIngredients = Object.values(props.ingredients);
//     console.log(TransformedIngredients);

//   const holdingredients = transformedIngredients.map((ingredient,i) => {
//     return <BurgerIngredients type={ingredient} keys={ingredient + i} />;
//   });
  
    return (<div className={classes.Burger}>
        <BurgerIngredients type="bread-top"/>
        {transformedIngredients}
        <BurgerIngredients type="bread-bottom"/>
    </div>)
};
export default burger;
