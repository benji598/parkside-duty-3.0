const NameHolderTemplate = document.createElement('template');
NameHolderTemplate.innerHTML = /*html*/ `

<style>
    :host {
        display: flex;
        align-items: center;
        padding-left: 1rem;
        padding-right: 1rem;
        min-height: 3.8rem;
        gap: 0.5rem;
        border-radius: var(--btn-radius);
        background-color: var(--baby-blue);
    }
</style>


<slot></slot>



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