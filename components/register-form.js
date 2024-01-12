const RegisterFormTemplate = document.createElement('template');
RegisterFormTemplate.innerHTML = /*html*/ `
<style>
    h1 {
        margin-top: 0;
    }


    form {
        display: grid;
        gap: 0.6rem;
    }


    input[type=text],
    input[type=email],
    input[type=tel],
    input[type=password] {
        width: 100%;
        width: clamp(240px, 69vw, 380px);
        padding: 15px;
        border: 2px solid var(--color-light-grey);
        border-radius: 2rem;
    }

    /* Add styles for your input wrapper and label */
    .input-wrapper {
        position: relative;
    }

    /* Style the label initially to look like a placeholder */
    input[type=text]+label,
    input[type=tel]+label,
    input[type=email]+label,
    input[type=password]+label {
        display: flex;
        align-items: center;
        position: absolute;
        top: 0;
        left: 20px;
        color: var(--color-dark-grey);
        height: 100%;
        pointer-events: none;
        transition: all 0.3s ease;
    }


    input[type=text]+label.has-content,
    input[type=tel]+label.has-content,
    input[type=email]+label.has-content,
    input[type=password]+label.has-content {
        top: -5px;
        font-size: 10px;
        background-color: white;
        width: fit-content;
        padding-left: 5px;
        padding-right: 5px;
        padding-top: 0;
        height: fit-content;
        left: 15px;
    }


    /* Also move the label up when the input is focused */
    input[type=text]:focus+label,
    input[type=tel]:focus+label,
    input[type=email]:focus+label,
    input[type=password]:focus+label {
        top: -5px;
        font-size: 10px;
        background-color: white;
        width: fit-content;
        padding-left: 5px;
        padding-right: 5px;
        padding-top: 0;
        height: fit-content;
        color: var(--bg-blue);
        left: 15px;
    }

    input[type=text]:focus,
    input[type=tel]:focus,
    input[type=email]:focus,
    input[type=password]:focus {
        border-color: var(--bg-blue);
        outline: none;
    }


    /* Style for input border when it's invalid */
    input[type=text].invalid,
    input[type=tel].invalid,
    input[type=email].invalid,
    input[type=password].invalid {
        border-color: var(--color-red);
    }

    /* Style for label when input is invalid */
    input[type=text].invalid+label,
    input[type=tel].invalid+label,
    input[type=email].invalid+label,
    input[type=password].invalid+label {
        color: var(--color-red);
    }

    /* Style for input border when it's valid */
    input[type=text].valid,
    input[type=tel].valid,
    input[type=email].valid,
    input[type=password].valid {
        border-color: var(--color-green);
    }

    /* Style for label when input is valid */
    input[type=text].valid+label,
    input[type=tel].valid+label,
    input[type=email].valid+label,
    input[type=password].valid+label {
        color: var(--color-green);
    }

    input:-webkit-autofill,
    input:-webkit-autofill:hover,
    input:-webkit-autofill:focus,
    input:-webkit-autofill:active {
        -webkit-box-shadow: 0 0 0 30px white inset;
    }

    .primary-btn {
        border-radius: var(--btn-radius);
        width: 100%;
        padding: 15px;
        font-weight: 600;
        font-size: 1rem;
        border: none;
        background-color: var(--baby-blue);
        cursor: pointer;
        transition: background-color 0.3s ease;
    }

    .primary-btn:hover {
        background-color: var(--bg-blue);
    }


    .secondary-btn {
        border-radius: var(--btn-radius);
        width: 100%;
        padding: 15px;
        border: none;
        cursor: pointer;
        border: 2px solid var(--baby-blue);
        background-color: transparent;
        transition: background-color 0.3s ease;
    }

    .secondary-btn:hover {
        background-color: var(--bg-blue)
    }

    .error-message {
        color: var(--color-red);
        margin-bottom: 0.6rem;
    }

    /* For the invalid input when passwords don't match */
    input.invalid-password[type=password] {
        border: 2px solid var(--color-red);
    }

    /* For the label of the invalid input when passwords don't match */
    input.invalid-password[type=password]+label {
        color: var(--color-red);
    }
</style>


<div class="form-container">
    <div class="error-message"></div>
    <!-- The action here should point to the PHP script that will handle the registration logic -->
    <form action="handle_register.php" method="post">
        <div class="input-wrapper">
            <input type="text" name="first_name" placeholder="" required>
            <label for="first_name">Firstname</label>
        </div>

        <div class="input-wrapper">
            <input type="text" name="last_name" placeholder="" required>
            <label for="last_name">Lastname</label>
        </div>

        <div class="input-wrapper">
            <input type="email" name="email" placeholder="" pattern=".*@.*\.(com|co\.uk|org|net|edu|gov|mil|info|uk)$" required>
            <label for="email">Email</label>
        </div>

        <div class="input-wrapper">
            <input type="tel" name="phone" placeholder="" minlength="11" required>
            <label for="email">Phone</label>
        </div>

        <div class="input-wrapper">
            <input id="password" type="password" name="password" placeholder="" pattern=".*[A-Z].*" minlength="8" maxlength="30" required>
            <label for="password">Password</label>
        </div>

        <div class="input-wrapper">
            <input id="confirm-password" type="password" name="confirm_password" placeholder="" pattern=".*[A-Z].*" minlength="8" maxlength="30" required>
            <label for="confirm_password">Confirm Password</label>
        </div>

        <button class="primary-btn" id="register-btn" type="submit" name="register">Register</button>
        <!-- <button class="secondary-btn" onclick="location.href='splash.php'">Back to Login</button> -->
        <button class="secondary-btn">Back to Login</button>
    </form>
</div>
`;

