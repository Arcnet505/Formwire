import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { MDBContainer } from 'mdbreact';
import FormRender from '../FormRender';

export class FormDisplay extends Component {
    static propTypes = {
        prop: PropTypes
    };

    render() {
        return (
            <MDBContainer>
                <form>
                    <FormRender content={this.props.content} />
                    <input type="submit" value="Submit" />
                </form>
            </MDBContainer>
        );
    }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FormDisplay);
