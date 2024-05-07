const HamburgerBtnTemplate = document.createElement('template');
HamburgerBtnTemplate.innerHTML = `

<style>

  :host {
    position: absolute;
    right: 1.5rem;
    top: 0.9rem;
  }
</style>

<hamburger-icon class="open"></hamburger-icon>
<slot></slot> 
`;

class HamburgerBtn extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(HamburgerBtnTemplate.content.cloneNode(true));

    this.fullName;
  }

  connectedCallback() {
    this.shadowRoot.querySelector('.open').addEventListener('click', this.createTray.bind(this));

    this.getInfo();
  }

  createAndAppendTray() {
    const tray = document.createElement('slide-in-tray');
    tray.setAttribute('fullName', this.fullName);
    document.body.appendChild(tray);
  }

  createTray() {
    if (!document.querySelector('slide-in-tray')) {
      this.createAndAppendTray();
    }

    this.dispatchEvent(
      new CustomEvent('slide-in', {
        bubbles: true,
        composed: true,
      })
    );
  }

  getInfo() {
    this.fullName = this.getAttribute('fullName');
  }
}

customElements.define('hamburger-btn', HamburgerBtn);
