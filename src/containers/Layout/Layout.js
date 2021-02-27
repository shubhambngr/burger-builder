import { Component } from "react";
import { connect } from "react-redux";

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
        <Toolbar
          isAuth={this.props.isAuthenticated}
          openSideDrawer={this.backdropClickHandler}
        />
        <SideDrawer
          isAuth={this.props.isAuthenticated}
          open={this.state.sideDrawerOpen}
          closeSidebar={this.backdropClickHandler}
        />
        <main className={styles.content}>{this.props.children}</main>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
  };
};

export default connect(mapStateToProps)(Layout);
