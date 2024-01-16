const BtnDesignTemplate = document.createElement('template');
BtnDesignTemplate.innerHTML = /*html*/ `

<style>
    h3,
    p {
        font-size: 1rem;
    }

    h3 {
        margin: 0.3rem 0;
    }

    p {
        margin: 0;
    }

    .d-none {
        display: none;
    }

    .icon-circle {
        background-color: var(--background-color);
        border-radius: 50%;
        width: 24px;
        height: 24px;
        padding: 0.6rem;
        line-height: 0;
    }

    .btn-design {
        display: grid;
        place-items: center;
        background-color: var(--baby-blue);
        color: #000;
        padding: 0.6rem 0;
        text-align: center;
        transition: var(--btn-transition);
        border-radius: var(--btn-radius);
        cursor: pointer;
        width: 100%;
        border: 0;
    }

    .btn-design:hover {
        background-color: var(--bg-blue);
    }

    .btn-design:active {
        transform: scale(var(--btn-scale));
        background-color: var(--baby-blue-active);
    }

    ::slotted(.title) {
        margin-top: 0.3rem;
    }
</style>

<button class="btn-design">
    <div class="icon-circle">
        <slot name="icon"></slot>
    </div>
    <h3>
        <slot name="title"></slot>
    </h3>
    <p>
        <slot name="subtitle"></slot>
    </p>
</button>

`;

class BtnDesign extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({
            mode: 'open',
        });
        this.shadowRoot.appendChild(BtnDesignTemplate.content.cloneNode(true));
    }

    connectedCallback() {
        this.textChecker();
    }

    textChecker() {
        const titleSlot = this.shadowRoot.querySelector('slot[name="title"]');
        const slottedNodes = titleSlot.assignedNodes();

        if (slottedNodes.length === 0) {
            const h3Container = this.shadowRoot.querySelector('h3');
            if (h3Container) {
                h3Container.classList.add('d-none');
            }
        }
    }
}

customElements.define('btn-design', BtnDesign);