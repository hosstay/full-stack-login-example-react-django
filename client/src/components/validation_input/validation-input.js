/*
 Where the obj (in the constructor for the route you're using it in) looks like:
  this.validationObj = {
    id: 'validation_object',
    type: 'textArea'
    class: 'class1 class2',
    onInput: myValidator,
    onPaste: pasteMyValidator,
    onChange: changeMyValidator,
  };

  type parameter is optional, if it's set to 'textArea' it will be a textArea instead of an input.
*/

import React from 'react';
import PropTypes from 'prop-types';

export default class ValidationInput extends React.Component {
  constructor(props) {
    super(props);

    this.params = props.params;
  }

  componentDidMount() {
    const element = document.getElementById(this.params.id);

    if (this.params.onInput) {
      element.addEventListener('input', this.params.onInput);
    }

    if (this.params.onPaste) {
      element.addEventListener('paste', this.params.onPaste);
    }

    if (this.params.onChange) {
      element.addEventListener('change', this.params.onChange);
    }
  }

  render() {
    if (this.params.type === 'textarea') {
      return (
        <div>
          <textarea id={this.params.id} className={this.params.class}></textarea>
        </div>
      );
    } else {
      return (
        <div>
          <input id={this.params.id} className={this.params.class} autoComplete="no"></input>
        </div>
      );
    }
  }
}

ValidationInput.propTypes = {
  params: PropTypes.object
};