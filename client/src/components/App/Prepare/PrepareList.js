import React, { Component } from 'react';
import { MDBContainer, MDBListGroup, MDBListGroupItem, MDBBtn } from 'mdbreact';
import { connect } from 'react-redux';
import { getForms } from '../../../actions/formActions';
import PropTypes from 'prop-types';
import '../../../css/styles.css';

class PrepareList extends Component {
    componentDidMount() {
        this.props.getForms();
    }

    static propTypes = {
        getForms: PropTypes.func.isRequired,
        form: PropTypes.object.isRequired,
        isAuthenticated: PropTypes.bool
    };

    render() {
        return (
            <MDBContainer>
                <h3>Selected Forms</h3>

                <MDBListGroup>
                    {this.props.prepList.map(form => (
                        <MDBListGroupItem
                            className="d-flex justify-content-between align-items-center"
                            key={form._id}
                        >
                            {form.name}
                            <MDBBtn
                                className="white-text color orange darken-4"
                                color="danger"
                                size="sm"
                                onClick={() =>
                                    this.props.onRemoveForm(form._id)
                                }
                            >
                                Remove
                            </MDBBtn>
                        </MDBListGroupItem>
                    ))}
                </MDBListGroup>
            </MDBContainer>
        );
    }
}

const mapStateToProps = state => ({
    form: state.form,
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(
    mapStateToProps,
    { getForms }
)(PrepareList);
