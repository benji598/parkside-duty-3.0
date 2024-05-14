const MainWrapperTemplate = document.createElement('template');
MainWrapperTemplate.innerHTML = /*html*/ `

<style>
    :host {
        contain: layout;
        overflow: auto;
        margin-bottom: 64px;
        height: 100%;
    }
</style>


<slot></slot>

`;

class MainWrapper extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({
      mode: 'open',
    });
    this.shadowRoot.appendChild(MainWrapperTemplate.content.cloneNode(true));
  }
}

customElements.define('main-wrapper', MainWrapper);
