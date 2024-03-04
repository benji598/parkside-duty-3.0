const AddPersonFormTemplate = document.createElement('template');
AddPersonFormTemplate.innerHTML = /*html*/ `
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

    .form-container {
        background-color: white;
        padding: clamp(1rem, 6vw, 2rem);
        border-radius: var(--btn-radius);
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
    input[type=tel]:focus {
        border-color: var(--bg-blue);
        outline: none;
    }


    /* Style for input border when it's invalid */
    input[type=text].invalid,
    input[type=tel].invalid {
        border-color: var(--color-red);
    }

    /* Style for label when input is invalid */
    input[type=text].invalid+label,
    input[type=tel].invalid+label {
        color: var(--color-red);
    }

    /* Style for input border when it's valid */
    input[type=text].valid,
    input[type=tel].valid {
        border-color: var(--color-green);
    }

    /* Style for label when input is valid */
    input[type=text].valid+label,
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


<form method="post" action="add_sub_user.php">
    <div class="input-wrapper">
        <input type="text" id="firstname" name="firstname" required>
        <label for="firstname">Firstname</label>
    </div>

    <div class="input-wrapper">
        <input type="text" id="lastname" name="lastname" required>
        <label for="lastname">Lastname</label>
    </div>

    <div class="input-wrapper">
        <input type="tel" id="phone" name="phone" required>
        <label for="phone">Phone Number</label>
    </div>

    <div class="input-wrapper">
        <label for="duties">Assign Duties:</label>
        <select id="duties" name="duty_ids[]" multiple required>
            <?php foreach ($result_duty_types as $duty): ?>
            <option value="<?php echo htmlspecialchars($duty['id']); ?>">
                <?php echo htmlspecialchars($duty['name']); ?>
            </option>
            <?php endforeach; ?>
        </select>
    </div>

    <button type="submit" name="add_sub_user">Add Sub User</button>
</form>


`;

class AddPersonForm extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({
            mode: 'open',
        });
        this.shadowRoot.appendChild(AddPersonFormTemplate.content.cloneNode(true));
    }

    connectedCallback() {
        this.test();
        // this.getDetails();
        this.initializeLabelPositions();
    }

    // getDetails() {
    // const firstName = this.getAttribute('firstName');
    // const lastName = this.getAttribute('lastName');
    // const email = this.getAttribute('email');
    // const phone = this.getAttribute('phone');

    // this.shadowRoot.querySelector('#firstName').value = firstName;
    // this.shadowRoot.querySelector('#lastName').value = lastName;
    // this.shadowRoot.querySelector('#email').value = email;
    // this.shadowRoot.querySelector('#phone').value = phone;
    // }

    async test() {
        const response = await fetch('../test-fetch.php');
        const broData = await response.json();

        console.log('DATA', broData);
    }

    // getDetails() {
    // const json = this.getAttribute('jsonData');
    // try {
    // const data = JSON.parse(json);
    // data.forEach((el) => {
    // console.log(el.name);
    // }); // Now 'data' is an object
    // } catch (error) {
    // console.error("Error parsing JSON from 'jsonData' attribute:", error);
    // }
    // }

    initializeLabelPositions() {
        const inputs = this.shadowRoot.querySelectorAll('input[type=text], input[type=tel]');
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
customElements.define('add-person-form', AddPersonForm);