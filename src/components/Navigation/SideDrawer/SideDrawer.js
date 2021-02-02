import styles from "./SideDrawer.module.css";
import Logo from "../../Logo/Logo";
import NavItems from "../NavItems/NavItems";
import Backdrop from "../../UI/Backdrop/Backdrop";

function SideDrawer(props) {
  return (
    <>
      <Backdrop show={props.open} clicked={props.closeSidebar} />
      <div
        className={styles.SideDrawer}
        style={{
          // this can also be done by adding Open and Close classes in css file.
          transform: props.open ? "translateX(0)" : "translateX(-100%)",
        }}
      >
        <div className={styles.Logo}>
          <Logo />
        </div>
        <NavItems clicked={props.closeSidebar} />
      </div>
    </>
  );
}

export default SideDrawer;
