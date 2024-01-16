const dutyBtns = document.createElement('template');
dutyBtns.innerHTML = /*html*/ `
<style>
    a {
        text-decoration: var(--anchor-decoration);
    }
</style>

<a>
    <btn-design>
        <div class="icon" slot="icon"></div>
        <span class="title" slot="title"></span>
        <span class="subtitle" slot="subtitle"></span>
    </btn-design>
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

    connectedCallback() {
        this.updateAttributes();
    }

    updateAttributes() {
        const link = this.getAttribute('link');

        const title = this.getAttribute('title');
        const subtitle = this.getAttribute('subtitle');
        const icon = this.getAttribute('icon');

        this.shadowRoot.querySelector('a').setAttribute('href', link);
        this.shadowRoot.querySelector('.title').textContent = title;
        this.shadowRoot.querySelector('.subtitle').textContent = subtitle;
        this.shadowRoot.querySelector('.icon').innerHTML = icon;
    }
}

customElements.define('duty-button', dutyBtn);