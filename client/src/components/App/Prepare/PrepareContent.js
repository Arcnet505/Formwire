import React, { Component, Fragment } from 'react';
import {
    MDBContainer,
    MDBBtn,
    MDBCard,
    MDBCardHeader,
    MDBCardFooter,
    MDBCardBody
} from 'mdbreact';
import { connect } from 'react-redux';
import { getForms } from '../../../actions/formActions';
import PropTypes from 'prop-types';
import '../../../css/styles.css';
import FormList from '../FormList';
import ViewModal from '../../modals/ViewModal';
import PrepareList from './PrepareList';
import Assessment from '../../../pages/Assessment';

class PrepareContent extends Component {
    state = {
        viewModal: false,
        submitted: false,
        formData: [],
        formView: [],
        prepList: []
    };

    componentDidMount() {
        this.props.getForms();
    }

    static propTypes = {
        getForms: PropTypes.func.isRequired,
        form: PropTypes.object.isRequired,
        isAuthenticated: PropTypes.bool
    };

    onViewClick = formArg => {
        this.setState({
            formView: formArg.form
        });
        this.toggle();
    };

    onAddForm = formArg => {
        this.setState({
            prepList: this.state.prepList.concat(formArg)
        });
    };

    onRemoveForm = id => {
        this.setState({
            prepList: this.state.prepList.filter(form => form._id !== id)
        });
    };

    onClearList = () => {
        this.setState({ prepList: [] });
    };

    onSubmitList = () => {
        this.setState({
            submitted: !this.state.submitted
        });
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
                        className="white-text add-btn color orange lighten-1"
                        size="sm"
                        onClick={this.onAddForm.bind(this, forms[index])}
                    >
                        <i className="fas fa-plus mr-1"></i>
                        Add
                    </MDBBtn>
                    <MDBBtn
                        className="text-white view-btn color orange darken-1"
                        color="amber lighten-1"
                        size="sm"
                        onClick={this.onViewClick.bind(this, forms[index])}
                    >
                        <i className="far fa-eye mr-1"></i>
                        Preview
                    </MDBBtn>
                </Fragment>
            );
            rowsData.push(rowItem);
        }
        this.rowsData = rowsData;
    };

    render() {
        this.onLoad();

        if (!this.state.submitted) {
            return (
                <MDBContainer className="clearfix">
                    <MDBCard>
                        <MDBCardHeader className="color amber darken-4">
                            <ViewModal
                                content={this.state.formView}
                                toggle={this.toggle}
                                modal={this.state.viewModal}
                            />
                            <h1
                                className="white-text display-4 mb-0"
                                style={{ float: 'left' }}
                            >
                                Form Lists
                            </h1>
                            <MDBBtn
                                onClick={this.props.goBack}
                                style={{ float: 'right' }}
                                className="white-text btn-lg color orange lighten-1"
                            >
                                Back
                            </MDBBtn>
                            {/* <h4 className="mb-3 ml-4">Form List</h4> */}
                        </MDBCardHeader>
                        <MDBCardBody>
                            <FormList rowsData={this.rowsData} />
                        </MDBCardBody>
                        <MDBCardFooter>
                            <div className="text-center">
                                <PrepareList
                                    prepList={this.state.prepList}
                                    onRemoveForm={this.onRemoveForm}
                                    className="mt-3"
                                />

                                <MDBBtn
                                    className="white-text mt-3 color orange darken-4"
                                    type="button"
                                    onClick={this.onClearList}
                                >
                                    Clear List
                                </MDBBtn>
                                <MDBBtn
                                    className="white-text mt-3 color orange lighten-1"
                                    type="button"
                                    onClick={this.onSubmitList}
                                >
                                    Start Assessment
                                </MDBBtn>
                            </div>
                        </MDBCardFooter>
                    </MDBCard>
                </MDBContainer>
            );
        } else {
            return (
                <Assessment
                    clientA={this.props.clientA}
                    content={this.state.prepList}
                />
            );
        }
    }
}

const mapStateToProps = state => ({
    form: state.form,
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(
    mapStateToProps,
    { getForms }
)(PrepareContent);
