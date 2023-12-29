const NameSendTitleTemplate = document.createElement('template');
NameSendTitleTemplate.innerHTML = /*html*/ `
<style>
    :host {
        display: grid;
        grid-template-columns: auto 35%;
        gap: 0.7rem;
        padding-left: 1rem;
        padding-right: 1rem;
        padding-bottom: 0.5rem;
    }

    .name,
    .send {
        background-color: var(--bg-blue);
        border-radius: var(--btn-radius);
        padding: 0.6rem;
        color: var(--color-black);
        font-weight: 500;
    }

    .send {
        text-align: center;
    }
</style>

<div class="name">Name</div>
<div class="send">Send</div>
<slot></slot>
`;

class NameSendTitle extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({
      mode: 'open',
    });
    this.shadowRoot.appendChild(NameSendTitleTemplate.content.cloneNode(true));
  }
}

customElements.define('name-send', NameSendTitle);
