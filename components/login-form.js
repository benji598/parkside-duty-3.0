const LoginFormTemplate = document.createElement('template');
LoginFormTemplate.innerHTML = /*html*/ `
<style>
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

    /* When the input is not empty, move the label up */
    input[type=email]:not(:placeholder-shown)+label,
    input[type=password]:not(:placeholder-shown)+label {
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

    input[type=email]:focus,
    input[type=password]:focus {
        border-color: var(--bg-blue);
        outline: none;
    }

    input[type=email]:invalid:not(:placeholder-shown),
    input[type=password]:invalid:not(:placeholder-shown) {
        border-color: var(--color-red);
    }

    input[type=email]:invalid:not(:placeholder-shown)+label,
    input[type=password]:invalid:not(:placeholder-shown)+label {
        color: var(--color-red);
    }

    input[type=email]:valid,
    input[type=password]:valid {
        border-color: var(--color-green);
    }

    input[type=email]:valid+label,
    input[type=password]:valid+label {
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
</style>



<!-- Display any login error messages -->
<form action="login.php" method="post">
    <div class="input-wrapper">
        <input type="email" id="email" name="email" pattern=".*@.*\.(com|co\.uk|org|net|edu|gov|mil|info|uk)$" placeholder="" required>
        <label for="email">Email</label>
    </div>

    <div class="input-wrapper">
        <input type="password" id="password" name="password" placeholder="" pattern=".*[A-Z].*" minlength="8" maxlength="30" required>
        <label for="password">Password</label>
    </div>

    <button class="primary-btn" type="submit" name="login">Login</button>

    <!-- The Register button should point to a PHP file that handles registration -->
    <!-- <button class="secondary-btn" onclick="location.href='register.php'">Register</button> -->
    <button class="secondary-btn">Register</button>
</form>

`;

class LoginForm extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({
            mode: 'open',
        });
        this.shadowRoot.appendChild(LoginFormTemplate.content.cloneNode(true));

        this.validatePassword = this.validatePassword.bind(this);
        this.shadowRoot.querySelector('form').addEventListener('input', this.validatePassword);
    }

    connectedCallback() {
        this.toRegister();
    }

    validatePassword() {
        const passwordInput = this.shadowRoot.querySelector('#password');
        const hasUpperCase = /[A-Z]/.test(passwordInput.value);
        const isLongEnough = passwordInput.value.length >= 8;

        const error = this.getAttribute('data-error');
        this.shadowRoot.querySelector('.error-message').textContent = error;

        if (!hasUpperCase || !isLongEnough) {
            if (!hasUpperCase && !isLongEnough) {
                passwordInput.setCustomValidity('Password must be at least 8 characters long and include at least one uppercase letter.');
            } else if (!hasUpperCase) {
                passwordInput.setCustomValidity('Password must include at least one uppercase letter.');
            } else if (!isLongEnough) {
                passwordInput.setCustomValidity('Password must be at least 8 characters long.');
            }
        } else {
            passwordInput.setCustomValidity('');
        }
    }

    toRegister() {
        this.shadowRoot.querySelector('.secondary-btn').addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = 'register.php';
        });
    }
}
customElements.define('login-form', LoginForm);