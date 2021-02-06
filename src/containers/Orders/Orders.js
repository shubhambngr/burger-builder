import { Component } from "react";

import Order from "../../components/Order/Order";
import Spinner from "../../components/UI/Spinner/Spinner";

import axios from "../../axios-orders";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

class Orders extends Component {
  state = {
    orders: [],
    loading: true,
  };

  componentDidMount() {
    axios
      .get("/orders.json")
      .then((res) => {
        const fetchedOrders = [];
        for (let key in res.data) {
          fetchedOrders.push({
            ...res.data[key],
            id: key,
          });
        }
        this.setState({ loading: false, orders: fetchedOrders });
      })
      .catch((err) => {
        this.setState({ loading: false });
      });
  }

  render() {
    let orders;
    if (this.state.orders.length === 0) {
      orders = <h3 style={{ textAlign: "center" }}>No Orders placed yet.</h3>;
    } else {
      orders = this.state.orders.map((order) => (
        <Order
          key={order.id}
          ingredients={order.ingredients}
          price={order.price}
          delivery={order.orderData.delivery}
        />
      ));
    }

    if (this.state.loading) {
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

export default withErrorHandler(Orders, axios);
