const CloseIconTemplate = document.createElement('template');
CloseIconTemplate.innerHTML = /*html*/ `



<svg xmlns="http://www.w3.org/2000/svg" height="34" viewBox="0 -960 960 960" width="34">
    <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
</svg>

`;

class CloseIcon extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({
      mode: 'open',
    });
    this.shadowRoot.appendChild(CloseIconTemplate.content.cloneNode(true));
  }
}

customElements.define('close-icon', CloseIcon);
