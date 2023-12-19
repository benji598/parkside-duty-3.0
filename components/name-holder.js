const NameHolderTemplate = document.querySelector('template');
NameHolderTemplate.innerHTML = `

<style>
</style>

<div class="title">Name</div>
`;

class NameHolder extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(NameHolderTemplate.content.cloneNode(true));
  }
}

customElements.define('name-holder', NameHolder);
