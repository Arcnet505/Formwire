import React, { Component } from 'react';
import {
    MDBContainer,
    MDBBtn,
    MDBModal,
    MDBModalBody,
    MDBModalHeader,
    MDBModalFooter,
    MDBInput,
    MDBAlert
} from 'mdbreact';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addClient } from '../../actions/clientActions';
import { clearErrors } from '../../actions/errorActions';

class ClientAddModal extends Component {
    state = {
        modal: false,
        loadYearsOnce: true,
        days: [
            1,
            2,
            3,
            4,
            5,
            6,
            7,
            8,
            9,
            10,
            11,
            12,
            13,
            14,
            15,
            16,
            17,
            18,
            19,
            20,
            21,
            22,
            23,
            24,
            25,
            26,
            27,
            28,
            29,
            30,
            31
        ],
        months: [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December'
        ],
        years: [],
        msg: null
    };

    static propTypes = {
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        addClient: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
    };

    componentDidUpdate(prevProps) {
        const { error } = this.props;
        if (error !== prevProps.error) {
            // Check for an add client error
            if (error.id === 'CLIENT_ADD_FAIL') {
                this.setState({ msg: error.msg.msg });
            } else {
                this.setState({ msg: null });
            }
        }
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    };

    getPickerValue = value => {
        console.log(value);
    };

    loadYears = () => {
        const year = new Date().getFullYear();
        const newYears = Array(120);
        var i = 0;

        for (var y = parseInt(year); y > parseInt(year) - 120; y--) {
            newYears[i] = y;
            i++;
        }

        this.setState({
            years: newYears
        });

        this.setState({
            loadYearsOnce: !this.state.loadYearsOnce
        });
    };

    render() {
        if (this.state.loadYearsOnce) {
            this.loadYears();
        }
        return (
            <MDBContainer className="modal-sm">
                <MDBModal
                    isOpen={this.props.toggleModal}
                    toggle={this.props.toggle}
                    centered
                >
                    <MDBModalHeader
                        className="text-center amber darken-4 white-text"
                        titleClass="w-100 font-weight-bold"
                        toggle={this.props.toggle}
                    >
                        Add Client
                    </MDBModalHeader>
                    <MDBModalBody>
                        {this.props.addError !== '' ? (
                            <MDBAlert color="danger">
                                {this.props.addError}
                            </MDBAlert>
                        ) : null}
                        <form>
                            <div className="grey-text">
                                <MDBInput
                                    label="Type the Client ID"
                                    icon="user"
                                    group
                                    validate
                                    error="wrong"
                                    success="right"
                                    id="clientID"
                                    className="mb-3 black-text"
                                    onChange={this.props.handleChange}
                                />
                            </div>
                            <div>
                                <select
                                    className="browser-default custom-select dropdown-primary selects mb-3 black-text"
                                    id="day"
                                    onChange={this.props.handleChange}
                                >
                                    <option value="" disabled selected>
                                        Day
                                    </option>
                                    {this.state.days.map(day => {
                                        return (
                                            <option key={day} value={day}>
                                                {day}
                                            </option>
                                        );
                                    })}
                                </select>
                                <select
                                    className="browser-default custom-select dropdown-primary selects mb-3 black-text"
                                    id="month"
                                    onChange={this.props.handleChange}
                                >
                                    <option value="" disabled selected>
                                        Month
                                    </option>
                                    {this.state.months.map((month, index) => {
                                        return (
                                            <option
                                                key={month}
                                                value={index + 1}
                                            >
                                                {month}
                                            </option>
                                        );
                                    })}
                                </select>
                                <select
                                    className="browser-default custom-select dropdown-primary selects mb-3 black-text"
                                    id="year"
                                    onChange={this.props.handleChange}
                                >
                                    <option value="" disabled selected>
                                        Year
                                    </option>
                                    {this.state.years.map(year => {
                                        return (
                                            <option key={year} value={year}>
                                                {year}
                                            </option>
                                        );
                                    })}
                                </select>
                            </div>
                        </form>
                    </MDBModalBody>
                    <MDBModalFooter className="justify-content-center">
                        <MDBBtn
                            color="orange accent-4"
                            onClick={this.props.toggle}
                        >
                            Cancel
                        </MDBBtn>
                        <MDBBtn
                            color="yellow accent-4"
                            onClick={this.props.addClientInt}
                        >
                            Add
                        </MDBBtn>
                    </MDBModalFooter>
                </MDBModal>
            </MDBContainer>
        );
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error
});

export default connect(
    mapStateToProps,
    { addClient, clearErrors }
)(ClientAddModal);
