import React from "react";
import classes from "./BuildControls.module.css";
import BuildControl from "./BuildControl/BuildControl";
const controls = [
  {
    label: "Cheese",
    type: "cheese",
  },
  {
    label: "Bacon",
    type: "bacon",
  },
  {
    label: "Salad",
    type: "salad",
  },
  {
    label: "Meat",
    type: "meat",
  },
];
const buildControls = (props) => (
  <div className={classes.BuildControls}>
    <p>
      Current Price: <strong>{props.price.toFixed(2)}</strong>
    </p>
    {controls.map((ele) => {
      return (
        <BuildControl
          type={ele.type}
          label={ele.label}
          key={ele.label}
          added={() => props.ingredeintsAdded(ele.type)}
          removed={() => props.ingredeintsRemoved(ele.type)}
          disabled={props.disabled[ele.type]}
        />
      );
    })}
    <button
      className={classes.OrderButton}
      disabled={!props.purchaseable}
      onClick={props.ordered}
    >
      ORDER NOW
    </button>
  </div>
);
export default buildControls;
