// EmailJS Configuration
(function () {
  emailjs.init("dHx5DaxwHeuebPQw3"); // Replace with your EmailJS public key
})();

// Contact form functionality
document.addEventListener("DOMContentLoaded", function () {
  initContactForm();
});

function initContactForm() {
  const form = document.getElementById("contact-form");

  if (form) {
    form.addEventListener("submit", handleFormSubmit);

    // Add real-time validation
    const inputs = form.querySelectorAll("input, textarea");
    inputs.forEach((input) => {
      input.addEventListener("blur", () => validateField(input));
      input.addEventListener("input", () => clearError(input));
    });

    // Phone formatting for real-time input
    const phoneInput = document.getElementById("phone");
    if (phoneInput) {
      phoneInput.addEventListener("input", function (e) {
        const cleaned = e.target.value.replace(/\D/g, "");
        let formatted = "";

        if (cleaned.length > 0) {
          if (cleaned.length <= 3) {
            formatted = `(${cleaned}`;
          } else if (cleaned.length <= 6) {
            formatted = `(${cleaned.slice(0, 3)}) ${cleaned.slice(3)}`;
          } else if (cleaned.length <= 10) {
            formatted = `(${cleaned.slice(0, 3)}) ${cleaned.slice(
              3,
              6
            )}-${cleaned.slice(6)}`;
          } else if (cleaned.length === 11 && cleaned[0] === "1") {
            formatted = `+1 (${cleaned.slice(1, 4)}) ${cleaned.slice(
              4,
              7
            )}-${cleaned.slice(7, 10)}`;
          } else {
            // Limit to 10 digits if no country code
            const limited = cleaned.slice(0, 10);
            formatted = `(${limited.slice(0, 3)}) ${limited.slice(
              3,
              6
            )}-${limited.slice(6)}`;
          }
        }

        e.target.value = formatted;
      });
    }
  }
}

async function handleFormSubmit(e) {
  e.preventDefault();

  // Clear all previous errors
  clearAllErrors();

  // Validate all fields
  const isValid = validateForm();

  if (isValid) {
    // Show loading state
    showLoadingState(true);

    try {
      // Send email using EmailJS
      const result = await emailjs.sendForm(
        "service_zx88uit", // Replace with your EmailJS service ID
        "template_g6bguso", // Replace with your EmailJS template ID
        "#contact-form"
      );

      console.log("Email sent successfully:", result);
      showSuccessMessage();
      document.getElementById("contact-form").reset();
    } catch (error) {
      console.error("Email sending failed:", error);
      showErrorMessage(
        "Sorry, there was an error sending your message. Please try again or contact us directly."
      );
    } finally {
      showLoadingState(false);
    }
  }
}

function validateForm() {
  const fromName = document.getElementById("from_name");
  const fromEmail = document.getElementById("from_email");
  const phone = document.getElementById("phone");
  const eventType = document.getElementById("event_type");
  const message = document.getElementById("message");

  let isValid = true;

  // Validate name
  if (!fromName.value.trim()) {
    showError("from_name", "Name is required");
    isValid = false;
  } else if (fromName.value.trim().length < 2) {
    showError("from_name", "Name must be at least 2 characters");
    isValid = false;
  }

  // Validate email
  if (!fromEmail.value.trim()) {
    showError("from_email", "Email is required");
    isValid = false;
  } else if (!isValidEmail(fromEmail.value)) {
    showError("from_email", "Please enter a valid email address");
    isValid = false;
  }

  // Validate phone
  if (!phone.value.trim()) {
    showError("phone", "Phone number is required");
    isValid = false;
  } else if (!isValidPhone(phone.value)) {
    showError("phone", "Please enter a valid phone number");
    isValid = false;
  }

  // Validate event type
  if (!eventType.value.trim()) {
    showError("event_type", "Event type is required");
    isValid = false;
  }

  // Validate message
  if (!message.value.trim()) {
    showError("message", "Message is required");
    isValid = false;
  } else if (message.value.trim().length < 10) {
    showError("message", "Message must be at least 10 characters");
    isValid = false;
  }

  return isValid;
}

