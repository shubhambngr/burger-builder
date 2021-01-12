import styles from "./Modal.module.css";
import { Component } from "react";
import Backdrop from "../Backdrop/Backdrop";

class Modal extends Component {
  // * Only updates Modal, and thus OrderSummary only when Modal is shown.
  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.show !== this.props.show;
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
