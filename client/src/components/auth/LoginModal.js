import React, { Component } from 'react';
import {
    MDBAlert,
    MDBInput,
    MDBBtn,
    MDBNavLink,
    MDBModal,
    MDBModalBody,
    MDBModalHeader,
    MDBModalFooter
} from 'mdbreact';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/authActions';
import { clearErrors } from '../../actions/errorActions';

class LoginModal extends Component {
    state = {
        modal: false,
        username: '',
        password: '',
        msg: null
    };

    static propTypes = {
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        login: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
    };

    componentDidUpdate(prevProps) {
        const { error, isAuthenticated } = this.props;
        if (error !== prevProps.error) {
            // Check for a login error
            if (error.id === 'LOGIN_FAIL') {
                this.setState({ msg: error.msg.msg });
            } else {
                this.setState({ msg: null });
            }
        }

        // Close on submit
        if (this.state.modal) {
            if (isAuthenticated) {
                this.toggle();
            }
        }
    }

    toggle = () => {
        // Clear errors
        this.props.clearErrors();

        // Toggle modal
        this.setState({
            modal: !this.state.modal
        });
    };

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    onSubmit = e => {
        e.preventDefault();

        const { username, password } = this.state;

        // Create user object
        const user = {
            username,
            password
        };

        // Attempt to login
        this.props.login(user);
    };

    render() {
        return (
            <div>
                <MDBNavLink onClick={this.toggle} to="#">
                    Login
                </MDBNavLink>

                <MDBModal
                    className="modal-notify modal-info white-text"
                    isOpen={this.state.modal}
                    toggle={this.toggle}
                >
                    <MDBModalHeader
                        className="text-center amber darken-4 white-text"
                        titleClass="w-100 font-weight-bold"
                        toggle={this.toggle}
                    >
                        Login
                    </MDBModalHeader>
                    <MDBModalBody>
                        {this.state.msg ? (
                            <MDBAlert color="danger">{this.state.msg}</MDBAlert>
                        ) : null}
                        <form
                            className="mx-3 grey-text"
                            onSubmit={this.onSubmit}
                        >
                            <MDBInput
                                label="Username"
                                icon="user"
                                iconClass="grey-text"
                                group
                                type="text"
                                name="username"
                                id="username"
                                className="mb-3 black-text"
                                onChange={this.onChange}
                            />
                            <MDBInput
                                label="Password"
                                icon="lock"
                                iconClass="grey-text"
                                group
                                type="password"
                                name="password"
                                id="password"
                                className="mb-3 black-text"
                                onChange={this.onChange}
                            />
                        </form>
                    </MDBModalBody>
                    <MDBModalFooter className="justify-content-center white-text">
                        <MDBBtn
                            className="white-text color orange darken-1"
                            type="submit"
                            onClick={this.onSubmit}
                            size="lg"
                        >
                            Login
                        </MDBBtn>
                    </MDBModalFooter>
                </MDBModal>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error
});

export default connect(
    mapStateToProps,
    { login, clearErrors }
)(LoginModal);
