"strict mode";

const errorMessage = document.querySelector(".errorMessage");
const successMessage = document.querySelector(".successMessage");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const signIn = document.querySelector(".signIn");

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
    if (!data.Datos_Usuario.Validacion) throw new Error("Incorrect email");
    if (data.Datos_Usuario.Validacion === 1)
      throw new Error("Incorrect password");
    successMessage.classList.remove("hidden");
  } catch (err) {
    errorMessage.textContent = `${err.message}`;
    errorMessage.classList.remove("hidden");
    successMessage.classList.add("hidden");
  }
};

const emailInfo = function () {
  if (
    email.value.length >= 5 &&
    email.value.includes("@") &&
    (email.value.includes(".com") ||
      email.value.includes(".org") ||
      email.value.includes(".gov"))
  )
    return true;
  else
    errorMessage.textContent =
      "Eamil is missing @, .com, .org, .gov, or is less than 5 words";
  return false;
};

const passwordInfo = function () {
  const passwordLength = password.value.length >= 8 ? true : false;
  errorMessage.textContent = "password is less than 8 letters.";
  return passwordLength;
};

signIn.addEventListener("click", function (e) {
  e.preventDefault();
  if (emailInfo() === true && passwordInfo() === true) {
    errorMessage.classList.add("hidden");
    infoFetch();
  } else {
    errorMessage.classList.remove("hidden");
    successMessage.classList.add("hidden");
  }
});
