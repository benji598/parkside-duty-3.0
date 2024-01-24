const MeetingDaysFormTemplate = document.createElement('template');
MeetingDaysFormTemplate.innerHTML = /*html*/ `
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

<div class="form-container">
    <!-- <account-icon></account-icon> -->
    <!-- <h1>Account</h1> -->

    <div class="account-container">
        <h2>Manage Meetings</h2>
        <form method="post" action="update_weekly_meetings.php">
            <label for="meeting_1">Mid-Week Meeting:</label>
            <select id="meeting_1" name="meeting_1">
                <?php
            $days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
            foreach ($days as $day) {
                echo '<option value="'.$day.'"'.($day == $meeting_1 ? ' selected' : '').'>'.$day.'</option>';
            }
            ?>
            </select>

            <label for="meeting_2">Weekend Meeting:</label>
            <select id="meeting_2" name="meeting_2">
                <?php
            foreach ($days as $day) {
                echo '<option value="'.$day.'"'.($day == $meeting_2 ? ' selected' : '').'>'.$day.'</option>';
            }
            ?>
            </select>

            <button type="submit" name="update_meetings">Update Meetings</button>
        </form>
    </div>
    `;

class MeetingDaysForm extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({
            mode: 'open',
        });
        this.shadowRoot.appendChild(MeetingDaysFormTemplate.content.cloneNode(true));
    }

    connectedCallback() {
        // this.getDetails();
        // this.initializeLabelPositions();
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

    // initializeLabelPositions() {
    // const inputs = this.shadowRoot.querySelectorAll('input[type=text], input[type=email], input[type=tel]');
    // inputs.forEach((input) => {
    // this.updateLabelPosition(input);
    // input.addEventListener('input', () => this.updateLabelPosition(input));
    // });
    // }

    // updateLabelPosition(input) {
    // const label = input.nextElementSibling;

    // if (input.value) {
    // label.classList.add('has-content');
    // if (input.checkValidity()) {
    // input.classList.add('valid');
    // input.classList.remove('invalid');
    // } else {
    // input.classList.add('invalid');
    // input.classList.remove('valid');
    // }
    // } else {
    // label.classList.remove('has-content');
    // input.classList.remove('invalid', 'valid');
    // }
    // }
}
customElements.define('meeting-day-form', MeetingDaysForm);