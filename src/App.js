import { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import Layout from "./containers/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Checkout from "./containers/Checkout/Checkout";
import Orders from "./containers/Orders/Orders";
import Auth from "./containers/Auth/Auth";
import Logout from "./containers/Auth/Logout/Logout";
import * as actions from "./store/actions/index";

class App extends Component {
  constructor(props) {
    super(props);
    this.props.onAuthAutoCheckState();
  }

  render() {
    let routes = (
      <Switch>
        <Route exact path="/" component={BurgerBuilder} />
        <Route path="/auth" component={Auth} />
        <Redirect to="/" />
      </Switch>
    );

    if (this.props.isAuth) {
      routes = (
        <Switch>
          <Route exact path="/" component={BurgerBuilder} />
          <Route path="/checkout" component={Checkout} />
          <Route path="/orders" component={Orders} />
          <Route path="/logout" component={Logout} />
          <Route path="/auth" component={Auth} />
          <Redirect to="/" />
        </Switch>
      );
    }
    return <Layout>{this.props.authInit && routes}</Layout>;
  }
}

const mapStateToProps = (state) => {
  return {
    isAuth: state.auth.token !== null,
    authInit: state.auth.authInit,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuthAutoCheckState: () => dispatch(actions.authCheckState()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
