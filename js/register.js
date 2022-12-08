const form = document.querySelector("#register-form");
const username = document.querySelector("#name");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const confirmPassword = document.querySelector("#confirm-pass");
const inputs = document.querySelectorAll("input");

//regEx
const userNamePattern = /^[a-z]([a-z0-9]+)[a-z]{5,15}$/;
const passPattern = /[a-z0-9]{8,}/;
const mailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

// Validation function to be called on form submit
const isValid = (str) => {
  if (str.id === "name") {
    return userNamePattern.test(str.val);
  } else if (str.id === "email") {
    return mailPattern.test(str.val);
  } else if (str.id === "password") {
    return passPattern.test(str.val);
  } else if (str.id === "confirm-pass") {
    if (password.value === str.val) return true;
  }
  return false;
};

// Post Data to API function
const postData = async () => {
  const rawResponse = await fetch(
    "https://goldblv.com/api/hiring/tasks/register",
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username.value,
        email: email.value,
        password: password.value,
        password_confirmation: confirmPassword.value,
      }),
    }
  );
  const content = await rawResponse.json();

  return content;
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let isValidInputs = true;

  inputs.forEach((input) => {
    if (!isValid({ id: input.id, val: input.value })) {
      document.getElementById(`${input.id}-err`).classList.remove("d-none");
      isValidInputs = false;
    } else {
      document.getElementById(`${input.id}-err`).classList.add("d-none");
    }
  });

  if (!isValidInputs) return;

  postData().then((res) => {
    if (res.errors) {
      for (let err in res.errors) {
        document.getElementById(`${err}-err`).innerHTML = `${res.errors[
          err
        ].join("")}`;
        document.getElementById(`${err}-err`).classList.remove("d-none");
      }
    } else {
      localStorage.setItem("email", email.value);
      window.location.href = "./logged-in.html";
    }
  });
});
