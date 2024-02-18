'use strict';
const navTemplate = document.createElement('template');

navTemplate.innerHTML = /*html*/ `
<style>
    :host {
        margin-top: auto;
    }

    .admin svg {
        fill: black;
    }

    .hide {
        display: none;
    }

    a {
        text-decoration: var(--anchor-decoration);
    }

    .icon-bar {
        display: flex;
    }

    .icon-bar {
        background-color: var(--bg-blue);
        justify-content: space-around;
        line-height: 1.4;
        padding: 0.5rem 0rem;
        text-align: center;
    }

    .icon-bar a {
        display: flex;
        flex-direction: column;
        color: #000;
        text-decoration: var(--anchor-decoration);
    }
</style>


<div class="icon-bar">
    <a href="/" class="active">
        <duties-icon></duties-icon>
        <small>Duties</small>
    </a>

    <a href="admin.php?admin" class="login-admin button">
        <div class="icon-container"></div>
        <small>Login</small>
    </a>


    <!-- <a href="#">
        <rota-icon></rota-icon>
        <small>Rota</small>
    </a> -->

    <!-- <a href="#">
        <counter-icon></counter-icon>
        <small>Counter</small>
    </a> -->
    <!-- Redirect to splash.php if the user isn't logged in -->


    <!-- <div class="user-details"> -->

    <!-- Dashboard Button -->
    <!-- <form style="display: inline;" action="index.php" method="get">
            <button type="submit" name="dashboard" class="button" <?php echo ($current_page == 'index.php') ? 'disabled' : ''; ?>>Dashboard</button>
        </form> -->


    <!-- Admin Button -->
    <!-- <form style="display: inline;" action="admin.php" method="get">
            <button type="submit" name="admin" class="button" <?php echo ($current_page == 'admin.php') ? 'disabled' : ''; ?>Admin</button>
        </form> -->

    <!-- <form action="admin.php" method="get">
            <button type="submit" name="admin" class="button"> Login</button>
        </form> -->



    <!-- Account Button -->
    <!-- <form action="account.php" method="get">
            <button type="submit" name="account" class="button">Account</button>
        </form> -->

    <!-- Logout Button -->
    <!-- <form action="logout.php" method="post">
            <button type="submit" name="logout" class="button">Logout</button>
        </form> -->

    <!-- Logout Button -->
    <!-- <form 
         action="splash.php" method="post">
            <button type="submit" name="logout" class="button"></button>
        </form> -->
    <!-- </div> -->
    `;

class Nav extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({
      mode: 'open',
    });
    this.shadowRoot.appendChild(navTemplate.content.cloneNode(true));
  }

  connectedCallback() {
    this.adminChecker();
  }

  adminChecker() {
    const isAdmin = this.getAttribute('isAdmin');

    const iconContainer = this.shadowRoot.querySelector('.icon-container');
    const textLabel = this.shadowRoot.querySelector('.login-admin small');

    if (isAdmin !== null && isAdmin !== '') {
      const adminIcon = document.createElement('admin-icon');

      iconContainer.appendChild(adminIcon);
      iconContainer.style.fill = '#000';
      textLabel.textContent = 'Admin';
    } else {
      const loginIcon = document.createElement('login-icon');

      iconContainer.appendChild(loginIcon);
      textLabel.textContent = 'Login';
    }
  }
}

customElements.define('nav-bar', Nav);
