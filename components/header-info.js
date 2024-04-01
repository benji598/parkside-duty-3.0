const HeaderTemplate = document.createElement('template');
HeaderTemplate.innerHTML = /*html*/ `
<style>
    h1 {
        font-size: 1.5rem;
        margin-bottom: 0;
    }

    h2 {
        font-size: 1rem;
        margin-top: 0;
        font-weight: normal;
    }

    header {
        display: grid;
        gap: 0.5rem;
        text-align: center;
    }
</style>

<header>
    <h1 class="title"></h1>
    <h2 class="subtitle"></h2>
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

    document.addEventListener('duty-name-received', (el) => {
      this.getTitle(el.detail);
    });
  }

  disconnectedCallback() {
    document.removeEventListener('duty-name-received', this.getTitle);
  }

  getTitle(dutyName) {
    const getTitle = this.getAttribute('title');
    const getsubTitle = this.getAttribute('subtitle');

    this.shadowRoot.querySelector('.title').textContent = dutyName || getTitle || ' Loading...';
    this.shadowRoot.querySelector('.subtitle').textContent = getsubTitle;
  }
}

customElements.define('header-info', HeaderInfo);
