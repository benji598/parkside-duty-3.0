const HeaderTemplate = document.createElement('template');
HeaderTemplate.innerHTML = /*html*/ `
<style>
    h1 {
        font-size: clamp(1.7rem, 4vw, 2rem);
    }

    header {
        text-align: center;
    }
</style>

<header>
    <h1 class="title">App Name</h1>
    <h2 class="subtitle">Choose a Option</h2>
</header>
`;

class HeaderInfo extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({
      mode: 'open',
    });
    this.shadowRoot.appendChild(HeaderTemplate.content.cloneNode(true));
  }

  connectedCallback() {
    this.getTitle();
  }

  getTitle() {
    const getTitle = this.getAttribute('title');
    const getsubTitle = this.getAttribute('subtitle');

    this.shadowRoot.querySelector('.title').textContent = getTitle;
    this.shadowRoot.querySelector('.subtitle').textContent = getsubTitle;

    const dutyTitle = this.shadowRoot.querySelector('.title');
    this.sendTitle(dutyTitle);
  }

  sendTitle(element) {
    const event = new CustomEvent('page-title', {
      bubbles: true,
      composed: true,
      detail: element.textContent,
    });
    this.dispatchEvent(event);
  }
}

customElements.define('header-info', HeaderInfo);
