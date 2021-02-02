import { Link } from "react-router-dom";
import styles from "./Toolbar.module.css";
import Logo from "../../Logo/Logo";
import NavItems from "../NavItems/NavItems";
import DrawerToggle from "../SideDrawer/DrawerToggle/DrawerToggle";

const Toolbar = (props) => (
  <header className={styles.Toolbar}>
    <DrawerToggle clicked={props.openSideDrawer} />
    <div className={styles.Logo}>
      <Link to="/">
        <Logo />
      </Link>
    </div>
    <nav className={styles.DesktopOnly}>
      <NavItems />
    </nav>
  </header>
);
export default Toolbar;
