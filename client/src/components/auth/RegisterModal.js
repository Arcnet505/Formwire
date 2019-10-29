import React, { Component } from 'react';
import {
    MDBAlert,
    MDBInput,
    MDBBtn,
    MDBModal,
    MDBModalBody,
    MDBModalHeader,
    MDBModalFooter
} from 'mdbreact';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getUsers, addUser } from '../../actions/userActions';
import { clearErrors } from '../../actions/errorActions';

class RegisterModal extends Component {
    state = {
        username: '',
        password: '',
        accountLevel: 0,
        msg: '',
        error: ''
    };

    componentDidMount() {
        this.props.getUsers();
    }

    static propTypes = {
        getUsers: PropTypes.func.isRequired,
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        addUser: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
        // user: PropTypes.object
    };

    componentDidUpdate(prevProps) {
        const { error } = this.props;
        if (error !== prevProps.error) {
            // Check for a register error
            if (error.id === 'REGISTER_FAIL') {
                this.setState({ msg: error.msg.msg });
            } else {
                if (this.state.msg !== null) {
                    this.setState({ msg: null });
                }
            }
        }
    }

    toggle = () => {
        // Clear errors
        this.props.clearErrors();
    };

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    onSubmit = e => {
        e.preventDefault();

        if (this.state.username === '') {
            this.setState({
                error: 'Please enter a username.'
            });
            return;
        }

        if (this.state.password === '') {
            this.setState({
                error: 'Please enter a password.'
            });
            return;
        }

        var add = true;
        for (var i = 0; i < this.props.users.length; i++) {
            if (this.state.username === this.props.users[i].username) {
                add = false;
            }
        }

        if (add) {
            const { username, password } = this.state;

            // Create user object
            const newUser = {
                username,
                password
            };

            // Attempt to register
            this.props.toggle();
            this.props.add(newUser);
        } else {
            this.setState({
                error: 'Please enter a username that is not in use.'
            });
        }
    };

    render() {
        return (
            <div>
                <MDBModal
                    className="modal-notify modal-info white-text"
                    isOpen={this.props.modal}
                    toggle={this.props.toggle}
                >
                    <MDBModalHeader
                        className="text-center amber darken-4"
                        titleClass="w-100 font-weight-bold"
                        toggle={this.props.toggle}
                    >
                        Register
                    </MDBModalHeader>
                    <MDBModalBody>
                        {this.state.error !== '' ? (
                            <MDBAlert color="danger">
                                {this.state.error}
                            </MDBAlert>
                        ) : null}
                        <form onSubmit={this.onSubmit}>
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
                    <MDBModalFooter className="justify-content-center">
                        <MDBBtn
                            type="submit"
                            onClick={this.onSubmit}
                            className="white-text color orange darken-1"
                            size="lg"
                        >
                            Register
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
    { addUser, clearErrors, getUsers }
)(RegisterModal);
