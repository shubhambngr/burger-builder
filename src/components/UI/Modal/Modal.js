import styles from "./Modal.module.css";
import { Component } from "react";
import Backdrop from "../Backdrop/Backdrop";

class Modal extends Component {
  // * Only updates Modal, and thus OrderSummary, when Modal is shown and 2nd line checks for spinner updates.
  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextProps.show !== this.props.show ||
      nextProps.children !== this.props.children
    );
  }

  render() {
    return (
      <>
        <Backdrop show={this.props.show} clicked={this.props.backdropClicked} />
        <div
          className={styles.Modal}
          style={{
            transform: this.props.show ? "translateY(0)" : "translateY(-100vh)",
            opacity: this.props.show ? "1" : "0",
          }}
        >
          {this.props.children}
        </div>
      </>
    );
  }
}

export default Modal;
