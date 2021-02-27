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
          transform: props.open ? "translateX(0)" : "translateX(-100%)",
        }}
      >
        <div className={styles.Logo}>
          <Logo />
        </div>
        <NavItems isAuth={props.isAuth} clicked={props.closeSidebar} />
      </div>
    </>
  );
}

export default SideDrawer;
