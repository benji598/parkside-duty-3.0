const NameHolderTemplate = document.createElement('template');
NameHolderTemplate.innerHTML = /*html*/ `

<style>
    .names-holder {
        display: grid;
        grid-template-columns: auto 35%;
        gap: 0.5rem;
        padding-bottom: 0.5rem;
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