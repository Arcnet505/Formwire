import React, { Component, Fragment } from 'react';
import {
    MDBContainer,
    MDBTable,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBCardHeader,
    MDBBtn
} from 'mdbreact';
import { connect } from 'react-redux';
import { getForms } from '../../../actions/formActions';
import PropTypes from 'prop-types';
import FormRender from '../FormRender';
import Graph from './Graph';
import GraphAll from './GraphAll';

class Analytics extends Component {
    state = {
        formSelect: [],
        dateSelect: [],
        hideDateList: true,
        dateSelectKey: '',
        result: null,
        form: null
    };

    componentDidMount() {
        this.props.getForms();
        var forms = [];
        var tempForm;

        //check form list isn't empty
        for (var i = 0; i < this.props.client.formResults.length; i++) {
            if (forms.length === 0) {
                tempForm = {
                    id: this.props.client.formResults[i].formID,
                    name: this.props.client.formResults[i].formName,
                    formResults: [this.props.client.formResults[i]]
                };
                forms.push(tempForm);
            } else {
                var addIndex = -1;
                for (var j = 0; j < forms.length; j++) {
                    if (
                        forms[j].id === this.props.client.formResults[i].formID
                    ) {
                        addIndex = j;
                    }
                }
                if (addIndex === -1) {
                    tempForm = {
                        id: this.props.client.formResults[i].formID,
                        name: this.props.client.formResults[i].formName,
                        formResults: [this.props.client.formResults[i]]
                    };
                    forms.push(tempForm);
                } else {
                    var addBool = true;
                    for (
                        var k = 0;
                        k < forms[addIndex].formResults.length;
                        k++
                    ) {
                        if (
                            forms[addIndex].formResults[k].formDate ===
                            this.props.client.formResults[i].formDate
                        ) {
                            addBool = false;
                        }
                    }

                    if (addBool) {
                        forms[addIndex].formResults.push(
                            this.props.client.formResults[i]
                        );
                    }
                }
            }
        }

        //save list of forms to state
        this.setState({
            formSelect: forms
        });
    }

    static propTypes = {
        getForms: PropTypes.func.isRequired,
        form: PropTypes.object.isRequired
    };

    handleFormSelect = e => {
        this.setState({
            dateSelect: this.state.formSelect[e.target.value].formResults,
            hideDateList: false,
            dateSelectKey: this.state.formSelect[e.target.value].formID,
            result: null,
            form: null
        });
    };

    handleDateSelect = e => {
        this.setState({
            result: this.state.dateSelect[e.target.value]
        });

        const { forms } = this.props.form;

        for (var i = 0; i < forms.length; i++) {
            if (forms[i]._id === this.state.dateSelect[e.target.value].formID) {
                this.setState({
                    form: forms[i]
                });
            }
        }
    };

    loadResults = () => {
        this.queryCheck();
    };

    queryCheck = () => {
        setTimeout(
            function() {
                var content = document.querySelectorAll(
                    'input,textarea, option'
                );
                var results = this.state.result.formData;

                for (var resInc = 0; resInc < results.length; resInc++) {
                    for (var conInc = 0; conInc < content.length; conInc++) {
                        if (
                            results[resInc].type.includes('radio-group') &&
                            content[conInc].id.includes('radio-group')
                        ) {
                            if (content[conInc].id === results[resInc].id) {
                                content[conInc].checked = true;
                                break;
                            }
                        } else if (
                            results[resInc].type.includes('number') &&
                            content[conInc].id.includes('number')
                        ) {
                            if (content[conInc].id === results[resInc].id) {
                                content[conInc].value = results[resInc].value;
                                break;
                            }
                        } else if (
                            results[resInc].type.includes('textarea') &&
                            content[conInc].id.includes('textarea')
                        ) {
                            if (content[conInc].id === results[resInc].id) {
                                content[conInc].value = results[resInc].value;
                                break;
                            }
                        } else if (
                            results[resInc].type.includes('text') &&
                            content[conInc].id.includes('text')
                        ) {
                            if (content[conInc].id === results[resInc].id) {
                                content[conInc].value = results[resInc].value;
                                break;
                            }
                        } else if (
                            results[resInc].type.includes('checkbox') &&
                            content[conInc].id.includes('checkbox')
                        ) {
                            for (
                                var f = 0;
                                f < results[resInc].values.length;
                                f++
                            ) {
                                if (
                                    content[conInc].id ===
                                    results[resInc].values[f].id
                                ) {
                                    content[conInc].checked = true;
                                    break;
                                }
                            }
                        } else if (
                            results[resInc].type.includes('select') &&
                            content[conInc].id.includes('select')
                        ) {
                            for (
                                var f = 0;
                                f < results[resInc].values.length;
                                f++
                            ) {
                                console.log(
                                    content[conInc].id +
                                        ' <-> ' +
                                        results[resInc].values[f].id
                                );
                                if (
                                    content[conInc].id ===
                                    results[resInc].values[f].id
                                ) {
                                    content[conInc].selected = true;
                                    break;
                                }
                            }
                        }
                    }
                }
            }.bind(this),
            400
        );
    };

