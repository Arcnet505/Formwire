import React, { Component, Fragment } from 'react';
import {
    MDBContainer,
    MDBBtn,
    MDBCard,
    MDBCardHeader,
    MDBCardBody
} from 'mdbreact';
import { connect } from 'react-redux';
import { getForms, deleteForm } from '../../../actions/formActions';
import PropTypes from 'prop-types';
import '../../../css/styles.css';
import FormBuilder from './FormBuilder';
import FormList from '../FormList';
import ViewModal from '../../modals/ViewModal';
import ConfirmDeleteModal from '../../modals/ConfirmDeleteModal';
import { NavLink as RRNavLink } from 'react-router-dom';

class ManageContent extends Component {
    state = {
        viewModal: false,
        formData: [],
        formView: [],
        selectedID: '',
        confirmDeleteModal: false
    };

    componentDidMount() {
        this.props.getForms();
    }

    static propTypes = {
        getForms: PropTypes.func.isRequired,
        form: PropTypes.object.isRequired,
        isAuthenticated: PropTypes.bool
    };

    confirmDeleteToggle = id => {
        this.setState({
            selectedID: id,
            confirmDeleteModal: !this.state.confirmDeleteModal
        });
    };

    onDeleteClick = () => {
        this.props.deleteForm(this.state.selectedID);
        this.confirmDeleteToggle();
    };

    onEditClick = formArg => {
        this.setState({
            formData: formArg.form
        });
    };

    onViewClick = formArg => {
        this.setState({
            formView: formArg.form
        });
        this.toggle();
    };

    toggle = () => {
        this.setState({
            viewModal: !this.state.viewModal
        });
    };

    rowsData = [];

    onLoad = () => {
        const { forms } = this.props.form;

        let rowsData = [];
        for (var index = 0; index < forms.length; index++) {
            let rowItem = {};
            rowItem['name'] = forms[index].name;

            rowItem['options'] = (
                <Fragment>
                    <MDBBtn
                        className="view-btn white-text orange lighten-1"
                        color=" "
                        size="sm"
                        onClick={this.onViewClick.bind(this, forms[index])}
                    >
                        <i className="far fa-eye mr-1"></i>
                        View
                    </MDBBtn>
                    {this.props.isAuthenticated ? (
                        <Fragment>
                            <MDBBtn
                                className="edit-btn white-text orange darken-1"
                                color=""
                                size="sm"
                                onClick={this.onEditClick.bind(
                                    this,
                                    forms[index]
                                )}
                            >
                                <i className="fa fa-edit mr-1"></i>
                                Update
                            </MDBBtn>

                            <MDBBtn
                                className="remove-btn white-text orange darken-4"
                                color=""
                                size="sm"
                                onClick={this.confirmDeleteToggle.bind(
                                    this,
                                    forms[index]._id
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
        // console.log(this.rowsData);
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
                        <MDBCard>
                            <MDBCardHeader className="color amber darken-4">
                                <h1 className="display-4 mb-0 white-text">
                                    Form Management
                                </h1>
                            </MDBCardHeader>
                            <MDBCardBody>
                                <MDBContainer style={{ paddingRight: '1%' }}>
                                    <MDBBtn
                                        className="float-right orange darken-1 white-text"
                                        color="yellow"
                                        onClick={this.refresh.bind(this)}
                                    >
                                        <i className="fas fa-sync-alt mr-1"></i>
                                        Refresh
                                    </MDBBtn>
                                </MDBContainer>
                                <FormList rowsData={this.rowsData} />
                            </MDBCardBody>
                        </MDBCard>
                        <br />
                        <MDBCard>
                            <MDBCardHeader className="color amber darken-4">
                                <h1 className="display-4 mb-0 white-text">
                                    Form Creation
                                </h1>
                            </MDBCardHeader>
                            <MDBCardBody>
                                <FormBuilder
                                    formData={this.state.formData}
                                    forms={this.props.form}
                                />
                                <ViewModal
                                    content={this.state.formView}
                                    toggle={this.toggle}
                                    modal={this.state.viewModal}
                                />
                                <ConfirmDeleteModal
                                    toggle={this.confirmDeleteToggle}
                                    modal={this.state.confirmDeleteModal}
                                    delete={this.onDeleteClick}
                                    id={this.state.selectedID}
                                />
                            </MDBCardBody>
                        </MDBCard>
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
                                                    className="white-text text-center float-right btn-lg "
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
                <br />
                <br />
                <br />
            </MDBContainer>
        );
    }
}

const mapStateToProps = state => ({
    form: state.form,
    isAuthenticated: state.auth.isAuthenticated,
    auth: state.auth
});

export default connect(
    mapStateToProps,
    { getForms, deleteForm }
)(ManageContent);
