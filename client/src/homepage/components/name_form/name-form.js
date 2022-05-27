import React from 'react';
import PropTypes from 'prop-types';

import ValidationInput from '../../../components/validation_input/validation-input';

import {sanitize} from '../../../utility/security';
import {
  charLetterValidator,
  pasteLetterValidator
} from '../../../components/validation_input/validators/validators';

export default class NameForm extends React.Component {
  constructor(props) {
    super(props);

    this.labelText = props.labelText;

    this.name;
    this.nameValidators = {
      id: 'name',
      onInput: charLetterValidator,
      onPaste: pasteLetterValidator
    };
  }

  submit() {
    try {
      const cleanInput = sanitize(document.getElementById(this.nameValidators.id).value, 'name', 0, 32);
      document.getElementById('output').innerHTML = `${cleanInput} is awesome!`;
    } catch (err) {
      console.log(err);
      document.getElementById('output').innerHTML = err.message;
    }
  }

  render() {
    return (
      <div>
        <label>{this.labelText}</label>
        <ValidationInput params={this.nameValidators}></ValidationInput>
        <br />
        <br />

        <input type="button" value="Submit" onClick={() => this.submit()}></input>
        <br />

        <p id="output"></p>
      </div>
    );
  }
}

NameForm.propTypes = {
  labelText: PropTypes.string
};