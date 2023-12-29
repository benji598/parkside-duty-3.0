const LoginFormTemplate = document.createElement('template');
LoginFormTemplate.innerHTML = /*html*/ `
<style>
    :host {
        display: grid;
        justify-content: center;
        padding-left: 1rem;
        padding-right: 1rem;
        place-content: center;
        height: 100%;
    }

    .form-container {
        background-color: white;
        padding: 2rem;
        text-align: center;
        border-radius: var(--btn-radius);
    }


    input[type=text],
    input[type=email],
    input[type=tel],
    input[type=password] {
        width: 100%;
        width: clamp(260px, 69vw, 380px);
        padding: 15px;
        border: 1px solid #dfe4ea;
        border-radius: 2rem;
    }

    /* Add styles for your input wrapper and label */
    .input-wrapper {
        position: relative;
        margin: 10px 0;
    }

    /* Style the label initially to look like a placeholder */
    input[type=email]+label,
    input[type=password]+label {
        display: flex;
        align-items: center;
        position: absolute;
        top: 0;
        left: 15px;
        color: grey;
        width: 100%;
        height: 100%;
        pointer-events: none;
        transition: all 0.3s ease;
    }

    /* When the input is not empty, move the label up */
    input[type=email]:not(:placeholder-shown)+label,
    input[type=password]:not(:placeholder-shown)+label {
        font-size: px;
    }

    /* Also move the label up when the input is focused */
    input[type=email]:focus+label,
    input[type=password]:focus+label {
        top: -14px;
        font-size: 10px;
    }


    .login-btn {
        border-radius: var(--btn-radius);
        width: 100%;
        padding: 15px;
        border: none;
        background-color: var(--baby-blue);
        cursor: pointer;
        transition: background-color 0.3s ease;
    }

    .login-btn:hover {
        background-color: var(--bg-blue);
    }


    .register-btn {
        border-radius: var(--btn-radius);
        width: 100%;
        padding: 15px;
        margin: 10px 0;
        border: none;
        cursor: pointer;
        border: 2px solid var(--baby-blue);
        background-color: transparent;
        transition: background-color 0.3s ease;
    }

    .register-btn:hover {
        background-color: var(--bg-blue)
    }

    .error-message {
        color: red;
        margin-bottom: 10px;
        text-align: center;
    }
</style>

<div class="form-container">
    <admin-icon></admin-icon>
    <h1>Login In</h1>

    <!-- Display any login error messages -->
    <?php if (isset($_SESSION['login_error'])): ?>

    <div class="error-message">
        <?php echo $_SESSION['login_error']; ?>
        <?php unset($_SESSION['login_error']); // Remove the message after displaying it ?>
    </div>
    <?php endif; ?>

    <form action="login.php" method="post">
        <div class="input-wrapper">
            <input type="email" id="email" name="email" placeholder=" " required>
            <label for="email">Email</label>
        </div>
        <div class="input-wrapper">
            <input type="password" id="password" name="password" placeholder=" " required>
            <label for="password">Password</label>
        </div>

        <button class="login-btn" type="submit" name="login">Login</button>


        <!-- The Guest button should point to a PHP file or a specific HTML page for guest users -->
        <!-- <button disabled="true" onclick="location.href='guest_access.php'">Guest</button> -->
        <!-- The Register button should point to a PHP file that handles registration -->
        <button class="register-btn" onclick="location.href='register.php'">Register</button>


    </form>
</div>
`;

class LoginForm extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({
      mode: 'open',
    });
    shadowRoot.appendChild(LoginFormTemplate.content.cloneNode(true));
  }

  connectedCallback() {}
}

customElements.define('login-form', LoginForm);