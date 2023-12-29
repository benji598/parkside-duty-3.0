const NameHolderTemplate = document.createElement('template');
NameHolderTemplate.innerHTML = /*html*/ `

<style>
    .name-holder {
        display: flex;
        align-items: center;
        padding-left: 1rem;
        height: 100%;
        gap: 0.5rem;
        border-radius: var(--btn-radius);
        background-color: var(--baby-blue);
    }
</style>

<div class="name-holder"></div>
<slot></slot>

`;

class NameHolder extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({
      mode: 'open',
    });
    this.shadowRoot.appendChild(NameHolderTemplate.content.cloneNode(true));

    this.getName();
  }

  getName() {
    const name = this.getAttribute('name');
    this.shadowRoot.querySelector('.name-holder').innerHTML = name;
  }
}

customElements.define('name-holder', NameHolder);
