const $input = document.querySelectorAll(".calculator__keypad input");

// prevents automatic focus when toggling between buttons and keyboard use.
const preventFocus = () => {
  $input.forEach(input => {
    input.addEventListener("focus", () => {
      input.blur();
    });
  });
}

export default preventFocus;