import React, { Component, createRef } from 'react';
import { MDBContainer, MDBBtn, MDBAlert } from 'mdbreact';
import { addForm } from '../../../actions/formActions';
import { connect } from 'react-redux';
import $ from 'jquery';
import PropTypes from 'prop-types';

window.jQuery = $;
window.$ = $;

require('jquery-ui-sortable');
require('formBuilder');

class FormBuilder extends Component {
    state = {
        name: '',
        error: ''
    };

    static propTypes = {
        isAuthenticated: PropTypes.bool
    };

    //reference to formbuilder
    fb = createRef();
    componentDidMount() {
        $(this.fb.current).formBuilder(this.options);
    }

    componentDidUpdate() {
        this.handleUpdate();
    }

    //formbuilder component settings
    options = {
        formData: this.props.formData,
        disabledActionButtons: ['data', 'save'],
        disabledAttrs: [
            'access',
            'className',
            'description',
            // 'inline',
            // 'label',
            // 'max',
            // 'maxlength',
            // 'min',
            // 'multiple',
            'name',
            // 'options',
            'other',
            //'placeholder',
            // 'required',
            'rows',
            'step',
            //'style',
            // 'subtype',
            'toggle',
            'value'
        ],
        disabledSubtypes: {
            text: ['password', 'color', 'tel', 'email'],
            paragraph: ['address', 'blockquote', 'canvas', 'output'],
            textarea: ['quill', 'tinymce']
        },
        disableFields: [
            'autocomplete',
            // 'button',
            // 'checkbox-group',
            'date',
            'file',
            // 'header',
            'hidden',
            // 'number',
            // 'paragraph',
            // 'radio-group',
            // 'select',
            'starRating'
            // 'text',
            // 'textarea'
        ]
    };

    //add form to database
    onSubmit = (nameArg, formArg) => {
        this.setState(
            {
                name: nameArg.value,
                form: formArg
            },
            () => {
                const newForm = {
                    name: this.state.name,
                    form: this.state.form
                };

                // Add form via addForm action
                this.props.addForm(newForm);
            }
        );
    };

    handleSubmit = () => {
        //error checking (has a name, isn't a duplicate)
        if (document.getElementById('formName').value === '') {
            this.setState({
                error: 'Please enter a form name:'
            });
        } else {
            const { forms } = this.props.forms;
            var add = true;
            for (var i = 0; i < forms.length; i++) {
                if (
                    forms[i].name === document.getElementById('formName').value
                ) {
                    add = false;
                }
            }
            if (add) {
                this.setState({
                    error: ''
                });
                const dataType = 'json'; // optional 'js'|'json'|'xml', defaults 'js'
                const formData = $(this.fb).formBuilder('getData', dataType);
                this.onSubmit(document.getElementById('formName'), formData);
            } else {
                this.setState({
                    error: 'Please enter a form name that does not exist.'
                });
            }
        }
    };

    handleUpdate = () => {
        const formData = this.props.formData;

        $(this.fb).formBuilder('setData', formData);
    };

    render() {
        return (
            <MDBContainer className="">
                <div id="fb-editor" className="" ref={this.fb}></div>
                <hr />
                {this.state.error ? (
                    <MDBAlert color="danger">{this.state.error}</MDBAlert>
                ) : null}
                <form className="justify-content-center">
                    <table>
                        <tr>
                            <td>
                                <h4 className="input-group-text mr-1">
                                    Form Name:
                                </h4>
                            </td>
                            <td className="mx-5">
                                <input
                                    className="form-control"
                                    id="formName"
                                    name="name"
                                />
                            </td>
                            <td>
                                <MDBBtn
                                    className="white-text orange lighten-1"
                                    onClick={this.handleSubmit}
                                >
                                    Submit Form
                                </MDBBtn>
                            </td>
                        </tr>
                    </table>
                </form>
            </MDBContainer>
        );
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(
    mapStateToProps,
    { addForm }
)(FormBuilder);
