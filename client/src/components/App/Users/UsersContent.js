import React, { Component, Fragment } from 'react';
import {
    MDBContainer,
    MDBBtn,
    MDBCard,
    MDBCardBody,
    MDBCardHeader
} from 'mdbreact';
import { connect } from 'react-redux';
import { getUsers, deleteUser } from '../../../actions/userActions';
import PropTypes from 'prop-types';
import '../../../css/styles.css';
import UserList from './UserList';
import RegisterModal from '../../auth/RegisterModal';
import ConfirmDeleteModal from '../../modals/ConfirmDeleteModal';
import EditUserModal from '../../modals/EditUserModal';
import { addUser } from '../../../actions/userActions';
import { NavLink as RRNavLink } from 'react-router-dom';

class UsersContent extends Component {
    state = {
        registerModalToggle: false,
        editModalToggle: false,
        userList: [],
        user: null,
        userEdit: null,
        confirmDeleteModal: false,
        selectedID: ''
    };

    componentDidMount() {
        this.props.getUsers();
    }

    static propTypes = {
        getUsers: PropTypes.func.isRequired,
        getSingleUser: PropTypes.func,
        addUser: PropTypes.func.isRequired,
        users: PropTypes.object,
        isAuthenticated: PropTypes.bool
    };

    confirmDeleteToggle = id => {
        this.setState({
            selectedID: id,
            confirmDeleteModal: !this.state.confirmDeleteModal
        });
    };

    onDeleteClick = () => {
        this.props.deleteUser(this.state.selectedID);
        this.confirmDeleteToggle();
    };

    editModalToggle = () => {
        this.setState({
            editModalToggle: !this.state.editModalToggle
        });
    };

    onEditClick = user => {
        this.setState({
            selectedID: user._id,
            userEdit: user
        });
        this.editModalToggle();
    };

    rowsData = [];

    handleAddUserChange = e => {
        this.setState({
            ...this.state,
            [e.target.id]: e.target.value
        });
    };

    toggleRegisterModal = () => {
        this.setState({
            registerModalToggle: !this.state.registerModalToggle
        });
    };

    onLoad = () => {
        const { users } = this.props.user;

        let rowsData = [];
        for (var index = 0; index < users.length; index++) {
            if (users[index].username !== undefined) {
                let rowItem = {};

                var date = new Date(users[index].register_date);

                // Month incremented from 0 <-> 11 to 1 <-> 12
                var month = parseInt(date.getMonth()) + 1;

                rowItem['username'] = users[index].username;

                rowItem['register_date'] =
                    '' +
                    date.getDate() +
                    '/' +
                    month +
                    '/' +
                    date.getFullYear();

                if (parseInt(users[index].level) === 0) {
                    rowItem['level'] = 'User';
                } else if (parseInt(users[index].level) === 1) {
                    rowItem['level'] = 'Admin';
                }

                rowItem['options'] = (
                    <Fragment>
                        <MDBBtn
                            className="view-btn white-text orange lighten-1"
                            // color="yellow accent-4"
                            size="sm"
                            onClick={this.onEditClick.bind(this, users[index])}
                        >
                            <i className="fa fa-edit mr-1"></i>
                            Edit
                        </MDBBtn>
                        {this.props.isAuthenticated ? (
                            <Fragment>
                                <MDBBtn
                                    className="orange darken-4"
                                    color="danger"
                                    size="sm"
                                    onClick={this.confirmDeleteToggle.bind(
                                        this,
                                        users[index]._id
                                    )}
                                >
                                    <i className="fa fa-trash mr-1"></i>
                                    Delete
                                </MDBBtn>
                            </Fragment>
                        ) : null}
                    </Fragment>
                );
                rowsData.push(rowItem);
            }
        }
        this.rowsData = rowsData;
    };

    addUser = user => {
        this.props.addUser(user);
    };

    refresh = () => {
        window.location.reload();
    };

    render() {
        const { isAuthenticated, user } = this.props.auth;
        this.onLoad();

        return (
            <MDBContainer>
                {isAuthenticated && user.level === 1 ? (
                    <Fragment>
                        {this.state.user === null ? (
                            <MDBContainer className="clearfix">
                                <MDBCard>
                                    <MDBCardHeader color="amber darken-4">
                                        <RegisterModal
                                            modal={
                                                this.state.registerModalToggle
                                            }
                                            toggle={this.toggleRegisterModal}
                                            handleChange={
                                                this.handleAddUserChange
                                            }
                                            registerInt={this.registerInt}
                                            add={this.addUser}
                                            users={this.rowsData}
                                        />
                                        <EditUserModal
                                            toggle={this.editModalToggle}
                                            modal={this.state.editModalToggle}
                                            user={this.state.userEdit}
                                            id={this.state.selectedID}
                                            users={this.rowsData}
                                        />
                                        <ConfirmDeleteModal
                                            toggle={this.confirmDeleteToggle}
                                            modal={
                                                this.state.confirmDeleteModal
                                            }
                                            delete={this.onDeleteClick}
                                            id={this.state.selectedID}
                                        />
                                        <h1 className="display-4 mb-0">
                                            User Management
                                        </h1>
                                    </MDBCardHeader>
                                    <MDBCardBody>
                                        <MDBContainer
                                            style={{ paddingRight: '1%' }}
                                        >
                                            <MDBBtn
                                                className="float-right orange darken-1 white-text"
                                                // color="yellow accent-4"
                                                onClick={this.refresh.bind(
                                                    this
                                                )}
                                            >
                                                <i className="fas fa-sync-alt mr-1"></i>
                                                Refresh
                                            </MDBBtn>
                                        </MDBContainer>
                                        <UserList rowsData={this.rowsData} />
                                        <MDBBtn
                                            className="white-text color orange darken-1 float-left"
                                            onClick={this.toggleRegisterModal}
                                        >
                                            <i className="fas fa-plus mr-1"></i>
                                            Register New User
                                        </MDBBtn>
                                    </MDBCardBody>
                                </MDBCard>
                            </MDBContainer>
                        ) : (
                            <MDBContainer>
                                {/* <User user={this.state.user} /> */}
                            </MDBContainer>
                        )}
                    </Fragment>
                ) : (
                    <Fragment>
                        <MDBCard>
                            <MDBCardBody className="d-flex justify-content-center">
                                <table>
                                    <tr>
                                        <td>
                                            <h3 className="mb-0 float-left">
                                                Please login to view this page.
                                            </h3>
                                        </td>

                                        <td className="align-right clearfix">
                                            <div className="clearfix px-5">
                                                <MDBBtn
                                                    className="white-text text-center float-right btn-lg"
                                                    color="primary"
                                                    tag={RRNavLink}
                                                    to="/"
                                                >
                                                    Return Home
                                                </MDBBtn>
                                            </div>
                                        </td>
                                    </tr>
                                </table>
                            </MDBCardBody>
                        </MDBCard>
                    </Fragment>
                )}
            </MDBContainer>
        );
    }
}

const mapStateToProps = state => ({
    user: state.user,
    isAuthenticated: state.auth.isAuthenticated,
    auth: state.auth
});

export default connect(
    mapStateToProps,
    { addUser, getUsers, deleteUser }
)(UsersContent);
