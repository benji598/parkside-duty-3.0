const FormContainerTemplate = document.createElement('template');
FormContainerTemplate.innerHTML = /*html*/ `
<style>
    :host {
        place-content: center;
        display: grid;
        height: 80%;
        text-align: center;
        overflow: auto;
    }

    admin-icon {
        min-height: 30px;
    }


    .form-container {
        background-color: white;
        padding: clamp(1rem, 6vw, 2rem);
        border-radius: var(--btn-radius);
    }


    h1 {
        margin-top: 0;
    }


    .error-message {
        color: var(--color-red);
    }
</style>


<div class="form-container">
    <div class="icon"></div>
    <h1 class="title"></h1>
    <div class="error-message"></div>
    <div class="form"></div>
</div>
`;

class FormContainer extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({
      mode: 'open',
    });
    this.shadowRoot.appendChild(FormContainerTemplate.content.cloneNode(true));
  }
  connectedCallback() {
    this.getDetails();
  }

  getDetails() {
    const icon = this.getAttribute('icon');
    const title = this.getAttribute('title');
    const form = this.getAttribute('form');
    const errorMessage = this.getAttribute('data-error');

    this.shadowRoot.querySelector('.icon').innerHTML = icon;
    this.shadowRoot.querySelector('.title').textContent = title;
    this.shadowRoot.querySelector('.form').innerHTML = form;
    this.shadowRoot.querySelector('.error-message').innerHTML = errorMessage;
  }
}
customElements.define('form-container', FormContainer);
