const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lower = "abcdefghijklmnopqrstuvwxyz";
const numbers = "0123456789";
const symbols = "!@#$%^&*()_-+=<>?/{}[]";

window.onload = function () {
    generatePassword();
};

function generatePassword() {

    const length = parseInt(document.getElementById("length").value);

    const useUpper = document.getElementById("uppercase").checked;
    const useLower = document.getElementById("lowercase").checked;
    const useNumbers = document.getElementById("numbers").checked;
    const useSymbols = document.getElementById("symbols").checked;

    if (!useUpper && !useLower && !useNumbers && !useSymbols) {
        showMessage("Please select at least one option.", "red");
        return;
    }

    let characterPool = "";

    if (useUpper) characterPool += upper;
    if (useLower) characterPool += lower;
    if (useNumbers) characterPool += numbers;
    if (useSymbols) characterPool += symbols;

    let generatedPassword = "";

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characterPool.length);
        generatedPassword += characterPool[randomIndex];
    }

    document.getElementById("password").value = generatedPassword;

    updateStrength(length, useUpper, useLower, useNumbers, useSymbols);

    showMessage("Password generated successfully!", "#16a34a");
}

function copyPassword() {

    const password = document.getElementById("password").value;

    if (password === "") {
        showMessage("Generate a password first.", "red");
        return;
    }

    navigator.clipboard.writeText(password);

    showMessage("Password copied successfully!", "#16a34a");
}

function togglePassword() {

    const passwordField = document.getElementById("password");
    const eyeIcon = document.getElementById("eyeIcon");

    if (passwordField.type === "password") {
        passwordField.type = "text";
        eyeIcon.className = "fa-solid fa-eye-slash";
    } else {
        passwordField.type = "password";
        eyeIcon.className = "fa-solid fa-eye";
    }

}

function updateStrength(length, upperCase, lowerCase, numberCase, symbolCase) {

    let score = 0;

    if (length >= 8) score++;
    if (length >= 12) score++;
    if (upperCase) score++;
    if (lowerCase) score++;
    if (numberCase) score++;
    if (symbolCase) score++;

    const strengthText = document.getElementById("strengthText");
    const strengthFill = document.getElementById("strengthFill");

    if (score <= 2) {

        strengthText.textContent = "Weak";
        strengthFill.style.width = "30%";
        strengthFill.style.background = "#ef4444";

    } else if (score <= 4) {

        strengthText.textContent = "Medium";
        strengthFill.style.width = "65%";
        strengthFill.style.background = "#f59e0b";

    } else {

        strengthText.textContent = "Strong";
        strengthFill.style.width = "100%";
        strengthFill.style.background = "#22c55e";

    }

}

function showMessage(message, color) {

    const messageBox = document.getElementById("message");

    messageBox.textContent = message;
    messageBox.style.color = color;

    setTimeout(() => {
        messageBox.textContent = "";
    }, 2500);

}
