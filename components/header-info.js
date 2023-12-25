const HeaderTemplate = document.createElement('template');
HeaderTemplate.innerHTML = /*html*/ `
<style>
    h1 {
        font-size: clamp(1.7rem, 4vw, 2rem);
    }

    header {
        text-align: center;
    }
</style>


<header>
    <h1 id="title">App Name</h1>
    <h2 id="subtitle">Choose a Option</h2>
</header>

`;

class HeaderInfo extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({
            mode: 'open',
        });
        this.shadowRoot.appendChild(HeaderTemplate.content.cloneNode(true));
    }

    static get observedAttributes() {
        return ['title', 'subtitle'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        switch (name) {
            case 'title':
                this.shadowRoot.getElementById('title').textContent = newValue;
                break;
            case 'subtitle':
                this.shadowRoot.getElementById('subtitle').textContent = newValue;
                break;
        }
    }

    connectedCallback() {
        this.getTitle();
        if (this.hasAttribute('title')) {
            this.shadowRoot.getElementById('title').textContent = this.getAttribute('title');
        }
        if (this.hasAttribute('subtitle')) {
            this.shadowRoot.getElementById('subtitle').textContent = this.getAttribute('subtitle');
        }
    }

    getTitle() {
        const slot = this.shadowRoot.querySelector('#title');

        this.sendTitle(slot);
        console.log(slot.textContent);
    }

    sendTitle(element) {
        const event = new CustomEvent('page-title', {
            bubbles: true,
            composed: true,
            detail: element.textContent,
        });
        this.dispatchEvent(event);
    }
}

customElements.define('header-info', HeaderInfo);