function validateField(field) {
  const fieldName = field.name;
  const value = field.value.trim();

  clearError(field);

  switch (fieldName) {
    case "from_name":
      if (!value) {
        showError("from_name", "Name is required");
      } else if (value.length < 2) {
        showError("from_name", "Name must be at least 2 characters");
      }
      break;

    case "from_email":
      if (!value) {
        showError("from_email", "Email is required");
      } else if (!isValidEmail(value)) {
        showError("from_email", "Please enter a valid email address");
      }
      break;

    case "phone":
      if (!value) {
        showError("phone", "Phone number is required");
      } else if (!isValidPhone(value)) {
        showError("phone", "Please enter a valid phone number");
      }
      break;

    case "event_type":
      if (!value) {
        showError("event_type", "Event type is required");
      }
      break;

    case "message":
      if (!value) {
        showError("message", "Message is required");
      } else if (value.length < 10) {
        showError("message", "Message must be at least 10 characters");
      }
      break;
  }
}

function showError(fieldName, message) {
  const errorElement = document.getElementById(`${fieldName}-error`);
  const fieldElement = document.getElementById(fieldName);

  if (errorElement) {
    errorElement.textContent = message;
  }

  if (fieldElement) {
    fieldElement.style.borderColor = "#ff6b6b";
  }
}

function clearError(field) {
  const fieldName = field.name;
  const errorElement = document.getElementById(`${fieldName}-error`);

  if (errorElement) {
    errorElement.textContent = "";
  }

  field.style.borderColor = "";
}

function clearAllErrors() {
  const errorElements = document.querySelectorAll(".error-message");
  const inputElements = document.querySelectorAll("input, textarea");

  errorElements.forEach((error) => (error.textContent = ""));
  inputElements.forEach((input) => (input.style.borderColor = ""));
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function isValidPhone(phone) {
  // Remove all non-digits
  const cleaned = phone.replace(/\D/g, "");

  // US phone numbers: exactly 10 digits, or 11 digits starting with 1
  return (
    /^(1?\d{10})$/.test(cleaned) &&
    (cleaned.length === 10 || (cleaned.length === 11 && cleaned[0] === "1"))
  );
}

function showLoadingState(isLoading) {
  const submitBtn = document.getElementById("submit-btn");
  const btnText = submitBtn.querySelector(".btn-text");
  const btnLoading = submitBtn.querySelector(".btn-loading");

  if (isLoading) {
    btnText.style.display = "none";
    btnLoading.style.display = "inline-flex";
    submitBtn.disabled = true;
  } else {
    btnText.style.display = "inline";
    btnLoading.style.display = "none";
    submitBtn.disabled = false;
  }
}

function showSuccessMessage() {
  // Create success message
  const successDiv = document.createElement("div");
  successDiv.innerHTML = `
    <div style="
        background-color: #f8ed62;
        color: black;
        padding: 1rem;
        border-radius: 8px;
        margin-bottom: 1rem;
        text-align: center;
        font-family: "poppins", serif;
        font-weight: 400;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
    ">
        Message sent successfully! We'll get back to you soon.
    </div>
  `;

  const form = document.getElementById("contact-form");
  form.insertBefore(successDiv, form.firstChild);

  // Remove success message after 5 seconds
  setTimeout(() => {
    successDiv.remove();
  }, 5000);

  // Scroll to top of form
  form.scrollIntoView({ behavior: "smooth", block: "start" });
}

function showErrorMessage(message) {
  // Create error message
  const errorDiv = document.createElement("div");
  errorDiv.innerHTML = `
    <div style="
        background-color: #ef4444;
        color: white;
        padding: 1rem;
        border-radius: 8px;
        margin-bottom: 1rem;
        text-align: center;
        font-weight: 600;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
    ">
        ❌ ${message}
    </div>
  `;

  const form = document.getElementById("contact-form");
  form.insertBefore(errorDiv, form.firstChild);

  // Remove error message after 7 seconds
  setTimeout(() => {
    errorDiv.remove();
  }, 7000);

  // Scroll to top of form
  form.scrollIntoView({ behavior: "smooth", block: "start" });
}
