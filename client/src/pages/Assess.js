import React, { Component } from 'react';
import { MDBContainer } from 'mdbreact';
import SelectClient from '../components/App/Assess/SelectClient';

class Assess extends Component {
    render() {
        return (
            <MDBContainer className="mt-4">
                <SelectClient />
            </MDBContainer>
        );
    }
}

export default Assess;
