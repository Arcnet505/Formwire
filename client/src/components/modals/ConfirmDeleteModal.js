import React, { Component } from 'react';
import {
    MDBContainer,
    MDBBtn,
    MDBModal,
    MDBModalBody,
    MDBModalHeader,
    MDBModalFooter
} from 'mdbreact';

class ConfirmDeleteModal extends Component {
    render() {
        return (
            <MDBContainer>
                <MDBModal
                    modalStyle="danger"
                    className="text-white"
                    size="sm"
                    position="center"
                    backdrop={false}
                    isOpen={this.props.modal}
                    toggle={this.props.toggle}
                >
                    <MDBModalHeader
                        className="text-center"
                        titleClass="w-100 font-weight-bold"
                        tag="p"
                        toggle={this.props.toggle}
                    >
                        Please confirm
                    </MDBModalHeader>
                    <MDBModalBody className="text-center">
                        Are you sure you wish to delete this?
                    </MDBModalBody>
                    <MDBModalFooter className="justify-content-center">
                        <MDBBtn color="danger" onClick={this.props.delete}>
                            &nbsp;&nbsp; Yes &nbsp;&nbsp;
                        </MDBBtn>
                        <MDBBtn color="white" onClick={this.props.toggle}>
                            Cancel
                        </MDBBtn>
                    </MDBModalFooter>
                </MDBModal>
            </MDBContainer>
        );
    }
}

export default ConfirmDeleteModal;
