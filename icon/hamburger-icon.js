const HamburgerIconTemplate = document.createElement('template');
HamburgerIconTemplate.innerHTML = /*html*/ `


<svg xmlns="http://www.w3.org/2000/svg" height="34" viewBox="0 -960 960 960" width="34">
    <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" />
</svg>

`;

class HamburgerIcon extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({
      mode: 'open',
    });
    this.shadowRoot.appendChild(HamburgerIconTemplate.content.cloneNode(true));
  }
}

customElements.define('hamburger-icon', HamburgerIcon);
