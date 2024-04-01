const LogoutBtnTemplate = document.createElement('template');
LogoutBtnTemplate.innerHTML = `

<style>

  a {
    display:grid;
    text-decoration: none;
    color: inherit;
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

    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(LogoutBtnTemplate.content.cloneNode(true));
  }
}

customElements.define('logout-btn', LogoutBtn);
