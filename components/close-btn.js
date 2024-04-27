const CloseBtnTemplate = document.createElement('template');
CloseBtnTemplate.innerHTML = `

<style>
    :host {
        position: absolute;
        padding: 0.2rem;
        padding-bottom: 0.1rem;
        background-color: var(--bg-blue);
        cursor: pointer;
        border-radius: var(--btn-radius) 0 0 0;
    }
</style>

<close-icon class="open"></close-icon>
<slot></slot> 
`;

class CloseBtn extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(CloseBtnTemplate.content.cloneNode(true));
  }
}

customElements.define('close-btn', CloseBtn);
