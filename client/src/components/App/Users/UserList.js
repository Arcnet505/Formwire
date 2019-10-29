import React, { Component } from 'react';
import { MDBContainer, MDBDataTable } from 'mdbreact';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../../../css/styles.css';

class UserList extends Component {
    static propTypes = {
        isAuthenticated: PropTypes.bool
    };

    componentDidUpdate(prevProps) {
        if (this.props.rowsData !== prevProps.rowsData) {
            this.forceUpdate();
        }
    }

    render() {
        const data = {
            columns: [
                {
                    label: 'Username',
                    field: 'username',
                    sort: 'asc'
                },
                {
                    label: 'Registration Date',
                    field: 'register_date'
                },
                {
                    label: 'Account Level',
                    field: 'level'
                },
                {
                    label: 'Actions',
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
)(UserList);
