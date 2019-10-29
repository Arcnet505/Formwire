import React, { Component } from 'react';
import { MDBContainer, MDBDataTable } from 'mdbreact';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../../css/styles.css';

class FormList extends Component {
    static propTypes = {
        isAuthenticated: PropTypes.bool
    };

    render() {
        const data = {
            columns: [
                { label: 'Name', field: 'name', sort: 'asc' },
                {
                    label: 'Options',
                    field: 'options'
                }
            ],
            rows: this.props.rowsData
        };

        return (
            <MDBContainer className="">
                <MDBDataTable bordered hover data={data}></MDBDataTable>
            </MDBContainer>
        );
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(
    mapStateToProps,
    {}
)(FormList);
