import React, { Component, Fragment } from 'react';
import {
    MDBContainer,
    MDBBtn,
    MDBView,
    MDBMask,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBCardTitle,
    MDBCardText,
    MDBCardGroup,
    MDBCardFooter
} from 'mdbreact';
import '../css/styles.css';
import { NavLink as RRNavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import logo from '../logos/brand_color_trans_demo.png';

class Home extends Component {
    static propTypes = {
        isAuthenticated: PropTypes.bool,
        user: PropTypes.object
    };

    render() {
        const { user, isAuthenticated } = this.props.auth;

        return (
            <div id="home">
                <MDBView>
                    <MDBMask className="d-flex justify-content-center align-items-center gradient">
                        <MDBContainer>
                            <MDBRow>
                                <MDBCol md="12" className="mb-4 text-center">
                                    <div className="black-text text-center text-md-left mt-xl-5 mb-5">
                                        <MDBCard>
                                            <MDBCardBody>
                                                {/* <MDBCardHeader> */}
                                                <h1 className="display-4 mb-0  newroman">
                                                    <img
                                                        src={logo}
                                                        alt="Formwire"
                                                        style={{
                                                            width: '30rem'
                                                        }}
                                                    />
                                                </h1>
                                                <br />
                                                {/* </MDBCardHeader> */}
                                                {/* <MDBCardBody> */}
                                                {/* <hr className="white" /> */}
                                                <h5 className="pt-md-3 pt-sm-2 pt-3 pb-md-5 pb-sm-3 pb-5">
                                                    The Formwire open-source
                                                    solution will allow users to
                                                    manage and create forms,
                                                    assess clients, review
                                                    clients with assistance of
                                                    analytics analysis, and
                                                    manage users of the system.
                                                    Being open-source, users of
                                                    the system have the ability
                                                    to modify this system to
                                                    better suit their needs, and
                                                    use it as a standalone
                                                    solution or integrate it
                                                    into their existing systems.
                                                </h5>
                                            </MDBCardBody>
                                            <MDBCardFooter>
                                                {isAuthenticated ? (
                                                    <Fragment>
                                                        {this.printUserTest}
                                                        <MDBCardTitle>
                                                            <h3 className=" black-text text-center pd-5">
                                                                Please select an
                                                                option to begin:
                                                            </h3>
                                                        </MDBCardTitle>
                                                        {user.level === 1 ? (
                                                            <Fragment>
                                                                <MDBCardGroup
                                                                    deck
                                                                >
                                                                    <MDBCard
                                                                        style={{
                                                                            width:
                                                                                '22rem'
                                                                        }}
                                                                    >
                                                                        <MDBCardImage />
                                                                        <MDBCardBody className="text-center">
                                                                            <MDBCardTitle className="black-text text-center">
                                                                                Manage
                                                                                Forms
                                                                            </MDBCardTitle>
                                                                            <MDBCardText>
                                                                                <i
                                                                                    className="fas fa-tasks fa-5x"
                                                                                    style={{
                                                                                        color:
                                                                                            '#ff6f00'
                                                                                    }}
                                                                                    color="amber darken-4"
                                                                                ></i>
                                                                            </MDBCardText>
                                                                            <MDBBtn
                                                                                className="white-text text-center orange darken-1"
                                                                                // color="amber lighten-1"
                                                                                tag={
                                                                                    RRNavLink
                                                                                }
                                                                                to="/Manage"
                                                                            >
                                                                                Select
                                                                            </MDBBtn>
                                                                        </MDBCardBody>
                                                                    </MDBCard>
                                                                    <MDBCard
                                                                        style={{
                                                                            width:
                                                                                '22rem'
                                                                        }}
                                                                    >
                                                                        <MDBCardImage />
                                                                        <MDBCardBody className="text-center">
                                                                            <MDBCardTitle className="black-text text-center">
                                                                                Assess
                                                                                Client
                                                                            </MDBCardTitle>
                                                                            <MDBCardText>
                                                                                <i
                                                                                    className="far fa-clipboard fa-5x"
                                                                                    style={{
                                                                                        color:
                                                                                            '#ff6f00'
                                                                                    }}
                                                                                ></i>
                                                                            </MDBCardText>
                                                                            <MDBBtn
                                                                                className="white-text text-align-center orange darken-1"
                                                                                // color="amber lighten-1"
                                                                                tag={
                                                                                    RRNavLink
                                                                                }
                                                                                to="/Assess"
                                                                            >
                                                                                Select{' '}
                                                                            </MDBBtn>
                                                                        </MDBCardBody>
                                                                    </MDBCard>
                                                                    <MDBCard
                                                                        style={{
                                                                            width:
                                                                                '22rem'
                                                                        }}
                                                                    >
                                                                        <MDBCardImage />
                                                                        <MDBCardBody className="text-center">
                                                                            <MDBCardTitle className="black-text text-center">
                                                                                Review
                                                                                Clients
                                                                            </MDBCardTitle>
                                                                            <MDBCardText>
                                                                                <i
                                                                                    className="far fa-chart-bar fa-5x"
                                                                                    style={{
                                                                                        color:
                                                                                            '#ff6f00'
                                                                                    }}
                                                                                ></i>
                                                                            </MDBCardText>
                                                                            <MDBBtn
                                                                                className="white-text text-align-center orange darken-1"
                                                                                // color="amber lighten-1"
                                                                                tag={
                                                                                    RRNavLink
                                                                                }
                                                                                to="/Clients"
                                                                            >
                                                                                Select{' '}
                                                                            </MDBBtn>
                                                                        </MDBCardBody>
                                                                    </MDBCard>{' '}
                                                                    <MDBCard
                                                                        style={{
                                                                            width:
                                                                                '22rem'
                                                                        }}
                                                                    >
                                                                        <MDBCardImage />
                                                                        <MDBCardBody className="text-center">
                                                                            <MDBCardTitle className="black-text text-center">
                                                                                Manage
                                                                                Users
                                                                            </MDBCardTitle>
                                                                            <MDBCardText>
                                                                                <i
                                                                                    className="fas fa-users fa-5x"
                                                                                    style={{
                                                                                        color:
                                                                                            '#ff6f00'
                                                                                    }}
                                                                                ></i>
                                                                            </MDBCardText>
                                                                            <MDBBtn
                                                                                className="white-text text-align-center orange darken-1"
                                                                                // color="amber lighten-1"
                                                                                tag={
                                                                                    RRNavLink
                                                                                }
                                                                                to="/Users"
                                                                            >
                                                                                Select{' '}
                                                                            </MDBBtn>
                                                                        </MDBCardBody>
                                                                    </MDBCard>
                                                                </MDBCardGroup>
                                                            </Fragment>
                                                        ) : (
                                                            <Fragment>
                                                                <MDBCardGroup
                                                                    deck
                                                                >
                                                                    <MDBCard
                                                                        style={{
                                                                            width:
                                                                                '22rem'
                                                                        }}
                                                                    >
                                                                        <MDBCardImage />
                                                                        <MDBCardBody className="text-center">
                                                                            <MDBCardTitle className="black-text text-center">
                                                                                Assess
                                                                                Client
                                                                            </MDBCardTitle>
                                                                            <MDBCardText>
                                                                                <i
                                                                                    className="far fa-clipboard fa-5x"
                                                                                    style={{
                                                                                        color:
                                                                                            '#ff6f00'
                                                                                    }}
                                                                                ></i>
                                                                            </MDBCardText>
                                                                            <MDBBtn
                                                                                className="white-text text-align-center"
                                                                                color="amber lighten-1"
                                                                                tag={
                                                                                    RRNavLink
                                                                                }
                                                                                to="/Assess"
                                                                            >
                                                                                Select{' '}
                                                                            </MDBBtn>
                                                                        </MDBCardBody>
                                                                    </MDBCard>
                                                                </MDBCardGroup>
                                                            </Fragment>
                                                        )}
                                                    </Fragment>
                                                ) : (
                                                    <Fragment>
                                                        <h6 className="mb-4">
                                                            To begin, please
                                                            login.
                                                        </h6>
                                                    </Fragment>
                                                )}
                                            </MDBCardFooter>
                                        </MDBCard>
                                    </div>
                                </MDBCol>
                            </MDBRow>
                        </MDBContainer>
                    </MDBMask>
                </MDBView>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
    {}
)(Home);
