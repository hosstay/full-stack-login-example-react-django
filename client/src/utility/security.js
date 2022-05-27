import cryptoJs from 'crypto-js';
import pako from 'pako';

function encrypt(data) {
  let result = pako.deflate(JSON.stringify(data), {to: 'string'});
  result = (cryptoJs.AES.encrypt(result, '1234')).toString();
  return result;
}

function decrypt(data) {
  let result = (cryptoJs.AES.decrypt(data, '1234').toString(cryptoJs.enc.Utf8));
  result = JSON.parse(pako.inflate(result, {to: 'string'}));
  return result;
}

function getUsernameRegex() {
  // Username field. 150 characters or fewer. Letters, digits, and @/./+/-/_ only
  return RegExp(/^[\w \@\.\+\-]{0,150}$/);
}

function getPasswordRegex() {
  // Password should have a minimum of 8 characters, at least 1 Lowercase Letter, 1 Uppercase Letter, 1 Number, and 1 Special Character.
  return RegExp(/^^(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*[\d])(?=.*[@#$%^&+*!=]).*$/);
}

/*
  input: the string to sanitize
  id: the field being sanitized
  minLength: the allowable minimum length of the string
  maxLength: the allowable maximum length of the string
*/
function sanitize(input, field, minLength, maxLength) {
  if (!input) {
    throw new Error('No input');
  } else {
    if (minLength && maxLength && (input.length < minLength || input.length > maxLength)) {
      throw new Error(`${field} must be between ${minLength} and ${maxLength} characters.`);
    } else {
      return encodeURIComponent(input);
    }
  }
}

/*
  An extension of sanitize for the login screen that checks
  if the username and password meet the requirements.
*/
function sanitizeLogin(input, field) {
  let regex;
  let errorMessage = 'Please enter a correct username and password. Note that both fields may be case-sensitive.';

  if (field === 'username') {
    regex = getUsernameRegex();
  } else if (field === 'password') {
    regex = getPasswordRegex();
  } else {
    throw new Error('Something went wrong');
  }

  if (!regex.test(input)) {
    throw new Error(errorMessage);
  } else {
    return sanitize(input, field);
  }
}

export {
  encrypt,
  decrypt,
  getUsernameRegex,
  getPasswordRegex,
  sanitize,
  sanitizeLogin
};