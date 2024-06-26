const GridLayoutTemplate = document.createElement('template');
GridLayoutTemplate.innerHTML = `

<style>

    :host {
        display: grid;
        gap: 0.7rem;
        grid-template-columns: repeat(auto-fit, minmax(165px, 1fr));
        overflow: auto;
        padding-left: 1rem;
        padding-right: 1rem;
        padding-bottom: 1rem;
    }

    ::slotted(.span-two-columns) {
        grid-column: span 2;
    }
</style>

<slot></slot> 

`;

class GridLayout extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(GridLayoutTemplate.content.cloneNode(true));
  }
}

customElements.define('grid-layout', GridLayout);
