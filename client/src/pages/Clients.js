import React, { Component } from 'react';
import { MDBContainer } from 'mdbreact';
import ClientsContent from '../components/App/Clients/ClientsContent';

class Client extends Component {
    render() {
        return (
            <MDBContainer className="mt-4">
                <ClientsContent />
            </MDBContainer>
        );
    }
}

export default Client;
