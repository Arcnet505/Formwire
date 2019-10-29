import React, { Component, Fragment } from 'react';
import {
    MDBCollapse,
    MDBNavbar,
    MDBNavbarToggler,
    MDBNavbarBrand,
    MDBNavItem,
    MDBNavLink,
    MDBNavbarNav
} from 'mdbreact';
import { NavLink as RRNavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import RegisterModal from '../auth/RegisterModal';
import LoginModal from '../auth/LoginModal';
import Logout from '../auth/Logout';
import '../../css/styles.css';

import logo from '../../logos/brand_white_trans.png';

class AppNavbar extends Component {
    state = {
        isOpen: false
    };

    static propTypes = {
        auth: PropTypes.object.isRequired
    };

    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    };

    render() {
        const { isAuthenticated, user } = this.props.auth;

        const authLinks = (
            <Fragment>
                <MDBNavItem>
                    <span className="navbar-text mr-3">
                        <strong>
                            {user ? `Welcome ${user.username}` : ''}
                        </strong>
                    </span>
                </MDBNavItem>
                <MDBNavItem>
                    <Logout />
                </MDBNavItem>
            </Fragment>
        );

        const guestLinks = (
            <Fragment>
                <MDBNavItem>
                    <RegisterModal />
                </MDBNavItem>
                <MDBNavItem>
                    <LoginModal />
                </MDBNavItem>
            </Fragment>
        );

        return (
            <Fragment>
                <MDBNavbar
                    color="grey darken-3"
                    dark
                    expand="md"
                    size="lg"
                    style={{ marginTop: -5, padding: 15, fontSize: 20 }}
                >
                    <MDBNavbarBrand href="/">
                        <img
                            src={logo}
                            alt="Formwire"
                            style={{ width: '10rem' }}
                        />
                    </MDBNavbarBrand>

                    <MDBNavbarToggler onClick={this.toggle} />
                    <MDBCollapse
                        id="navbarCollapse"
                        isOpen={this.state.isOpen}
                        navbar
                    >
                        {isAuthenticated ? (
                            <Fragment>
                                <MDBNavbarNav left>
                                    <MDBNavItem>
                                        <MDBNavLink
                                            tag={RRNavLink}
                                            to="/Manage"
                                        >
                                            Manage
                                        </MDBNavLink>
                                    </MDBNavItem>
                                    <MDBNavItem>
                                        <MDBNavLink
                                            tag={RRNavLink}
                                            to="/Assess"
                                        >
                                            Assess
                                        </MDBNavLink>
                                    </MDBNavItem>
                                    <MDBNavItem>
                                        <MDBNavLink
                                            tag={RRNavLink}
                                            to="/Clients"
                                        >
                                            Clients
                                        </MDBNavLink>
                                    </MDBNavItem>
                                    <MDBNavItem>
                                        <MDBNavLink tag={RRNavLink} to="/Users">
                                            Users
                                        </MDBNavLink>
                                    </MDBNavItem>
                                </MDBNavbarNav>
                            </Fragment>
                        ) : null}

                        <MDBNavbarNav right>
                            {isAuthenticated ? authLinks : guestLinks}
                        </MDBNavbarNav>
                    </MDBCollapse>
                </MDBNavbar>
            </Fragment>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
    null
)(AppNavbar);
