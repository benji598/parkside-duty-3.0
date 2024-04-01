const CloseBtnTemplate = document.createElement('template');
CloseBtnTemplate.innerHTML = `

<style>
    :host {
        position: absolute;
        padding: 0.5rem;
        background-color: var(--bg-blue);
        cursor: pointer;
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
