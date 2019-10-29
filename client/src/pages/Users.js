import React, { Component } from 'react';
import { MDBContainer } from 'mdbreact';
import UsersContent from '../components/App/Users/UsersContent';

class Users extends Component {
    render() {
        return (
            <MDBContainer className="mt-4">
                <UsersContent />
            </MDBContainer>
        );
    }
}

export default Users;
