const strengthText = document.getElementById("strengthText");

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

const copyBtn = document.getElementById("copyBtn");

lengthInput.addEventListener("input", function () {
  lengthValue.textContent = lengthInput.value;
});

function getRandomCharacter(characterSet) {
  const randomIndex = Math.floor(Math.random() * characterSet.length);

  return characterSet[randomIndex];
}

function generatePassword() {
  message.textContent = "";
  copyBtn.textContent = "Copy";

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

    message.textContent = `Please choose a password length of at least ${passwordCharacters.length}.`;

    return;
  }

  while (passwordCharacters.length < length) {
    passwordCharacters.push(getRandomCharacter(selectedCharacters));
  }

  passwordCharacters.sort(() => Math.random() - 0.5);

  const password = passwordCharacters.join("");

  passwordInput.value = password;

  updatePasswordStrength(password);
}

generateButton.addEventListener("click", generatePassword);

copyBtn.addEventListener("click", async function () {
  const password = passwordInput.value;

  if (password === "") {
    message.textContent = "Generate a password first.";

    return;
  }

  try {
    await navigator.clipboard.writeText(password);

    copyBtn.textContent = "Copied!";

    message.textContent = "Password copied to clipboard.";

    setTimeout(function () {
      copyBtn.textContent = "Copy";

      message.textContent = "";
    }, 2000);
  } catch (error) {
    message.textContent = "Unable to copy password.";
  }
});

function updatePasswordStrength(password) {
  strengthText.className = "";
  if (password === "") {
    strengthText.textContent = "Not generated";

    return;
  }

  let score = 0;

  if (password.length >= 8) {
    score++;
  }

  if (password.length >= 12) {
    score++;
  }

  if (/[a-z]/.test(password)) {
    score++;
  }

  if (/[A-Z]/.test(password)) {
    score++;
  }

  if (/[0-9]/.test(password)) {
    score++;
  }

  if (/[^A-Za-z0-9]/.test(password)) {
    score++;
  }

  if (score <= 2) {
    strengthText.textContent = "Weak";
  } else if (score <= 4) {
    strengthText.textContent = "Medium";
  } else if (score === 5) {
    strengthText.textContent = "Strong";
  }
}
