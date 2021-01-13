import { Component } from "react";
import Modal from "../../components/UI/Modal/Modal";

const withErrorHandler = (WrappedComponent, axios) => {
  return class extends Component {
    constructor() {
      super();
      this.reqInterceptor = axios.interceptors.request.use((req) => {
        this.setState({ error: null });
        return req;
      });
      this.resInterceptor = axios.interceptors.response.use(
        (res) => res,
        (err) => {
          this.setState({ error: err });
        }
      );
    }

    state = {
      error: null,
    };

    componentWillUnmount() {
      axios.interceptors.request.eject(this.reqInterceptor);
      axios.interceptors.response.eject(this.resInterceptor);
    }

    render() {
      return (
        <>
          <Modal
            show={this.state.error}
            backdropClicked={() => this.setState({ error: null })}
          >
            <h1>Uh Oh!</h1>
            <p>An error occured while processing. Please try again.</p>
            <p>
              <strong>Error:</strong>{" "}
              <em>{this.state.error && this.state.error.message}</em>
            </p>
          </Modal>
          <WrappedComponent />
        </>
      );
    }
  };
};

export default withErrorHandler;
