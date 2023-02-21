import React from "react"
import BugerLogo from "../../assets/images/burger-logo.png"
import classes from "./Logo.module.css"
const logo = (props)=>(
    <div className={classes.Logo}>
        <img src={BugerLogo} alt="Burger"/>
    </div>
)
export default logo
