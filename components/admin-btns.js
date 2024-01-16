const AdminBtnsTemplate = document.createElement('template');
AdminBtnsTemplate.innerHTML = /*html*/ `
<style>

</style>


<btn-design>
    <div class="icon" slot="icon"></div>
    <span class="title" slot="title"></span>
</btn-design>

`;

class AdminBtns extends HTMLElement {
    constructor() {
        super();

        const shadowRoot = this.attachShadow({
            mode: 'open',
        });
        shadowRoot.appendChild(AdminBtnsTemplate.content.cloneNode(true));
    }

    connectedCallback() {
        this.updateAttributes();
    }

    updateAttributes() {
        const icon = this.getAttribute('icon');
        const title = this.getAttribute('title');

        this.shadowRoot.querySelector('.icon').innerHTML = icon;
        this.shadowRoot.querySelector('.title').textContent = title;
    }
}

customElements.define('admin-button', AdminBtns);