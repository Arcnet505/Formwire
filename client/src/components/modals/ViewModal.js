import React, { Component } from 'react';
import { MDBContainer, MDBModal, MDBModalBody } from 'mdbreact';
import { connect } from 'react-redux';
import FormRender from '../App/FormRender';

import $ from 'jquery';

window.jQuery = $;
window.$ = $;

require('jquery-ui-sortable');
require('formBuilder');

class ViewModal extends Component {
    state = {};

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        });
    };

    render() {
        return (
            <MDBContainer size="lg">
                <MDBModal
                    isOpen={this.props.modal}
                    toggle={this.props.toggle}
                    centered
                    size="lg"
                >
                    <MDBModalBody>
                        <FormRender content={this.props.content} />
                    </MDBModalBody>
                </MDBModal>
            </MDBContainer>
        );
    }
}

const mapStateToProps = state => ({});

export default connect(
    mapStateToProps,
    {}
)(ViewModal);
