import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import Demo from '../components/demo/demo.jsx';
import Login from '../components/login/LoginComponent.jsx';

class Routes extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Route exact path="/" component="Demo" />
                <Route path="/login" component="Login" />
            </div>
        )
    }
}
export default Routes;