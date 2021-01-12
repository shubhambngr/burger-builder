import styles from "./NavItem.module.css";

function NavItem(props) {
  return (
    <li className={styles.NavItem}>
      <a href={props.link} className={props.active ? styles.active : null}>
        {props.children}
      </a>
    </li>
  );
}

export default NavItem;
