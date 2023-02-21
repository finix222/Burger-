import React, {Component} from "react";
import Aux from "../../hoc/Auxilary";
import classes from "./layout.module.css"
import Toolbar from "../../components/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";
class Layout extends Component {
  state = {
    showSideDrawer: false,
  };

  showSideDrawerHandler = () => {
    this.setState((prevState)=>{
     return {showSideDrawer: !prevState.showSideDrawer}
    })
  };
  render(){
    return (
      <Aux>
        <Toolbar click={this.showSideDrawerHandler} />
        <SideDrawer open={this.state.showSideDrawer} closed={this.showSideDrawerHandler}/>
        <main className={classes.content}>{this.props.children}</main>
      </Aux>
    );
  }

};
export default Layout;
