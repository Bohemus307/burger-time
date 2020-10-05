import React, { Component } from "react";

import Modal from "../../components/UI/modal/modal";
import Aux from "../Aux/Aux";

const withErrorHandler = (WrappedComponent, axios) => {
  return class extends Component {
    constructor(props) {
      super()

      this.state = {
        error: null,
      };
    }

    getStateFromDb = () => {
      this.requestInterceptor = axios.interceptors.request.use((req) => {
        this.setState({ error: null });
        return req;
      });

      this.responseInterceptor = axios.interceptors.response.use(
        (res) => res,
        (error) => {
          this.setState({
            error: error,
          });
        }
      );
    }

    componentDidMount() {
      this.getStateFromDb();
    }

    componentWillUnmount() {
      axios.interceptors.request.eject(this.requestInterceptor);
      axios.interceptors.response.eject(this.responeInterceptor);

    }

    errorConfimerdHandler = () => {
      this.setState({
        error: null,
      });
    };

    render() {
      return (
        <Aux>
          <Modal  
            show={this.state.error} 
            clicked={this.errorConfimerdHandler}>
            {this.state.error ? this.state.error.message : null}
          </Modal>
          <WrappedComponent {...this.props} />
        </Aux>
      );
    }
  };
};

export default withErrorHandler;
