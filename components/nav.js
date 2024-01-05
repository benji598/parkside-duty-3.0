'use strict';
const navTemplate = document.createElement('template');

navTemplate.innerHTML = /*html*/ `
<style>
    :host {
        margin-top: auto;
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
        gap: 0.3rem;
        color: #000;
        text-decoration: var(--anchor-decoration);
    }
</style>



<div class="icon-bar">
    <a class="active" href="/">
        <duties-icon></duties-icon>
        <small>Duties</small>
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


    <div class="user-details">

        <!-- Dashboard Button -->
        <!-- <form style="display: inline;" action="index.php" method="get">
            <button type="submit" name="dashboard" class="button" <?php echo ($current_page == 'index.php') ? 'disabled' : ''; ?>>Dashboard</button>
        </form> -->

        <?php if ($isAdmin) { ?>
        <!-- Admin Button -->
        <form style="display: inline;" action="admin.php" method="get">
            <button type="submit" name="admin" class="button" <?php echo ($current_page == 'admin.php') ? 'disabled' : ''; ?>Admin</button>
        </form>

        <!-- Account Button -->
        <form style="display: inline;" action="account.php" method="get">
            <button type="submit" name="account" class="button" <?php echo ($current_page == 'account.php') ? 'disabled' : ''; ?>Account</button>
        </form>

        <!-- Logout Button -->
        <form style="display: inline;" action="logout.php" method="post">
            <button type="submit" name="logout" class="button">Logout</button>
        </form>

        <?php } ?>

        <?php if (!$isAdmin) { ?>
        <!-- Logout Button -->
        <form style="display: inline;" action="splash.php" method="post">
            <button type="submit" name="logout" class="button">Admin Login</button>
        </form>

        <?php } ?>

    </div>


    `;

class Nav extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({
      mode: 'open',
    });
    this.shadowRoot.appendChild(navTemplate.content.cloneNode(true));
  }
}

customElements.define('nav-bar', Nav);
