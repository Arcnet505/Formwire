import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { MDBContainer, MDBBtn, MDBCard, MDBCardBody } from 'mdbreact';
import FormRender from '../FormRender';
import { Redirect } from 'react-router-dom';
import { addFormToClient } from '../../../actions/clientActions';
import { logout } from '../../../actions/authActions';

import { NavLink as RRNavLink } from 'react-router-dom';

import $ from 'jquery';

window.jQuery = $;
window.$ = $;

export class AssessmentContent extends Component {
    static propTypes = {
        addFormToClient: PropTypes.func.isRequired,
        logout: PropTypes.func.isRequired
    };

    state = {
        currentForm: 0,
        content: [],
        userForms: [],
        redirect: false
    };

    changeRedirect = () => {
        this.setState({
            redirect: true
        });
    };

    //timer to log out user and redirect to home
    waitAndRedirect = () => {
        setTimeout(
            function() {
                this.setState({ redirect: true });
                this.props.logout();
                this.changeRedirect();
            }.bind(this),
            10000
        );
    };

    //handle form submission
    onSubmit = () => {
        //form data json
        var form = JSON.parse(this.props.content[this.state.currentForm].form);

        var formResults = [];

        var formRaw = document.querySelectorAll(
            'textarea,input,number,checkbox-group,select'
        );

        //check to see that required fields have been filled
        var filledOut = 0;
        for (var inc = 0; inc < formRaw.length; inc++) {
            if (formRaw[inc].name.includes('radio-group')) {
                if (formRaw[inc].checked === true) {
                    formResults.push({
                        type: 'radio-group',
                        name: formRaw[inc].name,
                        id: formRaw[inc].id,
                        value: formRaw[inc].value,
                        checked: true,
                        graphIt: true
                    });
                    if (formRaw[inc].required === true) {
                        filledOut += 1;
                    }
                }
            } else if (
                formRaw[inc].name.includes('textarea') ||
                formRaw[inc].name.includes('text')
            ) {
                if (formRaw[inc].value.replace(/\s/g, '').length > 0) {
                    formResults.push({
                        type: 'text',
                        name: formRaw[inc].name,
                        value: formRaw[inc].value,
                        id: formRaw[inc].id
                    });
                    if (formRaw[inc].required === true) {
                        filledOut += 1;
                    }
                }
            } else if (formRaw[inc].name.includes('select')) {
                var getOptions = document.querySelectorAll('option');
                var temp = [];
                for (var optInc = 0; optInc < getOptions.length; optInc++) {
                    if (
                        getOptions[optInc].id.includes(
                            formRaw[inc].name.replace('[]', '')
                        )
                    ) {
                        if (getOptions[optInc].selected === true) {
                            temp.push({
                                id: getOptions[optInc].id,
                                value: getOptions[optInc].value,
                                selected: true
                            });
                        }
                    }
                }
                formResults.push({
                    type: 'select',
                    id: formRaw[inc].id,
                    name: formRaw[inc].name,
                    values: temp,
                    graphIt: true
                });

                if (formRaw[inc].required === true) {
                    filledOut += 1;
                }
            } else if (formRaw[inc].name.includes('number')) {
                if (formRaw[inc].value.replace(/\s/g, '').length > 0) {
                    formResults.push({
                        type: 'number',
                        name: formRaw[inc].name,
                        value: formRaw[inc].value,
                        graphIt: true,
                        id: formRaw[inc].id
                    });

                    if (formRaw[inc].required === true) {
                        filledOut += 1;
                    }
                }
            }
        }

        var checkboxLabelsRaw = document.querySelectorAll('label');
        var checkboxInputsRaw = document.querySelectorAll('input');

        for (
            var labelInc = 0;
            labelInc < checkboxLabelsRaw.length;
            labelInc++
        ) {
            if (
                checkboxLabelsRaw[labelInc].htmlFor.includes(
                    'checkbox-group'
                ) &&
                checkboxLabelsRaw[labelInc].className ===
                    'fb-checkbox-group-label'
            ) {
                var values = [];
                var wasReq = false;
                for (
                    var inputInc = 0;
                    inputInc < checkboxInputsRaw.length;
                    inputInc++
                ) {
                    if (
                        checkboxInputsRaw[inputInc].name.includes(
                            checkboxLabelsRaw[labelInc].htmlFor
                        ) &&
                        checkboxInputsRaw[inputInc].checked === true
                    ) {
                        values.push({
                            name: checkboxInputsRaw[inputInc].name,
                            id: checkboxInputsRaw[inputInc].id,
                            value: checkboxInputsRaw[inputInc].value,
                            selected: true
                        });
                        if (
                            checkboxInputsRaw[inputInc].outerHTML.includes(
                                'aria-required="true"'
                            )
                        ) {
                            wasReq = true;
                        }
                    }
                }
                if (wasReq) {
                    filledOut += 1;
                }
                formResults.push({
                    type: 'checkbox-group',
                    id: 'checkbox-group',
                    htmlFor: checkboxLabelsRaw[labelInc].htmlFor,
                    values: values
                });
            }
        }

        //checks how many elements are required in the form
        var fillOutAble = 0;
        for (var i = 0; i < form.length; i++) {
            if (
                (form[i].type === 'textarea' ||
                    form[i].type === 'radio-group' ||
                    form[i].type === 'checkbox-group' ||
                    form[i].type === 'number' ||
                    form[i].type === 'select' ||
                    form[i].type === 'text') &&
                form[i].required === true
            ) {
                fillOutAble += 1;
            }
        }

        //if they are filled out, allow storing of form
        if (filledOut >= fillOutAble) {
            var tempUserForms = this.state.userForms;
            var tempDate = new Date();
            tempUserForms.push({
                formID: this.props.content[this.state.currentForm]._id,
                formName: this.props.content[this.state.currentForm].name,
                formData: formResults,
                formDate: tempDate.toString()
            });

            this.setState({
                currentForm: this.state.currentForm + 1,
                userForms: tempUserForms
            });
        }
    };

