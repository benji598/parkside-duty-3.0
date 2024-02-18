const FormContainerTemplate = document.createElement('template');
FormContainerTemplate.innerHTML = /*html*/ `
<style>
    :host {
        height: 100%;
        text-align: center;
        overflow: auto;
    }

    admin-icon {
        min-height: 40px;
    }


    .form-container {
        margin: 1rem;
        background-color: white;
        padding: clamp(1rem, 8vw, 2rem);
        border-radius: var(--btn-radius);
    }

    h1 {
        margin-top: 0;
    }

    .error-message {
        color: var(--color-red);
    }

    .form-position {
        display: grid;
        place-content: center;
        grid-template-columns: 1fr;
        height: 100%;
        /* max-width: fit-content;
        margin-left: auto;
        margin-right: auto; */
    }
</style>

<div class="form-position">
    <div class="form-container">
        <div class="icon"></div>
        <h1 class="title"></h1>
        <div class="error-message"></div>
        <div class="form"></div>
    </div>
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
        const errorMessage = this.getAttribute('data-error');
        const form = this.getAttribute('form');

        if (title === '' || icon === '') {
            this.shadowRoot.querySelector('.title').style.display = 'none';
        } else {
            this.shadowRoot.querySelector('.title').textContent = title;
            this.shadowRoot.querySelector('.icon').innerHTML = icon;
        }

        this.shadowRoot.querySelector('.icon').innerHTML = icon;
        this.shadowRoot.querySelector('.title').textContent = title;
        this.shadowRoot.querySelector('.form').innerHTML = form;
        this.shadowRoot.querySelector('.error-message').innerHTML = errorMessage;
    }
}
customElements.define('form-container', FormContainer);