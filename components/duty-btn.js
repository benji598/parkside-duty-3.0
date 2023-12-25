const dutyBtns = document.createElement('template');
dutyBtns.innerHTML = /*html*/ `
<style>
    a {
        text-decoration: var(--anchor-decoration);
    }

    h3,
    p {
        font-size: 1rem;
        margin: 0;
    }

    .icon-circle {
        background-color: var(--background-color);
        border-radius: 50%;
        width: 24px;
        height: 24px;
        padding: 0.6rem;
        line-height: 0;
        margin-bottom: 7px;
    }


    .duty-btns {
        display: grid;
        place-items: center;
        background-color: var(--baby-blue);
        color: #000;
        padding: 1.2rem 0;
        text-align: center;
        transition: var(--btn-transition);
        border-radius: var(--btn-radius);
    }

    .duty-btns:hover {
        background-color: var(--baby-blue-hover);
    }

    .duty-btns:active {
        background-color: var(--baby-blue-active);
    }
</style>


<a class="btn duty-btns">
    <div class="icon-circle">
        <slot name="icon-slot"></slot>
    </div>
    <header>
        <h3 id="title">App Name</h3>
        <p id="subtitle">Send a Reminder</p>
    </header>
</a>
`;

class dutyBtn extends HTMLElement {
    constructor() {
        super();
        const shadowRoot = this.attachShadow({
            mode: 'open',
        });
        shadowRoot.appendChild(dutyBtns.content.cloneNode(true));
    }

    static get observedAttributes() {
        return ['title', 'subtitle', 'icon', 'link'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'title') {
            this.shadowRoot.getElementById('title').textContent = newValue;
        } else if (name === 'subtitle') {
            this.shadowRoot.getElementById('subtitle').textContent = newValue;
        } else if (name === 'icon') {
            const iconContainer = this.shadowRoot.querySelector('.icon-circle');
            iconContainer.innerHTML = newValue;
        } else if (name === 'link') {
            this.shadowRoot.querySelector('a').setAttribute('href', newValue);
        }
    }

    connectedCallback() {
        this.updateAttributes();
    }

    updateAttributes() {
        const link = this.getAttribute('link');
        const title = this.getAttribute('title');
        const subtitle = this.getAttribute('subtitle');
        const icon = this.getAttribute('icon');

        if (link) {
            this.shadowRoot.querySelector('a').setAttribute('href', link);
        }
        if (title) {
            this.shadowRoot.getElementById('title').textContent = title;
        }
        if (subtitle) {
            this.shadowRoot.getElementById('subtitle').textContent = subtitle;
        }
        if (icon) {
            const iconContainer = this.shadowRoot.querySelector('.icon-circle');
            iconContainer.innerHTML = icon;
        }
    }
}

customElements.define('duty-button', dutyBtn);