const NameListLayoutTemplate = document.createElement('template');
NameListLayoutTemplate.innerHTML = /*html*/ `
<style>
    :host {
        display: grid;
        grid-template-columns: auto 35%;
        gap: 0.7rem;
        padding-left: 1rem;
        padding-right: 1rem;
        padding-bottom: 1rem;
        overflow: auto;
    }
</style>
<slot></slot>
`;

class NameListLayout extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({
      mode: 'open',
    });
    this.shadowRoot.appendChild(NameListLayoutTemplate.content.cloneNode(true));
  }
}

customElements.define('name-list-layout', NameListLayout);
