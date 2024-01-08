'use strict';
const NetworkStatusTemplate = document.createElement('template');
NetworkStatusTemplate.innerHTML = /*html*/ `

<style>
    .network-container {
        position: relative;
        margin-left: 1rem;
        margin-right: 1rem;
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

    .online,
    .offline {
        position: absolute;
        width: 100%;
        top: -100px;
        color: var(--color-white);
        text-align: center;
        padding-top: 0.5rem;
        padding-bottom: 0.5rem;
        border-radius: var(--btn-radius);
        transition: all 0.5s ease;
    }

    .show {
        top: 1rem;
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

    networkStatus() {
        if (navigator.onLine) {
            navigator.vibrate(100);
            this.shadowRoot.querySelector('.online').classList.add('show');
            this.shadowRoot.querySelector('.offline').classList.remove('show');

            setTimeout(() => {
                this.shadowRoot.querySelector('.online').classList.remove('show');
            }, 5000);
        } else {
            setTimeout(() => {
                navigator.vibrate(100);
                this.shadowRoot.querySelector('.offline').classList.add('show');
                this.shadowRoot.querySelector('.online').classList.remove('show');
            }, 10);
        }
    }
}

customElements.define('network-status', NetworkStatus);

// Global function to handle network status changes
const handleNetworkStatusChange = function() {
    let networkStatusElement = document.querySelector('network-status');

    if (!networkStatusElement) {
        networkStatusElement = document.createElement('network-status');
        document.body.prepend(networkStatusElement);
    }

    networkStatusElement.networkStatus();
};

window.addEventListener('online', handleNetworkStatusChange);
window.addEventListener('offline', handleNetworkStatusChange);