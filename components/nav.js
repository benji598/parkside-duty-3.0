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
    <a class="active" href="index.html">
        <duties-icon></duties-icon>
        <small>Duties</small>
    </a>

    <a href="#">
        <rota-icon></rota-icon>
        <small>Rota</small>
    </a>

    <a href="#">
        <counter-icon></counter-icon>
        <small>Counter</small>
    </a>

    <div>
        <!-- <a href="#"> -->
        <?php if (!$isAdmin) { ?>
        <!-- Logout Button -->
        <form action="splash.php" method="post">
            <button type="submit" name="logout" class="button">Admin Login</button>
            <login-icon></login-icon>
            <small>Login</small>
        </form>
        <?php } ?>

        <!-- </a> -->
    </div>
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