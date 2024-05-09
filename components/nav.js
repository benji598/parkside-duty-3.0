'use strict';
const navTemplate = document.createElement('template');

navTemplate.innerHTML = /*html*/ `
<style>
    a {
        text-decoration: var(--anchor-decoration);
    }

    .icon-bar {
        display: flex;
        background-color: var(--bg-blue);
        justify-content: space-around;
        line-height: 1.4;
        padding: 0.5rem 0rem;
        text-align: center;
        view-transition-name: iconbar;
        contain: layout;
    }

    .icon-bar a {
        display: flex;
        flex-direction: column;
        color: #000;
        min-width: 64px;
        text-decoration: var(--anchor-decoration);
    }

    duties-icon,
    .icon-container {
        padding-left: 5px;
        padding-right: 5px;
    }

    .active {
        border-radius: 2rem;
        padding-left: 20px;
        padding-right: 20px;
        background-color: var(--baby-blue);
    }
</style>


<div class="icon-bar">
    <a href="/">
        <duties-icon></duties-icon>
        <small>Duties</small>
    </a>

    <a href="" class="login-admin link">
        <div class="icon-container"></div>
        <small>Login</small>
    </a>
</div>
`;

class Nav extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({
            mode: 'open',
        });
        this.shadowRoot.appendChild(navTemplate.content.cloneNode(true));
        this.url = window.location.href;
        this.dutiesIcon = this.shadowRoot.querySelector('duties-icon');
        this.loginAdmin = this.shadowRoot.querySelector('.icon-container');
    }

    connectedCallback() {
        this.init();
        // this.urlChecker();
        this.adminChecker();
    }

    adminChecker() {
        const isAdmin = this.getAttribute('isAdmin');

        const iconContainer = this.shadowRoot.querySelector('.icon-container');
        const textLabel = this.shadowRoot.querySelector('.login-admin small');
        const link = this.shadowRoot.querySelector('.link');

        if (isAdmin !== null && isAdmin !== '') {
            const adminIcon = document.createElement('admin-icon');

            iconContainer.appendChild(adminIcon);
            iconContainer.style.fill = '#000';
            textLabel.textContent = 'Admin';
            link.href = 'admin.php';
        } else {
            const loginIcon = document.createElement('login-icon');

            iconContainer.appendChild(loginIcon);
            textLabel.textContent = 'Login';
            link.href = 'splash.php';
        }
    }

    // urlChecker() {

    // console.log(this.dutiesIcon);

    // this.dutiesIcon.addEventListener('click', function(e) {
    // e.preventDefault();

    // if (this.url.includes('duty.php') || this.url.includes('8888')) {
    // setTimeout(() => {
    // this.dutiesIcon.classList.add('active');
    // this.loginAdmin.classList.remove('active');
    // }, 100);
    // }
    // });

    // this.loginAdmin.addEventListener('click', function(e) {
    // e.preventDefault();
    // if (this.url.includes('admin.php') || this.url.includes('splash.php')) {
    // setTimeout(() => {
    // this.dutiesIcon.classList.remove('active');
    // this.loginAdmin.classList.add('active');
    // }, 100);
    // }
    // });
    // }

    init() {
        if (
            this.url.includes('duty.php') ||
            this.url.includes('8888') ||
            this.url.includes('staging.parkside.congregation.uk') ||
            this.url.includes('parkside.congregation.uk')
        ) {
            setTimeout(() => {
                this.dutiesIcon.classList.add('active');
                this.loginAdmin.classList.remove('active');
            }, 100);
        }

        if (this.url.includes('admin.php') || this.url.includes('splash.php')) {
            setTimeout(() => {
                this.dutiesIcon.classList.remove('active');
                this.loginAdmin.classList.add('active');
            }, 100);
        }
    }
}

customElements.define('nav-bar', Nav);

// old menu
// <!-- <a href="#">
// <rota-icon></rota-icon>
// <small>Rota</small>
// </a> -->

// <!-- <a href="#">
// <counter-icon></counter-icon>
// <small>Counter</small>
// </a> -->
// <!-- Redirect to splash.php if the user isn't logged in -->

// <!-- <div class="user-details"> -->

// <!-- Dashboard Button -->
// <!-- <form style="display: inline;" action="index.php" method="get">
//     <button type="submit" name="dashboard" class="button" <?php echo ($current_page == 'index.php') ? 'disabled' : ''; ?>>Dashboard</button>
// </form> -->

// <!-- Admin Button -->
// <!-- <form style="display: inline;" action="admin.php" method="get">
//     <button type="submit" name="admin" class="button" <?php echo ($current_page == 'admin.php') ? 'disabled' : ''; ?>Admin</button>
// </form> -->

// <!-- <form action="admin.php" method="get">
//     <button type="submit" name="admin" class="button"> Login</button>
// </form> -->

// <!-- Account Button -->
// <!-- <form action="account.php" method="get">
//     <button type="submit" name="account" class="button">Account</button>
// </form> -->

// <!-- Logout Button -->
// <!-- <form action="logout.php" method="post">
//     <button type="submit" name="logout" class="button">Logout</button>
// </form> -->

// <!-- Logout Button -->
// <!-- <form
//  action="splash.php" method="post">
//     <button type="submit" name="logout" class="button"></button>
// </form> -->
// <!-- </div> -->