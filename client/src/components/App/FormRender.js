import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { MDBContainer } from 'mdbreact';

import $ from 'jquery';

window.jQuery = $;
window.$ = $;

require('jquery-ui-sortable');
require('formBuilder');
require('formBuilder/dist/form-render.min.js');

export class FormRender extends Component {
    state = {
        name: '',
        form: []
    };

    static propTypes = {
        isAuthenticated: PropTypes.bool
    };

    defaults = {
        container: false,
        formData: this.props.content,
        dataType: 'json', // 'xml' | 'json'
        label: {
            formRendered: 'Form Rendered',
            noFormData: 'No form data.',
            other: 'Other',
            selectColor: 'Select Color'
        },
        render: true,
        notify: {
            error: function(message) {
                return console.error(message);
            },
            success: function(message) {
                return console.log(message);
            },
            warning: function(message) {
                return console.warn(message);
            }
        }
    };

    //load existing form in to form render element
    fb = createRef();
    componentDidMount() {
        $($ => {
            const code = document.getElementById('fb-render');
            const addLineBreaks = html =>
                html.replace(new RegExp('><', 'g'), '>\n<');

            // Grab markup and escape it
            const $markup = $('<div/>');
            $markup.formRender(this.defaults);

            // set < code > innerHTML with escaped markup
            code.innerHTML = addLineBreaks($markup.formRender('html'));
        });
    }

    //add form to state
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
        // Save form using addForm;
        const dataType = 'json'; // optional 'js'|'json'|'xml', defaults 'js'
        const formData = $(this.fb).formBuilder('getData', dataType);

        this.onSubmit(document.getElementById('formName'), formData);
    };

    render() {
        return (
            <MDBContainer className="">
                <div id="fb-render"></div>
            </MDBContainer>
        );
    }
}

const mapStateToProps = state => ({});

export default connect(
    mapStateToProps,
    null
)(FormRender);