    dateReturn = d => {
        var date = new Date(d);
        var month = parseInt(date.getMonth()) + 1;
        return date.getDate() + '/' + month + '/' + date.getFullYear();
    };

    render() {
        return (
            <MDBContainer>
                <MDBCard>
                    <MDBCardHeader className="color amber darken-4">
                        <div className="clearfix">
                            <h1 className="white-text display-4 mb-0 float-left">
                                Result Analytics
                            </h1>
                            <MDBBtn
                                onClick={this.props.back}
                                className="white-text float-right btn-lg color orange lighten-1"
                            >
                                Back
                            </MDBBtn>
                        </div>
                    </MDBCardHeader>
                    <MDBCardBody>
                        <table style={{ width: '100%' }}>
                            <tr>
                                <td>
                                    <h3>
                                        Client ID:{' '}
                                        <b>{this.props.client.clientID}</b>{' '}
                                        <br />
                                        Client DOB:{' '}
                                        <b>
                                            {this.dateReturn(
                                                this.props.client.dob
                                            )}
                                        </b>
                                    </h3>
                                </td>
                                <td></td>
                            </tr>
                        </table>

                        <br></br>
                        <br></br>
                        <MDBTable>
                            <MDBRow>
                                <MDBCol>
                                    Please select form to inspect:
                                    <select
                                        className="browser-default custom-select"
                                        onChange={this.handleFormSelect}
                                    >
                                        <option value="" disabled selected>
                                            Forms Completed
                                        </option>
                                        {this.state.formSelect.map(
                                            (result, index) => (
                                                <option
                                                    key={result.id}
                                                    value={index}
                                                >
                                                    {result.name}
                                                </option>
                                            )
                                        )}
                                    </select>
                                    <br />
                                    <br />
                                </MDBCol>
                                <MDBCol>
                                    Please Select the date the form was
                                    completed:
                                    <select
                                        className="browser-default custom-select"
                                        disabled={this.state.hideDateList}
                                        onChange={this.handleDateSelect}
                                        key={this.state.dateSelect}
                                    >
                                        <option value="" disabled selected>
                                            Dates Completed
                                        </option>
                                        {this.state.dateSelect.map(
                                            (result, index) => (
                                                <option
                                                    key={result.resultID}
                                                    value={index}
                                                >
                                                    {this.dateReturn(
                                                        result.formDate
                                                    )}
                                                </option>
                                            )
                                        )}
                                    </select>
                                </MDBCol>
                            </MDBRow>
                            <MDBRow>
                                <MDBCol key={this.state.form}>
                                    {this.state.form !== null ? (
                                        <Fragment>
                                            <fieldset disabled="disabled">
                                                <FormRender
                                                    content={
                                                        this.state.form.form
                                                    }
                                                />
                                            </fieldset>
                                            {this.loadResults()}
                                        </Fragment>
                                    ) : null}
                                </MDBCol>
                                <MDBCol>
                                    {this.state.result !== null ? (
                                        <MDBContainer>
                                            {this.state.result.formData.map(
                                                question => {
                                                    return (
                                                        <Graph
                                                            type={'line'}
                                                            data={
                                                                this.state
                                                                    .dateSelect
                                                            }
                                                            question={question}
                                                        />
                                                    );
                                                }
                                            )}
                                        </MDBContainer>
                                    ) : null}
                                </MDBCol>
                            </MDBRow>
                            <MDBRow>
                                <MDBCol>
                                    <br />
                                    {this.state.result !== null ? (
                                        <Fragment>
                                            <GraphAll
                                                data={this.state.dateSelect}
                                                name={this.state.form.name}
                                            />
                                        </Fragment>
                                    ) : null}
                                </MDBCol>
                            </MDBRow>
                        </MDBTable>
                    </MDBCardBody>
                </MDBCard>
            </MDBContainer>
        );
    }
}

const mapStateToProps = state => ({
    form: state.form
});

export default connect(
    mapStateToProps,
    { getForms }
)(Analytics);
