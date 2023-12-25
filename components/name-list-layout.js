const NameListLayoutTemplate = document.createElement('template');
NameListLayoutTemplate.innerHTML = /*html*/ `
<style>
    :host {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        padding-left: 1rem;
        padding-right: 1rem;
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
        document.addEventListener('filtered-bros', (el) => console.log('name list', el.detail));
    }
}

customElements.define('name-list-layout', NameListLayout);