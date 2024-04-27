const LogoutBtnTemplate = document.createElement('template');
LogoutBtnTemplate.innerHTML = /*html*/ `

<style>
    :host {
        margin-top: auto;
    }

    a {
        display: flex;
        gap: 0.5rem;
        align-items: center;
        line-height: 1;
        padding: 1rem;
        text-decoration: none;
        color: inherit;
    }

    .cancel-btn {
        width: 100%;
        padding: 1rem;
        border: 2px solid white;
        color: var(--color-white);
        font-weight: 600;
        cursor: pointer;
        background-color: var(--color-red);
        border-radius: var(--btn-radius);
    }

    .cancel-btn:active {
        transform: scale(var(--btn-scale));
        transition: var(--btn-transition);
    }
</style>

<a href="logout.php?logout">
    <logout-icon></logout-icon>
    Logout
</a>

<slot></slot>

`;

class LogoutBtn extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({
      mode: 'open',
    });
    this.shadowRoot.appendChild(LogoutBtnTemplate.content.cloneNode(true));
  }
}

customElements.define('logout-btn', LogoutBtn);
