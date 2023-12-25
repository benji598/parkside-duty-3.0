const circleBtnTemplate = document.createElement('template');
circleBtnTemplate.innerHTML = /*html*/ `

<style>
    /* .material-icons {
        font-family: 'Material Icons';
        font-weight: 400;
        font-style: normal;
        font-size: 26px;
        display: inline-block;
        line-height: 1;
        text-transform: none;
        letter-spacing: normal;
        word-wrap: normal;
        white-space: nowrap;
        direction: ltr;
        -webkit-font-smoothing: antialiased;
        text-rendering: optimizeLegibility;
        -moz-osx-font-smoothing: grayscale;
        font-feature-settings: 'liga';
    } */

    /* :host {
        display: flex;
        justify-content: center;
    } */

   
</style>


<div class="icon-circle">
    <slot name="icon-slot"></slot> <!-- Slot for specific icon -->
</div>

`;

class circleBtn extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({
      mode: 'open',
    });
    this.shadowRoot.appendChild(circleBtnTemplate.content.cloneNode(true));
  }

  connectedCallback() {
    console.log('circle-icon is running');
  }
}

customElements.define('circle-icon-btn', circleBtn);
