import React, { Component, Fragment } from 'react';
import {
    MDBContainer,
    MDBBtn,
    MDBCard,
    MDBCardHeader,
    MDBCardBody
} from 'mdbreact';
import { connect } from 'react-redux';
import {
    getClients,
    deleteClient,
    addClient
} from '../../../actions/clientActions';
import PropTypes from 'prop-types';
import '../../../css/styles.css';
import ClientList from './ClientList';
import ClientAddModal from '../../modals/ClientAddModal';
import ConfirmDeleteModal from '../../modals/ConfirmDeleteModal';
import Client from '../Analytics/Client';
import { NavLink as RRNavLink } from 'react-router-dom';

class ClientsContent extends Component {
    state = {
        addClientModalToggle: false,
        clientList: [],
        clientID: '',
        day: '',
        month: '',
        year: '',
        client: null,
        confirmDeleteModal: false,
        selectedID: '',
        addError: ''
    };

    componentDidMount() {
        this.props.getClients();
    }

    static propTypes = {
        getClients: PropTypes.func.isRequired,
        getSingleClient: PropTypes.func,
        addClient: PropTypes.func.isRequired,
        clients: PropTypes.object,
        isAuthenticated: PropTypes.bool
    };

    confirmDeleteToggle = id => {
        this.setState({
            selectedID: id,
            confirmDeleteModal: !this.state.confirmDeleteModal
        });
    };

    onDeleteClick = () => {
        this.props.deleteClient(this.state.selectedID);
        this.confirmDeleteToggle();
    };

    onViewClick = client => {
        this.setState({
            client: client
        });
    };

    rowsData = [];

    //Make new client object and add to DB
    addClientInt = () => {
        var daysInMonth = [-1, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

        //check if empty client id
        if (this.state.clientID === '') {
            this.setState({
                addError: 'Please enter a client ID.'
            });
            return;
        }

        var { clients } = this.props.client;

        var add = true;
        for (var i = 0; i < clients.length; i++) {
            if (clients[i].clientID === this.state.clientID) {
                add = false;
            }
        }

        //make sure date is valid
        if (add) {
            if (
                (!(this.state.year % 4) && this.state.year % 100) ||
                !(this.state.year % 400)
            ) {
                daysInMonth[1] = 29;
            }

            if (this.state.day <= daysInMonth[parseInt(this.state.month)]) {
                this.toggleAddClientModal();

                const dateConcat =
                    '' +
                    this.state.year +
                    '-' +
                    this.state.month +
                    '-' +
                    this.state.day;

                const newDate = new Date(dateConcat);

                const newClient = {
                    clientID: this.state.clientID,
                    dob: newDate,
                    formResults: []
                };

                this.props.addClient(newClient);
            } else {
                this.setState({
                    addError: 'Please enter a valid date.'
                });
            }
        } else {
            this.setState({
                addError: 'Please enter a client ID that is not in use.'
            });
        }
    };

    handleAddClientChange = e => {
        this.setState({
            ...this.state,
            [e.target.id]: e.target.value
        });
    };

    toggleAddClientModal = () => {
        this.setState({
            addClientModalToggle: !this.state.addClientModalToggle
        });
    };

    onLoad = () => {
        const { clients } = this.props.client;

        //set data for client table
        let rowsData = [];
        for (var index = 0; index < clients.length; index++) {
            let rowItem = {};

            var date = new Date(clients[index].dob);

            // Month incremented from 0 <-> 11 to 1 <-> 12
            var month = parseInt(date.getMonth()) + 1;

            rowItem['clientID'] = clients[index].clientID;

            rowItem['dob'] =
                '' + date.getDate() + '/' + month + '/' + date.getFullYear();

            rowItem['options'] = (
                <Fragment>
                    <MDBBtn
                        className="view-btn orange darken-1 white-text"
                        // color="yellow accent-4"
                        size="sm"
                        onClick={this.onViewClick.bind(this, clients[index])}
                    >
                        <i className="far fa-eye mr-1"></i>
                        View
                    </MDBBtn>
                    {this.props.isAuthenticated ? (
                        <Fragment>
                            <MDBBtn
                                className="orange darken-4 white-text"
                                // color="orange accent-4"
                                size="sm"
                                onClick={this.confirmDeleteToggle.bind(
                                    this,
                                    clients[index]._id
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
        this.rowsData = rowsData;
    };

    back = () => {
        this.setState({
            client: null
        });
    };

    render() {
        const { isAuthenticated, user } = this.props.auth;
        this.onLoad();

        return (
            <MDBContainer>
                {isAuthenticated && user.level === 1 ? (
                    <Fragment>
                        {this.state.client === null ? (
                            <MDBContainer className="clearfix">
                                <MDBCard>
                                    <MDBCardHeader color="amber darken-4">
                                        <h1 className="display-4 mb-0">
                                            Client Management
                                        </h1>
                                    </MDBCardHeader>
                                    <MDBCardBody>
                                        <ClientAddModal
                                            toggleModal={
                                                this.state.addClientModalToggle
                                            }
                                            toggle={this.toggleAddClientModal}
                                            handleChange={
                                                this.handleAddClientChange
                                            }
                                            addClientInt={this.addClientInt}
                                            addError={this.state.addError}
                                        />
                                        <ConfirmDeleteModal
                                            toggle={this.confirmDeleteToggle}
                                            modal={
                                                this.state.confirmDeleteModal
                                            }
                                            delete={this.onDeleteClick}
                                            id={this.state.selectedID}
                                        />

                                        <ClientList rowsData={this.rowsData} />
                                        <MDBBtn
                                            className="white-text color orange darken-1 success-btn float-left"
                                            onClick={this.toggleAddClientModal}
                                        >
                                            <i className="fas fa-plus mr-1"></i>
                                            Add Client
                                        </MDBBtn>
                                    </MDBCardBody>
                                </MDBCard>
                            </MDBContainer>
                        ) : (
                            <MDBContainer>
                                <Client
                                    client={this.state.client}
                                    back={this.back}
                                />
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
    client: state.client,
    isAuthenticated: state.auth.isAuthenticated,
    auth: state.auth
});

export default connect(
    mapStateToProps,
    { getClients, deleteClient, addClient }
)(ClientsContent);
