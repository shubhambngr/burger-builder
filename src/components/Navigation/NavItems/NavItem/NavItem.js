import styles from "./NavItem.module.css";
import { NavLink } from "react-router-dom";

function NavItem(props) {
  return (
    <li onClick={props.clicked} className={styles.NavItem}>
      <NavLink exact to={props.link} activeClassName={styles.active}>
        {props.children}
      </NavLink>
    </li>
  );
}

export default NavItem;
