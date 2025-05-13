document.addEventListener("DOMContentLoaded", () => {
  // Event Handling: Ordered List Section
  const changeTextBtn = document.getElementById("change-text-btn");
  const dynamicText = document.getElementById("dynamic-text");
  const toggleStyleBtn = document.getElementById("toggle-style-btn");
  const orderedListSection = document.getElementById("ordered-list");
  const keypressInput = document.getElementById("keypress-input");
  const addItemBtn = document.getElementById("add-item-btn");
  const removeItemBtn = document.getElementById("remove-item-btn");
  const dynamicList = document.getElementById("dynamic-list");
  let itemCount = 4;
  let isStyled = false;

  // Button Click: Change text and color
  changeTextBtn.addEventListener("click", () => {
    dynamicText.textContent =
      "Text changed at " + new Date().toLocaleTimeString();
    dynamicText.style.color =
      "#" + Math.floor(Math.random() * 16777215).toString(16);
  });

  // Double Click: Secret action on text
  dynamicText.addEventListener("dblclick", () => {
    dynamicText.textContent = "Secret Double-Click Action!";
    dynamicText.style.fontWeight = "bold";
    setTimeout(() => {
      dynamicText.style.fontWeight = "normal";
    }, 2000);
  });

  // Hover Effect: On section
  orderedListSection.addEventListener("mouseenter", () => {
    orderedListSection.style.boxShadow = "0 6px 12px rgba(0, 0, 0, 0.2)";
  });
  orderedListSection.addEventListener("mouseleave", () => {
    orderedListSection.style.boxShadow = "none";
  });

  // Keypress Detection
  keypressInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      dynamicText.textContent = `You typed: ${e.target.value}`;
      e.target.value = "";
    }
  });

  // Toggle CSS Style
  toggleStyleBtn.addEventListener("click", () => {
    isStyled = !isStyled;
    orderedListSection.style.backgroundColor = isStyled ? "#d4e6f1" : "#fff";
    orderedListSection.style.borderColor = isStyled ? "#2980b9" : "#ddd";
  });

  // Add List Item
  addItemBtn.addEventListener("click", () => {
    const newItem = document.createElement("li");
    newItem.textContent = `Item ${itemCount}`;
    dynamicList.appendChild(newItem);
    itemCount++;
  });

  // Remove List Item
  removeItemBtn.addEventListener("click", () => {
    const lastItem = dynamicList.lastElementChild;
    if (lastItem) {
      dynamicList.removeChild(lastItem);
      itemCount--;
    }
  });

  // Slideshow Functionality
  const slides = document.querySelectorAll(".slide");
  const prevBtn = document.querySelector(".prev");
  const nextBtn = document.querySelector(".next");
  let currentSlide = 0;

  const showSlide = (index) => {
    slides.forEach((slide, i) => {
      slide.classList.toggle("active", i === index);
    });
  };

  prevBtn.addEventListener("click", () => {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
  });

  nextBtn.addEventListener("click", () => {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  });

  // Auto-play slideshow
  setInterval(() => {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  }, 5000);

  // Tabs Functionality
  const tabButtons = document.querySelectorAll(".tab-btn");
  const tabPanes = document.querySelectorAll(".tab-pane");

  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      tabButtons.forEach((btn) => btn.classList.remove("active"));
      tabPanes.forEach((pane) => pane.classList.remove("active"));
      button.classList.add("active");
      document.getElementById(button.dataset.tab).classList.add("active");
    });
  });

  // Form Validation
  const form = document.getElementById("reg-form");
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const nameError = document.getElementById("name-error");
  const emailError = document.getElementById("email-error");
  const passwordError = document.getElementById("password-error");

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const showError = (element, message) => {
    element.textContent = message;
  };

  const clearError = (element) => {
    element.textContent = "";
  };

  // Real-time validation
  nameInput.addEventListener("input", () => {
    if (!nameInput.value.trim()) {
      showError(nameError, "Name is required");
    } else {
      clearError(nameError);
    }
  });

  emailInput.addEventListener("input", () => {
    if (!emailInput.value.trim()) {
      showError(emailError, "Email is required");
    } else if (!validateEmail(emailInput.value)) {
      showError(emailError, "Invalid email format");
    } else {
      clearError(emailError);
    }
  });

  passwordInput.addEventListener("input", () => {
    if (!passwordInput.value) {
      showError(passwordError, "Password is required");
    } else if (passwordInput.value.length < 8) {
      showError(passwordError, "Password must be at least 8 characters");
    } else {
      clearError(passwordError);
    }
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let isValid = true;

    if (!nameInput.value.trim()) {
      showError(nameError, "Name is required");
      isValid = false;
    } else {
      clearError(nameError);
    }

    if (!emailInput.value.trim()) {
      showError(emailError, "Email is required");
      isValid = false;
    } else if (!validateEmail(emailInput.value)) {
      showError(emailError, "Invalid email format");
      isValid = false;
    } else {
      clearError(emailError);
    }

    if (!passwordInput.value) {
      showError(passwordError, "Password is required");
      isValid = false;
    } else if (passwordInput.value.length < 8) {
      showError(passwordError, "Password must be at least 8 characters");
      isValid = false;
    } else {
      clearError(passwordError);
    }

    if (isValid) {
      alert("Form submitted successfully!");
      form.reset();
    }
  });
});
