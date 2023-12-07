"strict mode";

// DOM html
const errorMessage = document.querySelector(".errorMessage");
const successMessage = document.querySelector(".successMessage");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const signIn = document.querySelector(".signIn");

const errorText = (text) => (errorMessage.textContent = text);

// shows success message
const showSuccess = function () {
  successMessage.classList.remove("hidden");
  errorMessage.classList.add("hidden");
};

// shows error message
const showError = function () {
  errorMessage.classList.remove("hidden");
  successMessage.classList.add("hidden");
};
// uploads JSON data via post
const infoFetch = async function () {
  try {
    const webResponse = await fetch("https://api.guerrerosweb.com.mx/login/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        UserLogInInfo: {
          User: email.value,
          Password: password.value,
        },
      }),
    });

    const data = await webResponse.json();
    console.log(data);
    showSuccess();
    if (!data.Datos_Usuario.Validacion) throw new Error("Incorrect email");
    if (data.Datos_Usuario.Validacion === 1)
      throw new Error("Incorrect password");
  } catch (err) {
    errorText(`${err.message}`);
    showError();
  }
};

// checks if email length has required elements
const emailInfo = function () {
  if (
    email.value.includes("@") &&
    (email.value.includes(".com") ||
      email.value.includes(".org") ||
      email.value.includes(".gov"))
  )
    return true;
  else errorText("Email is missing @, .com, .org, or .gov");
  return false;
};

//  Checks if password length is sufficient
const passwordInfo = function () {
  const passwordLength = password.value.length >= 8;
  !passwordLength ? errorText("password is less than 8 letters.") : null;

  return passwordLength;
};

signIn.addEventListener("click", function (e) {
  e.preventDefault();
  if (emailInfo() && passwordInfo()) {
    infoFetch();
  } else {
    showError();
  }
});