    saveToClient = () => {
        for (var f = 0; f < this.state.userForms.length; f++) {
            this.props.addFormToClient(
                this.props.clientA.clientID,
                this.state.userForms[f]
            );
        }
    };

    render() {
        const { isAuthenticated } = this.props.auth;
        if (this.props.content.length !== this.state.currentForm) {
            return (
                <MDBContainer>
                    {isAuthenticated ? (
                        <Fragment>
                            <MDBCard style={{ padding: '10px' }}>
                                <form>
                                    <FormRender
                                        key={this.state.currentForm}
                                        content={
                                            this.props.content[
                                                this.state.currentForm
                                            ].form
                                        }
                                    />
                                    <MDBBtn
                                        className="white-text color orange darken-1"
                                        type="button"
                                        onClick={this.onSubmit}
                                    >
                                        Submit
                                    </MDBBtn>
                                </form>
                            </MDBCard>
                        </Fragment>
                    ) : (
                        <Fragment>
                            <MDBCard>
                                <MDBCardBody>
                                    <span>Please login to view this page</span>
                                    <MDBBtn
                                        className="white-text text-center float-right"
                                        color="primary"
                                        tag={RRNavLink}
                                        to="/"
                                    >
                                        Return Home
                                    </MDBBtn>
                                </MDBCardBody>
                            </MDBCard>
                        </Fragment>
                    )}
                </MDBContainer>
            );
        } else if (this.state.redirect === true) {
            return <Redirect to="/" />;
        } else {
            this.saveToClient();
            return (
                <MDBContainer>
                    {isAuthenticated ? (
                        <Fragment>
                            <MDBCard>
                                <MDBCardBody>
                                    <div className="card-body">
                                        <h4 className="card-title text-center">
                                            <p>
                                                Thank you for completing the
                                                forms
                                            </p>
                                        </h4>
                                        <p className="card-text text-center">
                                            Please return the iPad to the
                                            receptionist.
                                            <br></br>
                                            Returning to home screen shortly.
                                        </p>
                                        <div className="d-flex justify-content-center">
                                            <div
                                                className="spinner-border text-warning text-centered"
                                                role="status"
                                            >
                                                <span className="sr-only">
                                                    Loading...
                                                </span>
                                            </div>
                                        </div>
                                        {this.waitAndRedirect()}
                                    </div>
                                </MDBCardBody>
                            </MDBCard>
                        </Fragment>
                    ) : (
                        <Fragment>
                            <MDBCard>
                                <MDBCardBody>
                                    <span>Please login to view this page</span>
                                    <MDBBtn
                                        className="white-text text-center float-right"
                                        color="primary"
                                        tag={RRNavLink}
                                        to="/"
                                    >
                                        Return Home
                                    </MDBBtn>
                                </MDBCardBody>
                            </MDBCard>
                        </Fragment>
                    )}
                </MDBContainer>
            );
        }
    }
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(
    mapStateToProps,
    { addFormToClient, logout }
)(AssessmentContent);
