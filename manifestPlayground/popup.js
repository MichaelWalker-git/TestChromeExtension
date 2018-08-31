const nameField = document.getElementById('name');
const changeTextViaInput = () => {
  const greet = document.getElementById('greet');
  greet.val = `Hello ${nameField.value}`;
};

document.getElementById('greet').addEventListener('keyup', changeTextViaInput);
