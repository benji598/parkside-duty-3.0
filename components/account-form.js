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

    admin-icon {
        min-height: 30px;
    }

    .form-container {
        background-color: white;
        padding: clamp(1rem, 6vw, 2rem);
        border-radius: var(--btn-radius);
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
        margin: 10px 0;
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


    /* When the input is not empty, move the label up */
    input[type=text]:not(:placeholder-shown)+label,
    input[type=email]:not(:placeholder-shown)+label,
    input[type=tel]:not(:placeholder-shown)+label {
        top: -5px;
        color: var(--color-red);
        font-size: 10px;
        background-color: white;
        width: fit-content;
        padding-left: 5px;
        padding-right: 5px;
        padding-top: 0;
        height: fit-content;
        left: 15px;
        font-size: 10px;
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


    input[type=text]:invalid:not(:placeholder-shown),
    input[type=email]:invalid:not(:placeholder-shown),
    input[type=tel]:invalid:not(:placeholder-shown) {
        border-color: var(--color-red);
    }

    input[type=text]:invalid:not(:placeholder-shown)+label,
    input[type=email]:invalid:not(:placeholder-shown)+label,
    input[type=tel]:invalid:not(:placeholder-shown)+label {
        color: var(--color-red);
    }

    input[type=text]:valid,
    input[type=email]:valid,
    input[type=tel]:valid {
        border-color: var(--color-green);
    }

    input[type=text]:valid+label,
    input[type=email]:valid+label,
    input[type=tel]:valid+label {
        color: var(--color-green);
    }

    input:-webkit-autofill,
    input:-webkit-autofill:hover,
    input:-webkit-autofill:focus,
    input:-webkit-autofill:active {
        -webkit-box-shadow: 0 0 0 30px white inset;
    }
</style>

<div class="form-container">
    <account-icon></account-icon>
    <h1>Account</h1>
    <form action="handle_account_update.php" method="post">

        <div class="input-wrapper">
            <input id="firstName" type="text" name="first_name" value="Benjmain" placeholder="" required>
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
        <button type="submit" name="update_account">Update Account</button>
        <a href="index.php" class="back-button">Back to Dashboard</a>
    </form>
</div>
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
}
customElements.define('account-form', AccountForm);
