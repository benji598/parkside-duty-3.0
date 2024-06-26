const MessageIcon = document.createElement('template');
MessageIcon.innerHTML = `


<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M80-80v-720q0-33 23.5-56.5T160-880h640q33 0 56.5 23.5T880-800v480q0 33-23.5 56.5T800-240H240L80-80Z"/></svg>

`;

class SendIcon extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(MessageIcon.content.cloneNode(true));
  }
}

customElements.define('sms-icon', SendIcon);
