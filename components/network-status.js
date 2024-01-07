const NetworkStatusTemplate = document.createElement('template');
NetworkStatusTemplate.innerHTML = /*html*/ `

<style>
    .network-container {
        position: relative;
        margin-left: 1rem;
        margin-right: 1rem;
    }

    .online,
    .offline {
        position: absolute;
        width: 100%;
        top: -100px;
        transition: all 0.5s ease;
        color: var(--color-white);
        text-align: center;
        padding-top: 0.5rem;
        padding-bottom: 0.5rem;
        border-radius: var(--btn-radius);
    }

    p {
        margin: 0;
    }

    .online {
        background-color: var(--color-green);
    }

    .offline {
        background-color: var(--color-red);
    }

    .show {
        top: 0.5rem;
    }
</style>
<div class="network-container">
    <div class="online">
        <p>You are Online.</p>
    </div>
    <div class="offline">
        <p>You are Offline.</p>
    </div>
</div>
<slot></slot>
`;

class NetworkStatus extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({
      mode: 'open',
    });
    this.shadowRoot.appendChild(NetworkStatusTemplate.content.cloneNode(true));
  }

  connectedCallback() {
    window.addEventListener('online', this.networkStatus.bind(this));
    window.addEventListener('offline', this.networkStatus.bind(this));
  }

  networkStatus() {
    if (navigator.onLine) {
      this.shadowRoot.querySelector('.online').classList.add('show');
      this.shadowRoot.querySelector('.offline').classList.remove('show');

      setTimeout(() => {
        this.shadowRoot.querySelector('.online').classList.remove('show');
      }, 5000);
    } else {
      this.shadowRoot.querySelector('.online').classList.remove('show');
      this.shadowRoot.querySelector('.offline').classList.add('show');
    }
  }
}

customElements.define('network-status', NetworkStatus);
