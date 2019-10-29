import React, { Component } from 'react';
import { MDBContainer } from 'mdbreact';
import ManageContent from '../components/App/Manage/ManageContent';

class Manage extends Component {
    render() {
        return (
            <div className="App mt-4">
                <MDBContainer>
                    <ManageContent />
                </MDBContainer>
            </div>
        );
    }
}

export default Manage;
