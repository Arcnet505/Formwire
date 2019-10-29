import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
    MDBContainer,
    MDBBtn,
    MDBCard,
    MDBCardBody,
    MDBCardHeader
} from 'mdbreact';
import PrepareContent from '../Prepare/PrepareContent';
import { getSingleClient, getClients } from '../../../actions/clientActions';
import ClientConfirmModal from '../../modals/ClientConfirmModal';
import ClientList from '../Clients/ClientList';

export class SelectClient extends Component {
    state = {
        clientConfirmModalToggle: false,
        clientFound: false,
        client: {},
        searchID: '',
        lastResort: {}
    };

    static propTypes = {
        client: PropTypes.object.isRequired,
        getSingleClient: PropTypes.func.isRequired
    };

    onChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    toggleFound = () => {
        this.toggleConfirmModal();
        this.setState({
            clientFound: !this.state.clientFound
        });
    };

    toggleConfirmModal = () => {
        this.setState({
            clientConfirmModalToggle: !this.state.clientConfirmModalToggle
        });
    };

    resetPage = () => {
        this.setState({
            clientConfirmModalToggle: false,
            clientFound: false
        });
    };

    componentDidMount() {
        this.props.getClients();
    }

    searchForClient = async () => {
        this.props.getSingleClient(this.state.searchID);
        var newClient = this.props.client.clients[0];

        var go = false;
        for (var b = 0; b < 5; b++) {
            if (newClient === undefined) {
                this.props.getSingleClient(this.state.searchID);
                newClient = this.props.client.clients[0];
            } else {
                if (newClient.clientID === this.state.searchID) {
                    go = true;
                    break;
                }
            }
        }

        if (newClient !== undefined && go) {
            this.setState({
                client: newClient
            });
            this.toggleConfirmModal();
        }
    };

    assessClient = client => {
        this.setState({
            client: client
        });
        this.toggleConfirmModal();
    };

    onLoad = () => {
        const { clients } = this.props.client;

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
                        onClick={this.assessClient.bind(this, clients[index])}
                    >
                        <i className="fas fa-pencil-alt mr-1"></i>
                        Assess
                    </MDBBtn>
                </Fragment>
            );
            rowsData.push(rowItem);
        }
        this.rowsData = rowsData;
    };

    render() {
        const { isAuthenticated } = this.props.auth;
        this.onLoad();
        if (!this.state.clientFound) {
            return (
                <MDBContainer className="clearfix">
                    {isAuthenticated ? (
                        <Fragment>
                            <MDBCard>
                                <MDBCardHeader color="amber darken-4">
                                    <h1 className="display-4 mb-0">
                                        Client Assessment
                                    </h1>
                                </MDBCardHeader>
                                <MDBCardBody>
                                    <h3>
                                        Please Search a Client ID to begin an
                                        assessment
                                    </h3>
                                    <ClientList rowsData={this.rowsData} />
                                    <ClientConfirmModal
                                        modal={
                                            this.state.clientConfirmModalToggle
                                        }
                                        client={this.state.client}
                                        toggle={this.toggleConfirmModal}
                                        toggleFound={this.toggleFound}
                                    />
                                </MDBCardBody>
                            </MDBCard>
                        </Fragment>
                    ) : null}
                    <br />
                    <br />
                    <br />
                </MDBContainer>
            );
        } else {
            return (
                <MDBContainer>
                    {isAuthenticated ? (
                        <Fragment>
                            <PrepareContent
                                clientA={this.state.client}
                                goBack={this.resetPage}
                            />
                        </Fragment>
                    ) : null}
                    <br />
                    <br />
                    <br />
                </MDBContainer>
            );
        }
    }
}

function mapStateToProps(state) {
    return {
        client: state.client,
        auth: state.auth
    };
}

export default connect(
    mapStateToProps,
    { getSingleClient, getClients }
)(SelectClient);
