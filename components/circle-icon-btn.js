const circleBtnTemplate = document.createElement('template');

circleBtnTemplate.innerHTML = /*html*/ `
<style>
    .material-icons {
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
    }

    .icon-circle {
        background-color: var(--background-color);
        border-radius: 50%;
        width: auto;
        margin-bottom: 10px;
        margin-top: 10px;
        padding: 0.6rem;
        line-height: 0;
    }
</style>


<div class="icon-circle">
    <slot class="slot-icon material-icons"></slot>
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
    this.showIcon();
  }

  showIcon() {
    const icon = this.getAttribute('icon');

    this.shadowRoot.querySelector('.slot-icon').textContent = icon;
  }
}

customElements.define('circle-icon-btn', circleBtn);
