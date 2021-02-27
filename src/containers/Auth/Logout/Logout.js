import { Component } from "react";
import { connect } from "react-redux";

import * as actions from "../../../store/actions/index";
import styles from "./Logout.module.css";
import Button from "../../../components/UI/Button/Button";

class Logout extends Component {
  componentDidMount() {
    document.title = "MyBurger - Logout";
  }

  handleLogout = () => {
    this.props.onLogout();
    this.props.history.replace("/");
  };

  render() {
    return (
      <div className={styles.Logout}>
        <p>Are you sure you want to log out?</p>
        <Button type="Danger" onClick={this.handleLogout}>
          LOGOUT
        </Button>
        <Button type="Success" onClick={() => this.props.history.push("/")}>
          CANCEL
        </Button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLogout: () => {
      dispatch(actions.authLogout());
    },
  };
};

export default connect(null, mapDispatchToProps)(Logout);
