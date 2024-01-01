const WelcomeMessageTemplate = document.createElement('template');
WelcomeMessageTemplate.innerHTML = `



<span class="greeting"></span>
<span class="name"></span>

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

    this.shadowRoot.querySelector('.name').textContent = name;
  }

  timeOfDay() {
    const todayDate = new Date();

    let greeting;
    const time = todayDate.toLocaleTimeString('en-UK');
    if (time < '12:00') {
      greeting = 'Good Morning, ';
    }

    if (time >= '12:00' && time < '18:00') {
      greeting = 'Good Afternoon, ';
    }

    if (time >= '18:00') {
      greeting = 'Good Evening, ';
    }
    this.shadowRoot.querySelector('.greeting').textContent = greeting;
  }
}

customElements.define('welcome-message', WelcomeMessage);
