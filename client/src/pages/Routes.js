import React from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import Home from './Home';
import Manage from './Manage';
import Assess from './Assess';
import Assessment from './Assessment';
import Clients from './Clients';
import Users from './Users';
import AppNavbar from '../components/App/AppNavbar';

// Routes for the router to use to navigate pages
class Routes extends React.Component {
    render() {
        return (
            <Router>
                <AppNavbar />
                <Route exact path="/" component={Home} />
                <Route path="/Manage" component={Manage} />
                <Route path="/Assess" component={Assess} />
                <Route path="/Assessment" component={Assessment} />
                <Route path="/Clients" component={Clients} />
                <Route path="/Users" component={Users} />
            </Router>
        );
    }
}

export default Routes;
