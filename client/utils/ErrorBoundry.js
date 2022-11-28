import { Component } from "react";

class ErrorBoundry extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false,
        };
    }

    static getDerivedStateFromError() {
        return {
            hasError: true,
        };
    }

    render() {
        if (this.state.hasError) {
            return <h1 className=" mt-[4rem]">something went wrong</h1>;
        }
        return this.props.children;
    }
}

export default ErrorBoundry;
