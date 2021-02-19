import { Component } from "react";
import { connect } from "react-redux";

import Order from "../../components/Order/Order";
import Spinner from "../../components/UI/Spinner/Spinner";
import axios from "../../axios-orders";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as actions from "../../store/actions/index";

class Orders extends Component {
  componentDidMount() {
    document.title = "Orders | MyBurger";
    this.props.onFetchOrders();
  }

  render() {
    let orders;
    if (this.props.orders.length === 0) {
      orders = <h3 style={{ textAlign: "center" }}>No Orders placed yet.</h3>;
    } else {
      orders = this.props.orders.map((order) => (
        <Order
          key={order.id}
          ingredients={order.ingredients}
          price={order.price}
          delivery={order.orderData.delivery}
        />
      ));
    }

    if (this.props.loading) {
      orders = <Spinner />;
    }

    return (
      <div
        style={{ width: "100%", padding: "0 10px", boxSizing: "border-box" }}
      >
        {orders}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    orders: state.order.orders,
    loading: state.order.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchOrders: () => dispatch(actions.fetchOrders()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Orders, axios));
