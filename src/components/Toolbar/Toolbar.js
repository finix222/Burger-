import React from "react";
import classes from "./Toolbar.module.css"
import Logo from "../Logo/Logo";
import NavigationItems from "../Navigation/NavigationItems/NavigationItems";
import DrawerToggle from "../Navigation/SideDrawer/DrawerToggle/DrawerToggle";
const toolbar =(props)=>(
    <header className={classes.Toolbar}>
       <DrawerToggle clicked={props.click} />
        <Logo/>
        <nav className={classes.DesktopOnly}><NavigationItems/></nav>
    </header>
)
export default toolbar