import 'whatwg-fetch';
import 'babel-polyfill';

import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
// import Promise from 'promise-polyfill';

import store from './Store.js';
import Routes from './Routes.js';


if (!window.Promise) {
	window.Promise = Promise;
}

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true
        }
    }

    componentDidMount() {
        setTimeout(() => this.setState({ loading: false }), 1000);
    }

    render() {
        const { loading } = this.state;

        if(loading) { // if your component doesn't have to wait for an async action, remove this block
            return null; // render null when app is not ready
        }

        return (
            <Provider store={store}>
                <Routes />
            </Provider>
        );
    }
}

ReactDOM.render(
	<App />,
	document.getElementById('react-root')
);