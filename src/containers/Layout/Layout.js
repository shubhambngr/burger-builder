import { Component } from "react";
import styles from "./Layout.module.css";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";

class Layout extends Component {
  state = { sideDrawerOpen: false };

  backdropClickHandler = () => {
    this.setState((prevState) => ({
      sideDrawerOpen: !prevState.sideDrawerOpen,
    }));
  };

  render() {
    return (
      <>
        <Toolbar openSideDrawer={this.backdropClickHandler} />
        <SideDrawer
          open={this.state.sideDrawerOpen}
          closeSidebar={this.backdropClickHandler}
        />
        <main className={styles.content}>{this.props.children}</main>
      </>
    );
  }
}

export default Layout;
