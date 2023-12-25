const NameHolderTemplate = document.querySelector('template');
NameHolderTemplate.innerHTML = /*html*/ `

<style>
    .names-holder {
        display: grid;
        grid-template-columns: auto 35%;
        gap: 0.5rem;
        padding-bottom: 0.5rem;
    }
</style>

`;

class NameHolder extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({
      mode: 'open',
    });
    this.shadowRoot.appendChild(NameHolderTemplate.content.cloneNode(true));
  }
}

customElements.define('name-holder', NameHolder);
