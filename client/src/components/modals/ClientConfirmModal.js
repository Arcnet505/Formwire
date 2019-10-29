import React, { Component } from 'react';
import {
    MDBModal,
    MDBModalBody,
    MDBModalHeader,
    MDBModalFooter,
    MDBBtn
} from 'mdbreact';
import { connect } from 'react-redux';

import $ from 'jquery';

window.jQuery = $;
window.$ = $;

require('jquery-ui-sortable');
require('formBuilder');

class ViewModal extends Component {
    state = {
        loadDate: true
    };

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    };

    //Convert date to human readable format
    componentDidUpdate() {
        if (this.state.loadDate) {
            var tempDate = new Date(this.props.client.dob);
            var month = parseInt(tempDate.getMonth()) + 1;
            var date =
                tempDate.getDate() + '/' + month + '/' + tempDate.getFullYear();
            this.setState({
                date: date,
                loadDate: false
            });
        }
    }

    quit = () => {
        this.props.toggle();
        this.setState({
            loadDate: true
        });
    };

    render() {
        return (
            <MDBModal
                isOpen={this.props.modal}
                toggle={this.props.toggle}
                centered
            >
                <MDBModalHeader
                    className="text-center amber darken-4 white-text"
                    titleClass="w-100 font-weight-bold"
                >
                    Is this the correct client?
                </MDBModalHeader>
                <MDBModalBody>
                    {this.props.client !== null ? (
                        <div className="text-center">
                            <p>
                                Client ID : <b>{this.props.client.clientID}</b>
                            </p>
                            <p>
                                Client DOB: <b>{this.state.date}</b>
                            </p>
                        </div>
                    ) : null}
                </MDBModalBody>
                <MDBModalFooter className="justify-content-center">
                    <MDBBtn
                        className="white-text color orange darken-4 px-3"
                        onClick={this.quit}
                    >
                        No
                    </MDBBtn>
                    <MDBBtn
                        className="white-text color orange lighten-1 px-3"
                        onClick={this.props.toggleFound}
                    >
                        Yes
                    </MDBBtn>
                </MDBModalFooter>
            </MDBModal>
        );
    }
}

const mapStateToProps = state => ({});

export default connect(
    mapStateToProps,
    {}
)(ViewModal);
