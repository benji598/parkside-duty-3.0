const HeaderTemplate = document.createElement('template');
HeaderTemplate.innerHTML = /*html*/ `
<style>
    h1 {
        font-size: clamp(1.7rem, 4vw, 2rem);
    }

    header {
        padding: 1rem;
        text-align: center;
    }
</style>

<header>
    <h1 id="duty">
        <slot name="title-slot"></slot>
    </h1>
    <h2>
        <slot name="subtitle-slot"></slot>
    </h2>
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

    connectedCallback() {
        this.getTitle();
    }

    getTitle() {
        const slot = this.shadowRoot.querySelector('slot[name="title-slot"]');

        const nodes = slot.assignedNodes();

        nodes.forEach((element) => {
            this.sendTitle(element);
        });
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