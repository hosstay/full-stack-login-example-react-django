function replaceSingleLetterAndMaintainCursor(target, regex, replaceWith) {
  const match = regex.exec(target.value);
  
  if (match) {
    target.value = target.value.replace(regex, replaceWith);
    target.selectionStart = match.index;
    target.selectionEnd = match.index;
  }
}

function charLetterValidator(event) {
  // Replace is resetting cursor to end of text. Any way to stop this?
  if (event.data !== null && !/^[a-zA-Z]$/.test(event.data)) {
    replaceSingleLetterAndMaintainCursor(event.target, /[^a-zA-Z]/, '');
    console.log(event.data);
  }
};

function pasteLetterValidator(event) {
  const paste = (event.clipboardData || window.clipboardData).getData('text');

  if (!/^[a-zA-Z]+$/.test(paste)) {
    event.returnValue = false;
  }
};

export {
  charLetterValidator,
  pasteLetterValidator
};