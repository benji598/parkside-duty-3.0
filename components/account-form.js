const AccountFormTemplate = document.createElement('template');
AccountFormTemplate.innerHTML = /*html*/ `
<style>
    :host {
        place-content: center;
        display: grid;
        height: 80%;
        text-align: center;
        overflow: auto;
    }

    account-icon {
        min-height: 40px;
    }



    h1 {
        margin-top: 0;
    }

    form {
        display: grid;
        gap: 0.6rem;
    }

    input[type=text],
    input[type=email],
    input[type=tel] {
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
    input[type=email]+label,
    input[type=tel]+label {
        display: flex;
        align-items: center;
        position: absolute;
        top: 0px;
        left: 20px;
        color: var(--color-dark-grey);
        height: 100%;
        pointer-events: none;
        transition: all 0.3s ease;
    }


    /* Style for label when input has content */
    input[type=text]+label.has-content,
    input[type=email]+label.has-content,
    input[type=tel]+label.has-content {
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
    input[type=email]:focus+label,
    input[type=tel]:focus+label {
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
    input[type=email]:focus,
    input[type=tel]:focus {
        border-color: var(--bg-blue);
        outline: none;
    }


    /* Style for input border when it's invalid */
    input[type=text].invalid,
    input[type=email].invalid,
    input[type=tel].invalid {
        border-color: var(--color-red);
    }

    /* Style for label when input is invalid */
    input[type=text].invalid+label,
    input[type=email].invalid+label,
    input[type=tel].invalid+label {
        color: var(--color-red);
    }

    /* Style for input border when it's valid */
    input[type=text].valid,
    input[type=email].valid,
    input[type=tel].valid {
        border-color: var(--color-green);
    }

    /* Style for label when input is valid */
    input[type=text].valid+label,
    input[type=email].valid+label,
    input[type=tel].valid+label {
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

    a {
        color: var(--color-black);
        text-decoration: var(--anchor-decoration);
    }
</style>



<form action="handle_account_update.php" method="post">

    <div class="input-wrapper">
        <input id="firstName" type="text" name="first_name" value="" placeholder="" required>
        <label for="first_name">Firstname</label>
    </div>

    <div class="input-wrapper">
        <input id="lastName" type="text" name="last_name" value="" placeholder="" required>
        <label for="last_name">Lastname</label>
    </div>

    <div class="input-wrapper">
        <input id="email" type="email" name="email" value="" placeholder="" pattern=".*@.*\.(com|co\.uk|org|net|edu|gov|mil|info|uk)$" required>
        <label for="email">Email</label>
    </div>

    <div class="input-wrapper">
        <input id="phone" type="tel" name="phone" value="" minlength="11" placeholder="" required>
        <label for="phone">Phone</label>
    </div>

    <!-- Include additional fields as necessary -->
    <button class="primary-btn" type="submit" name="save">Save</button>
    <!-- <a class="secondary-btn" href="index.php">Back to Dashboard</a> -->
</form>

`;

class AccountForm extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({
      mode: 'open',
    });
    this.shadowRoot.appendChild(AccountFormTemplate.content.cloneNode(true));
  }

  connectedCallback() {
    this.getDetails();
    this.initializeLabelPositions();
  }

  getDetails() {
    const firstName = this.getAttribute('firstName');
    const lastName = this.getAttribute('lastName');
    const email = this.getAttribute('email');
    const phone = this.getAttribute('phone');

    this.shadowRoot.querySelector('#firstName').value = firstName;
    this.shadowRoot.querySelector('#lastName').value = lastName;
    this.shadowRoot.querySelector('#email').value = email;
    this.shadowRoot.querySelector('#phone').value = phone;
  }

  initializeLabelPositions() {
    const inputs = this.shadowRoot.querySelectorAll('input[type=text], input[type=email], input[type=tel]');
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
}
customElements.define('account-form', AccountForm);
