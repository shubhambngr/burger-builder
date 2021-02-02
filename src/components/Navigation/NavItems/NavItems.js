import styles from "./NavItems.module.css";
import NavItem from "./NavItem/NavItem";

function NavItems(props) {
  return (
    <ul className={styles.NavItems}>
      <NavItem clicked={props.clicked} link="/">
        Burger Builder
      </NavItem>
      <NavItem clicked={props.clicked} link="/orders">
        Orders
      </NavItem>
    </ul>
  );
}

export default NavItems;
