const textWrapper = document.querySelector(".text-wrapper");

console.log(textWrapper);

if (localStorage.getItem("email")) {
  textWrapper.insertAdjacentHTML(
    "beforeend",
    `<p class="main-text"> ${localStorage.getItem("email")} </p>`
  );
}
