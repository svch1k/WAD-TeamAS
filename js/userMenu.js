// Task 7: dropdown menu with the user name, email and logout.
// The menu opens and closes by clicking on the personal photo.
// It also closes when the user clicks outside of it or presses Escape.

(function () {
  const toggle = document.getElementById("userMenuToggle");
  const menu = document.getElementById("userMenu");

  // nothing to do on pages that do not have the menu
  if (!toggle || !menu) {
    return;
  }

  function isOpen() {
    return !menu.hidden;
  }

  function openMenu() {
    menu.hidden = false;
    toggle.setAttribute("aria-expanded", "true");
  }

  function closeMenu() {
    menu.hidden = true;
    toggle.setAttribute("aria-expanded", "false");
  }

  // click on the photo: opens the menu, the next click closes it
  toggle.addEventListener("click", function () {
    if (isOpen()) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  // click anywhere else on the page closes the menu
  document.addEventListener("click", function (event) {
    if (!isOpen()) {
      return;
    }

    if (!menu.contains(event.target) && !toggle.contains(event.target)) {
      closeMenu();
    }
  });

  // Escape closes the menu and gives the focus back to the photo
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && isOpen()) {
      closeMenu();
      toggle.focus();
    }
  });

  // following a link (email or logout) also hides the menu
  menu.addEventListener("click", function (event) {
    if (event.target.closest("a")) {
      closeMenu();
    }
  });
})();
