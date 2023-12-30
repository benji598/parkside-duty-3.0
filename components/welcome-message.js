const WelcomeMessageTemplate = document.createElement('template');
WelcomeMessageTemplate.innerHTML = `


<div class="greeting"></div>
<div class="name"></div>
<slot></slot>
`;

class WelcomeMessage extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(WelcomeMessageTemplate.content.cloneNode(true));
  }

  connectedCallback() {
    this.getDetails();
    this.timeOfDay();
  }

  getDetails() {
    const greeting = this.getAttribute('greeting');
    const name = this.getAttribute('name');

    this.shadowRoot.querySelector('.greeting').textContent = greeting;
    this.shadowRoot.querySelector('.name').textContent = name;
  }

  timeOfDay() {
    // need to work out good morning / good afternoon / good evening message for logging in
  }
}

customElements.define('welcome-message', WelcomeMessage);
