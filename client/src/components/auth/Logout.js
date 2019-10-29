import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'mdbreact';
import PropTypes from 'prop-types';
import { logout } from '../../actions/authActions';

export class Logout extends Component {
    static propTypes = {
        logout: PropTypes.func.isRequired
    };

    render() {
        return (
            <Fragment>
                <NavLink onClick={this.props.logout} to="#">
                    Logout
                </NavLink>
            </Fragment>
        );
    }
}

export default connect(
    null,
    { logout }
)(Logout);
