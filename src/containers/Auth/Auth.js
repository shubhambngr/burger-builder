import { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import styles from "./Auth.module.css";
import Spinner from "../../components/UI/Spinner/Spinner";
import * as actions from "../../store/actions/index";
import {
  updateObject,
  checkValidity,
  formElConfig,
} from "../../shared/utility";

class Auth extends Component {
  state = {
    controls: {
      email: formElConfig("input", "email", "Email address", null, null, true),
      password: formElConfig("input", "password", "Password", 7),
    },
    isSignup: true,
  };

  componentDidMount() {
    document.title = "MyBurger - Authenticate ";
  }

  handleInputChange = (event, ctrlName) => {
    const updatedControls = updateObject(this.state.controls, {
      [ctrlName]: updateObject(this.state.controls[ctrlName], {
        value: event.target.value,
        valid: checkValidity(
          event.target.value,
          this.state.controls[ctrlName].validation
        ),
        touched: true,
      }),
    });
    this.setState({ controls: updatedControls });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.onAuth(
      this.state.controls.email.value,
      this.state.controls.password.value,
      this.state.isSignup
    );
  };

  switchAuthMode = () => {
    this.setState((prevState) => {
      return {
        isSignup: !prevState.isSignup,
      };
    });
  };

  render() {
    const formElsArray = [];
    for (let key in this.state.controls) {
      formElsArray.push({
        id: key,
        config: this.state.controls[key],
      });
    }

    let inputs = formElsArray.map((el) => (
      <Input
        key={el.id}
        value={el.config.value}
        handleChange={(event) => this.handleInputChange(event, el.id)}
        elType={el.config.elType}
        elConfig={el.config.elConfig}
        invalid={!el.config.valid}
        touched={el.config.touched}
      />
    ));

    if (this.props.loading) {
      inputs = <Spinner />;
    }

    const errorMsg = this.props.error && <p>{this.props.error.message}</p>;

    const authRedirect =
      this.props.isAuth &&
      (this.props.building ? <Redirect to="/checkout" /> : <Redirect to="/" />);

    return (
      <div className={styles.Auth}>
        <form onSubmit={this.handleSubmit}>
          {authRedirect}
          {errorMsg}
          {inputs}
          <Button type="Success">
            {this.state.isSignup ? "SIGN UP" : "SIGN IN"}
          </Button>
        </form>
        <Button type="Danger" onClick={this.switchAuthMode}>
          SWITCH TO
          {this.state.isSignup ? " SIGN IN" : " SIGN UP"}
        </Button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuth: state.auth.token !== null,
    building: state.burger.building,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (email, pass, isSignUp) =>
      dispatch(actions.auth(email, pass, isSignUp)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
