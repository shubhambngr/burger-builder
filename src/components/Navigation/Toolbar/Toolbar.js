import { Component } from "react";
import { Link } from "react-router-dom";
import styles from "./Toolbar.module.css";
import Logo from "../../Logo/Logo";
import NavItems from "../NavItems/NavItems";
import DrawerToggle from "../SideDrawer/DrawerToggle/DrawerToggle";

class Toolbar extends Component {
  state = {
    prevScrollpos: window.pageYOffset,
    visible: true,
  };

  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  handleScroll = () => {
    const { prevScrollpos } = this.state;

    const currentScrollPos = window.pageYOffset;
    const visible = prevScrollpos > currentScrollPos;

    this.setState({
      prevScrollpos: currentScrollPos,
      visible,
    });
  };

  render() {
    return (
      <header
        className={`${styles.Toolbar} ${
          !this.state.visible && styles.Toolbar__hidden
        }`}
      >
        <DrawerToggle clicked={this.props.openSideDrawer} />
        <div className={styles.Logo}>
          <Link to="/">
            <Logo />
          </Link>
        </div>
        <nav className={styles.DesktopOnly}>
          <NavItems isAuth={this.props.isAuth} />
        </nav>
      </header>
    );
  }
}
export default Toolbar;
