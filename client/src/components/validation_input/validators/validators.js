import {getUsernameRegex, getPasswordRegex} from '../../../utility/security';

function replaceSingleLetterAndMaintainCursor(target, regex, replaceWith) {
  const match = regex.exec(target.value);
  
  if (match) {
    target.value = target.value.replace(regex, replaceWith);
    target.selectionStart = match.index;
    target.selectionEnd = match.index;
  }
}

function setFormControlValidity(event, valid) {
  if (valid) {
    event.target.classList.remove('is-invalid');
    event.target.classList.add('is-valid');
  } else {
    event.target.classList.remove('is-valid');
    event.target.classList.add('is-invalid');
  }
}

function charLetterRemoverValidator(event) {
  if (event.data !== null && !/^[a-zA-Z]$/.test(event.data)) {
    replaceSingleLetterAndMaintainCursor(event.target, /[^a-zA-Z]/, '');
    console.log(event.data);
  }
};

function pasteLetterRemoverValidator(event) {
  const paste = (event.clipboardData || window.clipboardData).getData('text');

  if (!/^[a-zA-Z]+$/.test(paste)) {
    event.returnValue = false;
  }
};

function inputUsernameColorValidator(event) {
  if (event.target.value !== null && !getUsernameRegex().test(event.target.value)) {
    setFormControlValidity(event, false)
  } else {
    setFormControlValidity(event, true)
  }
};

function pasteUsernameColorValidator(event) {
  const paste = (event.clipboardData || window.clipboardData).getData('text');

  if (paste !== null && !getUsernameRegex().test(paste)) {
    setFormControlValidity(event, false)
  } else {
    setFormControlValidity(event, true)
  }
};

function inputPasswordColorValidator(event) {
  if (event.target.value !== null && !getPasswordRegex().test(event.target.value)) {
    setFormControlValidity(event, false)
  } else {
    setFormControlValidity(event, true)
  }
};

function pastePasswordColorValidator(event) {
  const paste = (event.clipboardData || window.clipboardData).getData('text');

  if (paste !== null && !getPasswordRegex().test(paste)) {
    setFormControlValidity(event, false)
  } else {
    setFormControlValidity(event, true)
  }
};

export {
  charLetterRemoverValidator,
  pasteLetterRemoverValidator,
  inputUsernameColorValidator,
  pasteUsernameColorValidator,
  inputPasswordColorValidator,
  pastePasswordColorValidator
};