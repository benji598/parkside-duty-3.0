const WelcomeMessageTemplate = document.createElement('template');
WelcomeMessageTemplate.innerHTML = `

<style>

  .greeting {
    font-weight:500;
  }
  .name {
    font-weight: bold;
    font-size: clamp(1.5rem, 4vw, 2rem);

  }
</style>

<span class="greeting"></span>
<br>
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
