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
  }

  connectedCallback() {
    this.shadowRoot.querySelector('.open').addEventListener('click', this.createTray.bind(this));
  }

  createAndAppendTray() {
    console.log('clicked');
    const tray = document.createElement('slide-in-tray');
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
}

customElements.define('hamburger-btn', HamburgerBtn);