class RegisterForm extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({
      mode: 'open',
    });
    this.shadowRoot.appendChild(RegisterFormTemplate.content.cloneNode(true));

    this.shadowRoot.querySelector('form').addEventListener('input', () => {
      const passwordInput = this.shadowRoot.querySelector('#password');
      const confirmPasswordInput = this.shadowRoot.querySelector('#confirm-password');
      this.checkPassword(passwordInput);
      this.checkPassword(confirmPasswordInput);
    });
    this.comparePassword = this.comparePassword.bind(this);
    this.shadowRoot.querySelector('#register-btn').addEventListener('click', this.comparePassword);
  }

  connectedCallback() {
    this.backToLogin();
    this.initializeLabelPositions();
  }

  checkPassword(passwordInput) {
    const hasUpperCase = /[A-Z]/.test(passwordInput.value);
    const isLongEnough = passwordInput.value.length >= 8;

    if (!hasUpperCase && !isLongEnough) {
      passwordInput.setCustomValidity('Password must be at least 8 characters long and include at least one uppercase letter.');
    } else if (!hasUpperCase) {
      passwordInput.setCustomValidity('Password must include at least one uppercase letter.');
    } else if (!isLongEnough) {
      passwordInput.setCustomValidity('Password must be at least 8 characters long.');
    } else {
      passwordInput.setCustomValidity('');
    }
  }

  comparePassword(e) {
    const password = this.shadowRoot.querySelector('#password');
    const confirmPassword = this.shadowRoot.querySelector('#confirm-password');
    const errorMessage = this.shadowRoot.querySelector('.error-message');
    const passwordLabel = this.shadowRoot.querySelector('label[for="password"]');
    const confirmPasswordLabel = this.shadowRoot.querySelector('label[for="confirm_password"]');

    if (password.value !== confirmPassword.value) {
      e.preventDefault();
      errorMessage.textContent = 'Passwords DO NOT match';
      password.classList.add('invalid-password');
      confirmPassword.classList.add('invalid-password');
      passwordLabel.classList.add('invalid-password-label');
      confirmPasswordLabel.classList.add('invalid-password-label');
    } else {
      errorMessage.textContent = '';
      password.classList.remove('invalid-password');
      confirmPassword.classList.remove('invalid-password');
      passwordLabel.classList.remove('invalid-password-label');
      confirmPasswordLabel.classList.remove('invalid-password-label');
    }
  }

  initializeLabelPositions() {
    const inputs = this.shadowRoot.querySelectorAll('input[type=text], input[type=tel], input[type=email], input[type=password]');
    inputs.forEach((input) => {
      this.updateLabelPosition(input);
      input.addEventListener('input', () => this.updateLabelPosition(input));
    });
  }

  updateLabelPosition(input) {
    const label = input.nextElementSibling;

    if (input.value) {
      label.classList.add('has-content');
      if (input.checkValidity()) {
        input.classList.add('valid');
        input.classList.remove('invalid');
      } else {
        input.classList.add('invalid');
        input.classList.remove('valid');
      }
    } else {
      label.classList.remove('has-content');
      input.classList.remove('invalid', 'valid');
    }
  }

  backToLogin() {
    this.shadowRoot.querySelector('.secondary-btn').addEventListener('click', (e) => {
      e.preventDefault();
      window.location.href = 'splash.php';
    });
  }
}
customElements.define('register-form', RegisterForm);
