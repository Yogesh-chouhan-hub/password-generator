const uppercaseCharacters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const lowercaseCharacters = "abcdefghijklmnopqrstuvwxyz";

const numberCharacters = "0123456789";

const specialCharacters = "!@#$%^&*()_+-=[]{}|;:,.<>?";

const passwordInput = document.getElementById("password");

const lengthInput = document.getElementById("length");

const lengthValue = document.getElementById("lengthValue");

const uppercaseCheckbox = document.getElementById("uppercase");

const lowercaseCheckbox = document.getElementById("lowercase");

const numbersCheckbox = document.getElementById("numbers");

const symbolsCheckbox = document.getElementById("symbols");

const generateButton = document.getElementById("generateBtn");

const message = document.getElementById("message");

lengthInput.addEventListener("input", function () {
  lengthValue.textContent = lengthInput.value;
});

function getRandomCharacter(characterSet) {
  const randomIndex = Math.floor(Math.random() * characterSet.length);

  return characterSet[randomIndex];
}

function generatePassword() {
  message.textContent = "";

  const length = Number(lengthInput.value);

  let selectedCharacters = "";

  let passwordCharacters = [];

  if (uppercaseCheckbox.checked) {
    selectedCharacters += uppercaseCharacters;

    passwordCharacters.push(getRandomCharacter(uppercaseCharacters));
  }

  if (lowercaseCheckbox.checked) {
    selectedCharacters += lowercaseCharacters;

    passwordCharacters.push(getRandomCharacter(lowercaseCharacters));
  }

  if (numbersCheckbox.checked) {
    selectedCharacters += numberCharacters;

    passwordCharacters.push(getRandomCharacter(numberCharacters));
  }

  if (symbolsCheckbox.checked) {
    selectedCharacters += specialCharacters;

    passwordCharacters.push(getRandomCharacter(specialCharacters));
  }

  if (selectedCharacters.length === 0) {
    passwordInput.value = "";

    message.textContent = "Please select at least one character type.";

    return;
  }

  if (length < passwordCharacters.length) {
    passwordInput.value = "";

    message.textContent =
      "Password length is too short for the selected options.";

    return;
  }

  while (passwordCharacters.length < length) {
    passwordCharacters.push(getRandomCharacter(selectedCharacters));
  }

  passwordCharacters.sort(() => Math.random() - 0.5);

  const password = passwordCharacters.join("");

  passwordInput.value = password;
}

generateButton.addEventListener("click", generatePassword);
