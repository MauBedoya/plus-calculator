const d = document;
const $overlay = d.querySelector(".overlay");
const $infoModal = d.querySelector(".info-modal");
const $btnCloseModal = d.querySelector(".info-modal__close-btn");

// alternates the 'active' class to make the modal window visible
const toggleActive = () => {
  $overlay.classList.toggle("active");
  $infoModal.classList.toggle("active");
}

const showModal = () => {
    toggleActive();
    d.addEventListener("click", (e) => {
      if (e.target.value === "?" || e.target === $btnCloseModal) {
        toggleActive();
      } else if (e.target === $overlay) {
        toggleActive();
      }
    })
}

export default showModal;