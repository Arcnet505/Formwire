import React, { Component } from 'react';
import { MDBContainer } from 'mdbreact';
import AssessmentContent from '../components/App/Assess/AssessmentContent';

class Assessment extends Component {
    render() {
        return (
            <div className="App">
                <MDBContainer>
                    <AssessmentContent
                        clientA={this.props.clientA}
                        content={this.props.content}
                    />
                </MDBContainer>
            </div>
        );
    }
}

export default Assessment;
