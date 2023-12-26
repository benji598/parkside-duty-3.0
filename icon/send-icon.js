const SendIconTemplate = document.createElement('template');
SendIconTemplate.innerHTML = `


<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M120-160v-240l320-80-320-80v-240l760 320-760 320Z"/></svg>

`;

class SendIconBtn extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(SendIconTemplate.content.cloneNode(true));
  }
}

customElements.define('send-icon', SendIconBtn);
