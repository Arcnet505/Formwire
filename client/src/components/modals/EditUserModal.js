import React, { Component, Fragment } from 'react';
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
import { updateUser } from '../../actions/userActions';
import { clearErrors } from '../../actions/errorActions';

class EditUserModal extends Component {
    state = {
        username: '',
        level: 0,
        error: ''
    };

    static propTypes = {
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        updateUser: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
    };

    componentDidUpdate(prevProps) {
        // Close on submit
        if (this.state.modal) {
            if (this.props.isAuthenticated) {
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

        if (this.state.username === '') {
            this.setState({ username: this.props.user.username });
        }

        var add = true;
        for (var i = 0; i < this.props.users.length; i++) {
            if (this.state.username === this.props.users[i].username) {
                add = false;
            }
        }

        if (this.state.username === this.props.user.username) {
            add = true;
        }

        if (add) {
            // Create user object
            const newUser = {
                username: this.state.username,
                level: this.state.level
            };

            // Attempt to update user
            this.props.updateUser(this.props.id, newUser);

            this.props.toggle();
        } else {
            this.setState({
                error: 'Please enter a username that is not in use'
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
                        Modify User
                    </MDBModalHeader>
                    {this.props.user === null ? null : (
                        <Fragment>
                            <MDBModalBody>
                                {this.state.error !== '' ? (
                                    <MDBAlert color="danger">
                                        {this.state.error}
                                    </MDBAlert>
                                ) : null}
                                <form onSubmit={this.onSubmit}>
                                    Username
                                    <MDBInput
                                        icon="user"
                                        iconClass="grey-text"
                                        group
                                        type="text"
                                        name="username"
                                        id="username"
                                        className="mb-3 black-text"
                                        onChange={this.onChange}
                                        label={this.props.user.username}
                                    />
                                    Account Level
                                    <select
                                        className="browser-default custom-select"
                                        name="level"
                                        onChange={this.onChange}
                                    >
                                        <option
                                            value="0"
                                            selected={
                                                0 === this.props.user.level
                                            }
                                        >
                                            User
                                        </option>
                                        <option
                                            value="1"
                                            selected={
                                                1 === this.props.user.level
                                            }
                                        >
                                            Admin
                                        </option>
                                    </select>
                                </form>
                            </MDBModalBody>
                        </Fragment>
                    )}
                    <MDBModalFooter className="justify-content-center">
                        <MDBBtn
                            type="submit"
                            onClick={this.onSubmit}
                            className="white-text color orange darken-1"
                            size="lg"
                        >
                            Modify
                        </MDBBtn>
                    </MDBModalFooter>
                </MDBModal>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
    error: state.error
});

export default connect(
    mapStateToProps,
    { updateUser, clearErrors }
)(EditUserModal);
