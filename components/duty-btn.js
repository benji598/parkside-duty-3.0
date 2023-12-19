const dutyBtns = document.createElement('template');
dutyBtns.innerHTML = /*html*/ `
<style>
    a {
        text-decoration: var(--anchor-decoration);
    }

    h3,
    p {
        font-size: 1rem;
        margin: 0;
    }

    .duty-btns {
        display: grid;
        place-items: center;
        background-color: var(--baby-blue);
        color: #000;
        padding: 0.5rem 0;
        transition: var(--btn-transition);
        border-radius: var(--btn-radius);
    }

    .duty-btns:hover {
        background-color: var(--baby-blue-hover);
    }

    .duty-btns:active {
        background-color: var(--baby-blue-active);
    }
</style>




<a class="btn duty-btns">
    <slot name="icon-slot"></slot>
    <h3>
        <slot>Duty Name Here</slot>
    </h3>
    <p>Duty</p>
</a>

`;

class dutyBtn extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({
      mode: 'open',
    });
    shadowRoot.appendChild(dutyBtns.content.cloneNode(true));
  }

  connectedCallback() {
    this.getBtnLink();
  }

  getBtnLink() {
    const link = this.getAttribute('link');
    this.shadowRoot.querySelector('.duty-btns').setAttribute('href', link);
  }
}

// Define the custom element
customElements.define('duty-button', dutyBtn);
